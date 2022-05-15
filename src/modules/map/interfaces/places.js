// To parse this data:
//
//   const Convert = require("./file");
//
//   const placesResponse = Convert.toPlacesResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toPlacesResponse(json) {
    return cast(JSON.parse(json), r("PlacesResponse"));
}

function placesResponseToJson(value) {
    return JSON.stringify(uncast(value, r("PlacesResponse")), null, 2);
}

function invalidValue(typ, val, key = '') {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val, typ, getProps, key = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}

function a(typ) {
    return { arrayItems: typ };
}

function u(...typs) {
    return { unionMembers: typs };
}

function o(props, additional) {
    return { props, additional };
}

function m(additional) {
    return { props: [], additional };
}

function r(name) {
    return { ref: name };
}

const typeMap = {
    "PlacesResponse": o([
        { json: "type", js: "type", typ: "" },
        { json: "query", js: "query", typ: a("") },
        { json: "features", js: "features", typ: a(r("Feature")) },
        { json: "attribution", js: "attribution", typ: "" },
    ], false),
    "Feature": o([
        { json: "id", js: "id", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "place_type", js: "place_type", typ: a("") },
        { json: "relevance", js: "relevance", typ: 0 },
        { json: "properties", js: "properties", typ: r("Properties") },
        { json: "text_es", js: "text_es", typ: "" },
        { json: "language_es", js: "language_es", typ: r("Language") },
        { json: "place_name_es", js: "place_name_es", typ: "" },
        { json: "text", js: "text", typ: "" },
        { json: "language", js: "language", typ: r("Language") },
        { json: "place_name", js: "place_name", typ: "" },
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "center", js: "center", typ: a(3.14) },
        { json: "geometry", js: "geometry", typ: r("Geometry") },
        { json: "context", js: "context", typ: a(r("Context")) },
        { json: "matching_text", js: "matching_text", typ: u(undefined, "") },
        { json: "matching_place_name", js: "matching_place_name", typ: u(undefined, "") },
    ], false),
    "Context": o([
        { json: "id", js: "id", typ: "" },
        { json: "short_code", js: "short_code", typ: u(undefined, "") },
        { json: "wikidata", js: "wikidata", typ: u(undefined, r("Wikidata")) },
        { json: "text_es", js: "text_es", typ: "" },
        { json: "language_es", js: "language_es", typ: u(undefined, r("Language")) },
        { json: "text", js: "text", typ: "" },
        { json: "language", js: "language", typ: u(undefined, r("Language")) },
    ], false),
    "Geometry": o([
        { json: "type", js: "type", typ: "" },
        { json: "coordinates", js: "coordinates", typ: a(3.14) },
    ], false),
    "Properties": o([
        { json: "wikidata", js: "wikidata", typ: "" },
        { json: "short_code", js: "short_code", typ: u(undefined, "") },
        { json: "category", js: "category", typ: u(undefined, "") },
        { json: "landmark", js: "landmark", typ: u(undefined, true) },
        { json: "address", js: "address", typ: u(undefined, "") },
        { json: "foursquare", js: "foursquare", typ: u(undefined, "") },
        { json: "maki", js: "maki", typ: u(undefined, "") },
    ], false),
    "Language": [
        "es",
    ],
    "Wikidata": [
        "Q29",
        "Q71097",
        "Q8356",
    ],
};

module.exports = {
    "placesResponseToJson": placesResponseToJson,
    "toPlacesResponse": toPlacesResponse,
};


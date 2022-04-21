export default {

    name:'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path:'',
            name: 'login',
            component: () => import(/* webpackChunkName: "Login" */ '@/modules/auth/views/Login.vue'),
        },
        {
            path:'/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/Register.vue'),
        }
    ]
    
}
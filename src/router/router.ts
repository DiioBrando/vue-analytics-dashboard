import Incomes from "../features/pages/Incomes.vue";
import Orders from "../features/pages/Orders.vue";
import Sales from "../features/pages/Sales.vue";
import Stocks from "../features/pages/Stocks.vue";
import Main from "../features/Main.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Main',
        redirect: '/incomes',
        component: Main,
        children: [
            {
                path: 'incomes',
                name: 'incomes',
                component: Incomes,

            },
            {
                path: 'orders',
                name: 'orders',
                component: Orders,

            },
            {
                path: 'sales',
                name: 'sales',
                component: Sales,
            },
            {
                path: 'stocks',
                name: 'stocks',
                component: Stocks,
            },
        ],
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    scrollBehavior() {
        return {top: 0}
    }
});

export default router;
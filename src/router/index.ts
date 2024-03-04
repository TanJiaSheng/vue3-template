import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from './routes'
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouter,
    // 滚动行为
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router

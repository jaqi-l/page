import { createRouter,createWebHashHistory } from 'vue-router'
const routes =  [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('@/views/info/info')
    },
    {
      path: '/nav',
      name: 'nav',
      component: () => import('@/views/nav')
    },
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
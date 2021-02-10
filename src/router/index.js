import { createRouter,createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
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
  history: routerHistory,
  routes
})
export default router
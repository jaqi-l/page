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
      path: '/newinfo',
      name: 'newinfo',
      component: () => import('@/views/newinfo')
    },
    {
      path: '/nav',
      name: 'nav',
      component: () => import('@/views/nav')
    },
    {
      path: '/byxNav',
      name: 'byxNav',
      component: () => import('@/views/nav')
    },
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
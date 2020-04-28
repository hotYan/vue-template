import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import schoolRouter from './modules/school'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements ,all roles can be accessed
 * 没有权限要求的基本页面,可以被所有角色访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 账号
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/User/index'),
        name: 'User',
        meta: { title: '管理员管理', icon: 'parent' }
      }
    ]
  },
  // 设备
  {
    path: '/studentcard',
    component: Layout,
    redirect: '/studentcard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/Device/index'),
        name: 'StudentCard',
        meta: { title: '学生卡管理', icon: 'studentCard' }
      }
    ]
  },
  // 个人资料
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/index',
    meta: { title: '个人资料', icon: 'user' },
    children: [
      {
        path: 'index',
        hidden: 'true',
        component: () => import('@/views/admin/Personal/index'),
        name: 'Personal',
        meta: { title: '', activeMenu: '/personal' }
      },
      {
        path: 'password',
        hidden: 'true',
        component: () => import('@/views/admin/Personal/password'),
        name: 'Password',
        meta: { title: '修改密码', activeMenu: '/personal' }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules**/
  /** 当您的路由图太长时，您可以将其拆分为小模块**/
  schoolRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 需要根据用户角色动态加载的路由
 * 需要可参考https://github.com/PanJiaChen/vue-element-admin/tree/master/src/router
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

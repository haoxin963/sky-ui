import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {title: 'Example', icon: 'example'},
    children: [
      {
        path: 'Form',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: 'Tree', icon: 'tree'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/rbac',
    component: Layout,
    redirect: '/rbac',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'table',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/rbac/role/index'),
        name: '角色',
        meta: { title: '角色', noCache: true },
        roles: ['admin'] // you can set roles in root nav
      },
      {
        path: 'user',
        component: () => import('@/views/rbac/user/index'),
        name: '用户',
        meta: { title: '用户', noCache: true },
        roles: ['admin'] // you can set roles in root nav
      },
      {
        path: 'menu',
        component: () => import('@/views/rbac/menu/index'),
        name: '菜单',
        meta: { title: '菜单', noCache: true },
        roles: ['admin'] // you can set roles in root nav
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

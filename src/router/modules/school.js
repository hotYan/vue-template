import Layout from '@/layout'

const schoolRouter = {
  path: '/school',
  component: Layout,
  redirect: '/school/index',
  meta: { title: '学校管理', icon: 'school' },
  children: [
    {
      path: 'index',
      name: 'School',
      hidden: true,
      component: () => import('@/views/admin/School/index'),
      meta: { title: '', activeMenu: '/school' }
    },
    {
      path: '1',
      hidden: true,
      redirect: '/school/1/classinfo',
      name: 'SchoolDetails',
      component: () => import('@/views/admin/School/details/index'),
      meta: { title: '', activeMenu: '/school' },
      children: [
        {
          path: 'classinfo',
          hidden: true,
          name: 'ClassInfo',
          component: () => import('@/views/admin/School/details/Class/index'),
          meta: { title: '班级信息', activeMenu: '/school' }

        }, {
          path: 'attendance',
          hidden: true,
          name: 'Attendance',
          component: () => import('@/views/admin/School/details/Attendance/index'),
          meta: { title: '考勤设置', activeMenu: '/student' }

        }
      ]
    }
  ]
}
export default schoolRouter


export const routes = [
  {
    path: "/login",
    name: "login",
    // @ts-ignore
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    }
  },
  {
    path: "/",
    name: "layout",
    // @ts-ignorec
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    meta: {
      title: '',
      hidden: false
    },
    children: [
      {
        path: "/home",
        component: () => import('../views/home/index.vue'),
        meta: {
          title: "首页",
          hidden: false,
          icon: "House"
        }
      }
    ]
  },
  {
    path: '/404',
    name: "404",
    // @ts-ignore
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: "404",
      hidden: true
    }
  },
  {
    path: '/screen',
    component: () => import('../views/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'DataAnalysis'
    }
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      hidden: false,
      title: '权限管理',
      icon: 'Lock'
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('../views/acl/user/index.vue'),
        name: 'User',
        meta: {
          hidden: false,
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('../views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          hidden: false,
          title: '角色管理',
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('../views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          hidden: false,
          title: '菜单管理',
          icon: 'Monitor'
        }
      }
    ]
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      hidden: false,
      title: '商品管理',
      icon: 'Goods'
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('../views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          hidden: false,
          title: '品牌管理',
          icon: 'ShoppingBag'
        
        }
      },
      {
        path: '/product/attr',
        component: () => import('../views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          hidden: false,
          title: '平台属性管理',
          icon: 'Setting'

        }
      },
      {
        path: '/product/spu',
        component: () => import('../views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          hidden: false,
          title: 'Spu管理',
          icon: 'Document'
        }
      },
      {
        path: '/product/sku',
        component: () => import('../views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          hidden: false,
          title: 'Sku管理',
          icon: 'ShoppingTrolley'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: "任意路由",
      hidden: true
    }
  },
]
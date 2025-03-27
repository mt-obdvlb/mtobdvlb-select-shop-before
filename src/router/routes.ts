export  const routes = [
  {
    path: "/login",
    name: "login",
    // @ts-ignore
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "layout",
    // @ts-ignorec
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: '/404',
    name: "404",
    // @ts-ignore
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any'
  }
]
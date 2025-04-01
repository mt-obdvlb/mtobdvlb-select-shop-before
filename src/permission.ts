import router from './router'
import npogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from "./store/modules/user.ts";
import pinia from './store';
import setting from './setting.ts'

npogress.configure({
    showSpinner: false
})

const userStore = useUserStore(pinia)
console.log(userStore)

router.beforeEach((to, from, next) => {
    npogress.start()
    const token = userStore.token
    const username = userStore.username
    if (token) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (username) {
                next()

            } else {
                try {
                    userStore.userInfo().then(() => {
                        next()
                    })

                } catch(error) {
                    userStore.userLogout()
                    next({
                        path: '/login',
                        query: {
                            redirect: to.path
                        }
                    })
                }
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        }
    }
})

router.afterEach((to, from) => {
    // finish progress bar
    // NProgress.done()
    document.title = to.meta.title ? `${to.meta.title} - ${setting.title}` : setting.title
    npogress.done()
})
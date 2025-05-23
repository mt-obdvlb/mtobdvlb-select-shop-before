import { createApp } from 'vue'
import gloablComponent from './components/index';
import App from './App.vue'
// @ts-ignore
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus';
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import router from './router'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from './store';
import './permission.ts'
// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'


const app = createApp(App)

app.use(pinia)
app.use(gloablComponent)
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)

app.mount('#app')

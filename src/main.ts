import { createApp } from 'vue'
import gloablComponent from './components/index';
import App from './App.vue'
// @ts-ignore
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import router from './router'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from './store';


const app = createApp(App)

app.use(pinia)
app.use(gloablComponent)
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)

app.mount('#app')

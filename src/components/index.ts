import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Category from './Category/index.vue';
const components: { [name: string]: Component } = { SvgIcon };
export default {
    install (app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.component('Category', Category)
    }
}
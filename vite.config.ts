// vite.config.ts
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'
import {viteMockServe} from 'vite-plugin-mock'

export default defineConfig(({command, mode}) => {
    return {
        plugins: [vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]',
            }),
            viteMockServe({
                enable: true,
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),// 相对路径别名配置，使用 @ 代替 src
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/variable.scss" as *;`,
                },
            },
        },
    }


})
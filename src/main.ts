import { createApp } from 'vue'
import './style.css'
import '@/assets/styles/index.scss'
import ElementPlus from 'element-plus'
// eslint-disable-next-line
// @ts-expect-error 防止报错
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import App from './App.vue'
import gloablComponent from '@/components/index'
import { api } from './api'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(gloablComponent)
api.user.login({
    username: 'admin',
    password: '123456'
})
app.config.globalProperties.$api = api
app.mount('#app')

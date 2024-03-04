import { createStore } from 'vuex'

interface moduleType {
    [key: string]: any
}

const modulesFiles: moduleType = import.meta.glob('./modules/*.ts', { eager: true }) // 异步方式
let modules: moduleType = {}
for (const key in modulesFiles) {
    var moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
    const name = moduleName.split('/')[1]
    modules[name] = modulesFiles[key].default
}

const store = createStore({
    modules
})

export default store

// 自动导入文件
const files: any = import.meta.glob('./modules/*.ts', { eager: true }) // 导入文件
let api: any = {}
for (const key in files) {
    api[key.replace(/\.\/modules\/|\.ts/g, '')] = files[key].default
}

export { api }
export default api

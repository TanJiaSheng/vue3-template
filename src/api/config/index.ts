import httpConfig from './request'

const methodsWithoutData = ['get', 'head', 'options']
const defaultConfig = { needRes: false }

const json2Query = (param: any, key: string) => {
    const mappingOperator = '='
    const separator = '&'
    let paramStr = ''

    if (param instanceof String || typeof param === 'string' || param instanceof Number || typeof param === 'number' || param instanceof Boolean || typeof param === 'boolean') paramStr += separator + key + mappingOperator + encodeURIComponent(param as string)
    else if (typeof param === 'object') {
        Object.keys(param).forEach((p) => {
            const value = param[p]
            const k = key === null || key === '' || key === undefined ? p : key + (param instanceof Array ? '[' + p + ']' : '.' + p)
            paramStr += separator + json2Query(value, k)
        })
    }
    return paramStr.substr(1)
}
export interface VariableData {
    [prop: string]: string
}
export const request =
    (method: string, url: string) =>
    (params: VariableData = {}, config = {}) => {
        const reqMethod = method.toLowerCase()
        const reqConfig = Object.assign({}, defaultConfig, config)

        // 全局URL变量替换
        const variableData: VariableData = {}

        Object.keys(params).forEach((key) => {
            // 自定义url变量
            if (key.indexOf('$') === 0) {
                variableData[key] = params[key]
            }
        })
        let newUrl = url
        Object.keys(variableData).forEach((key) => {
            if (!variableData[key]) {
                // 去除后面的路径符号
                newUrl = newUrl.replace(new RegExp(`\\${key}/`, 'g'), '')
            } else {
                newUrl = newUrl.replace(new RegExp(`\\${key}`, 'g'), variableData[key])
            }
            delete params[key]
        })

        let req = null
        if (methodsWithoutData.includes(reqMethod)) {
            // 拼接参数
            const query = json2Query(params, '')
            if (query) {
                newUrl += `?${query}`
            }
            req = httpConfig[reqMethod](newUrl, null, reqConfig)
        } else {
            req = httpConfig[reqMethod](newUrl, params, reqConfig)
        }
        return req
            .then((res: { data: object }) => {
                if (reqConfig.needRes) return Promise.resolve(res)

                return Promise.resolve(res.data)
            })
            .catch((err: object) => {
                return Promise.reject(err)
            })
    }

const getPromise = (method: string, url: string, params: VariableData, config: object = {}) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        await request(method, url)(params, config)
            .catch((e: { response: { data: any } }) => e?.response?.data)
            .then((res: object) => resolve(res))
            .catch((err: object) => reject(err))
    })
}

// get
export const get = (url: string, params: VariableData, opts = {}) => getPromise('get', url, params, opts)

// post
export const post = (url: string, params: VariableData, opts = {}) => getPromise('post', url, params, opts)

// put
export const put = (url: string, params: VariableData, opts = {}) => getPromise('put', url, params, opts)

// delete
export const remove = (url: string, params: VariableData, opts = {}) => getPromise('delete', url, params, opts)

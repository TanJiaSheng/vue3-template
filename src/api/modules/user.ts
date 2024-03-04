import { post } from '../config/index'
import { UserParams } from '../types'
export default {
    login: (params: UserParams) => post('/api/user/login', params)
}
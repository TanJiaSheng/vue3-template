// root层state类型定义

export default interface RootStateTypes {
    [prop: string]: string | object | []
}

export interface SystemStateTypes extends RootStateTypes {
    info: object
}

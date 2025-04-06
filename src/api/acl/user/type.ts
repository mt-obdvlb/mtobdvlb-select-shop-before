export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface User {
    id?: number,
    createTime?: string,
    updateTime?: string,
    username: string,
    password: string,
    name: string,
    phone?: string,
    roleName?: string,
}

export type Records = User[]

export interface UserResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

export interface RoleData {
    id?: number,
    roleName: string,
    remark: null,
    createTime?: string,
    updateTime?: string,

}

export type AllRole = RoleData[]

export interface AllRoleResponseData extends ResponseData {
    data: {
        assignRoles: AllRole,
        allRolesList: AllRole
    }
}

export interface AssignRoleData {
    roleIdList: number[],
    userId: number
}
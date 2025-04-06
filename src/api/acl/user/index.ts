import request from "../../../utils/request.ts";
import type {AllRoleResponseData, AssignRoleData, User, UserResponseData} from "./type.ts";

enum API {
    AllUser = '/admin/acl/user/',
    AddUser = '/admin/acl/user/save',
    UpdateUser = '/admin/acl/user/update',
    AllRole = '/admin/acl/user/toAssign/',
    UpdateUserRole = '/admin/acl/user/doAssignRole',
    DeleteUser = '/admin/acl/user/remove/',
    DeleteBatchUser = '/admin/acl/user/batchRemove'
}

export const getUserList = (page: number, limit: number, username: string) =>
    request.get<any, UserResponseData>(
         `${API.AllUser}${page}/${limit}`,
        {
            params: {
                username
            }
        }
    );

export const addOrUpdateUser = (user: User) => {
    if (user.id) {
        return request.put<any, UserResponseData>(API.UpdateUser, user)
    } else {
        return request.post<any, UserResponseData>(API.AddUser, user)
    }
}

export const getUserRole = (userId: number) =>
    request.get<any, AllRoleResponseData>(
        `${API.AllRole}${userId}`
    );

export const assignUserRole = (data: AssignRoleData) =>
    request.post<any, any>(
        `${API.UpdateUserRole}`,
        {
            userId: data.userId,
            roleIdList: data.roleIdList
        }
    );

export const deleteUser = (userId: number) =>
    request.delete<any, any>(
        `${API.DeleteUser}${userId}`
    );

export const deleteBatchUser = (idList: number[]) =>
    request.delete<any, any>(
        `${API.DeleteBatchUser}`,
        {
            data: {
                idList
            }
        }
    );
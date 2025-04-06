import request from "../../../utils/request.ts";
import type {User, UserResponseData} from "./type.ts";

enum API {
    AllUser = '/admin/acl/user/',
    AddUser = '/admin/acl/user/save',
    UpdateUser = '/admin/acl/user/update',
}

export const getUserList = (page: number, limit: number) =>
    request.get<any, UserResponseData>(
        `${API.AllUser}${page}/${limit}`
    );

export const addOrUpdateUser = (user: User) => {
    if (user.id) {
        return request.put<any, UserResponseData>(API.UpdateUser, user)
    } else {
        return request.post<any, UserResponseData>(API.AddUser, user)
    }
}
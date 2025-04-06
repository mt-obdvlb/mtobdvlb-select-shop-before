import request from "../../../utils/request.ts";
import type {UserResponseData} from "./type.ts";

enum API {
    AllUser = '/admin/acl/user/',
    UserInfo = '/admin/acl/user/getUserInfo',
    LOGOUT_URL = '/admin/acl/index/logout',
    USER_URL = '/admin/acl/user/',
    USER_ADD_URL = '/admin/acl/user/save',
    USER_UPDATE_URL = '/admin/acl/user/update',
    USER_DELETE_URL = '/admin/acl/user/remove',
    USER_LOCK_URL = '/admin/acl/user/lock',
}

export const getUserList = (page: number, limit: number) =>
    request.get<any, UserResponseData>(
        `${API.AllUser}${page}/${limit}`
    );
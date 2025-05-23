import request from "../../../utils/request.ts";
import type {PermissionResponseData} from "./type.ts";

enum API {
    AllPermission = '/admin/acl/permission'
}

export const reqAllPermission = () =>
    request.get<any, PermissionResponseData>(
        API.AllPermission
    );
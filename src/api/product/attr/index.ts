import request from "../../../utils/request.ts";
import type {CategoryResponseData, AttrResponseData, Attr} from "./type.ts";



enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2',
    C3_URL = '/admin/product/getCategory3',
    ATTR_URL = '/admin/product/attrInfoList',
    AddOrUpdateAttr = '/admin/product/saveAttrInfo',
    DelAttr = '/admin/product/deleteAttr'
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export const reqC2 = (c1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + `/${c1Id}`)
export const reqC3 = (c2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + `/${c2Id}`)

export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) =>
    request.get<any, AttrResponseData>(API.ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`)

export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.AddOrUpdateAttr, data)

export const reqDelAttr = (attrId: number) => request.delete<any, any>(API.DelAttr + `/${attrId}`)
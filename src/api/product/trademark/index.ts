import request from '@/utils/request.ts'
import type {TradeMark, TradeMarkResponseData} from "./type.ts";

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    AddTrademark = '/admin/product/baseTrademark/save',
    UpdateTrademark = '/admin/product/baseTrademark/update',
    DeleteTrademark = '/admin/product/baseTrademark/remove/'
}



export const reqHasTrademark = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        return request.put<any, TradeMarkResponseData>(API.UpdateTrademark, data)
    } else {
        return request.post<any, TradeMarkResponseData>(API.AddTrademark, data)
    }
}

export const reqDeleteTrademark = (id: number) =>
    request.delete<any, any>(API.DeleteTrademark + id)
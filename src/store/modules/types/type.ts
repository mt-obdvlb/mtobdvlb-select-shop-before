import type { RouteRecordRaw } from "vue-router";
import type {CategoryObj} from "../../../api/product/attr/type.ts";

export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string
}

export interface CategoryState {
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
  category1List: CategoryObj[],
  category2List: CategoryObj[],
  category3List: CategoryObj[]
}
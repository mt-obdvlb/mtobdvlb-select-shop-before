import {defineStore} from "pinia";
import {reqC1, reqC2, reqC3} from "../../api/product/attr";

const useCategoryStore = defineStore('category', {
    state: () => {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            category1List: [],
            category2List: [],
            category3List: []
        }
    },
    actions: {
        async getCategory1List() {
            const result = await reqC1()
            this.category1List = result.data
        },
        async getCategory2List(category1Id: string) {
            const result = await reqC2(category1Id)
            this.category2List = result.data
        },
        async getCategory3List(category2Id: string) {
            const result = await reqC3(category2Id)
            this.category3List = result.data
        }
    }
})

export default useCategoryStore
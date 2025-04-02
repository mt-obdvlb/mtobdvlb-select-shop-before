<template>
  <Category></Category>
  <el-card style="margin-top: 20px">
    <el-button icon="Plus" type="primary" :disabled="!categoryStore.category3Id">添加属性</el-button>
    <el-table border :data="attrList">
      <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
      <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
      <el-table-column label="属性值">
        <template #="{row,$index}">
          <el-tag v-for="(item,index) in row.attrValueList" :key="item.id" closable @close="attrList.splice($index,1)" style="margin: 10px">
            {{item.valueName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template #="{row}">
          <el-button icon="Edit" type="primary" @click="() => {
              console.log(row)
            }">
          </el-button>
          <el-button icon="Delete" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category.ts";
import {watch, ref} from "vue";
import {reqAttr} from "@/api/product/attr";
import type {AttrList, AttrResponseData} from "@/api/product/attr/type.ts";

let attrList = ref<AttrList>([])
const categoryStore = useCategoryStore();
watch(() => categoryStore.category3Id,async () => {
  if (categoryStore.category3Id) {
    const res: AttrResponseData = await reqAttr(categoryStore.category1Id, categoryStore.category2Id, categoryStore.category3Id)
    if(res.code === 200) {
      attrList.value = res.data
    }
  }else {
    attrList.value = []
  }
})


</script>

<style scoped lang="scss">

</style>
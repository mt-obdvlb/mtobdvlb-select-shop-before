<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.category1Id" @change="categoryStore.getCategory2List(categoryStore.category1Id)">
          <el-option v-for="item in categoryStore.category1List" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.category2Id" @change="categoryStore.getCategory3List(categoryStore.category2Id)">
          <el-option v-for="item in categoryStore.category2List" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.category3Id">
          <el-option v-for="item in categoryStore.category3List" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import useCategoryStore from '@/store/modules/category.ts'
const categoryStore = useCategoryStore()

onMounted(()=>{
  categoryStore.getCategory1List()
})

</script>

<style scoped>
.el-select {
  --el-select-width: 120px;
}
</style>
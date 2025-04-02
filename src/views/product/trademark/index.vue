<template>
  <el-card>
    <el-button type="primary" icon="Plus"
    >添加品牌</el-button>
    <el-table border
              :data="trademarkList"

    >
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName">
        <template #="{row, $index}">
          <pre>{{row.tmName}}</pre>
        </template>

      </el-table-column>
      <el-table-column label="品牌Logo">
        <template #="{row, $index}">
          <el-image :src="row.logoUrl"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="品牌仓库">
        <template #="{row, $index}">
          <el-button type="primary" icon="Edit"
          ></el-button>
          <el-button type="danger" icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3,6,9]"
        :total="total"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        @change="getHasTrademark"
    >

    </el-pagination>
  </el-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {reqHasTrademark} from "@/api/product/trademark";
import {onMounted} from "vue";
import type {Records, TradeMarkResponseData} from "@/api/product/trademark/type.ts";

let trademarkList = ref<Records>([]);
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
const getHasTrademark = async () => {
  const result: TradeMarkResponseData3 = await reqHasTrademark(pageNo.value, limit.value);
  if(result.code === 200) {
    total.value = result.data.total;
    trademarkList.value = result.data.records;
  } else {
    getHasTrademark()
  }
}


onMounted(  () => {
  getHasTrademark()
})

</script>

<style scoped>

</style>
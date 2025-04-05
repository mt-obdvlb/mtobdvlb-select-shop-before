<template>
  <Category :flag="flag"></Category>
  <el-card style="margin-top: 20px">
    <template v-if="flag">
      <el-button icon="Plus" type="primary" :disabled="!categoryStore.category3Id" @click="addAttr">添加属性</el-button>
      <el-table border :data="attrList">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值">
          <template #="{row,$index}">
            <el-tag v-for="(item,index) in row.attrValueList" :key="item.id" closable @close="attrList.splice($index,1)"
                    style="margin: 10px">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{row}">
            <el-button icon="Edit" type="primary" @click="updateAttr(row)" size="small">
            </el-button>
            <el-popconfirm title="你确定要删除吗" @confirm="deleteAttr(row.id)">
              <template #reference>
                <el-button size="small" icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="Plus" :disabled="attrParams.attrName?false:true" @click="addAttrValue">添加属性
      </el-button>
      <el-table border :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="属性值">
          <template #="{row,$index}">
            <el-input placeholder="请你输入属性值名称" v-model="row.valueName" v-show="row.flag"
                      @blur="$event => toLook(row, $index)" :ref="(vc:any) => inputArr[$index] = vc"></el-input>
            <div v-show="!row.flag" @click="$event => toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{row}">
            <el-button type="primary" icon="Edit">修改</el-button>
            <el-button type="danger" icon="Delete" @click="attrParams.attrValueList.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="flag = true">取消</el-button>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category.ts";
import {watch, ref, nextTick, onBeforeMount} from "vue";
import {reqAddOrUpdateAttr, reqAttr, reqDelAttr} from "@/api/product/attr";
import type {AttrList, AttrResponseData, Attr, AttrValue} from "@/api/product/attr/type.ts";
import {ElMessage} from "element-plus";


const inputArr = ref([])
let attrList = ref<AttrList>([])
const categoryStore = useCategoryStore();
const flag = ref<boolean>(true)
const attrParams = ref<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})

onBeforeMount(() => {
  categoryStore.$reset()
})

watch(() => categoryStore.category3Id, async () => {
  if (categoryStore.category3Id) {
    const res: AttrResponseData = await reqAttr(categoryStore.category1Id, categoryStore.category2Id, categoryStore.category3Id)
    if (res.code === 200) {
      attrList.value = res.data
    }
  } else {
    attrList.value = []
  }
})

const addAttr = () => {
  attrParams.value = {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
  }
  flag.value = false
  attrParams.value.categoryId = categoryStore.category3Id
}

const updateAttr = (row: Attr) => {
  flag.value = false
  Object.assign(attrParams.value, JSON.parse(JSON.stringify(row)))
}

const addAttrValue = () => {
  attrParams.value.attrValueList.push({
    valueName: '',
    flag: true
  })
  nextTick(() => {
    inputArr.value[attrParams.value.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  if (attrParams.value.attrValueList.length === 0) {
    ElMessage.error('属性值不能为空')
    return
  }
  const res = await reqAddOrUpdateAttr(attrParams.value)
  // console.log(attrParams.value)
  // console.log(res)
  if (res.code === 200) {
    flag.value = true
    ElMessage.success('添加成功')

  } else {
    ElMessage.error('添加失败')
  }
}

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    ElMessage.error('属性值不能为空')
    attrParams.value.attrValueList.splice($index, 1)
    return
  }
  if (attrParams.value.attrValueList.find(item => {
    if (item !== row) {
      return item.valueName === row.valueName

    }
  })) {
    ElMessage.error('属性值不能重复')
    return
  }
  row.flag = false
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()

  })
}

const deleteAttr = async (id: number) => {
  const res = await reqDelAttr(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')

  } else {
    ElMessage.error('删除失败')
  }
}

</script>

<style scoped lang="scss">

</style>
<template>
  <div>
    <el-card>
      <el-button type="primary" icon="Plus" @click="addTrademark"
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
            <el-button type="primary" icon="Edit" @click="updateTrademark"
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
    <el-dialog title="添加品牌" v-model="dialogVisible">
      <el-form
          style="width: 80%"
      >
        <el-form-item label="品牌名称"  label-width="80px" required>
          <el-input v-model="trademarkParams.tmName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="80px">
          <el-upload
              class="avatar-uploader"
              action="https://adminlearn.reiko.lol/prod_api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="true" src='https://mtobdvlb-web.oss-cn-beijing.aliyuncs.com/2.png' class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {reqAddOrUpdateTrademark, reqHasTrademark} from "@/api/product/trademark";
import {onMounted} from "vue";
import type {Records, TradeMark, TradeMarkResponseData} from "@/api/product/trademark/type.ts";
import {ElMessage} from "element-plus";

let dialogVisible = ref<boolean>(false);
let trademarkList = ref<Records>([]);
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let trademarkParams = ref<TradeMark>({
  logoUrl: 'https://mtobdvlb-web.oss-cn-beijing.aliyuncs.com/2.png'
})
const getHasTrademark = async () => {
  const result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
  if(result.code === 200) {
    total.value = result.data.total;
    trademarkList.value = result.data.records;

  } else {
    getHasTrademark()
  }
}

const addTrademark = () => {
  dialogVisible.value = true;
}

const updateTrademark = () => {
  dialogVisible.value = true;
}

const confirm = async () => {
  const res = await reqAddOrUpdateTrademark(trademarkParams.value)
  if(res.code === 200) {
    ElMessage.success('添加成功')
    getHasTrademark()
    trademarkParams.value.tmName = ''
  } else {
    ElMessage.error('添加失败')
  }
  dialogVisible.value = false;
}

const cancel = () => {
  dialogVisible.value = false;
}

onMounted(  () => {
  getHasTrademark()
})

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {

    ElMessage.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG &&isLt2M;
}

const handleAvatarSuccess = (res: any, file: any) => {
  trademarkParams.value.logoUrl = 'https://mtobdvlb-web.oss-cn-beijing.aliyuncs.com/2.png'

}

</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>
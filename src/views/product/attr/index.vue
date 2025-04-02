<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select>
          <el-option>1</el-option>
          <el-option>2</el-option>
          <el-option>3</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select>
          <el-option>1</el-option>
          <el-option>2</el-option>
          <el-option>3</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select>
          <el-option>1</el-option>
          <el-option>2</el-option>
          <el-option>3</el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
  <Category></Category>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">
.el-select {
  --el-select-width: 120px;
}
</style>
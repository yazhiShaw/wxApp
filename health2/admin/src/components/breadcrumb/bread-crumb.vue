<template>
  <div class="bread-crumb">
    <span class="back" @click="$router.back(-1)">
      <i class="el-icon-arrow-left"></i>返回
    </span>
    <Divider :vertical="true"></Divider>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) of breadListIm"
                          :to="item.path"
                          :key="index">
          {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import {Breadcrumb, BreadcrumbItem} from 'element-ui';
  import Divider from '../divider/index.vue';
  export default {
    props: {
      breadListIm: {
        type: Array,
        default: () => []
      },
    },
    components: { 'el-breadcrumb': Breadcrumb, 'el-breadcrumb-item': BreadcrumbItem, Divider }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/stylus/variable';
  .bread-crumb{
    display: flex;
    align-items: flex-start;
    background:#fff;
    font-size: 16px;
    .back{
      position: relative;
      color: @color-theme;
      cursor: pointer;
    }
    :global(.el-breadcrumb){
      font-size: 16px;
      :global(.is-link){
        font-weight: 400;
      }
    }
  }

</style>
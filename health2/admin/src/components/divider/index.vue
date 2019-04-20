<template>
  <div :class="vertical ? 'vertical' : 'divider'"></div>
</template>

<script>
  export default {
    props: {
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    created() {},
    methods: {},
    computed: {},
    components: {}
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/stylus/variable';
  .divider{
    display: block;
    height: 1px;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
    clear: both;
    box-sizing: border-box;
    border: 1px solid #f1f1f1;
  }
  .vertical{
    margin: 0 20px;
    display: inline-block;
    height: .9em;
    width: 1px;
    border: 1px solid #e8e8e8;
    vertical-align: middle;
    box-sizing: border-box;
  }
</style>

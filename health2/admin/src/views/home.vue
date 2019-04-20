<template>
  <el-container class="home-main">
    <el-header height="64px">
      <div class="logo">
        <i class="logo-icon"></i>
        佛系管理平台
      </div>
    </el-header>
    <el-container class="context">
      <el-aside width="230px">
        <el-menu default-active="1">
          <router-link to="/user">
            <el-menu-item index="1">
              <i class="icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/message">
            <el-menu-item index="2">
              <i class="icon-message"></i>
              <span slot="title">动态管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/act">
            <el-menu-item index="3">
              <i class="icon-act"></i>
              <span slot="title">活动管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Container, Header, Aside, Menu, Main, MenuItem } from "element-ui";
// import axios from "axios";

export default {
  data() {
    return {};
  },
  components: {
    "el-container": Container,
    "el-header": Header,
    "el-aside": Aside,
    "el-menu": Menu,
    "el-menu-item": MenuItem,
    "el-main": Main
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../common/stylus/variable";
@import "../common/stylus/mixin";

.home-main {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-header {
    width: 100%;
    box-shadow: 0px 1px 1px 0px rgba(241, 241, 241, 0.09);
    display: flex;
    justify-content: space-between;
    line-height: 64px;

    .logo {
      text-align: left;
      font-size: 20px;
      color: @color-text;
      margin-left: 40px;
      line-height: 64px;
      .logo-icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        display: inline-block;
        .bg-image("logo-icon");
        background-size: 100% 100%;
        vertical-align: text-top;
      }
    }

    .login-user {
      text-align: right;
      color: @color-font;
      font-size: 14px;
      margin-right: 30px;
      position: relative;
      > span {
        width: 27px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        background-color: @color-blue;
        color: #fff;
        margin-right: 10px;
      }
      > i {
        margin-left: 8px;
        cursor: pointer;
      }
      .login-out {
        position: absolute;
        bottom: -42px;
        right: -10px;
        width: 91px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: @color-blue;
        font-size: 14px;
        font-weight: 600;
        background-color: @color-weak-blue;
        box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.1);
        cursor: pointer;
      }
    }
  }

  .context {
    flex: 1;
    display: flex;

    .el-aside {
      min-width: 230px;
      margin-top: 25px;
    }

    .el-menu {
      border-right: none;
      i {
        width: 18px;
        height: 18px;
        display: inline-block;
        background-size: 100% 100%;
        margin-right: 10px;
      }
      > a {
        .el-menu-item {
          color: @color-text;
          .icon-user {
            .bg-image("icon-application");
          }
          .icon-message {
            .bg-image("icon-organize");
          }
          .icon-act {
            .bg-image("icon-organize");
          }
          &:hover {
            background-color: @color-weak-blue;
          }
          &.is-active {
            background-color: #fff;
          }
        }
        .el-menu-item {
          background-color: #fff;
          &:hover {
            background-color: @color-weak-blue;
          }
        }
        &.router-link-active {
          .el-menu-item {
            color: #fff;
            background-color: @color-blue;
            .icon-application {
              .bg-image("icon-application-light");
            }
            .icon-organize {
              .bg-image("icon-organize-light");
            }
          }
        }
      }
    }

    .el-main {
      flex: 1;
      background-color: @color-background;
      padding: 25px 25px 0 25px;
    }
  }
}
</style>

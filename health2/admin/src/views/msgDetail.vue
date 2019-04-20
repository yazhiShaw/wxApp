<template>
  <div class="application-detail applicate-wrapper">
    <div class="bread-crumb">
      <Breadcrumb :breadListIm="breadListIm"/>
    </div>
    <div class="app-info">
      <div class="user-box">
        <div class="content user-wrapper">
          <img
            v-if="detailData.avatarUrl"
            :src="detailData.avatarUrl"
            width="100%"
            height="100%"
            class="avatar"
          >
          <div class="user-img">
            <span>{{detailData.nickName}}</span>
            <span>{{detailData.createTime}}</span>
          </div>
        </div>
        <div class="tag" v-if="detailData.navId!=0">
          <el-tag :hit="true" size="mini">{{nav[detailData.navId]}}</el-tag>
        </div>
      </div>
      <div class="text textLineHeight">{{detailData.content}}</div>
      <div class="block" align="left" v-if="detailData.picUrl.length">
        <el-carousel height="300px" :autoplay="false" indicator-position="none">
          <el-carousel-item v-for="item in detailData.picUrl" :key="item">
            <img :src="baseUrl + item" alt width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "element-ui";
import { loading } from "../common/js/dom";
import Breadcrumb from "../components/breadcrumb/bread-crumb";
import { getMsgDetail } from "../api/index.js";
export default {
  data() {
    return {
      detailData: {},
      baseUrl: "http://localhost:8082/file/images/",
      picUrl: "",
      // 不要改动这个列表顺序
      selectList: ["未审核", "审核通过", "审核不通过"],
      nav: ["无", "佛系健康", "佛系美容","佛系美食","佛系茶道"],
      breadListIm: [
        {
          path: "/message",
          name: "动态列表"
        },
        {
          path: "",
          name: "动态详情"
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.getDetail();
    });
  },
  methods: {
    getDetail() {
      let messageId = this.$route.params.id;
      this.loadingInstance = loading({ target: ".box-wrapper" });
      getMsgDetail({
        messageId
      }).then(res => {
        if (+res.code === 200) {
          this.detailData = res.data;
          this.picUrl = res.data.picUrl;
          this.loadingInstance.close();
        }
      });
    }
  },
  components: {
    "el-button": Button,
    Breadcrumb
  }
};
</script>
<style>
.el-carousel {
  width: 500px;
  flex-shrink: 0;
  margin-right: 18px;
  margin-bottom: 18px;
}
</style>

<style scoped lang="less" rel="stylesheet/less">
@import "../common/stylus/mixin";
@import "../common/stylus/variable";
.applicate-wrapper {
  background: #fff;
  min-height: 100%;
  padding: 24px 32px;
}
.application-detail {
  min-width: 655px;
  .redStar {
    color: @color-red;
  }

  .app-info {
    width: 695px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-size: 16px;
      color: @color-font-weight;
      font-weight: normal;
      text-align: left;
      margin-left: 50px;
      margin-bottom: 30px;
      margin-top: 30px;
    }
    .user-wrapper {
      display: flex;
      margin-top: 30px;
      align-items: center;
      margin-bottom: 10px;
    }

    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }
    .info-detail {
      display: flex;
      .info-content {
        flex: 1;
        > li {
          display: flex;
          margin-bottom: 20px;
          font-size: 14px;
          align-items: center;
          .lable {
            width: 150px;
            text-align: right;
            padding-right: 5px;
            margin-right: 10px;
            color: @color-font;
          }
          .content {
            flex: 1;
            margin-right: 50px;
            text-align: left;
            color: @color-font-weight;
            word-break: break-all;
            li {
              display: flex;
              line-height: 20px;
              &:first-child {
                margin-bottom: 20px;
              }
              .address-lable {
                width: 130px;
                text-align: right;
                position: relative;
                .icon {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  background-size: cover;
                  position: absolute;
                  top: 2px;
                  left: -5px;
                }
                .icon-web {
                  .bg-image("ic_web");
                }
                .icon-mobi {
                  .bg-image("ic_iphone");
                }
              }
              .address-content {
                flex: 1;
                word-break: break-all;
                color: @color-blue;
              }
            }
          }
        }
      }
      .logo {
        width: 164px;
        margin: 0 10px;
        .upload {
          width: 140px;
          height: 140px;
          overflow: hidden;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          > i {
            font-size: 38px;
            font-weight: bold;
            color: @color-blue;
          }
        }
        > span {
          font-size: 14px;
          margin-top: 10px;
          text-align: left;
          display: block;
          .tip-context {
            margin-left: 10px;
            &:before {
              content: "?";
              float: left;
              width: 13px;
              height: 13px;
              font-size: 12px;
              border-radius: 50%;
              border: 1px solid @color-blue;
              color: @color-blue;
              line-height: 15px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
.comfire {
  display: flex;
  justify-content: flex-end;
}
.block {
  display: flex;
}
.user-img {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  align-items: flex-start;
  > span:first-child {
    margin-bottom: 5px;
    font-weight: 700;
  }
}
.tag {
  margin-bottom: 10px;
}
.user-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
}
.text {
  text-align: left;
  margin-bottom: 20px;
  align-self: flex-start;
}
.textLineHeight {
  line-height:1.5rem;
}
</style>

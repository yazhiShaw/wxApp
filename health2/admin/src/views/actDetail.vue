<template>
  <div class="application-detail applicate-wrapper">
    <div class="bread-crumb">
      <Breadcrumb :breadListIm="breadListIm"/>
    </div>
    <div class="app-info">
      <h3>活动信息</h3>
      <div class="info-detail">
        <ul class="info-content">
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              发起人昵称和头像：
            </div>
            <div class="content user-wrapper">
              <img
                v-if="detailData.avatarUrl"
                :src="detailData.avatarUrl"
                width="100%"
                height="100%"
                class="avatar"
              >{{detailData.nickName}}
            </div>
            
          </li>
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              活动主题：
            </div>
            <div class="content">
              {{detailData.actTitle}}
            </div>
          </li>
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              活动描述：
            </div>
            <div class="content actDes">
              {{detailData.actContent}}
            </div>
          </li>
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              发起人真实姓名：
            </div>
            <div class="content">
              {{detailData.name}}
            </div>
          </li>
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              联系方式：
            </div>
            <div class="content">
              {{detailData.tel}}
            </div>
          </li>
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              活动开始时间：
            </div>
            <div class="content">
              {{detailData.actTime}}
            </div>
          </li>
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              活动地点：
            </div>
            <div class="content">
              {{detailData.actPlace}}
            </div>
          </li>
          <li>
            <div class="lable">
              <span class="redStar">*</span>
              身份证号：
            </div>
            <div class="content">
              {{detailData.Idcard}}
            </div>
          </li>
        </ul>
        <div class="logo">
          <div class="upload">
            <img
              :src="actPic"
              width="100%"
              height="100%"
            >
          </div>
        </div>
      </div>
      <div class="comfire" v-if="detailData.checkFlag == 0">
        <el-button type="primary" plain @click="changeActStatus(1)">审核通过</el-button>
        <el-button type="danger" plain @click="changeActStatus(2)">拒绝审核</el-button>
      </div>
      <div class="comfire" v-else>
        <el-button type="info" disabled> {{selectList[detailData.checkFlag]}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button
} from 'element-ui';
import Breadcrumb from '../components/breadcrumb/bread-crumb';
import { loading } from "../common/js/dom";
import { getActDetail, actStatus } from "../api/index.js";
export default {
  data() {
    return {
      detailData: {},
      baseUrl: 'http://localhost:8082/file/images/',
      actPic: '',
      // 不要改动这个列表顺序
      selectList: ['未审核','审核通过','审核不通过'],
      breadListIm: [{
        path: '/act',
        name: '活动列表',
      }, {
        path: '',
        name: '活动详情',
      }]
    };
  },
  created() {
    this.$nextTick(() => {
      this.getDetail();
    });
  },
  methods: {
    getDetail() {
      let actId = this.$route.params.id
      this.loadingInstance = loading({ target: ".box-wrapper" });
      getActDetail({
        actId
      }).then(res => {
        if (+res.code === 200) {
          this.detailData = res.data;
          this.actPic = this.baseUrl + res.data.actPic[0];
          this.loadingInstance.close();
        }
      });
    },
    changeActStatus(checkFlag = 0) {
      let actId = this.$route.params.id
      actStatus({
        actId,
        checkFlag
      }).then(res => {
        if (+res.code === 200) {
          this.getDetail();
          // this.detailData = res.data;
          // this.actPic = this.baseUrl + res.data.actPic[0];
        }
      });
    },
  },
  components: {
    'el-button': Button,
    Breadcrumb
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../common/stylus/mixin";
@import "../common/stylus/variable";
.applicate-wrapper {
  background: #fff;
  min-height: 100%;
  padding: 24px 32px;
}
.actDes {
  line-height: 1.5rem;
}
.application-detail {
  min-width: 655px;
  .redStar {
    color: @color-red;
  }
  
  .app-info {
    width: 695px;
    margin: 0 auto;
    h3 {
      font-size: 16px;
      color: @color-font-weight;
      font-weight: normal;
      text-align: left;
      margin-left: 50px;
      margin-bottom: 30px;
      margin-top: 30px;
    }
    .user-wrapper{
      display: flex;
      align-items: center;
    }
    .avatar{
      width:30px;
      height:30px;
      margin-right:20px;
      border-radius:50%;
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
                .icon{
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  background-size: cover;
                  position: absolute;
                  top: 2px;
                  left: -5px;
                }
                .icon-web{
                  .bg-image("ic_web");
                }
                .icon-mobi{
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
.comfire{
    display: flex;
    justify-content: flex-end;
  }
</style>

<template>
  <div class="login-wrapper">
      <div class="manage_tip">
        <p>佛系养生后台管理系统</p>
      </div>
    <div class="login-box">
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style=""
            @click="submitForm('loginForm')"
            class="submit_btn"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/index.js";
import axios from "axios";
import { loading } from "../common/js/dom";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let data = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          this.loadingInstance = loading({ target: ".login-wrapper" });
          login({
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
             if (+res.code == 200) {
               sessionStorage.setItem('token', res.token)
               this.$message.success(res.message);
               this.$router.push("/user");
             } else if (+res.code == 401) {
               this.$message.error(res.message);
             }else if (+res.code == -200) {
               this.$message.error(res.message);
             }
             this.loadingInstance.close();
            // this.$router.push("/user");
          });
        }
      });
    }
  },
  mounted() {
    this.showLogin = true;
  }
};
</script>

<style lang="less" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.12) url('../assets/bg.jpg') no-repeat fixed center;
  background-size: 100%;
  z-index: 99;
}
.login-box{
    background: rgba(255, 255, 255, 0.82);
    padding: 12px 16px;
    border-radius: 10px;
}
.manage_tip {
    margin-bottom: 25px;
  p {
    font-size: 32px;
    color: #fff;
  }
}
.submit_btn {
  width: 100%;
  font-size: 16px;
}
</style>

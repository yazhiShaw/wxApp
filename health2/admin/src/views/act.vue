<template>
  <main class="box-wrapper">
    <div>
      <div class="box-top">
        <div class="input-search">
          <el-input
            placeholder="请输入活动主题"
            v-model="actTitle"
            @focus="focusSearch"
            @blur="blurSearch"
            class="input-with-search"
            :class="{'search-active': isActive}"
            size="small"
          >
            <el-button slot="append" icon="el-icon-search" @click="getList(1)"></el-button>
          </el-input>
        </div>
        <div class="input-select">
          <div class="marginSelect">
            筛选：
            <el-select v-model="checkFlag" size="small" class="select-width" placeholder="全部">
              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="box-content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="头像">
            <template slot-scope="scope">
              <img
                v-if="scope.row.avatarUrl"
                :src="scope.row.avatarUrl"
                width="30"
                height="30"
                style="cursor: pointer"
              >
              <img v-else :src="defaultAvatarUrl" width="30" height="30" style="cursor: pointer">
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="用户昵称">
            <template slot-scope="scope">
              <p style="cursor: pointer">{{scope.row.nickName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="真实姓名">
            <template slot-scope="scope">
              <p style="cursor: pointer">{{scope.row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="actTitle" label="活动主题" min-width="100">
            <template slot-scope="scope">
              <p style="cursor: pointer">{{scope.row.actTitle}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Idcard" label="审核状态" min-width="120">
            <template slot-scope="scope">
              <p style="cursor: pointer">{{selectList[scope.row.checkFlag].label}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="opt" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button style="height: 18px;width: 18px;padding: 0 0;border: none;">
                <i class="el-icon-document" @click="detail(scope.row)"></i>
              </el-button>
              <el-button style="height: 18px;width: 18px;padding: 0 0;border: none;">
                <i class="el-icon-delete" @click="del(scope.$index,scope.row)"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="box-page">
          <el-pagination
            layout="prev, pager, next"
            background
            class="pagination"
            ref="pagination"
            :current-page="Pagination.curpage"
            :total="Pagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { loading } from "../common/js/dom";
import { actList, delAct } from "../api/index.js";
export default {
  data() {
    return {
      actTitle: "",
      Pagination: {
        curpage: 1,
        pagesize: 10,
        total: 1,
        isNext: false
      },
      tableData: [],
      isActive: false,
      checkFlag: -1,
      // 不要改动这个列表顺序
      selectList: [
        {
          value: 0,
          label: "未审核"
        },
        {
          value: 1,
          label: "审核通过"
        },
        {
          value: 2,
          label: "审核不通过"
        },
        {
          value: -1,
          label: "全部"
        }
      ]
    };
  },
  created() {
    // 请求应用列表数据
    this.$nextTick(() => {
      this.getList(1);
    });
  },
  methods: {
    // 请求用户列表
    getList(curpage) {
      this.loadingInstance = loading({ target: ".box-wrapper" });
      actList({
        curpage: curpage || this.Pagination.curpage,
        pagesize: 10,
        actTitle: this.actTitle,
        checkFlag: this.checkFlag
      }).then(res => {
        console.log(res);
        if (+res.code === 200) {
          this.tableData = res.data.list;
          this.Pagination.curpage = res.data.curpage;
          this.Pagination.hasNext = res.data.hasNext;
          this.Pagination.total = res.data.total;
          this.loadingInstance.close();
        }
      });
    },
    detail(row) {
      console.log(row);
      let actId = row._id;
      this.$router.push("/act/actDetail/" + actId);
    },
    // 搜索框聚焦
    focusSearch() {
      this.isActive = true;
    },
    blurSearch() {
      this.isActive = false;
    },
    deleteAct(user) {
      delAct({
        _id: user._id
      }).then(res => {
        console.log(res);
        if (+res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getList();
        }
      });
    },
    // 编辑
    del(index, row) {
      this.$confirm("确定删除选择的活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteAct(row);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下一页
    nextClick(page) {
      this.getList(page);
    },
    prevClick(page) {
      this.getList(page);
    }
  },
  watch: {
    checkFlag(newValue) {
      console.log(newValue);
      this.getList();
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../common/stylus/mixin";
@import "../common/stylus/variable";
.box-wrapper {
  background: #fff;
  min-height: 100%;
  padding: 24px 32px;
  .box-top {
    display: flex;
    height: 56px;
    border-bottom: solid 1px #f1f1f1;
    .input-search {
      height: 32px;
      margin-right: 30px;
    }
    .select-width {
      width: 120px;
    }
    .input-select {
      display: flex;
      align-items: center;
      height: 32px;
      margin-right: 30px;
      > span {
        margin-right: 8px;
      }
      :global(.el-input__inner) {
        height: 32px;
      }
    }
    .input-with-search {
      width: 240px;
      :global(.el-input-group__append) {
        background-color: #dadada;
        border: 1px solid #dadada;
        color: #fff;
        .el-button {
          width: 54px;
        }
        :global(.el-button.is-disabled:hover) {
          background-color: #dadada;
          color: #fff;
          border: 1px solid #dadada;
          padding: 0 20px;
        }
      }
    }
    .search-active {
      :global(.el-input-group__append) {
        background-color: @color-theme;
        border: 1px solid @color-theme;
      }
    }
  }
  .box-content {
    padding: 20px 0;
    :global(.el-table th) {
      background: #fafafa;
      padding: 12px 0 12px 20px;
      color: #282828;
      :global(.cell) {
        border-left: solid 1px rgba(241, 241, 241, 1);
      }
    }
    :global(.el-table__body td) {
      height: 54px;
      padding: 0 0 0 20px;
    }
    img,
    button {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .el-icon-logo {
    display: inline-block;
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
    .bg-image("logo-icon");
  }
  .el-icon-myedit {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-size: 100% 100%;
    .bg-image("icon_editor");
  }
  .box-page {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    :global(.el-pagination button) {
      min-width: 28px;
      height: 28px;
      padding: 0 0;
      margin-right: 15px;
      border-radius: 3px;
      background: #fff;
    }
    :global(.el-pagination button:not(:disabled)) {
      color: @color-theme;
      border: solid 1px @color-theme;
    }
    :global(.el-pagination button:disabled) {
      color: #dadada;
      border: solid 1px #dadada;
    }
  }
}
</style>

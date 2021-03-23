<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="input" placeholder="请输入账号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="shangHu" placeholder="请输入商户名称"></el-input>
      </el-col>
      <el-col :span="7">
        <el-button type="primary" @click="query">查找</el-button>
        <el-button type="primary" @click="new_edit">新增</el-button>
        <el-button type="primary">导入</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table v-loading="listLoading" :data="list" border style="width: 100%;" height="450">
      <el-table-column width="50" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index+(listQuery.page - 1) * listQuery.pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="telphone" label="账号" />
      <el-table-column prop="user_name" label="真实姓名" />
      <el-table-column prop="shop_name" label="所属商户" />
      <el-table-column prop="sorts" label="照片" />
      <el-table-column prop="use_status" label="禁用/启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.use_status1" @change="kaiGuan(scope)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <!-- 新增and编辑 -->
    <div class="new_edit">
      <el-dialog
        :title="title?'编辑':'新增'"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="35%"
      >
        <el-form ref="form" :model="form" label-width="80px" style="padding-right:19px;">
          <el-form-item label="账号">
            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="所属商户">
            <el-select v-model="form.value" placeholder="请选择所属商户" @change="yeTai">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {
  newAddManage, //新增商户账号
  updateManage, //编辑商户账号
  getListManage, //获取商户账号list
  removeManage, //删除商户账号
  passIfManage, //启用/禁用
  getList //获取商户list
} from '@/api/iguard/lockageCheck'
export default {
  name: 'shangHuAccount',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      total: 0,
      title: false, //false=新增，true=编辑
      input: '', //筛选商铺名
      name: '', //删选用户姓名
      shangHu: '', //删选商户
      newType: '', //新增业态类型
      textarea: '', //新增描述
      input2: '', //业态筛选
      dialogVisible: false,
      form: {
        account: '', //账号
        name: '', //真实名自
        shangHu: '', //商户名字
        imageUrl: '',
        value: '',
        options: []
      },
      list: [], //商户账号list
      listQuery: {
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      },
      listQuery1: {
        // 业态list
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      }
    }
  },
  created() {
    this.getList()
    this.listShangHu()
  },
  methods: {
    // 业态list
    async listShangHu() {
      try {
        const res = await getList(this.listQuery1)
        console.log(res)
        res.data.forEach(item => {
          this.form.options.push(item)
          this.$set(item, 'label', item.shop_name)
          this.$set(item, 'value', item.id)
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 获取商户账号list
    async getList() {
      try {
        const res = await getListManage(this.listQuery)
        console.log(res)
        if (res.code == 200) {
          this.listLoading = false
          this.list = res.data
          this.total = res.count
          this.list.forEach(item => {
            if (item.use_status == 0) {
              this.$set(item, 'use_status1', true)
            } else if (item.use_status == 1) {
              this.$set(item, 'use_status1', false)
            }
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 新增商户账号
    async newAdd(obj) {
      try {
        const res = await newAddManage(obj)
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          history.go(0)
          this.dialogVisible = false
          this.listLoading = true
          delete this.listQuery.shop_id
          delete this.listQuery.user_name
          delete this.listQuery.telphone
          this.getList(this.listQuery)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑商户账号
    async updata(obj) {
      try {
        const res = await updateManage(obj)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          history.go(0)
          this.dialogVisible = false
          this.listLoading = true
          delete this.listQuery.shop_id
          delete this.listQuery.user_name
          delete this.listQuery.telphone
          delete this.listQuery.id
          this.getList(this.listQuery)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除商户账号
    async remove(obj) {
      try {
        const res = await removeManage(obj)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.dialogVisible = false
          this.listLoading = true
          delete this.listQuery.shop_id
          delete this.listQuery.user_name
          delete this.listQuery.telphone
          delete this.listQuery.id
          this.getList(this.listQuery)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async jinYong(obj) {
      try {
        const res = await passIfManage(obj)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.listLoading = true
          this.getList(this.listQuery)
        }
      } catch (err) {
        console.log(err)
      }
    },
    handleEdit(scope) {
      let obj = scope.row
      this.title = true
      this.dialogVisible = true
      this.form.account = obj.telphone
      this.listQuery.telphone = obj.telphone
      //
      this.form.name = obj.user_name
      this.listQuery.user_name = obj.user_name
      //
      this.form.value = obj.shop_id
      this.listQuery.shop_id = obj.shop_id
      this.listQuery.id = obj.id
    },
    handleDelete(scope) {
      this.listQuery.id = scope.row.id
      this.remove(this.listQuery)
    },
    yeTai(val) {
      this.listQuery.shop_id = val
    },
    // 新增and编辑
    new_edit() {
      this.dialogVisible = true
      this.title = false
    },
    addType() {
      console.log('asd')
      this.dialogVisible1 = true
    },
    // 上传图签
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
      console.log(file)
      console.log('file')
    },
    handleClose(done) {
      this.$confirm('确认关闭？关闭后将刷新页面。')
        .then(_ => {
          window.location.reload()
          done()
        })
        .catch(_ => {})
    },
    onSubmit() {
      this.listQuery.telphone = this.form.account
      this.listQuery.user_name = this.form.name

      if (this.title) {
        // 编辑
        this.updata(this.listQuery)
      } else {
        // 新增
        if (this.form.account == '') {
          this.$message('请填写商户账号')
        } else if (this.form.name == '') {
          this.$message('请填写真实姓名')
        } else if (this.form.value == '') {
          this.$message('请选择所属商户')
        } else {
          console.log('可以提交了')
          this.newAdd(this.listQuery)
        }
      }
      console.log('submit!')
    },
    kaiGuan(scope) {
      let obj = {
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        id: scope.row.id,
        use_status: scope.row.use_status1 ? '0' : '1'
      }
      this.jinYong(obj)
      console.log(obj)
    },
    // 查找
    query() {
      if (this.shangHu != '') {
        this.listQuery.shop_name = this.shangHu
      } else if (this.input != '') {
        this.listQuery.telphone = this.input
      } else if (this.name != '') {
        this.listQuery.user_name = this.name
      }
      this.getList()
    }
  }
}
</script>
<style lang='less'  scoped>
.app-container {
  .el-select {
    width: 100%;
  }
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

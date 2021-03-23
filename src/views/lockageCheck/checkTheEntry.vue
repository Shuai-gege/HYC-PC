<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <span>检查项类型：</span>
        <el-select v-model="value" placeholder="请选择" @change="check_type">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span>检查项描述：</span>
        <el-input v-model="message" placeholder="请选择" style="width:200px" />
      </el-col>
      <el-col :span="7">
        <el-button type="primary" @click="query">查找</el-button>
        <el-button type="primary" @click="newAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 表格展示 -->
    <el-table v-loading="listLoading" :data="list" border style="width: 100%;" height="450">
      <el-table-column width="50" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index+(listQuery.page - 1) * listQuery.pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="check_type" label="检查项类型" :formatter="checkType" />
      <el-table-column prop="check_item_description" label="检查项描述" />
      <el-table-column prop="input_tip" label="输入提示" :formatter="tip" />
      <el-table-column prop="checkItemDetailBeanList" label="正确值判断" :formatter="judeg" />
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
      <el-dialog :title="title?'编辑':'新增'" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="检查类型">
            <el-select
              v-model="form.checkType"
              placeholder="请选择检查类型"
              @change="typeCheck"
              style="width:30%"
            >
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查项描述">
            <el-input
              v-model="form.message"
              type="text"
              placeholder="请输入检查项描述"
              maxlength="12"
              show-word-limit
              style="width:30%"
            ></el-input>
          </el-form-item>
          <el-form-item label="输入提示" v-if="flag2">
            <el-input
              v-model="form.hint"
              type="text"
              placeholder="请输入提示"
              maxlength="12"
              show-word-limit
              style="width:30%"
            ></el-input>
          </el-form-item>
          <div v-if="flag1">
            <el-form-item label="正常值范围" v-if="!flag">
              <el-checkbox v-model="form.checked1">
                ≥
                <el-input v-model="form.input" placeholder="请输入内容"></el-input>
              </el-checkbox>
              <el-checkbox v-model="form.checked2">
                ≤
                <el-input v-model="form.input1" placeholder="请输入内容"></el-input>
              </el-checkbox>
            </el-form-item>
          </div>
          <el-form-item v-if="!flag">
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 自定义添加 -->
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
          v-if="flag"
        >
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="''+(index+1)"
            :key="domain.key"
            :prop="'domains.' + index + '.detail_value'"
            :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
          >
            <el-input v-model="domain.detail_value" style="width:30%"></el-input>
            <el-checkbox v-model="domain.checked">设为正常值</el-checkbox>
            <el-button type="text">
              <i class="el-icon-delete" @click.prevent="removeDomain(domain)"></i>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm1('dynamicValidateForm')">确定</el-button>
            <el-button @click="addDomain">新增</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  addCheckItem, //新增检查项
  updateCheckItem, //编辑检查项
  listCheckItem, //获取检查项list
  removeCheckItem //删除检查项
} from '@/api/iguard/lockageCheck'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    return {
      message: '',
      listLoading: true,
      list: [],
      total: 0,
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '数值类'
        },
        {
          value: '1',
          label: '选项类'
        },
        {
          value: '2',
          label: '文本类'
        },
        {
          value: '3',
          label: '正常/异常类'
        }
      ],
      value: '',
      flag: false, //根据检车类型显示隐藏内容
      flag1: true, //根据检车类型显示隐藏内容
      flag2: true, //根据检车类型显示隐藏内容
      title: false,
      dialogVisible: false,
      form: {
        checkType: '0',
        options: [
          {
            value: '0',
            label: '数值类'
          },
          {
            value: '1',
            label: '选项类'
          },
          {
            value: '2',
            label: '文本类'
          },
          {
            value: '3',
            label: '正常/异常类'
          }
        ],
        message: '',
        hint: '',
        checked1: false,
        checked2: false,
        input: '',
        input1: ''
      },
      dynamicValidateForm: {
        domains: [{ detail_value: '', checked: false }]
      },
      listQuery: {
        // 调用list参数
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      },
      listQuery1: {
        // 增删改参数
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1,
        checkItemDetailBeanList: []
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    newAdd() {
      this.dialogVisible = !this.dialogVisible
      this.form = {
        checkType: '0',
        options: [
          {
            value: '0',
            label: '数值类'
          },
          {
            value: '1',
            label: '选项类'
          },
          {
            value: '2',
            label: '文本类'
          },
          {
            value: '3',
            label: '正常/异常类'
          }
        ],
        message: '',
        hint: '',
        checked1: false,
        checked2: false,
        input: '',
        input1: ''
      }
      this.dynamicValidateForm = {
        domains: [{ detail_value: '', checked: false }]
      }
    },
    // 获取list
    async getList() {
      try {
        const res = await listCheckItem(this.listQuery)
        console.log(res)
        this.listLoading = false
        this.list = res.data
        this.total = res.count
      } catch (err) {
        console.log(err)
      }
    },
    // 新增检查项
    async addCheck(obj) {
      try {
        const res = await addCheckItem(obj)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          history.go(0)
          this.dialogVisible = false
          this.listLoading = true
          this.getList()
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑检查项
    async updateCheck(obj) {
      try {
        const res = await updateCheckItem(obj)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          history.go(0)
          this.dialogVisible = false
          this.listLoading = true
          this.getList()
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除检查项
    async removeCheck(obj) {
      try {
        const res = await removeCheckItem(obj)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.listLoading = true
          this.getList()
        }
      } catch (err) {
        console.log(err)
      }
    },
    check_type(val) {
      console.log(val)
      this.listQuery.check_type = val
    },
    handleDelete(scope) {
      this.removeCheck({
        id: scope.row.id,
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId')
      })
    },
    checkType(scope) {
      if (scope.check_type == 0) {
        return '数值类'
      } else if (scope.check_type == 1) {
        return '选项类'
      } else if (scope.check_type == 2) {
        return '文本类'
      } else if (scope.check_type == 3) {
        return '正常/异常类'
      }
    },
    // 新增选择类型
    typeCheck(val) {
      this.listQuery1.check_type = val
      this.flag1 = true
      if (val == 0) {
        this.flag1 = true
        this.flag = false
      } else if (val == 1) {
        this.flag = true
        this.flag2 = false
      } else if (val == 2) {
        this.flag = false
        this.flag1 = false
        this.flag2 = true
        this.listQuery1.checkItemDetailBeanList.push({
          check_item_id: null,
          company_id: null,
          create_time: null,
          del_status: null,
          detail_value: null,
          font_value: null,
          id: null,
          limit: null,
          max_value: null,
          min_value: null,
          normal_item: null,
          page: null,
          pageSize: null,
          records: null,
          rows: null,
          startData: null,
          total: null,
          uid: null
        })
      } else if (val == 3) {
        this.flag1 = false
        this.flag2 = false
        this.listQuery1.checkItemDetailBeanList.push({
          check_item_id: null,
          company_id: null,
          create_time: null,
          del_status: null,
          detail_value: null,
          font_value: null,
          id: null,
          limit: null,
          max_value: null,
          min_value: null,
          normal_item: null,
          page: null,
          pageSize: null,
          records: null,
          rows: null,
          startData: null,
          total: null,
          uid: null
        })
      }
    },
    // 编辑按钮
    handleEdit(scope) {
      this.dialogVisible = true
      this.title = true
      let obj = scope.row
      this.form.checkType = JSON.stringify(obj.check_type)
      this.form.message = obj.check_item_description
      this.form.hint = obj.input_tip
      this.listQuery1.id = obj.id
      if (obj.check_type == 0) {
        // 树脂类
        this.flag1 = true
        this.flag = false
        obj.checkItemDetailBeanList.forEach(item => {
          if (item.normal_item == 0) {
            this.form.checked1 = true
            this.form.checked2 = true
          } else if (item.normal_item == 1) {
            this.form.checked1 = false
            this.form.checked2 = false
          } else if (item.normal_item == 2) {
            this.form.checked2 = false
            this.form.checked1 = true
          } else if (item.normal_item == 3) {
            this.form.checked1 = false
            this.form.checked2 = true
          }
          this.form.input = item.min_value
          this.form.input1 = item.max_value
        })
      } else if (obj.check_type == 1) {
        // 先清在加
        this.dynamicValidateForm.domains = []
        // 选项类
        obj.checkItemDetailBeanList.forEach(item => {
          if (item.normal_item == 0) {
            this.form.checked1 = true
            this.form.checked2 = true
            this.dynamicValidateForm.domains.push({
              detail_value: item.detail_value,
              checked: true
            })
          } else if (item.normal_item == 1) {
            this.form.checked1 = false
            this.form.checked2 = false
            this.dynamicValidateForm.domains.push({
              detail_value: item.detail_value,
              checked: false
            })
          } else if (item.normal_item == 2) {
            this.form.checked1 = true
          } else if (item.normal_item == 3) {
            this.form.checked2 = true
          }
          this.form.input = item.min_value
          this.form.input1 = item.max_value
        })
        this.flag = true
      } else if (obj.check_type == 2) {
        this.flag = false
        this.flag1 = false
      } else if (obj.check_type == 3) {
        this.flag1 = false
      }
    },
    judeg(scope) {
      let obj = scope.checkItemDetailBeanList
      let obj1 = scope.checkItemDetailBeanList
      if (obj.length == 1 && obj[0].normal_item != null) {
        if (obj[0].max_value == '' && obj[0].min_value != '') {
          return `≤${obj[0].min_value}`
        } else if (obj[0].max_value != '' && obj[0].min_value == '') {
          return `≥${obj[0].min_value}`
        } else if (obj[0].max_value != '' && obj[0].min_value != '') {
          return `≤${obj[0].max_value}，≥${obj[0].min_value}`
        }
      } else if (obj1.length > 1) {
        let name = []
        obj1.forEach(item => {
          if (item.normal_item == 0) {
            name.push(item.detail_value)
            console.log(item)
            console.log('scope')
          }
        })
        return name.join(',')
      } else if (obj[0].normal_item == null) {
        return '-'
      }
    },
    tip(scope) {
      if (scope.input_tip == null) {
        return '-'
      } else {
        return scope.input_tip
      }
    },
    // 自定义新增
    addDomain() {
      this.dynamicValidateForm.domains.push({
        detail_value: '',
        checked: false
      })
    },
    // 删除自定义
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    // 数值类体检按钮方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listQuery1.check_item_description = this.form.message
          this.listQuery1.input_tip = this.form.hint
          this.listQuery1.check_type = this.form.checkType
          if (this.form.checked1 == true && this.form.checked2 == false) {
            this.listQuery1.checkItemDetailBeanList = [
              {
                max_value: this.form.input1,
                min_value: this.form.input,
                normal_item: '2'
              }
            ]
          } else if (this.form.checked1 == true && this.form.checked2 == true) {
            this.listQuery1.checkItemDetailBeanList = [
              {
                max_value: this.form.input1,
                min_value: this.form.input,
                normal_item: '0'
              }
            ]
          } else if (
            this.form.checked1 == false &&
            this.form.checked2 == true
          ) {
            this.listQuery1.checkItemDetailBeanList = [
              {
                max_value: this.form.input1,
                min_value: this.form.input,
                normal_item: '3'
              }
            ]
          }
          if (this.title) {
            console.log('我是？')
            // 编辑
            this.updateCheck(this.listQuery1)
          } else {
            console.log('我是？111')
            // 新增
            this.addCheck(this.listQuery1)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选项类体检按钮方法
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dynamicValidateForm.domains.forEach(item => {
            if (!item.checked) {
              this.$set(item, 'normal_item', '1')
            } else {
              this.$set(item, 'normal_item', '0')
            }
          })
          this.listQuery1.check_type = this.form.checkType
          this.listQuery1.checkItemDetailBeanList = this.dynamicValidateForm.domains
          this.listQuery1.check_item_description = this.form.message
          if (this.title) {
            console.log('我是？')
            // 编辑
            this.updateCheck(this.listQuery1)
          } else {
            console.log('我是？111')
            // 新增
            this.addCheck(this.listQuery1)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？关闭后将刷新。')
        .then(_ => {
          history.go(0)
          done()
        })
        .catch(_ => {})
    },
    query() {
      this.listQuery.check_item_description = this.message
      this.getList()
    }
  }
}
</script>
<style lang='less' scoped>
.app-container {
}
</style>
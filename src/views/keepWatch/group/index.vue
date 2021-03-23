<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="3">
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-col>
    </el-row>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 展示List -->
    <dir>
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%;" height="600" border v-loading="loading">
            <el-table-column width="50" label="序号">
              <template slot-scope="scope">
                <span>{{ scope.$index+listQuery.page * listQuery.pageSize + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="groupName" label="组名称"></el-table-column>
            <el-table-column prop="type" label="组类型"></el-table-column>
            <el-table-column prop="groupManageName" label="组长"></el-table-column>
            <el-table-column prop="groupWorkerName" label="组员"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
                <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
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
        </el-col>
      </el-row>
    </dir>
    <!-- 新增 -->
    <div>
      <el-dialog title="新增" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
        <el-form label-width="80px" :model="form">
          <el-form-item label="组名称">
            <el-input type="text" v-model="form.groupName" placeholder="不超过六个字" maxlength="6"></el-input>
          </el-form-item>
          <!-- <el-form-item label="组类型">
            <el-select v-model="form.groupType" placeholder="请选择" @change="groupType">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="组长">
            <el-select v-model="form.gl" placeholder="请选择组长" filterable @change="zuZhang">
              <el-option
                v-for="item in form.options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组员">
            <el-select v-model="form.crew" placeholder="请选择组员" filterable multiple @change="zuYuan">
              <el-option
                v-for="item in form.options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="xinZ">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 按钮 -->
    </div>
    <!-- 编辑 -->
    <div>
      <el-dialog title="编辑" :visible.sync="dialogVisible1" width="35%" :before-close="handleClose">
        <el-form label-width="80px" :model="form1">
          <el-form-item label="组名称">
            <el-input type="text" v-model="form1.groupName" placeholder="不超过六个字" maxlength="6"></el-input>
          </el-form-item>
          <!-- <el-form-item label="组类型">
            <el-select v-model="form1.groupType" placeholder="请选择" @change="groupType1">
              <el-option
                v-for="item in form1.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="组长">
            <el-select v-model="form1.gl" placeholder="请选择组长" filterable @change="zuZhang1">
              <el-option
                v-for="item in form1.options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组员">
            <el-select
              v-model="form1.crew"
              placeholder="请选择组员"
              filterable
              multiple
              @change="zuYuan1"
            >
              <el-option
                v-for="item in form1.options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 按钮 -->
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary
import {
  getPatrolCheckGroupByParam, //list
  getGroupManage, //可选组长
  getGroupWorkers, //可选组员
  add, //新增
  editPatrolCheckGroup, //编辑
  removePatrolCheckGroup //删除
} from '@/api/iguard/group'
export default {
  components: { Pagination },
  data() {
    return {
      loading: false,
      dialogVisible: false, //新增弹出框
      dialogVisible1: false, //编辑弹出框
      tableData: [],
      total: 0,
      listQuery: {
        page: 0,
        pageSize: 50
      },
      form: {
        groupName: '', //组名
        groupType: '1', //组类型
        options: [
          {
            value: '1',
            label: '巡更组'
          },
          {
            value: '2',
            label: '点检组'
          }
        ],
        gl: '', //组长
        options1: [],
        crew: '', //组员
        options2: []
      },
      form1: {
        groupName: '', //组名
        groupType: '1', //组类型
        options: [
          {
            value: '1',
            label: '巡更组'
          },
          {
            value: '2',
            label: '点检组'
          }
        ],
        gl: '', //组长
        options1: [],
        crew: '', //组员
        options2: []
      },
      glId: '', //编辑时组长ID
      newObj: {
        companyId: localStorage.getItem('deptid')
      }, //新增参数
      editObj: {
        companyId: localStorage.getItem('deptid')
      } //编辑参数
    }
  },
  mounted() {
    this.getList()
    this.gl()
    this.editCrew()
  },
  methods: {
    // 关闭弹出窗时需要确认
    handleClose(done) {
      this.$confirm('确认关闭？关闭后页面将刷新')
        .then(_ => {
          history.go(0)
          done()
        })
        .catch(_ => {})
    },
    // 巡更点检组list
    async getList() {
      this.listQuery.page = 0
      try {
        const res = await getPatrolCheckGroupByParam(this.listQuery)
        this.tableData = res.data.rows
        this.total = res.data.records
        this.tableData.forEach(item => {
          if (item.groupType == '1') {
            this.$set(item, 'type', '巡更组')
          } else if (item.groupType == '2') {
            this.$set(item, 'type', '点检组')
          }
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    // 删除操作
    async remove(id) {
      try {
        const res = await removePatrolCheckGroup(id)
        console.log(res)
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getList()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 查询可选组长
    async gl() {
      try {
        const res = await getGroupManage(localStorage.getItem('companyId'))
        this.form.options1 = res.data
        this.form.options1.forEach(item => {
          this.$set(item, 'value', item.uid)
          this.$set(item, 'label', item.userName)
        })
        this.form1.options1 = res.data
        this.form1.options1.forEach(item => {
          this.$set(item, 'value', item.uid)
          this.$set(item, 'label', item.userName)
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询可选组员
    async crew() {
      this.form.options2 = []
      try {
        const res = await getGroupWorkers(localStorage.getItem('companyId'))
        res.data.forEach(item => {
          if (item.uid != this.form.gl) {
            this.form.options2.push(item)
          }
        })
        this.form.options2.forEach(item => {
          this.$set(item, 'value', item.uid)
          this.$set(item, 'label', item.userName)
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询可选组员
    async editCrew() {
      this.form1.options2 = []
      try {
        const res = await getGroupWorkers(localStorage.getItem('companyId'))
        res.data.forEach(item => {
          if (item.uid != this.form1.gl) {
            this.form1.options2.push(item)
          }
        })
        this.form1.options2.forEach(item => {
          this.$set(item, 'value', item.uid)
          this.$set(item, 'label', item.userName)
        })
      } catch (e) {
        console.log(e)
      }
    },
    zuZhang(val) {
      console.log(val)
      this.newObj.groupManage = val
      console.log(this.form)
      console.log(this.form1)
      this.crew()
    },
    // 组类型
    groupType(val) {
      // this.newObj.groupType = val
    },
    // 限制必须先选组长
    zuYuan(val) {
      if (this.form.gl == '') {
        this.$message({
          message: '请先选择组长',
          type: 'warning'
        })
        this.form.crew = ''
      } else {
        console.log(val)
        this.newObj.groupWorker = val.join(',')
        this.newObj.groupName = this.form.groupName
        console.log(this.newObj.groupWorker)
      }
    },
    // 新增
    async newAdd() {
      try {
        const res = await add(this.newObj)
        console.log(res)
        history.go(0)
      } catch (e) {
        console.log(e)
      }
    },
    xinZ() {
      if (this.form.groupName == '') {
        this.$message({
          message: '请填写组名',
          type: 'warning'
        })
      } else if (this.form.gl == '') {
        this.$message({
          message: '请选择组长',
          type: 'warning'
        })
      } else if (this.form.crew == '') {
        this.$message({
          message: '请选择组员',
          type: 'warning'
        })
      } else {
        // this.newObj.groupType = this.form.groupType
        this.newAdd()
      }
    },
    zuZhang1(val) {
      console.log(val)
      if (this.glId == val) {
        this.editObj.groupManage = this.glId
      } else {
        this.editObj.groupManage = val
      }
      this.editCrew()
    },
    // 组类型
    groupType1(val) {
      // this.editObj.groupType = val
    },
    // 限制必须先选组长
    zuYuan1(val) {
      if (this.form1.gl == '') {
        this.$message({
          message: '请先选择组长',
          type: 'warning'
        })
        this.form1.crew = ''
      } else {
        console.log(val)
        this.editObj.groupWorker = val.join(',')
        this.editObj.groupName = this.form1.groupName
        console.log(this.editObj.groupWorker)
      }
    },
    // 编辑
    edit(scope) {
      console.log(scope)
      this.dialogVisible1 = true
      this.form1.groupName = scope.row.groupName
      this.editObj.groupName = scope.row.groupName
      this.editObj.id = scope.row.id
      this.form1.gl = scope.row.groupManageName
      // 组长ID
      this.glId = scope.row.groupManage
      this.editObj.groupManage = scope.row.groupManage
      // 组员ID
      this.form1.crew = scope.row.groupWorker.split(',')
      this.editObj.groupWorker = scope.row.groupWorker
      // 组类型
      // this.form1.groupType = scope.row.groupType.toString()
      // this.editObj.groupType = scope.row.groupType.toString()
    },
    async update() {
      console.log(this.editObj)
      try {
        const res = await editPatrolCheckGroup(this.editObj)
        history.go(0)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.app-container {
  /deep/.el-select {
    width: 100%;
  }
}
</style>
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="input" placeholder="请输入商铺名"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="type" placeholder="业态类型" @change="yeTai">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="localtion" placeholder="建筑" @change="jianZhu">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="floor" placeholder="楼层" @change="floorId">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="check">查找</el-button>
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
      <el-table-column prop="shop_name" label="商户名称" />
      <el-table-column prop="retail_format_name" label="业态类型" />
      <el-table-column prop="building_name" label="空间位置" :formatter="kongJian" />
      <el-table-column prop="shop_manage" label="负责人" />
      <el-table-column prop="description" label="备注" />
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
      @pagination="getList(listQuery)"
    />
    <!-- 新增and编辑 -->
    <div class="new_edit">
      <el-dialog :title="title?'编辑':'新增'" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商户名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- 业态类型可新增选择 -->
          <el-form-item label="业态类型">
            <el-popover placement="bottom" width="100%" trigger="click">
              <div>
                <el-button type="primary" size="mini" @click="addType">新建类型</el-button>
              </div>
              <el-table :data="yeTaiType" style="width: 100%;" height="200">
                <el-table-column width="400px" label property="retail_format_name">
                  <template slot="header" slot-scope="scope">
                    <el-input size="medium" placeholder="请输入内容" v-model="input2"></el-input>
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      style="width: 100%; text-align: left"
                      size="mini"
                      type="text"
                      @click="selectDict(scope)"
                    >{{scope.row.retail_format_name}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column width="100" property="name" label>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      style="color: #C03639"
                      @click="editDictInfo(scope)"
                    >编辑</el-button>

                    <el-button
                      type="text"
                      size="mini"
                      style="color: #8c939d"
                      @click="dictInfoDelete(scope)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                slot="reference"
                ref="type"
                style="width:100%; text-align: left; color: #8c939d"
                v-cloak
              >{{btnName}}</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="空间位置">
            <!-- 建筑 -->
            <el-select v-model="localtion1" placeholder="建筑" @change="jianZhu1">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 楼层 -->
            <el-select v-model="floor1" placeholder="楼层" @change="floorId1">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 楼层 -->
            <el-select v-model="POI" placeholder="商铺号" @change="poiId">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注描述">
            <el-input type="textarea" :rows="2" placeholder="请输入描述" v-model="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 新增and编辑业态类型 -->
    <el-dialog
      :title="new_update?'新增业态':'编辑业态'"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="newType" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="endFormat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {
  newAdd, //新增商户
  update, //编辑商户
  getList, //获取商户list
  remove, //删除商户
  newAddFormat, //新增业态
  updateFormat, //编辑业态
  getListFormat, //获取业态list
  removeFormat //删除业态
} from '@/api/iguard/lockageCheck'
import {
  getCompanyDeptByCompanyId,
  getBuildingLocationFloor
} from '@/api/iguard/incidentOrder'

export default {
  name: 'shangHuManage',
  components: { Pagination },
  watch: {
    input2: function(val, oldVal) {
      // ~是js中（位非）运算符，用于对一个二进制操作数逐位进行取反操作，比如~13打印结果为-14，会吧数值变为负数并加一，如果值为负数则会转为正数并减一
      this.yeTaiType = this.yeTaiType1.filter(
        item => ~item.retail_format_name.indexOf(val)
      )
    }
  },
  data() {
    return {
      new_update: true,
      listLoading: true,
      list: [], //list数据
      total: 0,
      title: false, //false=新增，true=编辑
      input: '', //筛选商铺名
      newType: '', //新增业态类型
      textarea: '', //新增描述
      input2: '', //业态筛选
      btnName: '请选择业态类型',
      type: '', //业态类型
      options: [],
      localtion: '', //建筑
      options1: [], //建筑
      floor: '', //楼层
      POI: '', //新增POI
      options2: [{ value: '', label: '楼层(全部)' }], //楼层
      options3: [], //新增建筑
      options4: [], //新增楼层
      options5: [], //新增POI
      localtion1: '', //新增建筑
      floor1: '', //新增楼层
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        name: ''
      },
      listQuery: {
        // 商户增删改数据
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      },
      listQuery3: {
        // 商户请求list
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      },
      listQuery1: {
        // 业态请求list数据
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      },
      listQuery2: {
        // 业态请求增删改数据
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      },
      yeTaiType: [], //业态类型
      yeTaiType1: [] //业态类型
    }
  },
  created() {
    this.getList(this.listQuery)
    this.companyDept() //公司下所有建筑
    this.listFormat() //业态list
  },
  methods: {
    // 格式化表格内容
    kongJian(scope) {
      console.log(scope)
      if (
        scope.building_name != null &&
        scope.floor_name != null &&
        scope.room_name != null
      ) {
        return (
          scope.building_name + '/' + scope.floor_name + '/' + scope.room_name
        )
      } else if (
        scope.building_name != null &&
        scope.floor_name != null &&
        scope.room_name == null
      ) {
        return scope.building_name + '/' + scope.floor_name
      } else if (
        scope.building_name != null &&
        scope.floor_name == null &&
        scope.room_name == null
      ) {
        return scope.building_name
      } else {
        return '-'
      }
    },
    // 获取商户list
    async getList(obj) {
      try {
        const res = await getList(obj)
        console.log(res)
        if (res.code == 200) {
          this.listLoading = false
          this.list = res.data
          this.total = res.count
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 新增商户
    async newAddShangHu(obj) {
      try {
        const res = await newAdd(obj)
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.listLoading = true
          this.getList(this.listQuery3)
          this.dialogVisible = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑商户
    async updateShangHu(obj) {
      try {
        const res = await update(obj)
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.listLoading = true
          this.getList(this.listQuery3)
          this.dialogVisible = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑商户按钮
    handleEdit(scope) {
      this.dialogVisible = true
      this.title = true
      let obj = scope.row
      this.getFloor(obj.building_id)
      this.getFloor1(obj.floor_id)
      this.form.name = obj.shop_name
      this.listQuery.shop_name = obj.shop_name
      //
      this.localtion1 = obj.building_id
      this.listQuery.building_id = obj.building_id
      //
      this.floor1 = obj.floor_id
      this.listQuery.floor_id = obj.floor_id
      //
      this.POI = obj.room_id
      this.listQuery.room_id = obj.room_id
      //
      this.textarea = obj.description
      this.listQuery.description = obj.description
      //
      this.btnName = obj.retail_format_name
      this.listQuery.retail_format_id = obj.retail_format_id
      //
      this.listQuery.id = obj.id
    },
    // 删除商户
    async removeShangHu(obj) {
      try {
        const res = await remove(obj)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.listLoading = true
          this.getList(this.listQuery3)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除按钮
    handleDelete(scope) {
      this.listQuery.id = scope.row.id
      this.removeShangHu(this.listQuery)
    },
    // 获取公司下面的建筑
    async companyDept() {
      try {
        const res = await getCompanyDeptByCompanyId(this.listQuery.company_id)
        res.result.forEach(item => {
          this.options1.push(item)
          this.options3.push(item)
          this.$set(item, 'label', item.locationName)
          this.$set(item, 'value', item.id)
        })
        console.log(res)
        this.options1.unshift({
          value: '',
          label: '建筑(全部)'
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询建筑下楼层&房间
    async getFloor(parentId) {
      try {
        const res = await getBuildingLocationFloor(parentId)
        console.log(res)
        res.result.forEach(item => {
          this.options2.push(item)
          this.options4.push(item)
          this.$set(item, 'label', item.locationName)
          this.$set(item, 'value', item.id)
        })
        this.options2.unshift({
          value: '',
          label: '楼层(全部)'
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询建筑下楼层&房间
    async getFloor1(parentId) {
      try {
        const res = await getBuildingLocationFloor(parentId)
        console.log(res)
        res.result.forEach(item => {
          this.options5.push(item)
          this.$set(item, 'label', item.locationName)
          this.$set(item, 'value', item.id)
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 获取建筑的信息
    jianZhu(value) {
      this.options2 = []
      this.options4 = []
      console.log(value)
      if (value == '') {
        delete this.listQuery3.building_id
      } else {
        this.listQuery3.building_id = value
        this.getFloor(value)
      }
    },
    jianZhu1(value) {
      this.options2 = []
      this.options4 = []
      console.log(value)
      this.listQuery.building_id = value
      this.getFloor(value)
    },
    floorId(value) {
      this.options5 = []
      if (value == '') {
        delete this.listQuery3.floor_id
      } else {
        this.listQuery3.floor_id = value
        this.getFloor1(value)
      }
    },
    floorId1(value) {
      this.options5 = []
      this.listQuery.floor_id = value
      this.getFloor1(value)
    },
    // poiId
    poiId(value) {
      this.listQuery.room_id = value
    },
    // 新增and编辑
    new_edit() {
      this.dialogVisible = true
      this.title = false
      this.listQuery = {
        // 商户请求数据
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        pageSize: 50,
        page: 1
      }
    },
    addType() {
      console.log('asd')
      this.new_update = true
      this.newType = ''
      this.dialogVisible1 = true
    },
    selectDict(scope) {
      console.log(scope)
      this.btnName = scope.row.retail_format_name
      this.listQuery.retail_format_id = scope.row.id
      // $el.click() == 又让这个按钮点击了一次
      this.$refs.type.$el.click()
    },
    // 业态类型编辑
    editDictInfo(scope) {
      this.new_update = false
      this.dialogVisible1 = true
      this.newType = scope.row.retail_format_name
      this.listQuery2.id = scope.row.id
      console.log(scope)
    },
    // 业态类型删除
    dictInfoDelete(scope) {
      this.listQuery2.id = scope.row.id
      this.removeYeTai(this.listQuery2)
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
      this.listQuery.description = this.textarea
      this.listQuery.shop_name = this.form.name
      if (this.title) {
        // 编辑
        this.updateShangHu(this.listQuery)
      } else {
        // 新增
        if (!this.listQuery.shop_name) {
          this.$message('请填写商铺名称')
        } else if (!this.listQuery.retail_format_id) {
          this.$message('请选择业态')
        } else if (!this.listQuery.building_id) {
          this.$message('请选择建筑')
        } else if (!this.listQuery.floor_id) {
          this.$message('请选择楼层')
        } else if (!this.listQuery.description) {
          this.$message('请填写描述')
        } else {
          this.newAddShangHu(this.listQuery)
          console.log('可以提交了')
        }
      }
    },
    // 新增业态
    async addYeTai(obj) {
      try {
        const res = await newAddFormat(obj)
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          history.go(0)
          this.listFormat()
          this.dialogVisible1 = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取业态id
    yeTai(val) {
      this.listQuery3.retail_format_id = val
    },
    // 编辑业态
    async updateYeTai(obj) {
      try {
        const res = await updateFormat(obj)
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          history.go(0)
          this.dialogVisible1 = false
          this.listFormat()
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除业态
    async removeYeTai(obj) {
      try {
        const res = await removeFormat(obj)
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.listFormat()
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 业态list
    async listFormat() {
      try {
        const res = await getListFormat(this.listQuery1)
        console.log(res)
        this.yeTaiType = res.data
        this.yeTaiType1 = res.data
        res.data.forEach(item => {
          this.options.push(item)
          this.$set(item, 'label', item.retail_format_name)
          this.$set(item, 'value', item.id)
        })
        this.options.unshift({
          value: '',
          label: '业态(全部)'
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 新增业态
    endFormat() {
      this.listQuery2.retail_format_name = this.newType
      console.log(this.new_update)
      if (this.new_update == true) {
        this.addYeTai(this.listQuery2)
      } else {
        this.updateYeTai(this.listQuery2)
      }
    },
    check() {
      if (this.input != '') {
        this.listQuery3.shop_name = this.input
      }
      this.getList(this.listQuery3)
    }
  }
}
</script>

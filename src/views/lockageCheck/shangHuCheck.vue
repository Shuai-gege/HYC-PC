<template>
  <div class="app-container">
    <el-row>
      <!-- 时间选择 -->
      <el-col :span="6">
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="time"
        ></el-date-picker>
      </el-col>
      <!-- 建筑 -->
      <el-col :span="3">
        <el-select v-model="location" placeholder="请选择建筑" @change="jianZhu">
          <el-option
            v-for="item in locationName"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 楼层 -->
      <el-col :span="3">
        <el-select v-model="floor" placeholder="请选择楼层" @change="louCeng">
          <el-option
            v-for="item in floorId"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <!-- 业态 -->
      <el-col :span="3">
        <el-select v-model="yeTai" placeholder="请选择业态" @change="yeTaiFun">
          <el-option
            v-for="item in yeTaiId"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <!-- 商户名 -->
      <el-col :span="3">
        <el-input v-model="input" placeholder="请输入商户名/事件编号" style="width:200px"></el-input>
      </el-col>
      <!-- 自检结果 -->
      <el-col :span="3">
        <el-select v-model="ziJian_status" placeholder="请选择自检状态" @change="ziJian">
          <el-option
            v-for="item in ziJian_status_arr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 自检状态 -->
      <el-col :span="3">
        <el-select v-model="ziJian_result" placeholder="请选择自检结果" @change="ziJian1">
          <el-option
            v-for="item in ziJian_result_arr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 复查结果 -->
      <el-col :span="3">
        <el-select v-model="retail_status" placeholder="请选择复查状态" @change="fuCha">
          <el-option
            v-for="item in retail_status_arr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 复查状态 -->
      <el-col :span="3">
        <el-select v-model="retail_result" placeholder="请选择复查结果" @change="fuCha1">
          <el-option
            v-for="item in retail_result_arr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :offset="6" :span="3">
        <el-button type="primary" @click="query">查询</el-button>
        <!-- <el-button type="primary">导出</el-button> -->
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 表格展示报表数据 -->
    <div>
      <el-table v-loading="listLoading" :data="list" border style="width: 100%;" height="550">
        <el-table-column width="50" label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index+(listQuery.page - 1) * listQuery.pageSize + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shop_name" label="商户名称" />
        <el-table-column prop="retail_name" label="业态类型" />
        <el-table-column prop="task_name" label="任务名称" />
        <el-table-column prop="shop_manage_name" label="上报人" :formatter="shangBaoRen" />
        <el-table-column prop="check_time" label="任务开始时间" />
        <el-table-column prop="check_status" label="自检状态" />
        <el-table-column prop="check_result" label="自检结果" />
        <el-table-column prop="repeat_status" label="复查状态" />
        <el-table-column prop="repeat_result" label="复查结果" />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="details(scope)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import {
  getCompanyDeptByCompanyId,
  getBuildingLocationFloor
} from '@/api/iguard/incidentOrder'
import {
  checkDetailReport, //自检明细
  getGroups,
  getListFormat, //获取业态list
  listCheckItem //检查项
} from '@/api/iguard/lockageCheck'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  name: 'shangHuCheck',
  watch: {
    $route: function(newUrl, oldUrl) {
      if (newUrl.name == 'shangHuCheck' || oldUrl.name == 'shangHuCheck') {
        console.log('走了吗')
        // 下面是统计报表传参过来的参数
        let params = this.$route.params //创建一个存放params传参的对象
        if (params.startTime != null && params.startTime != undefined) {
          this.listQuery.start_time = params.startTime
          this.listQuery.end_time = params.endTime
          this.value = [params.startTime, params.endTime]
          this.listQuery.shop_name = params.shop_nam
          this.input = params.shop_nam
          // 已报事
          if (
            params.ziJian_status != null &&
            params.ziJian_status != undefined
          ) {
            this.ziJian_status = params.ziJian_status
            this.listQuery.check_status = params.ziJian_status
          } else {
            this.ziJian_status = ''
            this.listQuery.check_status = ''
          }
          // 自检结果不合格
          if (
            params.ziJian_result != null &&
            params.ziJian_result != undefined
          ) {
            this.ziJian_result = params.ziJian_result
            this.listQuery.check_result = params.ziJian_result
          } else {
            this.ziJian_result = ''
            this.listQuery.check_result = ''
          }
          this.getList()
        }
      }
    }
  },
  data() {
    return {
      value: [new Date(), new Date()],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      location: '', //建筑ID
      locationName: [
        {
          value: '',
          label: '建筑（全部）'
        }
      ], //建筑ID
      floor: '', //楼层ID
      floorId: [
        {
          value: '',
          label: '楼层（全部）'
        }
      ], //楼层ID
      yeTai: '', //业态
      yeTaiId: [
        {
          value: '',
          label: '业态（全部）'
        }
      ], //业态
      ziJian_status: '',
      ziJian_status_arr: [
        {
          value: '',
          label: '自检状态（全部）'
        },
        {
          value: '0',
          label: '未开始'
        },
        {
          value: '1',
          label: '进行中'
        },
        {
          value: '2',
          label: '已完成'
        },
        {
          value: '3',
          label: '已逾期'
        },
        {
          value: '4',
          label: '已报事'
        }
      ],
      ziJian_result: '',
      ziJian_result_arr: [
        {
          value: '',
          label: '自检结果（全部）'
        },
        {
          value: '1',
          label: '合格'
        },
        {
          value: '2',
          label: '不合格'
        }
      ],
      retail_status: '',
      retail_status_arr: [
        {
          value: '',
          label: '复查状态（全部）'
        },
        {
          value: '1',
          label: '待复查'
        },
        {
          value: '2',
          label: '可抽查'
        },
        {
          value: '3',
          label: '处理中'
        },
        {
          value: '4',
          label: '已处理'
        }
      ],
      retail_result: '',
      retail_result_arr: [
        {
          value: '',
          label: '复查结果（全部）'
        },
        {
          value: '1',
          label: '正常'
        },
        {
          value: '2',
          label: '异常'
        }
      ],
      input: '', //事件编号&商户名
      list: [], //list数据
      listLoading: true,
      total: 0,
      yeTaiQuery: {
        company_id: localStorage.getItem('companyId'),
        uid: localStorage.getItem('uid'),
        page: 1,
        pageSize: 50
      },
      listQuery: {
        company_id: localStorage.getItem('companyId'),
        page: 1,
        pageSize: 50
      }
    }
  },
  mounted() {
    this.getList()
    this.getListFormatList()
    this.companyDept(localStorage.getItem('companyId'))
    // 当前时间
    let newTime = new Date()
    let newTimes =
      newTime.getFullYear() +
      '-' +
      JSON.stringify(newTime.getMonth() + 1).padStart(2, '0') +
      '-' +
      JSON.stringify(newTime.getDate()).padStart(2, '0')
    this.listQuery.start_time = newTimes
    this.listQuery.end_time = newTimes
    // 下面是统计报表传参过来的参数
    let params = this.$route.params //创建一个存放params传参的对象

    if (params.startTime != null && params.startTime != undefined) {
      this.listQuery.start_time = params.startTime
      this.listQuery.end_time = params.endTime
      this.value = [params.startTime, params.endTime]
      this.listQuery.shop_name = params.shop_nam
      this.input = params.shop_nam
      // 已报事
      if (params.ziJian_status != null && params.ziJian_status != undefined) {
        this.ziJian_status = params.ziJian_status
        this.listQuery.check_status = params.ziJian_status
      }
      // 自检结果不合格
      if (params.ziJian_result != null && params.ziJian_result != undefined) {
        this.ziJian_result = params.ziJian_result
        this.listQuery.check_result = params.ziJian_result
      }
    }
  },
  methods: {
    shangBaoRen(scope) {
      if (scope.shop_manage_name == null) {
        return '-'
      } else {
        return scope.shop_manage_name
      }
    },
    async getList() {
      try {
        const res = await checkDetailReport(this.listQuery)
        console.log(res)
        this.list = res.data
        this.total = res.count
        this.listLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 时间处理哦
    time(val) {
      let newTime = new Date(val[0])
      this.listQuery.start_time =
        newTime.getFullYear() +
        '-' +
        JSON.stringify(newTime.getMonth() + 1).padStart(2, '0') +
        '-' +
        JSON.stringify(newTime.getDate()).padStart(2, '0')
      // -------------------------------------
      let newTime1 = new Date(val[1])
      this.listQuery.end_time =
        newTime1.getFullYear() +
        '-' +
        JSON.stringify(newTime1.getMonth() + 1).padStart(2, '0') +
        '-' +
        JSON.stringify(newTime1.getDate()).padStart(2, '0')
    },
    jianZhu(val) {
      console.log(val)
      if (val == '') {
        this.floorId = [
          {
            value: '',
            label: '楼层（全部）'
          }
        ]
        this.listQuery.building_id = ''
      } else {
        this.listQuery.building_id = val
        this.getFloor(val)
      }
    },
    louCeng(val) {
      if (val == '') {
        this.listQuery.floor_id = ''
      } else {
        this.listQuery.floor_id = val
      }
    },
    yeTaiFun(val) {
      this.listQuery.retail_id = val
    },
    ziJian(val) {
      this.listQuery.check_status = val
    },
    ziJian1(val) {
      this.listQuery.check_result = val
    },
    fuCha(val) {
      this.listQuery.repeat_status = val
    },
    fuCha1(val) {
      this.listQuery.repeat_result = val
    },
    details(scope) {
      localStorage.setItem('baseUrl', 'http://47.100.240.228')
      console.log(scope)
      this.$router.push({
        name: 'details',
        params: {
          detail_id: scope.row.detail_id
        }
      })
    },
    // 业态list
    async getListFormatList() {
      try {
        const res = await getListFormat(this.yeTaiQuery)
        console.log(res)
        res.data.forEach(item => {
          this.yeTaiId.push({
            value: item.id,
            label: item.retail_format_name
          })
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 建筑list
    async companyDept(company_id) {
      try {
        const res = await getCompanyDeptByCompanyId(company_id)
        res.result.forEach(item => {
          this.locationName.push({
            value: item.id,
            label: item.locationName
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询建筑下楼层&房间
    async getFloor(parentId) {
      try {
        const res = await getBuildingLocationFloor(parentId)
        res.result.forEach(item => {
          this.floorId.push({
            value: item.id,
            label: item.locationName
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询
    query() {
      this.listQuery.shop_name = this.input
      this.listLoading = true
      this.getList()
    }
  }
}
</script>
<style lang='less' scoped>
.app-container {
}
</style>
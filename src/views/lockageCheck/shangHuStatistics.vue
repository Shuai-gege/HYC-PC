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
      <!-- 商户名 -->
      <el-col :span="3">
        <el-input v-model="input" placeholder="请输入商户名/事件编号" style="width:200px"></el-input>
      </el-col>
      <el-col :offset="1" :span="3">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="excel">导出</el-button>
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
        <el-table-column prop="building_name" label="空间位置" :formatter="weiZhi" />
        <el-table-column prop="detail_count" label="任务数" sortable>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="order(scope)">{{scope.row.detail_count}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="report_count" label="报事数" sortable>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="order1(scope)">{{scope.row.report_count}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="check_unqualified" label="自检不合格数" sortable>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="order2(scope)"
            >{{scope.row.check_unqualified}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="check_timeout" label="逾期数" sortable>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="order3(scope)">{{scope.row.check_timeout}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="total_unqualified" label="不合格任务总数" sortable />
        <el-table-column prop="pass_rate" label="合格率" :formatter="heGe" sortable />
        <el-table-column prop="timeout_rate" label="逾期率" :formatter="yuQi" sortable />
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
import axios from 'axios'
import {
  getCompanyDeptByCompanyId,
  getBuildingLocationFloor
} from '@/api/iguard/incidentOrder'
import {
  checkStatisticsReport, //自检明细
  getGroups,
  getListFormat, //获取业态list
  listCheckItem //检查项
} from '@/api/iguard/lockageCheck'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  name: 'shangHuStatistics',

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
  },
  methods: {
    async getList() {
      try {
        const res = await checkStatisticsReport(this.listQuery)
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
    weiZhi(scope) {
      if (scope.building_name != null && scope.floor_name != null) {
        return scope.building_name + '/' + scope.floor_name
      } else if (scope.building_name != null && scope.floor_name == null) {
        return scope.building_name
      }
    },
    heGe(scope) {
      return scope.pass_rate + '%'
    },
    yuQi(scope) {
      return scope.timeout_rate + '%'
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
    order(scope) {
      console.log(scope)
      let obj = scope.row
      this.$router.push({
        name: 'shangHuCheck',
        params: {
          startTime: this.listQuery.start_time,
          endTime: this.listQuery.end_time,
          shop_nam: obj.shop_name
        }
      })
    },
    order1(scope) {
      console.log(scope)
      let obj = scope.row
      this.$router.push({
        name: 'shangHuCheck',
        params: {
          startTime: this.listQuery.start_time,
          endTime: this.listQuery.end_time,
          shop_nam: obj.shop_name,
          ziJian_status: '4'
        }
      })
    },
    order2(scope) {
      console.log(scope)
      let obj = scope.row
      this.$router.push({
        name: 'shangHuCheck',
        params: {
          startTime: this.listQuery.start_time,
          endTime: this.listQuery.end_time,
          shop_nam: obj.shop_name,
          ziJian_result: '2'
        }
      })
    },
    order3(scope) {
      let obj = scope.row
      this.$router.push({
        name: 'shangHuCheck',
        params: {
          startTime: this.listQuery.start_time,
          endTime: this.listQuery.end_time,
          shop_nam: obj.shop_name,
          ziJian_status: '3'
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
    },
    excel() {
      this.listLoading = true
      console.log('导出')
      axios.defaults.headers.common['LinkAdmin-Token'] = localStorage.getItem(
        'LinkAdmin-Token'
      )
      let formData = new FormData() //创建form对象
      for (var key in this.listQuery) {
        formData.append(key, this.listQuery[key]) //在form对象中添加每一项的值
      }
      axios({
        method: 'post',
        url:
          process.env.VUE_APP_BASE_API_URL5 +
          '/rest/reportCheck/checkStatisticsReportExport',
        // withCredentials: true,
        responseType: 'blob', //设置请求的返回值类型
        data: formData
      }).then(data => {
        this.listLoading = false
        console.log(data)
        let blob = new Blob([data.data], { type: 'application/vnd.ms -excel' }) //创建Blob对象文件流
        var downloadA = document.createElement('a') //在body上加一个a标签
        downloadA.href = window.URL.createObjectURL(blob) //创建一个新的url
        downloadA.download =
          '安全隐患排名-' +
          this.listQuery.start_time +
          '~' +
          this.listQuery.end_time +
          '.xlsx' //下载的文件名称
        downloadA.click()
        // 施放url
        window.URL.revokeObjectURL(downloadA.href)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.app-container {
}
</style>
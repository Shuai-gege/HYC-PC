<template>
  <div class="app-container">
    <!-- 头部 -->
    <el-container>
      <el-header>任务详情</el-header>
    </el-container>
    <!-- 主体部分 -->
    <el-divider></el-divider>
    <!-- 时间信息 -->
    <div class="paiBan">
      <span class="paiBanTitle">时间信息</span>
      <el-row :gutter="24">
        <el-col :span="6">开始时间：{{detailList.start_time}}</el-col>
        <el-col :span="6">结束时间：{{detailList.end_time}}</el-col>
        <el-col :span="6">商户名称：{{detailList.shop_name}}</el-col>
        <el-col :span="6">任务名称：{{detailList.task_name}}</el-col>
      </el-row>
      <!--  -->
      <el-row :gutter="24">
        <el-col :span="6">自检人：{{detailList.check_name}}</el-col>
        <el-col :span="6">自检时间：{{detailList.repeat_time}}</el-col>
        <el-col
          :span="6"
          v-if="detailList.check_result == 0||detailList.check_result == null"
        >自检结果：N/A</el-col>
        <el-col :span="6" v-if="detailList.check_result == 1">自检结果：合格</el-col>
        <el-col :span="6" v-if="detailList.check_result == 2">自检结果：不合格</el-col>
        <!--自检状态 -->
        <el-col :span="6" v-if="detailList.check_status == 0">自检状态：未开始</el-col>
        <el-col :span="6" v-if="detailList.check_status == 1">自检状态：进行中</el-col>
        <el-col :span="6" v-if="detailList.check_status == 2">自检状态：已完成</el-col>
        <el-col :span="6" v-if="detailList.check_status == 3">自检状态：已逾期</el-col>
        <el-col :span="6" v-if="detailList.check_status == 4">自检状态：已报事</el-col>
      </el-row>
    </div>
    <!-- 自检信息 -->
    <div class="paiBan" v-if="detailList.check_name != null">
      <span class="paiBanTitle">自检信息</span>
      <el-row :gutter="24">
        <!-- 数值类 -->
        <el-col
          :span="6"
          v-for="(item,i) in detailList.checkItemBeanList"
          :key="i"
          v-if="item.check_type == 0"
        >
          {{item.check_item_description}}：
          <span
            v-for="(item1,i) in item.checkItemDetailBeanList"
            :key="i"
          >{{item1.font_value}}</span>
        </el-col>
        <!-- 选项类 -->
        <el-col
          :span="6"
          v-for="(item,i) in detailList.checkItemBeanList"
          :key="i"
          v-if="item.check_type == 1"
        >
          {{item.check_item_description}}：
          <span
            v-for="(item1,i) in item.checkItemDetailBeanList"
            :key="i"
          >{{item1.font_value1}}</span>
        </el-col>
        <!-- 文本类 -->
        <el-col
          :span="6"
          v-for="(item,i) in detailList.checkItemBeanList"
          :key="i"
          v-if="item.check_type == 2"
        >
          {{item.check_item_description}}：
          <span
            v-for="(item1,i) in item.checkItemDetailBeanList"
            :key="i"
          >{{item1.font_value}}</span>
        </el-col>
        <!-- 正常&异常类 -->
        <el-col
          :span="6"
          v-for="(item,i) in detailList.checkItemBeanList"
          :key="i"
          v-if="item.check_type == 3"
        >
          {{item.check_item_description}}：
          <span
            v-for="(item1,i) in item.checkItemDetailBeanList"
            :key="i"
            v-if="item1.font_value == 1"
          >正常</span>
          <span
            v-for="(item1,i) in item.checkItemDetailBeanList"
            :key="i"
            v-else-if="item1.font_value == 2"
          >异常</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">描述：{{detailList.description}}</el-col>
      </el-row>
      <div class="img">
        自检照片：
        <div class="demo-image__preview">
          <el-image
            style="width: 100px; height: 100px;margin:0 5px;"
            v-for="(item,i) in srcList"
            :key="i"
            :src="item"
            :preview-src-list="srcList"
          ></el-image>
        </div>
      </div>
    </div>
    <!-- 复查 -->
    <div class="paiBan" v-if="detailList.repeat_check_name != null">
      <span class="paiBanTitle">复查信息</span>
      <el-row :gutter="24">
        <el-col :span="6">复查人：{{detailList.repeat_check_name}}</el-col>
        <el-col :span="6">复查时间：{{detailList.repeat_time}}</el-col>
        <el-col :span="6" v-if="detailList.repeat_result == 0">复查结果：正常</el-col>
        <el-col :span="6" v-if="detailList.repeat_result == 1">复查结果：异常</el-col>
      </el-row>
    </div>
    <!-- 延期申请 -->
    <div
      class="paiBan"
      v-if="detailList.delayApplyBeans != null&&detailList.delayApplyBeans.length != 0"
    >
      <span class="paiBanTitle">延期申请</span>
      <el-row :gutter="24" v-for="(item,i) in detailList.delayApplyBeans" :key="i">
        <el-col :span="6">复查人：{{item.manage_name}}</el-col>
        <el-col :span="6">延期至：{{item.apply_time}}</el-col>
        <el-col :span="6">所需支持：{{item.delay_support}}</el-col>
        <el-col :span="6">延期事由：{{item.delay_cause}}</el-col>
      </el-row>
      <div class="img">
        延期照片：
        <div class="demo-image__preview">
          <el-image
            style="width: 100px; height: 100px;margin:0 5px;"
            v-for="(item,i) in srcList1"
            :key="i"
            :src="item"
            :preview-src-list="srcList1"
          ></el-image>
        </div>
      </div>
    </div>
    <!-- 跟进记录 -->
    <div class="paiBan" v-if="detailList.followBeans != null&&detailList.followBeans.length != 0">
      <span class="paiBanTitle">跟进记录</span>
      <el-row :gutter="24" v-for="(item,i) in detailList.followBeans" :key="i">
        <el-col :span="6">跟进人：{{item.follow_name}}</el-col>
        <el-col :span="6">跟进时间：{{item.follow_time}}</el-col>
        <el-col :span="6">跟进描述：{{item.follow_desp}}</el-col>
      </el-row>
      <div class="img">
        自检照片：
        <div class="demo-image__preview">
          <el-image
            style="width: 100px; height: 100px;margin:0 5px;"
            v-for="(item,i) in srcList2"
            :key="i"
            :src="item"
            :preview-src-list="srcList2"
          ></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailsByParamById } from '@/api/iguard/lockageCheck'
import { formatTimeToStr } from '@/utils/dateUtil' //处理后台传来的时间
export default {
  data() {
    return {
      srcList10: [],
      url: '',
      srcList: [],
      srcList1: [],
      srcList2: [],
      value: 0, //评分
      value1: 0, //评分
      value2: 0, //评分
      eventStatusNow: '', //事件状态
      event_id: '', //事件ID
      createTime: '', //完成时间
      nowTime: new Date(),
      detailList: {}, //任务详情数据
      imgs: [], //报事信息图片
      imgs1: [], //完工信息图片
      imgs2: [], //验收信息图片
      imgs3: [], //进度里的图片
      imgs10: [], //进度里的图片
      comName: [],
      comName1: '',
      description: '', //完工描述
      checkUserName: '', //验收人
      check_according: '', //验收方式
      check_remark: '', //验收描述
      scoreAll: '', //评价得分
      delay: '', //是否逾期
      checkTime: '', //验收时间
      tableData: [],
      wuliao: ''
    }
  },
  mounted() {
    this.url = localStorage.getItem('baseUrl')
    this.eventStatusNow = this.$route.query.eventStatusNow
    this.event_id = this.$route.query.event_id
    this.delay = this.$route.query.delay
    this.details(
      localStorage.getItem('uid'),
      this.eventStatusNow,
      this.event_id
    )
  },
  methods: {
    // 时间格式化
    // 时间格式化
    formatDateTime(row, column) {
      return formatTimeToStr(row.createTime, 'yyyy-MM-dd hh:mm:ss')
    },
    async details(uid, eventStatusNow, event_id) {
      try {
        const res = await getDetailsByParamById(this.$route.params.detail_id)
        // const res = await getDetailsByParamById('12856')
        this.detailList = res.data
        this.detailList.checkItemBeanList.forEach(item => {
          if (item.check_type == 1) {
            item.checkItemDetailBeanList.forEach(item1 => {
              if (item1.font_value != null) {
                this.$set(item1, 'font_value1', item1.detail_value)
              }
            })
          }
        })
        if (this.detailList.check_img != null) {
          this.detailList.check_img.split(',').forEach(item => {
            this.srcList.push(this.url + item)
          })
        }
        let imgArr = []
        let imgArr1 = []
        // 验收图片
        this.detailList.delayApplyBeans.forEach(item => {
          console.log(item.delay_img)
          imgArr = item.delay_img.split(',')
        })
        imgArr.forEach(item => {
          this.srcList1.push(this.url + item)
        })
        // 跟进图片
        this.detailList.followBeans.forEach(item => {
          console.log(item.follow_img)
          imgArr1 = item.follow_img.split(',')
        })
        imgArr1.forEach(item => {
          this.srcList2.push(this.url + item)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.app-container {
  min-height: 100vh;
  background: #f5f6f7;
  .paiBan {
    background: #fff;
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 15px;
    .paiBanTitle {
      background: #a68e44;
      color: #fff;
      padding: 10px;
      position: relative;
      left: -9px;
      border-radius: 15px 0 15px 0;
    }
  }
  .jinDu {
    background: #fff;
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 15px;
    .title {
      background: #f6f7f8;
      padding: 1px 0;
      border-radius: 15px;
      padding-left: 40px;
    }
    .con {
      padding-left: 40px;
      border-bottom: 1px solid #f5f6f7;
    }
  }
  .el-header,
  .el-footer {
    text-align: center;
  }
  .el-row {
    margin: 20px;
  }
  .el-col {
    margin-bottom: 8px;
  }
  .img {
    justify-content: flex-start;
    display: flex;
    align-items: center;
  }
}
</style>
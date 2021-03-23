<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!-- 人员 -->
      <el-col :span="3">
        <el-input v-model="name" placeholder="人员"></el-input>
      </el-col>
      <!-- 任务名称 -->
      <el-col :span="3">
        <el-input v-model="taskName" placeholder="任务名称"></el-input>
      </el-col>
      <!-- 状态 -->
      <el-col :span="3">
        <el-select v-model="value" placeholder="状态" @change="state">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!--  -->
    <el-row :gutter="24">
      <!-- 人员 -->
      <el-col :span="3">
        <el-input v-model="shop_name" placeholder="商户名称"></el-input>
      </el-col>
      <!-- 任务名称 -->
      <el-col :span="3">
        <el-select v-model="yeTaiTypeId" placeholder="业态类型" @change="yeTai">
          <el-option
            v-for="item in yeTaiType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 建筑 -->
      <el-col :span="3">
        <el-select v-model="locationId" placeholder="建筑" @change="jianZhu">
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
        <el-select v-model="floorId" placeholder="楼层" @change="louCeng">
          <el-option
            v-for="item in floorName"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="5">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="xinZeng">新增</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = true">新增</el-button> -->
      </el-col>
    </el-row>
    <el-divider v-if="num.check_task_count != null"></el-divider>
    <el-row :gutter="20">
      <div
        class="pour"
        v-if="num.check_task_count != null"
      >注：此功能支持免费使用，{{num.level_name}}仅支持录入{{num.check_task_count}}个任务！请联系客服159-5174-1967购买服务，提高授权数量</div>
    </el-row>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 展示List -->
    <div>
      <el-row>
        <el-col :span="23">
          <el-table :data="tableData2" style="width: 100%;" height="600" border v-loading="loading">
            <el-table-column width="50" label="序号">
              <template slot-scope="scope">
                <span>{{ scope.$index+listQuery1.page }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="task_name" label="任务名称" />
            <el-table-column prop="shop_name" label="商户名称" />
            <el-table-column prop="retail_name" label="业态类型" />
            <el-table-column prop="ruleName" label="空间位置" :formatter="kongJian" />
            <el-table-column prop="rule_name" label="任务规则" />
            <el-table-column prop="default_name" label="默认执行组/执行人" :formatter="moRen" />
            <el-table-column prop="allocation_user_names" label="执行组/执行人" :formatter="moRen1" />
            <el-table-column prop="patroType1" label="周期调班" />
            <el-table-column prop="stop" label="状态" />
            <el-table-column prop="remark_description" label="备注描述" />
            <el-table-column prop="zip" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="stop(scope)">{{scope.row.stop1}}</el-button>
                <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>

                <el-button type="text" size="small" @click="shanChu(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery1.page"
            :limit.sync="listQuery1.pageSize"
            @pagination="taskGuanLi"
          />
        </el-col>
      </el-row>
    </div>
    <!-- 新增 -->
    <div>
      <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
        top="1vh"
      >
        <el-form ref="form" :model="form" label-width="150px">
          <div class="flex">
            <div :class="flag2||flag3?'biaoDan':'biaoDan1'">
              <!-- 任务名称 -->
              <el-form-item label="任务名称">
                <el-input v-model="form.renWuName" placeholder="任务名称" />
              </el-form-item>
              <!-- 商户名称 -->
              <el-form-item label="商户名称">
                <el-input v-model="form.taskName" placeholder="商户名称">
                  <!-- 选择商户 -->
                  <el-button slot="append" type="primary" @click="newTask">选择商户</el-button>
                </el-input>
              </el-form-item>
              <!-- 巡更规则 -->
              <el-form-item label="任务规则">
                <el-select v-model="form.value" placeholder="任务规则" @change="task">
                  <el-option
                    v-for="item in form.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 任务类型 -->
              <el-form-item label="任务类型">
                <el-select v-model="form.value1" placeholder="任务类型" @change="task1">
                  <el-option
                    v-for="item in form.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 默认分配人员 -->
              <el-form-item label="默认执行人" v-if="flag1">
                <el-radio v-model="form.radio1" label="1" @change="zhiXing1">
                  <el-select
                    v-model="form.value5"
                    filterable
                    placeholder="请选择"
                    @change="danXuan"
                    :disabled="disabled2"
                  >
                    <el-option
                      v-for="item in form.options5"
                      :key="item.uid"
                      :label="item.vserName"
                      :value="item.uid"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="默认执行组" v-if="flag1">
                <el-radio v-model="form.radio1" label="2" @change="zhiXing1">
                  <el-select
                    v-model="form.value9"
                    filterable
                    placeholder="请选择"
                    @change="danXuan1"
                    :disabled="disabled3"
                  >
                    <el-option
                      v-for="item in form.options9"
                      :key="item.id"
                      :label="item.groupName"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <!-- 调班起始日期 -->
              <el-form-item label="调班起始日期" v-if="flag1">
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0"
                  @change="actionTime"
                ></el-date-picker>
              </el-form-item>
              <!-- 调班周期 -->
              <el-form-item label="调班周期" v-if="flag1">
                <el-input
                  v-model="form.cycle"
                  placeholder="调班周期"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                ></el-input>
              </el-form-item>
              <!-- 唯一选择 -->
              <el-form-item label="执行人1" v-if="!flag1">
                <el-radio v-model="form.radio" label="1" @change="zhiXing">
                  <el-select
                    v-model="form.value6"
                    filterable
                    placeholder="请选择"
                    @change="zhiXingRen"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in form.options6"
                      :key="item.uid"
                      :label="item.vserName"
                      :value="item.uid"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="执行组1" v-if="!flag1">
                <el-radio v-model="form.radio" label="2" @change="zhiXing">
                  <el-select
                    v-model="form.value8"
                    filterable
                    placeholder="请选择"
                    @change="zhiXingZu"
                    :disabled="disabled1"
                  >
                    <el-option
                      v-for="item in form.options8"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <!-- 人员选择 -->
              <el-form-item label="执行人" v-if="flag1">
                <el-radio v-model="form.radio" label="1" @change="zhiXing2">
                  <el-select
                    v-model="form.value2"
                    filterable
                    multiple
                    placeholder="请选择"
                    @change="duoXuan"
                    :disabled="disabled4"
                  >
                    <el-option
                      v-for="item in form.options2"
                      :key="item.uid"
                      :label="item.vserName"
                      :value="item.uid"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="执行组" v-if="flag1">
                <el-radio v-model="form.radio" label="2" @change="zhiXing2">
                  <el-select
                    v-model="form.value10"
                    filterable
                    multiple
                    placeholder="请选择"
                    @change="duoXuan1"
                    :disabled="disabled5"
                  >
                    <el-option
                      v-for="item in form.options10"
                      :key="item.id"
                      :label="item.groupName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="任务提醒">
                逾期前
                <el-input v-model="form.time1" style="width:30%"></el-input>&nbsp;分钟提醒
              </el-form-item>
              <el-form-item label>
                提醒对象
                <el-checkbox v-model="form.checked" @change="tiXingObj">商户</el-checkbox>
                <el-checkbox v-model="form.checked1" @change="tiXingObj1">执行人</el-checkbox>
              </el-form-item>
              <el-form-item label="逾期提醒">
                提醒对象
                <el-checkbox v-model="form.checked2" @change="yuQiObj">商户</el-checkbox>
                <el-checkbox v-model="form.checked3" @change="yuQiObj1">执行人</el-checkbox>
              </el-form-item>
              <el-form-item label="逾期提醒">
                提醒方式
                <el-checkbox v-model="form.checked4" @change="tiXingFangFa">微信模板消息</el-checkbox>
              </el-form-item>
              <el-form-item label="备注描述">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.massage"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="检查项">
                <el-input v-model="form.checkXiang" placeholder="检查项">
                  <el-button slot="append" type="primary" @click="newTask1">选择检查项</el-button>
                </el-input>
              </el-form-item>
            </div>
            <!-- 商户 -->
            <div style="border-left:1px solid #000;padding-left:10px;width: 60%;" v-if="flag2">
              <el-row :span="23">
                <el-col :span="8">
                  <el-select v-model="form.value3" placeholder="建筑" @change="comPanyId">
                    <el-option
                      v-for="item in form.options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.value4" placeholder="楼层" @change="floor">
                    <el-option
                      v-for="item in form.options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <!-- 表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                height="350px"
                row-key="id"
                @selection-change="handleSelectionChange"
                @select-all="selectAll"
                @select="eidtCheck"
              >
                <el-table-column type="selection" :reserve-selection="true"></el-table-column>
                <el-table-column prop="building_name" label="建筑"></el-table-column>
                <el-table-column prop="floor_name" label="楼层"></el-table-column>
                <el-table-column prop="retail_format_name" label="业态类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="shop_name" label="商户名称" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
            <!-- 检查项 -->
            <div style="border-left:1px solid #000;padding-left:10px;width: 55%;" v-if="flag3">
              <el-row :span="23">
                <el-col :span="8">
                  <el-select v-model="form.value7" placeholder="检查项类型" @change="checkType">
                    <el-option
                      v-for="item in form.options7"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <!-- 表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData4"
                tooltip-effect="dark"
                style="width: 100%"
                height="350px"
                row-key="id"
                @selection-change="handleSelectionChange1"
                @select-all="selectAll1"
                @select="eidtCheck1"
              >
                <el-table-column type="selection" :reserve-selection="true"></el-table-column>
                <el-table-column prop="check_type" label="检查项类型" :formatter="checkType1" />
                <el-table-column prop="check_item_description" label="检查项描述" />
                <el-table-column
                  prop="input_tip"
                  label="输入提示"
                  show-overflow-tooltip
                  :formatter="tip"
                />
                <el-table-column
                  prop="checkItemDetailBeanList"
                  label="正确值判断"
                  show-overflow-tooltip
                  :formatter="judeg"
                />
              </el-table>
            </div>
          </div>
          <!-- 已勾选的商户 -->
          <p style="font-size:20px;color:#000" v-if="flag2">已勾商户↓</p>
          <el-table :data="tableData1" style="width: 100%" height="251px" v-if="flag2">
            <el-table-column prop="building_name" label="建筑"></el-table-column>
            <el-table-column prop="floor_name" label="楼层"></el-table-column>
            <el-table-column prop="retail_format_name" label="业态类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shop_name" label="商户名称" show-overflow-tooltip></el-table-column>
          </el-table>
          <!-- 检查项 -->
          <p style="font-size:20px;color:#000" v-if="flag3">已勾检查项↓</p>
          <el-table :data="tableData5" style="width: 100%" height="251px" v-if="flag3">
            <el-table-column prop="check_type" label="检查项类型" :formatter="checkType1" />
            <el-table-column prop="check_item_description" label="检查项描述" />
            <el-table-column prop="input_tip" label="输入提示" show-overflow-tooltip :formatter="tip" />
            <el-table-column
              prop="checkItemDetailBeanList"
              label="正确值判断"
              show-overflow-tooltip
              :formatter="judeg"
            />
          </el-table>
        </el-form>
        <!-- 按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="end">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑 -->
    <div>
      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible1"
        width="80%"
        :before-close="handleClose"
        top="1vh"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <div class="flex">
            <div :class="flag2||flag3?'biaoDan':'biaoDan1'">
              <!-- 任务名称 -->
              <el-form-item label="任务名称">
                <el-input v-model="form.renWuName" placeholder="任务名称" />
              </el-form-item>
              <!-- 任务名称 -->
              <el-form-item label="商户名称">
                <el-input v-model="form.taskName" placeholder="商户名称" @input="ipt" :disabled="true">
                  <!-- 选择商户 -->
                  <el-button slot="append" type="info" plain @click="newTask" :disabled="true">选择商户</el-button>
                </el-input>
              </el-form-item>
              <!-- 巡更规则 -->
              <el-form-item label="巡更规则">
                <el-select v-model="form.value" placeholder="任务规则" @change="task">
                  <el-option
                    v-for="item in form.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 任务类型 -->
              <el-form-item label="任务类型1">
                <el-select v-model="form.value1" placeholder="任务类型" @change="task1">
                  <el-option
                    v-for="item in form.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 默认分配人员 -->
              <el-form-item label="默认执行人" v-if="flag1">
                <el-radio v-model="form.radio1" label="1" @change="zhiXing1">
                  <el-select
                    v-model="form.value5"
                    filterable
                    placeholder="请选择"
                    @change="danXuan"
                    :disabled="disabled2"
                  >
                    <el-option
                      v-for="item in form.options5"
                      :key="item.uid"
                      :label="item.vserName"
                      :value="item.uid"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="默认执行组" v-if="flag1">
                <el-radio v-model="form.radio1" label="2" @change="zhiXing1">
                  <el-select
                    v-model="form.value9"
                    filterable
                    placeholder="请选择"
                    @change="danXuan1"
                    :disabled="disabled3"
                  >
                    <el-option
                      v-for="item in form.options9"
                      :key="item.id"
                      :label="item.groupName"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <!-- 调班起始日期 -->
              <el-form-item label="调班起始日期" v-if="flag1">
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0"
                  @change="actionTime"
                ></el-date-picker>
              </el-form-item>
              <!-- 调班周期 -->
              <el-form-item label="调班周期" v-if="flag1">
                <el-input
                  v-model="form.cycle"
                  placeholder="调班周期"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  @input="ipt1"
                ></el-input>
              </el-form-item>
              <!-- 唯一选择 -->
              <el-form-item label="执行人1" v-if="!flag1">
                <el-radio v-model="form.radio" label="1" @change="zhiXing">
                  <el-select
                    v-model="form.value6"
                    filterable
                    placeholder="请选择"
                    @change="zhiXingRen"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in form.options6"
                      :key="item.uid"
                      :label="item.vserName"
                      :value="item.uid"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="执行组1" v-if="!flag1">
                <el-radio v-model="form.radio" label="2" @change="zhiXing">
                  <el-select
                    v-model="form.value8"
                    filterable
                    placeholder="请选择"
                    @change="zhiXingZu"
                    :disabled="disabled1"
                  >
                    <el-option
                      v-for="item in form.options8"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <!-- 人员选择 -->
              <el-form-item label="执行人2" v-if="flag1">
                <el-radio v-model="form.radio" label="1" @change="zhiXing2">
                  <el-select
                    v-model="form.value2"
                    filterable
                    multiple
                    placeholder="请选择"
                    @change="duoXuan"
                    :disabled="disabled4"
                  >
                    <el-option
                      v-for="item in form.options2"
                      :key="item.uid"
                      :label="item.vserName"
                      :value="item.uid"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="执行组" v-if="flag1">
                <el-radio v-model="form.radio" label="2" @change="zhiXing2">
                  <el-select
                    v-model="form.value10"
                    filterable
                    multiple
                    placeholder="请选择"
                    @change="duoXuan1"
                    :disabled="disabled5"
                  >
                    <el-option
                      v-for="item in form.options10"
                      :key="item.id"
                      :label="item.groupName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-radio>
              </el-form-item>
              <el-form-item label="任务提醒">
                逾期前
                <el-input v-model="form.time1" style="width:30%"></el-input>&nbsp;分钟提醒
              </el-form-item>
              <el-form-item label>
                提醒对象
                <el-checkbox v-model="form.checked" @change="tiXingObj">商户</el-checkbox>
                <el-checkbox v-model="form.checked1" @change="tiXingObj1">执行人</el-checkbox>
              </el-form-item>
              <el-form-item label="逾期提醒">
                提醒对象
                <el-checkbox v-model="form.checked2" @change="yuQiObj">商户</el-checkbox>
                <el-checkbox v-model="form.checked3" @change="yuQiObj1">执行人</el-checkbox>
              </el-form-item>
              <el-form-item label="逾期提醒">
                提醒方式
                <el-checkbox v-model="form.checked4" @change="tiXingFangFa">微信模板消息</el-checkbox>
              </el-form-item>
              <el-form-item label="备注描述1">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.massage"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="检查项">
                <el-input v-model="form.checkXiang" placeholder="检查项">
                  <el-button slot="append" type="primary" @click="newTask1">选择检查项</el-button>
                </el-input>
              </el-form-item>
            </div>
            <!-- 商户 -->
            <div style="border-left:1px solid #000;padding-left:10px;width: 55%;" v-if="flag2">
              <el-row :span="23">
                <el-col :span="8">
                  <el-select v-model="form.value3" placeholder="建筑" @change="comPanyId">
                    <el-option
                      v-for="item in form.options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.value4" placeholder="楼层" @change="floor">
                    <el-option
                      v-for="item in form.options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <!-- 表格 -->
              <el-table
                ref="multipleTable1"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                height="350px"
                row-key="id"
                @selection-change="handleSelectionChange"
                @select-all="selectAll"
                @select="eidtCheck"
              >
                <el-table-column type="selection" :reserve-selection="true"></el-table-column>
                <el-table-column prop="building_name" label="建筑"></el-table-column>
                <el-table-column prop="floor_name" label="楼层"></el-table-column>
                <el-table-column prop="retail_format_name" label="业态类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="shop_name" label="商户名称" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
            <!-- 检查项 -->
            <div style="border-left:1px solid #000;padding-left:10px;width: 60%;" v-if="flag3">
              <el-row :span="23">
                <el-col :span="8">
                  <el-select v-model="form.value7" placeholder="检查项类型" @change="checkType">
                    <el-option
                      v-for="item in form.options7"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <!-- 表格 -->
              <el-table
                ref="multipleTable1"
                :data="tableData4"
                tooltip-effect="dark"
                style="width: 100%"
                height="350px"
                row-key="id"
                @selection-change="handleSelectionChange1"
                @select-all="selectAll1"
                @select="eidtCheck1"
              >
                <el-table-column type="selection" :reserve-selection="true"></el-table-column>
                <el-table-column prop="check_type" label="检查类型"></el-table-column>
                <el-table-column prop="check_item_description" label="检查项描述"></el-table-column>
                <el-table-column
                  prop="input_tip"
                  label="输入提示"
                  show-overflow-tooltip
                  :formatter="tip"
                ></el-table-column>
                <el-table-column
                  prop="checkItemDetailBeanList"
                  label="正确值判断"
                  show-overflow-tooltip
                  :formatter="judeg"
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 已勾选的商户 -->
          <p style="font-size:20px;color:#000" v-if="flag2">已勾选商户↓</p>
          <el-table :data="tableData1" style="width: 100%" height="251px" v-if="flag2">
            <el-table-column prop="building_name" label="建筑"></el-table-column>
            <el-table-column prop="floor_name" label="楼层"></el-table-column>
            <el-table-column prop="retail_format_name" label="业态类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shop_name" label="商户名称" show-overflow-tooltip></el-table-column>
          </el-table>
          <!-- 检查项 -->
          <p style="font-size:20px;color:#000" v-if="flag3">已勾检查项↓</p>
          <el-table :data="tableData7" style="width: 100%" height="251px" v-if="flag3">
            <el-table-column prop="check_type" label="检查项类型" :formatter="checkType1" />
            <el-table-column prop="check_item_description" label="检查项描述" />
            <el-table-column prop="input_tip" label="输入提示" show-overflow-tooltip :formatter="tip" />
            <el-table-column
              prop="checkItemDetailBeanList"
              label="正确值判断"
              show-overflow-tooltip
              :formatter="judeg"
            />
          </el-table>
        </el-form>
        <!-- 按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="editEnd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  addCheckTask, //新增自检任务
  updateCheckTask, //编辑自检任务
  listCheckTask, //获取自检任务list
  removeCheckTask, //删除自检任务
  getList, //商户list
  getGroups,
  getListFormat, //获取业态list
  listCheckItem //检查项
} from '@/api/iguard/lockageCheck'
import {
  getCompanyAllUser //全部人list
} from '@/api/iguard/checkTask'
import {
  getTaskRulesByParam //任务规则
} from '@/api/iguard/taskRule'
import {
  getCompanyDeptByCompanyId,
  getBuildingLocationFloor
} from '@/api/iguard/incidentOrder'
import Pagination from '@/components/Pagination' // Secondary
export default {
  components: { Pagination },
  data() {
    return {
      input: '', //查看详情查询的被分配人
      pickerOptions0: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7 //如果没有后面的-8.64e7就是不可以选择今天的
          return time.getTime() < Date.now() //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      disabled: true,
      disabled1: true,
      disabled2: true,
      disabled3: true,
      disabled4: true,
      disabled5: true,
      listQuery: {
        page: 1,
        pageSize: 50,
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId')
      },
      listQuery1: {
        page: 1,
        pageSize: 50,
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId')
      },
      listQuery2: {
        //新增编辑删除参数
        page: 1,
        pageSize: 50,
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId')
      },
      multipleSelection: [],
      multipleSelection1: [],
      value: '', //状态
      options: [
        {
          value: '',
          label: '全部（启用&停用）'
        },
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '停用'
        },
        {
          value: '2',
          label: '停用'
        }
      ], //状态
      yeTaiTypeId: '0', //业态类型
      yeTaiType: [
        {
          value: '0',
          label: '业态(全部)'
        }
      ], //业态类型
      locationId: '0', //建筑
      locationName: [
        {
          value: '0',
          label: '建筑(全部)'
        }
      ], //建筑
      floorId: '0', //楼层
      floorName: [
        {
          value: '0',
          label: '楼层(全部)'
        }
      ], //楼层
      shop_name: '', //商户名称
      name: '', //人员
      taskName: '', //任务名称
      dialogVisible: false, //新增弹出框
      dialogVisible1: false, //编辑弹出框
      checked: '',
      checked1: '',
      flag: true,
      flag1: false,
      flag2: false, //巡更点选择表格隐藏显示
      flag3: false, //检查项选择表格隐藏显示
      form: {
        renWuName: '',
        radio: '',
        radio1: '',
        radio2: '',
        time: '', //调班起始日期
        taskName: '', //任务名称
        cycle: '', //调班周期
        value: '', //巡更规则
        options: [], //巡更规则
        value1: '0', //巡更人员
        options1: [
          {
            value: '0',
            label: '指定人员'
          },
          {
            value: '1',
            label: '周期调班'
          }
        ], //巡更人员
        value2: '', //人员选择
        options2: [], //人员选择
        value3: '0', //建筑
        options3: [
          {
            value: '0',
            label: '建筑(全部)'
          }
        ], //建筑
        value4: '0', //楼层
        options4: [
          {
            value: '0',
            label: '楼层(全部)'
          }
        ], //楼层
        value5: '', //默认分执行人员
        options5: [], //默认分执行人员
        value9: '', //默认分执行组
        options9: [], //默认分执行组
        value10: '', //默认分执行组
        options10: [], //默认分执行组
        value6: '', //人员选择
        options6: [], //人员选择
        value7: '', //检查项类型
        options7: [
          {
            value: '',
            label: '检查项(全部)'
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
        ], //检查项类型
        value8: '', //执行组
        options8: [], //执行组
        time1: '', //逾期前多久通知
        checked: false, //通知商户
        checked1: false, //通知执行人
        checked2: false, //逾期通知商户
        checked3: false, //逾期通知执行人
        checked4: true, //逾期提醒方式
        massage: '',
        checkXiang: ''
      },
      tableData: [], //全部的任务list
      tableData1: [], //勾选的任务list
      tableData2: [], //任务展示list
      tableData4: [], //新增检查项list
      tableData5: [], //新增检查项已勾选list
      tableData6: [], //编辑检查项list
      tableData7: [], //编辑检查项已勾选list
      num: {},
      total: 0, //总条数
      total1: 0, //详情总条数
      loading: true,
      facePatrolPointIdsArr: [],
      locationPatrolPointIdsArr: [],
      arr: [], //商户选择
      arr1: [], //检查项选择
      shangHuNameArr: [], //商户选择
      shangHuNameArr1: [], //检查项选择
      tiXing: '',
      tiXing1: '',
      newTaskList: {
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId'),
        check_type: '0',
        remindBean: [
          {
            remind_type: '',
            remind_role: ''
          },
          {
            remind_type: '',
            remind_role: ''
          },
          {
            remind_way: '0', //0：微信模板化消息 1：短信
            remind_type: '2',
            remind_role: ''
          }
        ]
      } //新增任务对象
    }
  },
  mounted() {
    this.tbEventTypeConfig()
    this.companyDept(localStorage.getItem('companyId'))
    this.getTaskList()
    this.taskGuanLi()
    this.gongZuoZu()
    this.listFormat()
    this.getListCheck()
    JSON.parse(localStorage.getItem('vip')).forEach(item => {
      if (localStorage.getItem('vipStatus') == item.id) {
        this.num = item
      }
    })
  },
  methods: {
    jianZhu(val) {
      console.log(val)
      this.getFloor(val)
    },
    louCeng(val) {
      console.log(val)
    },
    yeTai(val) {
      console.log(val)
    },
    // 格式化表格内容
    moRen(scope) {
      if (scope.check_type == 0) {
        let name = ''
        if (scope.manage_role != null) {
          this.form.options8.forEach(item => {
            if (item.id == scope.manage_role) {
              name = item.groupName
            }
          })
          return name
        } else {
          return scope.default_name
        }
      } else if (scope.check_type == 1) {
        let name = ''
        if (scope.manage_role != null) {
          this.form.options8.forEach(item => {
            if (item.groupManage == scope.manage_role) {
              name = item.groupName
            }
          })
          return name
        } else {
          return scope.default_name
        }
      }
    },
    moRen1(scope) {
      if (scope.check_type == 0) {
        return '-'
      } else if (scope.check_type == 1) {
        let name = []
        if (scope.allocation_role != null) {
          let arr = []
          for (let i = 0; i < scope.allocation_role.split(',').length; i++) {
            for (let j = 0; j < this.form.options8.length; j++) {
              if (
                this.form.options8[j].groupManage ==
                scope.allocation_role.split(',')[i]
              ) {
                arr.push(this.form.options8[j])
              }
            }
          }
          arr.forEach(item => {
            name.push(item.groupName)
          })
          return name.join(',')
        } else {
          return scope.allocation_user_names
        }
      }
    },

    kongJian(scope) {
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
    // 格式化检查项list内容
    checkType1(scope) {
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
    // 获取list
    async getListCheck() {
      try {
        const res = await listCheckItem(this.listQuery)
        console.log(res)
        this.tableData4 = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async updataTask(obj) {
      try {
        const res = await updateCheckTask(obj)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取所有工作组
    async gongZuoZu() {
      try {
        const res = await getGroups({
          uid: localStorage.getItem('uid'),
          company_id: localStorage.getItem('companyId')
        })
        console.log(res)
        this.form.options8 = res.data
        this.form.options8.forEach(item => {
          this.$set(item, 'value', item.id.toString())
          this.$set(item, 'label', item.groupName)
        })
        this.form.options9 = res.data
        this.form.options9.forEach(item => {
          this.$set(item, 'value', item.id.toString())
          this.$set(item, 'label', item.groupName)
        })
        this.form.options10 = res.data
        this.form.options10.forEach(item => {
          this.$set(item, 'value', item.id.toString())
          this.$set(item, 'label', item.groupName)
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 任务规则
    async taskRule() {
      try {
        const res = await getTaskRulesByParam({
          uid: localStorage.getItem('uid')
        })
        this.form.options = res.data.rows
        this.form.options.forEach(item => {
          this.$set(item, 'value', item.id)
          this.$set(item, 'label', item.ruleName)
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    // 查询公司下所有人
    async tbEventTypeConfig() {
      try {
        const res = await getCompanyAllUser(localStorage.getItem('uid'))
        this.form.options2 = res.result
        this.form.options2.forEach(item => {
          this.$set(item, 'value', item.uid)
          this.$set(item, 'label', item.vserName)
        })
        this.form.options5 = res.result
        this.form.options5.forEach(item => {
          this.$set(item, 'value', item.uid)
          this.$set(item, 'label', item.vserName)
        })
        // 下面是新增人选选择
        this.form.options6 = res.result
        this.form.options6.forEach(item => {
          this.$set(item, 'value', item.uid)
          this.$set(item, 'label', item.vserName)
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询是否还可以据需报事
    async checkTaskAdd(obj) {
      try {
        const res = await checkAddTask(localStorage.getItem('deptid'))
        this.newAdd(obj)
      } catch (err) {
        console.log(err)
      }
    },
    //格式化时间
    startTime(row, column, cellValue, index) {
      let date = new Date(cellValue)
      var Y = date.getFullYear() + '-'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

      return Y + M + D + h + m
    },
    endTime(row, column, cellValue, index) {
      let date = new Date(cellValue)
      var Y = date.getFullYear() + '-'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

      return Y + M + D + h + m
    },

    // 任务管理List
    async taskGuanLi() {
      try {
        const res = await listCheckTask(this.listQuery1)
        console.log(res)
        this.loading = false
        // this.total = res.data.records
        this.total = 15
        this.tableData2 = res.data
        this.tableData2.forEach(item => {
          if (item.stopTag == 0) {
            this.$set(item, 'stop', '启用')
            this.$set(item, 'stop1', '停用')
          } else {
            this.$set(item, 'stop', '停用')
            this.$set(item, 'stop1', '启用')
          }
          // ---------------------------------------
          if (item.check_type == 0) {
            this.$set(item, 'patroType1', '唯一指定')
          } else if (item.check_type == 1) {
            this.$set(item, 'patroType1', '周期调班')
          }
          // ---------------------------------------
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    // 删除
    async delete(id) {
      try {
        const res = await removeCheckTask(id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.taskGuanLi()
      } catch (e) {
        console.log(e)
      }
    },
    // 新增按钮
    xinZeng() {
      this.dialogVisible = true
      this.getTaskList()
      this.taskRule()
    },
    //新增巡更点
    newTask() {
      this.flag3 = false
      if (!this.flag2) {
        this.flag2 = true
      } else {
        this.flag2 = false
      }
    },
    //新增检查项
    newTask1() {
      this.flag2 = false
      if (!this.flag3) {
        this.flag3 = true
      } else {
        this.flag3 = false
      }
    },
    // 检查项选择
    checkType(val) {
      console.log('我是检查项选择')
      console.log(val)
      this.listQuery.check_type = val
      this.getListCheck()
    },
    // 编辑巡更点
    edit(scope) {
      console.log(scope)
      this.getTaskList()
      this.taskRule()
      this.gongZuoZu()
      console.log(this.form.options8)
      console.log('this.form.options8')
      this.flag3 = true
      let obj = scope.row
      this.dialogVisible1 = true
      this.form.renWuName = obj.task_name
      this.form.massage = obj.remark_description
      this.form.value = obj.rule_id
      this.form.value1 = JSON.stringify(obj.check_type)
      this.form.time1 = obj.remindBean[0].after_time
      this.form.taskName = obj.shop_name
      // ------------------------------------------------------------
      this.newTaskList.remindBean[0].after_time = obj.remindBean[0].after_time
      this.newTaskList.remindBean[0].remind_role = obj.remindBean[0].remind_role
      this.tiXing = obj.remindBean[0].remind_role
      this.newTaskList.remindBean[0].remind_type = obj.remindBean[0].remind_type
      this.newTaskList.remindBean[1].remind_role = obj.remindBean[1].remind_role
      this.newTaskList.remindBean[1].remind_type = obj.remindBean[1].remind_type
      this.tiXing1 = obj.remindBean[1].remind_role
      this.newTaskList.remindBean[2].remind_type = obj.remindBean[2].remind_type
      this.newTaskList.remindBean[2].remind_way = obj.remindBean[2].remind_way
      // ------------------------------------------------------------

      if (obj.remindBean[0].remind_role == 0) {
        this.form.checked = true
      } else if (obj.remindBean[0].remind_role == 1) {
        this.form.checked1 = true
      }
      if (obj.remindBean[1].remind_role == 0) {
        this.form.checked2 = true
      } else if (obj.remindBean[1].remind_role == 1) {
        this.form.checked3 = true
      }
      if (obj.remindBean[2].remind_role == 0) {
        this.form.checked4 = true
      }

      if (obj.check_type == '0') {
        if (obj.manage_role == null || obj.manage_role == '') {
          this.flag1 = false
          this.disabled = false
          this.form.radio = '1'
          this.form.value6 = obj.default_uid
          this.newTaskList.manage_role = '0'
        } else {
          this.flag1 = false
          this.disabled1 = false
          this.form.radio = '2'
          this.form.value8 = obj.manage_role

          this.newTaskList.manage_role = '1'
        }
      } else if (obj.check_type == '1') {
        this.flag1 = true
        this.form.time = obj.adjust_start_time
        this.form.cycle = obj.adjust_cycle
        if (obj.allocation_role == null || obj.allocation_role == '') {
          if (obj.manage_role == null || obj.manage_role == '') {
            this.form.radio1 = '1'
            this.disabled2 = false
            this.disabled4 = false
            this.form.value5 = obj.default_uid
            this.form.value2 = obj.allocation_user_ids.split(',')
          } else {
            this.disabled3 = false
            this.disabled4 = false
            this.form.radio1 = '2'
            this.form.radio = '1'
            this.form.value9 = obj.default_uid
            this.form.value2 = obj.allocation_user_ids.split(',')
          }
        } else {
          if (obj.manage_role == null || obj.manage_role == '') {
            this.form.radio1 = '1'
            this.disabled2 = false
            this.disabled4 = false
            this.form.value5 = obj.default_uid
            this.form.value2 = obj.allocation_user_ids.split(',')
          } else {
            this.form.radio1 = '2'
            this.form.radio = '2'
            this.disabled3 = false
            this.disabled5 = false
            this.form.value9 = obj.default_uid
            this.form.value10 = obj.allocation_user_ids.split(',')
          }
        }
      }
      let checkIds = obj.check_item_ids.split(',')
      for (let i = 0; i < checkIds.length; i++) {
        for (let j = 0; j < this.tableData4.length; j++) {
          if (this.tableData4[j].id == checkIds[i]) {
            this.tableData7.push(this.tableData4[j])
          }
        }
      }
      // ------------------------------------检查项已勾选的显示勾选
      this.$nextTick(() => {
        this.tableData7.forEach(item => {
          this.$refs.multipleTable1.toggleRowSelection(item, true)
        })
      })
      // ------------------------------------

      console.log(this.tableData)
      console.log(this.newTaskList)
      this.newTaskList.id = obj.id
      this.newTaskList.check_type = obj.check_type
      this.newTaskList.check_item_ids = obj.check_item_ids
      this.newTaskList.default_uid = obj.default_uid
      this.newTaskList.rule_id = obj.rule_id
      this.newTaskList.task_name = obj.task_name
      this.newTaskList.shop_name = obj.shop_name
      this.newTaskList.adjust_start_time = obj.adjust_start_time
      this.newTaskList.adjust_cycle = obj.adjust_cycle
      this.newTaskList.allocation_user_ids = obj.allocation_user_ids
      this.newTaskList.shop_ids = obj.shop_ids
    },
    // 编辑任务名称
    ipt(val) {
      this.newTaskList.taskName = val
    },
    // 编辑调班周期
    ipt1(val) {
      this.newTaskList.trimWorkCycle = val
    },
    // 编辑确定
    editEnd() {
      let newArr = []
      this.tableData7.forEach(item => {
        newArr.push(item.id)
      })
      this.newTaskList.check_item_ids = newArr.join()
      this.newTaskList.adjust_cycle = this.form.cycle
      if (this.tableData7.length == 0) {
        this.$message({
          message: '请选择检查项',
          type: 'warning'
        })
      } else {
        this.newTaskList.remark_description = this.form.massage //备注描述
        this.newTaskList.task_name = this.form.renWuName //任务名称
        console.log(this.newTaskList)
        this.updataTask(this.newTaskList)
        // console.log(this.newTaskList)
        // console.log(this.tableData1)
      }
    },
    // 删除
    shanChu(scope) {
      this.delete({
        id: scope.row.id,
        uid: localStorage.getItem('uid'),
        company_id: localStorage.getItem('companyId')
      })
    },

    // 停用and启用
    async taskStop(obj) {
      try {
        const res = await stopCheckTask(obj)
        setTimeout(() => {
          this.taskGuanLi()
        }, 100)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    // 停用and启用
    stop(scope) {
      let obj = scope.row.id
      console.log(scope)
      this.taskStop(obj)
    },
    // 部门
    company(value) {
      console.log(value)
      this.listQuery1.deptId = value
    },
    // 关闭弹出窗时需要确认
    handleClose(done) {
      this.$confirm('确认关闭？关闭后页面将刷新')
        .then(_ => {
          history.go(0)
          done()
        })
        .catch(_ => {})
    },
    // 状态
    state(val) {
      this.listQuery1.stopTag = val
    },
    // 巡更规则
    task(val) {
      console.log(val)
      this.newTaskList.rule_id = val
    },
    async getTaskList() {
      try {
        const res = await getList(this.listQuery)
        console.log(res)
        this.tableData = res.data
      } catch (e) {
        console.log(e)
      }
    },
    // 巡更人员
    task1(val) {
      console.log(val)
      if (val == 0) {
        this.flag1 = false
        this.newTaskList.check_type = '0'
      } else {
        this.flag1 = true
        this.newTaskList.check_type = '1'
      }
    },
    // 人员选择
    duoXuan(val) {
      console.log(val)
      this.newTaskList.allocation_user_ids = val.join(',')
    },
    // 组选择
    duoXuan1(val) {
      console.log(val)

      // this.newTaskList.allocation_user_ids = renId.join(',')
      this.newTaskList.allocation_role = val.join(',')
    },
    // 是否勾选人脸核验
    check(val) {
      console.log(val)
      if (val.row.checked == true) {
        this.facePatrolPointIdsArr.push(val.row.id)
      } else {
        if (this.facePatrolPointIdsArr.indexOf(val.row.id) != -1) {
          this.facePatrolPointIdsArr.splice(
            this.facePatrolPointIdsArr.indexOf(val.row.id),
            1
          )
        }
      }
      this.newTaskList.faceDeviceIds = this.facePatrolPointIdsArr.join()
      console.log(this.newTaskList.faceDeviceIds)
    },
    // 编辑是否勾选人脸核验
    check1(val) {
      this.newTaskList.faceDeviceIds.split(',').forEach(item => {
        if (item != '') {
          this.facePatrolPointIdsArr = this.newTaskList.faceDeviceIds.split(',')
        }
      })
      if (val.row.checked == false) {
        if (this.facePatrolPointIdsArr.indexOf(val.row.id) != -1) {
          this.facePatrolPointIdsArr.splice(
            this.facePatrolPointIdsArr.indexOf(val.row.id),
            1
          )
        }
      } else {
        this.facePatrolPointIdsArr.push(val.row.id)
      }
      console.log(this.facePatrolPointIdsArr)
      console.log('this.facePatrolPointIdsArr')
      this.newTaskList.faceDeviceIds = this.facePatrolPointIdsArr.join()
      console.log(this.newTaskList.faceDeviceIds)
    },
    // 新增位置核验
    check2(val) {
      console.log(val.row.patrolPointId)
      if (val.row.checked1 == true) {
        this.locationPatrolPointIdsArr.push(val.row.patrolPointId)
      } else {
        if (
          this.locationPatrolPointIdsArr.indexOf(val.row.patrolPointId) != -1
        ) {
          this.locationPatrolPointIdsArr.splice(
            this.locationPatrolPointIdsArr.indexOf(val.row.patrolPointId),
            1
          )
        }
      }
      this.newTaskList.checkPatrolPointIds = this.locationPatrolPointIdsArr.join()
      console.log(this.newTaskList.checkPatrolPointIds)
    },
    // 编辑位置核验
    check3(val) {
      this.newTaskList.checkPatrolPointIds.split(',').forEach(item => {
        if (item != '') {
          this.locationPatrolPointIdsArr = this.newTaskList.checkPatrolPointIds.split(
            ','
          )
        }
      })
      if (val.row.checked1 == false) {
        if (
          this.locationPatrolPointIdsArr.indexOf(val.row.patrolPointId) != -1
        ) {
          this.locationPatrolPointIdsArr.splice(
            this.locationPatrolPointIdsArr.indexOf(val.row.patrolPointId),
            1
          )
        }
      } else {
        this.locationPatrolPointIdsArr.push(val.row.patrolPointId)
      }
      this.newTaskList.checkPatrolPointIds = this.locationPatrolPointIdsArr.join()
    },
    // 默认人员分配
    danXuan(val) {
      console.log(val)
      this.newTaskList.default_uid = val
    },
    // 默认组分配
    danXuan1(val) {
      console.log(val)
      this.newTaskList.default_uid = val.groupManage
      this.newTaskList.manage_role = val.id
    },
    // 执行人选择
    zhiXingRen(val) {
      console.log(val)
      this.newTaskList.default_uid = val
    },
    // 执行组
    zhiXingZu(val) {
      console.log(val)
      console.log('val')
      // this.newTaskList.default_uid = val.groupManage
      this.newTaskList.manage_role = val
    },
    // 业态list
    async listFormat() {
      try {
        const res = await getListFormat(this.listQuery1)
        console.log(res)

        res.data.forEach(item => {
          this.yeTaiType.push({
            label: item.retail_format_name,
            value: item.id
          })
          this.options.push(item)
          this.$set(item, 'label', item.retail_format_name)
          this.$set(item, 'value', item.id)
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 获取公司下面的建筑
    async companyDept(company_id) {
      try {
        const res = await getCompanyDeptByCompanyId(company_id)
        res.result.forEach(item => {
          this.form.options3.push({
            value: item.id,
            label: item.locationName
          })
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
          this.form.options4.push({
            value: item.id,
            label: item.locationName
          })
          this.floorName.push({
            value: item.id,
            label: item.locationName
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 新增任务
    async newAdd(obj) {
      try {
        const res = await addCheckTask(obj)
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        // history.go(0)
        this.taskGuanLi()
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    floor(val) {
      if (val == 0) {
        this.listQuery.floor_id = ''
        this.getTaskList()
      } else {
        this.listQuery.floor_id = val
        this.getTaskList()
      }
      console.log(val)
    },
    // 时间不够前面补0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    // 周期性调班开始时间
    actionTime(value) {
      console.log(value)
      let start = new Date(value)
      this.newTaskList.adjust_start_time =
        this.p(start.getFullYear()) +
        '-' +
        this.p(start.getMonth() + 1) +
        '-' +
        this.p(start.getDate())
    },
    // 获取建筑ID
    comPanyId(val) {
      this.form.options4 = [
        {
          value: '',
          label: '全部'
        }
      ]
      if (val == 0) {
        this.listQuery.building_id = ''
        this.getTaskList()
        this.form.options4 = [
          {
            value: '',
            label: '全部'
          }
        ]
      } else {
        this.getFloor(val)
        this.listQuery.building_id = val
        this.getTaskList()
      }
      console.log(val)
    },
    // 确定新增
    end() {
      this.newTaskList.remark_description = this.form.massage //备注描述
      this.newTaskList.task_name = this.form.renWuName //任务名称
      this.newTaskList.adjust_cycle = this.form.cycle //调班周期
      this.newTaskList.remindBean.forEach(item => {
        //逾期前时间
        if (item.remind_type == 0) {
          item.after_time = this.form.time1
        } else {
          item.after_time = ''
        }
      })
      let newArr = []
      this.tableData1.forEach(item => {
        newArr.push(item.id)
      })
      let allocation_user_ids_Arr = []

      if (this.newTaskList.check_type == '0') {
        this.form.options8.forEach(item => {
          if (item.id == this.newTaskList.manage_role) {
            this.newTaskList.default_uid = item.groupManage
          }
        })
      } else if (this.newTaskList.check_type == '1') {
        this.form.options10.forEach(item => {
          this.newTaskList.allocation_role.split(',').forEach(item1 => {
            if (item.id == item1) {
              allocation_user_ids_Arr.push(item.groupManage)
            }
          })
        })
        this.newTaskList.allocation_user_ids = allocation_user_ids_Arr.join(',')
      }

      this.newAdd(this.newTaskList)
      console.log(this.newTaskList)
      console.log('this.newTaskList')
    },
    allTask(val) {
      console.log(val)
      if (val == 0) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    // 多选如果勾选去掉，就把人脸、位置核验去掉
    eidtCheck(selection, row) {
      // console.log(row)
      // console.log(this.newTaskList)
    },
    // 多选如果勾选去掉，就把人脸、位置核验去掉
    eidtCheck1(selection, row) {
      // console.log(row)
      // console.log(this.newTaskList)
    },
    // 全选
    selectAll(selected) {
      if (selected.length == 0) {
        this.tableData1 = []
      }
    },
    // 全选
    selectAll1(selected) {
      console.log(selected)
      console.log('selected')
      if (selected.length == 0) {
        this.tableData5 = []
      }
    },
    // 勾选商户，下面已勾选同步。
    handleSelectionChange(val) {
      console.log(val)
      let val1 = []
      val.forEach(item => {
        if (
          item.checkItemDetailBeanList == null ||
          item.checkItemDetailBeanList == undefined
        ) {
          val1.push(item)
        }
      })
      console.log('勾选商户')
      this.multipleSelection = val1
      this.arr = []
      this.shangHuNameArr = []
      val1.forEach(item => {
        this.arr.push(item.id)
        this.shangHuNameArr.push(item.shop_name)
      })
      this.form.taskName = this.shangHuNameArr.join(',')
      this.newTaskList.shop_ids = this.arr.join(',')

      this.tableData1 = val1
    },
    // 勾选检查项，下面已勾选同步。
    handleSelectionChange1(val) {
      console.log(val)
      console.log('勾选检查项')
      let val1 = []
      val.forEach(item => {
        if (
          item.checkItemDetailBeanList != null ||
          item.checkItemDetailBeanList != undefined
        ) {
          val1.push(item)
        }
      })
      this.multipleSelection1 = val
      this.arr1 = []
      this.shangHuNameArr1 = []
      val1.forEach(item => {
        this.arr1.push(item.id)
        this.shangHuNameArr1.push(item.check_item_description)
      })
      this.form.checkXiang = this.shangHuNameArr1.join(',')
      this.newTaskList.check_item_ids = this.arr1.join(',')
      this.tableData5 = val1
      this.tableData7 = val1
    },
    zhiXing(val) {
      console.log(val)
      if (val == 1) {
        this.disabled = false
        this.disabled1 = true
        this.newTaskList.manage_role = ''
      } else if (val == 2) {
        this.disabled = true
        this.disabled1 = false
        this.newTaskList.default_uid = ''
      }
    },
    zhiXing1(val) {
      console.log(val)
      if (val == 1) {
        this.disabled2 = false
        this.disabled3 = true
        this.newTaskList.manage_role = ''
      } else if (val == 2) {
        this.disabled2 = true
        this.disabled3 = false
        this.newTaskList.default_uid = ''
      }
    },
    zhiXing2(val) {
      console.log(val)
      if (val == 1) {
        this.disabled4 = false
        this.disabled5 = true
        this.newTaskList.allocation_role = ''
      } else if (val == 2) {
        this.disabled4 = true
        this.disabled5 = false
        this.newTaskList.allocation_user_ids = ''
      }
    },
    tiXingObj(val) {
      console.log(val)
      if (val == true) {
        this.tiXing = '0'
        this.form.checked1 = false
      } else {
        this.tiXing = ''
      }
      this.newTaskList.remindBean[0].remind_role = this.tiXing
      this.newTaskList.remindBean[0].remind_type = '0'
    },
    tiXingObj1(val) {
      console.log(val)
      if (val == true) {
        this.tiXing = '1'
        this.form.checked = false
      } else {
        this.tiXing = ''
      }
      this.newTaskList.remindBean[0].remind_role = this.tiXing
      this.newTaskList.remindBean[0].remind_type = '0'
    },
    yuQiObj(val) {
      console.log(val)
      if (val == true) {
        this.tiXing1 = '0'
        this.form.checked3 = false
      } else {
        this.tiXing1 = ''
      }
      this.newTaskList.remindBean[1].remind_role = this.tiXing1
      this.newTaskList.remindBean[1].remind_type = '1'
    },
    yuQiObj1(val) {
      console.log(val)
      if (val == true) {
        this.tiXing1 = '1'
        this.form.checked2 = false
      } else {
        this.tiXing1 = ''
      }
      this.newTaskList.remindBean[1].remind_role = this.tiXing1
      this.newTaskList.remindBean[1].remind_type = '1'
    },
    tiXingFangFa(val) {
      if (val == true) {
        this.newTaskList.remindBean[2].remind_way = '0'
        this.newTaskList.remindBean[2].remind_type = '2'
      } else {
        this.newTaskList.remindBean[2].remind_way = ''
        this.newTaskList.remindBean[2].remind_type = ''
      }
    },
    // 查询
    query() {
      this.listQuery1.shop_name = this.taskName
      this.listQuery1.defaultUserName = this.name
      this.listQuery1.shop_name = this.shop_name
      console.log(this.listQuery1)
      this.taskGuanLi()
    }
  }
}
</script>
<style lang='less' scoped>
.app-container {
  .el-select {
    width: 100%;
  }
  /deep/.el-radio__input {
    position: absolute;
    right: 0px;
    top: -20px;
  }
  .el-radio:last-child {
    width: 100%;
    margin-left: -8px;
  }
  .biaoDan {
    padding-right: 10px;
    overflow: auto;
    width: 600px;
    height: 500px;
  }
  .biaoDan1 {
    padding-right: 10px;
    width: 600px;
  }
  .pour {
    color: #44b3ff;
  }
  .flex {
    display: flex;
  }
}
</style>
<template>
  <div class="setting-signrecord bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="record-top">
      <button class="button-default" @click="goPage()"><label>新增签到</label></button>
    </div>
    <div class="record-center">
        <div class="content">
          <div class="c-td">签到日期</div>
          <div class="c-td">签到时间</div>
          <div class="c-td">积分</div>
          <div class="c-td">连续天数</div>
          <div class="c-td">状态</div>
        </div>
      <div class="content" v-for="(item,index) in recordList" v-show="index<numIndex">
        <div class="c-td message">{{item.signTime,1 | formatDate}}</div>
        <div class="c-td message">{{item.beginTime,2 |formatDate}}-{{item.endTime,2 |formatDate}}</div>
        <div class="c-td message">{{item.points}}</div>
        <div class="c-td message">{{item.continueDay}}</div>
        <div class="c-td message" v-if="item.status==1">已完成</div>
        <div class="c-td message" v-if="item.status==0">进行中</div>
        <div class="c-td message" v-if="item.status==2">未进行 <span @click="deleteRecord(item.id)">删除</span></div>
      </div>
    </div>
    <div class="record-bottom">
      <span class="more" v-show="numIndex<dataLength" @click="getMore()">查看更多</span>
      <span class="noContent" v-show="numIndex>=dataLength">没有更多内容</span>
    </div>

    <!--删除签到设置弹窗-->
    <van-popup v-model="isDelete" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          删除签到设置<span class="icon-close" @click="closeDelete()"></span>
        </div>
        <div class="delete-dialog">
          是否确定删除该签到设置?
        </div>
        <div class="dialog-default-bottom">
          <div @click="closeDelete()">取消</div>
          <div @click="comfirmDelete()">确定</div>
        </div>
      </div>
    </van-popup>




  </div>
</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui'
  import { formatDate } from '@/util/common.js'
  export default {
    components: {
      WHeader
    },
    name: 'w-setting-signrecord',
    data() {
      return {
        headerName: '签到记录',
        recordList:[],
        numIndex:10,
        dataLength:0,
        isDelete:false,
        isDeleteItemId:''
      }
    },
    created (){
      document.title = '签到记录';
    },
    mounted () {
      this.getRecordList();
    },
    methods:{
      //获取更多数据
      getMore(){
        var vm=this;
        vm.numIndex=vm.numIndex+10;
      },

      //删除记录
      deleteRecord(id){
        var vm=this;
        vm.isDeleteItemId=id;
        vm.isDelete=true;
      },

      closeDelete(){
        var vm=this;
        vm.isDelete=false;
      },

      comfirmDelete(){
        var vm=this;
        vm.isDelete=false;
        this.$http.get("/xiaov/signCenter/delSignConfig.do",{params:{id:vm.isDeleteItemId}}).then(function (res) {
          if(res.data.success){
            Toast("删除成功！");
            vm.getRecordList();
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })

      },


      //获取记录列表
      getRecordList(){
        var vm=this;
        this.$http.get("/xiaov/signCenter/signConfigHistory.do").then(function (res) {
          if(res.data.success){
              vm.recordList=res.data.result;
              vm.dataLength=vm.recordList.length;
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      goPage(){
        this.router.push({name:"w-setting-signin",params:{}});
      },

    },
    filters: {
      formatDate (time,num) {
        if(time==""){
          return "";
        }else{
          let date = new Date(time)
          if(num==1){
            return formatDate(date, 'yyyy-MM-dd')
          }else if(num==2){
            return formatDate(date, 'hh:mm')
          }
        }
      }
    },
  }
  </script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .delete-dialog{
    height: 60px;
    text-align: center;
    padding: 10px;
  }
  .record-top{
    background-color: $white;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 6px;
  }
  .record-top button{
    width: 90px;
  }
  .record-center .content{
    text-align: center;
    background-color: $white;
    height: 35px;
    line-height: 35px;
    border-top: 1px solid $border-color;
  }
  .record-center .content .c-td{
    display: inline-block;
    font-size: $assist-size;
  }
  .record-center .content .c-td:first-child{
    width: 20%;
  }
  .record-center .content .c-td:nth-child(2){
    width: 22%;
  }
  .record-center .content .c-td:nth-child(3){
    width: 15%;
  }
  .record-center .content .c-td:nth-child(4){
    width: 18%;
  }
  .record-center .content .c-td:nth-child(5){
    width: 20%;
  }
  .content .message{
    color: $shallow-black-color;
  }
  .content .message:last-child{
    color: $color-text;
  }
  .record-center .content:last-child{
    border-bottom: 1px solid $border-color;
  }
  .record-bottom{
    background-color: $white;
    padding-top: 10px;
    margin-top: 10px;
    font-size: $common-size;
    text-align: center;
  }
  .record-bottom .more{
    color: $color-text;
  }
  .record-bottom .none{
    color: $shallow-black-color;
  }
  </style>

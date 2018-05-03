<template>
  <div class="setting-sign bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="top-absol">
    <div class="sign-top">
      <div>
        <p>{{signNum}}</p>
        <p>今日总签到</p>
      </div>
      <div>
        <p>{{totalRank}}</p>
        <p>今日总排名</p>
      </div>

    </div>
    <div class="sign-center">
      <div>
        <button class="button-default" @click="toSign()"><label>点击签到</label></button>
          <button v-if="userType!=0" class="button-default" @click="toSetting()"><label>签到设置</label></button>
      </div>
      <div>签到时间：{{beginTime | formatDate()}}-{{endTime | formatDate()}}</div>
    </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">群签到记录</mt-tab-item>
      <mt-tab-item id="2">本月签到排行</mt-tab-item>
      <mt-tab-item id="3">上月签到排行</mt-tab-item>
    </mt-navbar>
    <div class="sign-block" style="background-color: #fff"></div>
    <div class="sign-block"></div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="sign-content">
        <div class="content1">
          <div class="w">日期</div>
          <div class="w">总签到数</div>
          <div class="w">签到顺序</div>
          <div class="w">签到时间</div>
        </div>
        <div v-for="(item,index) in signList" v-if="signList!=null && signList.length>0">
        <div class="content" v-if="index<numIndex">
          <div class="w">{{item.date}}</div>
          <div class="w">{{item.signNum}}</div>
          <div class="w">{{item.signRank}}</div>
          <div class="w">{{item.signTime | formatDate}}</div>
        </div>
        </div>
        <div v-if="signList.length>0 && numIndex<signList.length && signList.length>10" @click="getMore()" class="more-class">
          查看更多
        </div>
        <div v-if="signList.length>0 && numIndex>signList.length && signList.length>10" class="noContent">
          没有更多数据了
        </div>
        <div v-if="signList==null || signList.length==0" class="noContent">
          暂无数据
        </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="sign-content">
        <div class="content1 ">
          <div class="m m1">排名</div>
          <div class="m m2">成员</div>
          <div class="m m3">累计签到(天)</div>
          <div class="m m3">连续签到(天)</div>
        </div>
          <div v-for="(item,index) in monthList" v-if="monthList!=null && monthList.length>0">
        <div class="content" v-if="index<numIndex">
          <div class="m4 m1">{{index+1}}</div>
          <div class="m4 m2">
            <div v-if="item.wechatUser!=null">
            <img :src="item.wechatUser.headImgUrl" class="img-default"/>
            <span class="span-default" v-show="item.wechatUser.wechatGroupNickName.length<=5">{{item.wechatUser.wechatGroupNickName}}</span>
            <span class="span-default" v-show="item.wechatUser.wechatGroupNickName.length>5">{{item.wechatUser.wechatGroupNickName.toString().substr(0,5)}}...</span>
            </div>
          </div>
          <div class="m4 m3">{{item.totalDays}}</div>
          <div class="m4 m3">{{item.continueDays}}</div>
        </div>
          </div>
          <div v-if="monthList.length>0 && numIndex<monthList.length && monthList.length>10" @click="getMore()" class="more-class">
            查看更多
          </div>
          <div v-if="monthList.length>0 && numIndex>monthList.length && monthList.length>10" class="noContent">
            没有更多数据了
          </div>
        <div v-if="monthList==null || monthList.length==0" class="noContent">
          暂无数据
        </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="sign-content">
        <div class="content1 ">
          <div class="m m1">排名</div>
          <div class="m m2">成员</div>
          <div class="m m3">累计签到(天)</div>
          <div class="m m3">连续签到(天)</div>
        </div>
          <div v-for="(item,index) in lastMonthList" v-if="lastMonthList!=null && lastMonthList.length>0">
        <div class="content" v-if="index<numIndex">
          <div class="m4 m1">{{index+1}}</div>
          <div class="m4 m2">
            <div v-if="item.wechatUser!=null">
              <img :src="item.wechatUser.headImgUrl" class="img-default"/>
              <span class="span-default" v-show="item.wechatUser.wechatGroupNickName.length<=5">{{item.wechatUser.wechatGroupNickName}}</span>
              <span class="span-default" v-show="item.wechatUser.wechatGroupNickName.length>5">{{item.wechatUser.wechatGroupNickName.toString().substr(0,5)}}...</span>
            </div>
          </div>
          <div class="m4 m3">{{item.totalDays}}</div>
          <div class="m4 m3">{{item.continueDays}}</div>
        </div>
          </div>
          <div v-if="lastMonthList.length>0 && numIndex<lastMonthList.length && lastMonthList.length>10" @click="getMore()" class="more-class">
            查看更多
          </div>
          <div v-if="lastMonthList.length>0 && numIndex>lastMonthList.length && lastMonthList.length>10" class="noContent">
            没有更多数据了
          </div>
        <div v-if="lastMonthList==null || lastMonthList.length==0" class="noContent">
          暂无数据
        </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <!--<div class="bottom">-->
    <!--<span class="bottom-point more">查看更多</span>-->
    <!--<span class="bottom-point none">没有更多内容</span>-->
    <!--</div>-->
  </div>

</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import { Toast } from 'mint-ui'
  import { formatDate } from '@/util/common.js'

  export default {
    components: {
      WHeader
    },
    name: 'w-setting-sign',
    data () {
      return {
        headerName: '群签到',
        selected: '1',
        signList: [],
        signNum: '',
        totalRank: '',
        beginTime:'',
        endTime:'',
        monthList:[],
        lastMonthList:[],
        userType:this.$store.state.userInfo.userType,
        numIndex:10,
      }
    },
    created (){
      document.title = '群签到';
    },
    mounted () {
      this.selectSignList();
      this.getTotalNum();
    },
    methods: {
      getMore(){
        this.numIndex=this.numIndex+10;
      },
      selectSignList () {
        var vm = this
        this.$http.get('/xiaov/signCenter/signHistory.do').then(function (res) {
          if (res.data.success) {
            vm.signList = res.data.result
          } else {
            Toast(res.data.message)
          }
        }).catch(function (err) {
          Toast(err)
        })
      },
      getMonthList () {
        var vm = this
        this.$http.get('/xiaov/signCenter/thisMonthSignRanking.do').then(function (res) {
          if (res.data.success) {
            vm.monthList = res.data.result
          } else {
            Toast(res.data.message)
          }
        }).catch(function (err) {
          Toast(err)
        })
      },
      getLastMonthList () {
        var vm = this
        this.$http.get('/xiaov/signCenter/lastMonthSignRanking.do').then(function (res) {
          if (res.data.success) {
            vm.lastMonthList = res.data.result
          } else {
            Toast(res.data.message)
          }
        }).catch(function (err) {
          Toast(err)
        })
      },
      getTotalNum () {
        var vm = this
        this.$http.get('/xiaov/signCenter/signHistoryToday.do').then(function (res) {
          if (res.data.success) {
            if(res.data.result!=null){
              vm.signNum = res.data.result.signNum;
              vm.totalRank = res.data.result.rank;
              vm.beginTime = res.data.result.beginTime;
              vm.endTime = res.data.result.endTime;
            }else{
              vm.signNum = "";
              vm.totalRank = "";
              vm.beginTime = new Date().getTime();
              vm.endTime = new Date().getTime();
            }
          } else {
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err)
        })
      },
      toSign(){
        var vm=this;
//        var date=new Date()
//        if(date.getTime()>vm.endTime){
//          Toast("您的签到时间已过！");
//          return;
//        }
//        if(date.getTime()<vm.beginTime){
//          Toast("您的签到时间还没到！");
//          return;
//        }
          this.$http.get('/xiaov/signCenter/sign.do').then(function (res) {
            if(res.data.success){
              Toast("签到成功");
              vm.selectSignList();
              vm.getTotalNum();
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
      },
      toSetting(){
        var vm=this;
        var sign=null;
        if(vm.signList.length>0){
          sign=vm.signList[0].day;
        }
        sessionStorage.setItem("sign",sign);
        this.router.push({name:'w-setting-signrecord',params:{sign:sign}});
      }

    },
    filters: {
      formatDate (time) {
        if(time==null || time==""){
          return "";
        }else{
          let date = new Date(time)
          return formatDate(date, 'hh:mm')
        }
      }
    },
    watch:{
      selected:{
        handler:function(val,oldval){
          var vm=this;
          vm.numIndex=10;
          switch (parseInt(vm.selected)){
            case 1:this.selectSignList();break;
            case 2:this.getMonthList();break;
            case 3:this.getLastMonthList();break;
          }
        },
      },
    }

  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .sign-top {
    width: 100%;
    height: 60px;
    background-color: white;
    font-size: 0px;
    border-bottom: 1px solid $border-color;
  }

  .sign-top div {
    height: 100%;
    font-size: $common-size;
    display: inline-block;
    text-align: center;
    color: $black-color;
  }

  .button-default label {
    padding: 2px 7px;
  }

  .sign-top div:first-child {
    width: 50%;
    border-right: 1px solid $border-color;
  }

  .sign-top div:last-child {
    width: 49.5%;
  }

  .sign-top p {
    margin: 0 auto;
    font-size: $assist-size;
  }

  .sign-top p:first-child {
    height: 35px;
    line-height: 40px;
    color: $color-toptip-text;
  }

  .sign-center {
    height: 60px;
    background-color: $white;
  }

  .sign-center div:first-child {
    padding-left: 1px;
    font-size: 0px;
    text-align: center;
  }

  .sign-center div:first-child button:first-child {
    background-color: $color-text;
    border: 1px solid $color-text;
    margin-bottom: 4px;
    margin-top: 10px;
  }

  .sign-center div:first-child button:last-child {
    margin-left: 8px;
    background-color: $color-toptip-text;
    border: 1px solid $color-toptip-text;
  }

  .sign-center div:last-child {
    height: 12px;
    text-align: center;
    font-size: $assist-size;
    color: $shallow-black-color;
  }

  /*.mint-navbar{*/
  /*margin-bottom: 10px;*/
  /*}*/
  .content {
    width: 100%;
    height: 35px;
  }

  .content .w {
    width: 24%;
    display: inline-block;
    text-align: center;
    line-height: 35px;
    font-size: $assist-size;
  }

  .content .m {
    width: 24%;
    display: inline-block;
    text-align: center;
    line-height: 35px;
    font-size: $assist-size;
  }
  .content .m4 {
    display: inline-block;
    font-size: $assist-size;
    line-height: 35px;
  }

  .content1 {
    border-top: 1px solid $border-color;
    width: 100%;
    height: 35px;
    position: fixed;
    top:150px;
    z-index: 200;
    left: 0px;
    right: 0px;
    border-bottom: 1px solid $border-color;
    background-color: $white;
  }

  .content1 .w {
    width: 24%;
    display: inline-block;
    text-align: center;
    line-height: 35px;
    font-size: $assist-size;
  }

  .content1 .m {
    display: inline-block;
    text-align: center;
    line-height: 35px;
    font-size: $assist-size;
  }
  .m1{
    text-align: center;
    width: 12%;
  }
  .m2{
    width: 35%;
    text-align: left;
  }
  .m3{
    width: 24%;
    text-align: center;
  }
  .img-default{
    width: 22px;
    height: 22px;
    border-radius: 50%;
    position: absolute;
    margin-top: 6px;
  }
  .span-default{
    margin-left: 30px;
  }

  .content:last-child {
    border-bottom: 1px solid $border-color;
  }

  .bottom-point {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: $assist-size;
    padding-top: 10px;
  }

  .more {
    color: $color-text;
    font-size: 14px;
  }

  .none {
    color: $shallow-black-color;
    font-size: 14px;
  }

  .bottom {
    margin-top: 10px;
    width: 100%;
    height: auto;
    background-color: $white;
  }

  .sign-block {
    height: 5px;
    width: 100%;
  }
  .none-data{
    text-align: center;
    padding-top: 10px;
    font-size: $assist-size;
    color: $shallow-black-color;
  }
  .more-class{
    padding-top: 20px;
    text-align: center;
    color: $color-text;
    font-size: $assist-size;
  }
  .top-absol{
    position: fixed;
    top:0px;
    left: 0px;
    right: 0px;
    z-index: 200;
  }
  .sign-content{
    margin-top: 177px;
  }

</style>

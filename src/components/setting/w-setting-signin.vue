<template>
  <div class="setting-signin bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="signin-main">
      <div class="sign-main-div" @click="openDate()">
        <span>签到日期</span><span class="qaz">{{signTime | formatDate}}</span>
      </div>
      <div class="sign-main-div" @click="openDate1()">
        <span>开始时间</span><span>{{beginTime}}</span>
      </div>
      <div class="sign-main-div" @click="openDate2()">
        <span>结束时间</span><span>{{endTime}}</span>
      </div>
    </div>
    <div class="signin-center">
      <div class="signin-center-top">
        <input v-model.trim="continueDay" class="sign-input1" />
        <span>天内自动执行此设置</span>
        <div>
          <mt-switch v-model="value"></mt-switch>
        </div>
      </div>
      <div class="signin-center-top">
        <input v-model.trim="points" class="sign-input1" />
        <span>积分</span>
      </div>
      <div class="signin-center-top div1">
        <span>@所有人</span>
        <div>
          <mt-switch v-model="value1"></mt-switch>
        </div>
      </div>
    </div>
    <div class="signin-bottom">
        <button class="button-default" @click="submitSign()"><label>确认提交</label></button>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="signTime"
      :startDate="new Date()"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker1"
      type="time"
      v-model="beginTime"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      type="time"
      v-model="endTime"
    >
    </mt-datetime-picker>
  </div>

</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { formatDate } from '@/util/common.js';
  import { Toast } from 'mint-ui'
  export default {
    components: {
      WHeader
    },
    name: 'w-setting-signin',
    data() {
      return {
        headerName: '群签到',
        value: true,
        value1:true,
        signTime:formatDate(new Date(),"yyyy-MM-dd"),
        beginTime:formatDate(new Date(),"hh:mm"),
        endTime:formatDate(new Date(),"hh:mm"),
        continueDay:"",
        points:'',
        recordList:[],
        signDay:null,
      }
    },
    created (){
      document.title = '群签到';
    },
    mounted () {
      var vm=this;
      vm.getRecordList();
//      vm.signDay= sessionStorage.getItem("sign");
    },
    methods: {
//      handleConfirm(){
//        this.endTime=this.beginTime;
//      },
      openDate(){
        this.$refs.picker.open();
      },
      openDate1(){
        this.$refs.picker1.open();
      },
      openDate2(){
        this.$refs.picker2.open();
      },
      submitSign(){
        var vm=this;
        if(vm.signTime==""){
          Toast("请选择日期！");
          return;
        }
        let date1 = new Date(vm.signTime)
        var dateEnd= formatDate(date1, 'yyyy-MM-dd')
        if(vm.beginTime==""){
          Toast("请选择开始时间！");
          return;
        }
        if(vm.endTime==""){
          Toast("请选择结束时间！");
          return;
        }
        var beginArr=vm.beginTime.split(":");
        var endArr=vm.endTime.split(":");
        var res = /^[0-9]+$/ ;
        if(vm.continueDay!=""){
          if(!res.test(vm.continueDay)){
            Toast("天数必须是大于0的整数！");
            return;
          }else if(vm.continueDay=="0"){
            Toast("天数必须是大于0的整数！");
            return;
          }
        }
        if(vm.points!=""){
          if(!res.test(vm.points)){
            Toast("积分必须是大于0的整数！");
            return;
          }else if(vm.points=="0"){
            Toast("积分必须是大于0的整数！");
            return;
          }else if(parseInt(vm.points)>2000){
            Toast("积分最大为2000！");
            return;
          }
        }
        if(vm.continueDay!="" && !vm.value){
          Toast("请开启天数执行开关！");
          return;
        }
        if(vm.continueDay=="" && vm.value){
          Toast("请关闭天数执行开关！");
          return;
        }
        var day=vm.continueDay;
        if(vm.continueDay==""){
          day="0";
        }
        var points=vm.points;
        if(vm.points==""){
          points="0";
        }
        var needAt="0";
        if(vm.value1){
          needAt="1";
        }

        var newDateBeg=new Date(dateEnd.toString()+" "+ vm.beginTime+":00").getTime();
        var newDateEnd=new Date(dateEnd.toString()+" "+vm.endTime+":00").getTime()+parseInt(day)*86400000;
        var isHave=false;
        var isOnlyOne=false;
        for(var i=0;i<vm.recordList.length;i++){
          if(newDateBeg<vm.recordList[i].beginTime && newDateEnd>vm.recordList[i].endTime){
            isHave=true;
          }
          if(newDateBeg>=vm.recordList[i].beginTime && newDateEnd<=vm.recordList[i].endTime){
            isHave=true;
          }
          if(newDateBeg<vm.recordList[i].beginTime && newDateEnd>=vm.recordList[i].beginTime && newDateEnd<=vm.recordList[i].endTime){
            isHave=true;
          }
          if(newDateBeg>vm.recordList[i].beginTime && newDateBeg<vm.recordList[i].beginTime && newDateEnd>vm.recordList[i].endTime){
            isHave=true;
          }
          if(vm.recordList[i].continueDay==0){
            var beg=new Date(formatDate(new Date(vm.recordList[i].beginTime),"yyyy-MM-dd")+" "+"00:00:00").getTime();
            var end=new Date(formatDate(new Date(vm.recordList[i].beginTime),"yyyy-MM-dd")+" "+"23:59:59").getTime();
            console.log(formatDate(new Date(vm.recordList[i].beginTime),"yyyy-MM-dd")+" "+"00:00:00");
            console.log(formatDate(new Date(vm.recordList[i].beginTime),"yyyy-MM-dd")+" "+"23:59:59");
            if(newDateBeg>=beg && newDateEnd<=end){
              isOnlyOne=true;
            }
          }
        }
//        if(isOnlyOne){
//          Toast("一天只设置一个签到设置");
//          return;
//        }
//        if(isHave){
//          Toast("您的签到设置有冲突，请到签到记录查看！");
//          return;
//        }
        if(parseInt(endArr[0].toString())>parseInt(beginArr[0]) || (parseInt(endArr[0].toString())==parseInt(beginArr[0]) && parseInt(endArr[1].toString())>parseInt(beginArr[1]))){
//          if(dateEnd==vm.signDay){
//            Toast("您今天已经签到过了，不能添加当天的签到设置了！");
//            return;
//          }
          this.$http.get("/xiaov/signCenter/signConfig.do",{params:{signTime:dateEnd ,beginTime:dateEnd+" "+vm.beginTime+":00",
            endTime:dateEnd+" "+vm.endTime+":00",continueDay:day,points:points,isNeedAt:needAt}}).then(function (res) {
            if(res.data.success){
                Toast("设置成功！");
                vm.getRecordList();
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        }else{
          Toast("结束时间必须大于开始时间！")
        }
      },
      getRecordList(){
    var vm=this;
    this.$http.get("/xiaov/signCenter/signConfigHistory.do").then(function (res) {
      if(res.data.success){
        var list=res.data.result;
        for(var i=0;i<list.length;i++){
          list.endTime=list.endTime+parseInt(list.continueDay)*86400000;
          if(list[i].status!='1'){
            vm.recordList.push(list[i]);
          }
        }
      }else{
        Toast(res.data.message);
      }
    }).catch(function (err) {
      Toast(err);
    })
  },
      formatNew(date){
        return formatDate(new Date(date), 'dd');
      }
    },
    filters: {
      formatDate (time) {
        if(time==""){
          return "";
        }else{
          let date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd')
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .div1{
    margin-top: 10px;
  }
  .sign-input1{
    border: none;
    width: 40px;
    outline: none;
    background-color: $white;
    border: 1px solid $border-color;
    border-radius: 4px;
    margin-right: 3px;
    box-shadow:0px 0px 0px rgba(0,0,0,0);
    -webkit-appearance:none;
    text-align: center;
  }
  .sign-main-div{
    height: 34px;
    line-height: 34px;
    background-color: $white;
    border-bottom: 1px solid $border-color;
    padding: 0px 20px;
  }
  .sign-main-div:last-child{
    border-bottom: none;
  }
  .sign-main-div span:last-child{
    float: right;
  }
  .setting-signin {
    height: 100%;
  }

  .mint-cell {
    min-height: 35px;
  }

  .signin-main a, a:last-child {
    border-bottom: 1px solid $border-color;
  }

  .signin-center {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: $white;
  }

  .signin-center-top {
    height: 20px;
  }

  .signin-center-top div {
    display: inline-block;
  }

  .signin-center-top div:last-child {
    float: right;
    padding-top: 1px;
  }

  .signin-center div:first-child {
    margin-bottom: 10px;
  }

  .signin-center .signin-center-top:last-child span {
    line-height: 20px;
  }

  .signin-bottom {
    text-align: center;
    padding-top: 10px;
    margin-top: 10px;
    height: 100px;
    background-color: $white;
  }
  .button-default{
    width: 90px;
  }

</style>

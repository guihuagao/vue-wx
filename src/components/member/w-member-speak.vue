<template>
    <div class="member-speak">
      <!--<w-header :title="headerName"></w-header>-->
      <div class="speak-top">
        <span class="icon-a-notice"></span>&nbsp;&nbsp;仅支持查看本地发言记录
      </div>
      <div v-for="(item,index) in mSpeak" v-show="index<numIndex">

       <div class="speak-date">{{item.msgTime,1 | formatDate}}</div>
          <!--v-if="new Date(item.msgTime).toDateString()!=new Date(mSpeak[index+1].msgTime).toDateString()"-->
        <div class="speak-content">
         <!--<div class="speak-title">
              通知
          </div>-->
          <div class="speak-content-body">
            <div><p>{{item.msgContent}}</p></div>
            <div class="time">{{item.msgTime,2 | formatDate}}</div>
          </div>

        </div>
      </div>
      <div class="record-bottom">
        <span class="more" v-show="numIndex<dataLength" @click="getMore()">查看更多</span>
        <span class="none" v-show="numIndex>=dataLength" >没有更多内容</span>
      </div>
    </div>

</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import { formatDate } from '@/util/common.js'
  import { Toast } from 'mint-ui'
  export default {
    name: 'member-speak',
    components: {
      WHeader
    },
    created (){
      document.title = '最近发言信息';
    },
    filters:{
      formatDate (time,num) {
        if(time==""){
          return "";
        }else{
          let date = new Date(time)
          if(num==1){
            return formatDate(date, 'MM-dd')
          }else if(num==2){
            return formatDate(date, 'hh:mm')
          }
        }
      }
    },
    data () {
      return {
        mSpeak: [],
        headerName: "最近发言信息",
        numIndex:10,
        dataLength:0,
        id:'',
      }
    },
    mounted() {
      var vm=this;
      var getId=this.$route.params.id;
      if(getId!=null && getId!=""){
        vm.id=getId;
      }
      this.memberSpeak();
    },
    methods:{
      //获取最近发言
      memberSpeak(){
        var vm = this;
        this.$http.get('/xiaov/userCenter/msgHistory.do',{params:{id:vm.id}}).then(function(res) {
          if(res.data.success){
            vm.mSpeak = res.data.result;
            vm.dataLength=vm.mSpeak.length;
          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })
      },
      //获取更多数据
      getMore(){
        var vm=this;
        vm.numIndex=vm.numIndex+10;
      },
    }
  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .member-speak{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .speak-top{
    background-color: $white;
    padding: 10px 20px;
    color: $shallow-black-color;
  }
  .speak-date{
    padding: 5px 20px;
    font-size: $assist-size;
  }
  .speak-content{
    /*margin-top: 10px;*/
  }
  .speak-content-body{
    background-color: $white;
    padding: 10px 20px;
    margin: 5px 0;
  }
  .speak-content-body div{
    font-size: 0px;
    display: inline-block;
  }
  .speak-content-body p,.speak-content-body .time{
    font-size: $assist-size;
  }
  .speak-content-body div:first-child{
    width: 73%;
    font-size: $common-size;
    color: $black-color;
  }
  .speak-content-body div:last-child{
    width: 25%;
    text-align: right;

    color: $shallow-black-color;
    vertical-align: bottom;
  }
  .speak-title{
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 10px;
    background-color: $white;
  }
  p{
    line-height: 17px;
    margin: 0;
  }
  .speak-bottom{
    margin-top: 10px;
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


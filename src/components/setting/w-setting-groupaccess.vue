<template>
  <div class="setting-groupaccess">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="access-content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">活跃度数据</mt-tab-item>
        <mt-tab-item id="2">群空间访问数据</mt-tab-item>

      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="data-first">
            <div class="huodata-top">
            <p class="day">昨日活跃度：{{huoData.percentage}}%</p>
            <p class="repeat-num">两者重复人数：{{huoData.overlapUserCount}}人</p>
            <div class="circle-chart">
              <div class="left" id="left" v-show="huoData.visitUserCount>0"></div>
              <div class="right" id="right" v-show="huoData.talkUserCount>0"></div>
              <div class="person-num">
                <span class="left-num"><i class="green"></i>&nbsp;群内访问总人数：{{huoData.visitUserCount}}人</span>
                <span class="right-num"><i class="yellow"></i>&nbsp;总发言人数：{{huoData.talkUserCount}}人</span>
              </div>
            </div>
            </div>
            <div class="huodata-middle">
            <div class="top">
              <span class="percent">月平均活跃度：{{activityByUpperMonth.percentageMonth}}%</span>
              <span class="dateSpan" @click="openDateFirst()">{{pickerFirstValue | formatDate}}</span>
            </div>
            <div class="middle" v-show="isShow">
              <div class="chart">
              <canvas id="myChart" width="400" height="260" ></canvas>
              </div>
              <div class="month">
                <span @click="getPreMonth(pickerFirstValue)"> < 上一个月</span>
              </div>
            </div>
              <div v-show="!isShow" class="none-default">
                暂无数据
              </div>
            </div>

            <div class="huodata-bottom">
              <div class="content1">
                <div class="y">日期</div>
                <div class="s">活跃度</div>
                <div class="s">发言人数</div>
                <div class="f">群内访问人数</div>
                <div class="f">前两者重复数</div>

              </div>
              <div class="content" v-for="item in tableDataList" v-if="isShow">
                <div class="y">{{item.activityDate.substr(5, 5)}}</div>
                <div class="s">{{item.percentage}}%</div>
                <div class="s">{{item.talkUserCount}}</div>
                <div class="f">{{item.visitUserCount}}</div>
                <div class="f">{{item.overlapUserCount}}</div>
              </div>
              <div v-show="!isShow" class="none-default">
                暂无数据
              </div>
            </div>


          </div>

        </mt-tab-container-item>
        <mt-tab-container-item id="2">
         <div class="space">
         <div class="space-top">
         <div class="space-left">
          <div class="orange-border">
            <p>{{visitData.visitUserCount}}</p>
            <span>今日访问人数</span>
          </div>
           <div class="assist">
             <span><i class="rec"></i>&nbsp;群内访问人数：{{visitData.visitUserCount}}</span>
           </div>

         </div>
           <div class="space-right">
           <div class="yellow-border">
             <p>{{visitData.visitCount}}</p>
             <span>今日访问次数</span>
           </div>
             <div class="assist">
               <span><i class="rec-yellow"></i>&nbsp;群内访问次数：{{visitData.visitCount}}</span>
             </div>
           </div>
           </div>

           <div class="space-assist">
             <span class="percent">群空间访问数据</span>
             <span class="dateSpan" @click="openDateSecond()">{{pickerSecondValue | formatDate}}</span>

           </div>


          <div class="space-middle">
            <div class="content1">
              <div class="m">日期</div>
              <div class="m">群内访问人数</div>
              <div class="m">群内访问次数</div>
            </div>
            <div class="content" v-for="(item,index) in groupData" v-show="groupData.length>0 && index<dataIndex">
              <div class="m">{{item.time}} </div>
              <div class="m">{{item.visitUserCount}}</div>
              <div class="m">{{item.visitCount}}</div>
            </div>
            <div class="green-default border-add" @click="getMoreData()" v-show="dataIndex<groupData.length">查看更多</div>
            <div class="gray-shall-default border-add" v-show="dataIndex>=groupData.length && groupData.length>4">没有数据了</div>
            <div class="gray-shall-default" v-show="groupData.length==0">暂无数据</div>
          </div>
         <div class="space-bottom">
          <div class="tab-block">
            <div class="tab-item">
              <div class="tab-label">群内成员访问</div>
            </div>
            <div class="tab-item" style="background:#e0e1e3">
            </div>
          </div>

           <div class="pic-list">
             <div class="pic-item" v-for="(item,index) in groupDataList"  v-show="index<numIndex">
               <el-tooltip class="item" effect="dark" :content="item.visitUserName" placement="top-start">
                 <span class="el-tooltip item">
               <img :src="item.visitUserHeadImg">
               <span class="span-class" v-if="item.visitUserName!=null && item.visitUserName.toString().length<=4">{{item.visitUserName}}</span>
               <span class="span-class" v-if="item.visitUserName!=null && item.visitUserName.toString().length>4">{{item.visitUserName.toString().substr(0,4)}}..</span>
               <span class="span-class">{{item.visitTime | formatDate}}</span>
                 </span>
               </el-tooltip>
             </div>
             <div class="green-default" @click="getMore()" v-show="numIndex<groupDataList.length">查看更多</div>
             <div class="gray-shall-default" v-show="numIndex>=groupDataList.length && groupDataList.length>8">没有数据了</div>
             <div class="gray-shall-default" v-show="groupDataList.length==0">暂无数据</div>
           </div>

         </div>
         </div>

        </mt-tab-container-item>
      </mt-tab-container>

    </div>

    <mt-datetime-picker
      ref="pickerFirst"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="pickerFirstValue"
      :endDate="new Date()"
      @confirm="handleFirstConfirm(pickerFirstValue)"
    >
    </mt-datetime-picker>

    <mt-datetime-picker

      ref="pickerSecond"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :endDate="new Date()"
      v-model="pickerSecondValue"
      @confirm="handleSecondConfirm(pickerSecondValue)"
    >
    </mt-datetime-picker>


  </div>
</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { formatDate,getPreMonth } from '@/util/common.js'
  import { Toast } from 'mint-ui';
    export default {
        name: 'w-setting-groupaccess',
      components: {
        WHeader
      },
        data() {
            return {
               headerName: '群空间访问数据',
              selected: '1',
              pickerFirstValue:formatDate(new Date(),'yyyy-MM-dd'),
              pickerSecondValue:formatDate(new Date(),'yyyy-MM-dd'),
              currentDate:'',
              minDate:'',
              tableDataList:[],
              huoData:{},
              activityByUpperMonth:{},
              visitData:{},
              groupData:[],
              groupDataList:[],
              isShow:true,
              numIndex:8,
              dataIndex:4,
            }
        },
      filters: {
        formatDate (time) {
          if(time==""){
            return "";
          }else{
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM')
          }
        }
      },
      created (){
        document.title = '群空间访问数据';
      },
      mounted() {
        this.chart(formatDate(new Date(),'yyyy-MM'));
        this.getHuoData();
        this.visitSiteData();
        this.getGroupList();
        this.getGroupListAll();
      },


      methods:{
        getMoreData(){
          this.dataIndex=this.dataIndex+8;
        },
        getMore(){
          this.numIndex=this.numIndex+8;
        },
        handleFirstConfirm(date){
          if((typeof date)!='string'){
            let after=formatDate(date, 'yyyy-MM-dd');
            this.pickerFirstValue=after.substr(0,7);
            this.chart(after.substr(0,7));
          }else{
            this.chart(date.substr(0,7));
          }
        },
        handleSecondConfirm(date){
          this.getGroupList();
          this.getGroupListAll();
        },
        //群空间访问数据
        getGroupList(){
          var vm=this;
          var date="";
          if((typeof vm.pickerSecondValue).toString()=="string"){
            date=vm.pickerSecondValue.toString().split("T")[0].substr(0,7);
          }else{
            date=formatDate(new Date(vm.pickerSecondValue),"yyyy-MM");
          }
          this.$http.get("/xiaov/dataStatis/getVisitCountByDateAndGroupId.do",{params:{date:date}}).then(function (res) {
            if(res.data.success){
              if(res.data.result!=null){
                vm.groupData=res.data.result;
              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
        //群空间访问数据
        getGroupListAll(){
          var vm=this;
          var date="";
          if((typeof vm.pickerSecondValue).toString()=="string"){
            date=vm.pickerSecondValue.toString().split("T")[0].substr(0,7);
          }else{
            date=formatDate(new Date(vm.pickerSecondValue),"yyyy-MM");
          }
          this.$http.get("/xiaov/dataStatis/vistitSiteHistrotyByGrouIdAndDate.do",{params:{date:date}}).then(function (res) {
            if(res.data.success){
              if(res.data.result!=null){
                vm.groupDataList=res.data.result;
                for(var i=0;i<vm.groupData.length;i++){
                  vm.groupData[i].visitTime=formatDate(new Date(vm.groupData[i].visitTime),"yyyy-MM-dd");
                }
              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
          /*圆环图数据*/
        visitSiteData(){

          var vm = this;

          let date=formatDate(new Date(),'yyyy-MM-dd');

          this.$http.get('/xiaov/dataStatis/visitSiteData.do',{params:{date:date}}).then(function(res) {
            if(res.data.success){
              if(res.data.result!=null){
                vm.visitData=res.data.result;
              }else{
                vm.visitData.date='';
                vm.visitData.visitCount='';
                vm.visitData.visitUserCount='';
              }

            }else{
              Toast(res.data.message);
            }
          }).catch(function(err) {
            Toast(err)
          });

        },

          /*打开日期控件*/
        openDateFirst(){
          this.$refs.pickerFirst.open();
        },

        openDateSecond(){
          this.$refs.pickerSecond.open();
        },


        /*折线图*/
        chart(date){
          const F2 = require('@antv/f2');
          var vm = this;


          this.$http.get('/xiaov/dataStatis/activityByUpperMonth.do',{params:{date:date}}).then(function(res) {
            if(res.data.success){
              let dataf=[];
              let data=[];
              vm.isShow=true;
              if(res.data.result!=null && res.data.result.userActivityList!=null){
                vm.activityByUpperMonth=res.data.result;
                if(res.data.result.userActivityList.length==0){
                  vm.isShow=false;
                  vm.tableDataList=vm.tableDataList.splice(0,vm.tableDataList.length);
                  return;
                }

                /* let date=formatDate(new Date(),'yyyy-MM');*/
                const chart = new F2.Chart({
                  id: 'myChart',
                  width: window.innerWidth,
                  height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
                  pixelRatio: window.devicePixelRatio
                });
                vm.tableDataList=vm.activityByUpperMonth.userActivityList;

                vm.tableDataList.forEach(function (value,index,array) {
                  let dataobj={};
                  dataobj.day=array[index].activityDate.substr(5,5).replace('-','.');
                  dataobj.value= parseInt(array[index].percentage);
                  dataf.push(dataobj);
                });
                data=dataf;

                chart.source(data,{
                  value: {
                    tickCount: 5,
                    min: 0
                  },
                  day: {
                    range: [ 0, 1 ]
                  }
                });
                chart.tooltip({
                  showCrosshairs: true,
                  showItemMarker: false,
                  onShow(ev) {
                    const { items } = ev;
                    items[0].name = null;
                    items[0].value = '活跃度:' + items[0].value;
                  }
                });
                chart.axis('value', {
                  line:{
                    lineWidth: 1,
                    stroke: '#a0a0a0'
                  }
                });
                chart.axis('day', {
                    label(text, index, total) {
                      const textCfg = {};
                      if (index === 0) {
                        textCfg.textAlign = 'left';
                      }
                      if (index === total - 1) {
                        textCfg.textAlign = 'right';
                      }
                      return textCfg;
                    },
                    line:{
                      lineWidth: 1,
                      stroke: '#a0a0a0'
                    }
                  }

                );
                chart.line().position('day*value').color('#ed7f59');

                chart.point().position('day*value').style({
                  stroke: '#fff',
                  lineWidth: 1,
                  fill:'#ed7f59'
                });

                chart.render();
              }else{
                vm.activityByUpperMonth.percentageMonth='';
              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function(err) {
            Toast(err);
          });

        },

        /*上部活跃度数据*/
        getHuoData(){
          var vm = this;
          this.$http.get('/xiaov/dataStatis/activityByYesterday.do').then(function(res) {
            if(res.data.success){
              if(res.data.result!=null && res.data.result.overlapUserCount!=null){
                vm.huoData=res.data.result;
              }else{
                vm.huoData.percentage=0;
                vm.huoData.overlapUserCount=0;
                vm.huoData.visitUserCount=0;
                vm.huoData.talkUserCount=0;
              }
              var str="0px";
              if(vm.huoData.overlapUserCount==0){
                str="0px";
              }
              var height=70;
              var leftHeight=70;
              if(vm.huoData.talkUserCount==0 && vm.huoData.visitUserCount==0){
                height=0;
                document.getElementById("right").style.height="80px";
                document.getElementById("right").style.width="80px";
                document.getElementById("right").style.opacity="0";
                document.getElementById("left").style.opacity="0";
                document.getElementById("left").style.height="80px";
                document.getElementById("left").style.width="80px";
              }else{
                if(vm.huoData.talkUserCount==vm.huoData.visitUserCount){
                  document.getElementById("right").style.height="80px";
                  document.getElementById("right").style.width="80px";
                  document.getElementById("left").style.height="80px";
                  document.getElementById("left").style.width="80px";
                  height=80;
                }
                if(vm.huoData.talkUserCount>vm.huoData.visitUserCount){
                  height=80;
                  document.getElementById("right").style.height="80px";
                  document.getElementById("right").style.width="80px";
                  leftHeight=vm.huoData.visitUserCount*80/vm.huoData.talkUserCount;
                  document.getElementById("left").style.height=leftHeight.toString()+"px";
                  document.getElementById("left").style.width=leftHeight.toString()+"px";
                }
                if(vm.huoData.talkUserCount<vm.huoData.visitUserCount){
                  height=80*vm.huoData.talkUserCount/vm.huoData.visitUserCount;
                  document.getElementById("right").style.height=height+"px";
                  document.getElementById("right").style.width=height+"px";
                  document.getElementById("left").style.height="80px";
                  document.getElementById("left").style.width="80px";
                }
                if(vm.huoData.overlapUserCount>0){
                  var num=height*vm.huoData.overlapUserCount/vm.huoData.talkUserCount;
                  str="-"+num+"px";
                }
              }
              document.getElementById("right").style.marginLeft=str;
            }else{
              Toast(res.data.message);
            }
          }).catch(function(err) {
            Toast(err)
          });
        },

        /*上个月*/
        getPreMonth(date){
          let after=formatDate(date, 'yyyy-MM-dd');
          let newDate=getPreMonth(after);
          this.pickerFirstValue=newDate;
          this.chart(newDate.substr(0,7));
        }

      },

    }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .setting-groupaccess{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .border-add{
    border-top: 1px solid $border-color;
  }
  .green-default{
    text-align: center;
    color: $color-text;
    font-size: $assist-size;
    padding-top: 10px;
    background-color: $white;
  }
  .gray-shall-default{
    text-align: center;
    color: $shallow-black-color;
    font-size: $assist-size;
    padding-top: 10px;
    background-color: $white;
  }
  .access-content{
    /*padding: 10px 0;*/
  }
  .huodata-top{
    text-align: center;
    background: $white;
    padding-top: 10px;
  }
  .huodata-top .day{
    margin: 5px;
  }
  .huodata-top .repeat-num{
    font-size: $assist-size;
    color:$color-toptip-text;
    margin: 5px 0 10px 0;
  }
  .circle-chart{
    position: relative;
    height: 100px;
    margin: 0 auto;
    font-size: 0px;
  }
  .circle-chart .circle{
    position: absolute;
    left: 40%;
    transform: translateX(-40%);
  }

  .circle-chart .left{
    height: 80px;
    width: 80px;
    background: $color-text;
    border-radius: 50%;
    opacity: 0.7;
    display: inline-block;
    vertical-align: middle;
  }

  .circle-chart .right{
    height: 70px;
    width: 70px;
    background: $color-toptip-text;
    border-radius: 50%;
    opacity: 0.7;
    display: inline-block;
    vertical-align: middle;
  }

  .person-num{
    font-size: $assist-size;
    position: absolute;
    top: 78px;
    left: 0px;
    right:0px;
  }
  .person-num .left-num{
    float:left;
    padding-left: 10px;
  }
  .person-num .right-num{
    float: right;
    padding-right: 10px;
  }
  .person-num .green{
    height: 10px;
    width: 10px;
    background: $color-text;
    display: inline-block;
  }
  .person-num .yellow{
    height: 10px;
    width: 10px;
    background: $color-toptip-text;
    display: inline-block;
  }

  .huodata-middle{
    margin-top: $space-height;
    background: $white;
    padding: 10px 0;
  }

  .percent{
    padding-left: 10px;
  }

  .dateSpan{
   float: right;
    height: 18px;
    line-height: 18px;
    width: 60px;
   margin-right: 10px;
    border: 1px solid $border-color;
    border-radius: 3px;

  }

  .middle .chart{
    border-bottom: 1px solid $border-color;
  }

  .middle .month{
    color:$color-text;
    text-align: center;
    padding-top: 5px;
  }

  .huodata-bottom{
    /*margin-bottom: 60px;*/
  }

  .content {
    width: 100%;
    height: 35px;
    border-top: 1px solid $border-color;
    background: $white;
  }

  .content1 {
    border-top: 1px solid $border-color;
    width: 100%;
    height: 35px;
  }

  .content1 .m,.content1 .y,.content1 .s,.content1 .f,.content .m,.content .y,.content .s,.content .f {
    display: inline-block;
    text-align: center;
    line-height: 35px;
    font-size: $assist-size;
  }

  .content1 .y,.content .y{
    width: 10%;
  }
  .content1 .s,.content .s{
    width: 17%;
  }
  .content1 .f,.content .f{
    width: 25%;
  }
  .content1 .m,.content .m{
    width: 30%;
  }
  .content:last-child {
    border-bottom: 1px solid $border-color;
  }
 .space-top{
  background: $white;
   padding: 10px 0;
 }
  .space-top .space-left,.space-top .space-right{
    width: 48%;
    display: inline-block;
    text-align: center;

  }
  .orange-border{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: $white;
    border: 10px solid $color-toptip-text;
    margin: 0 auto;
  }
  .orange-border>p{
    margin: 8px;
    font-size: $title-size;
    font-weight: 500;
  }
  .orange-border>span,.assist>span{
    font-size: $assist-size;
  }

  .yellow-border{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: $white;
    border: 10px solid $light-yellow;
    margin: 0 auto;
  }
  .yellow-border>p{
    margin: 8px;
    font-size: $title-size;
    font-weight: 500;
  }
  .yellow-border>span,.assist>span{
    font-size: $assist-size;
  }





  .assist{
    padding-top: 10px;
  }

  .assist .rec{
    height: 10px;
    width: 10px;
    background: $color-toptip-text;
    display: inline-block;
  }

  .assist .rec-yellow{
    height: 10px;
    width: 10px;
    background: $light-yellow;
    display: inline-block;
  }
  .space-assist{
    background: $white;
    height: 40px;
    margin-top: $space-height;
    line-height: 40px;
  }
  .space-assist .dateSpan{
    margin-top: 10px;
  }

  .space-bottom{
    padding-top: 10px;
    background: $white;
    /*margin-bottom: 60px;*/
  }
  .space-bottom .tab-block{
    display: flex;
    text-align: center;
  }
  .tab-block .tab-item{
    background-color: #129e87;
    color: white;
    font-size: 14px;
    border-bottom: 0px;
    margin-bottom: 0px;
    padding: 6px 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: block;
  }
  .tab-block .tab-item .tab-label{
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .pic-list{
    /*padding: 10px 0px;*/
    text-align: left;
   /* column-count: 4; column-gap: 3px;*/
    /*display: flex;
    /*display: flex;

    flex-wrap: wrap;
    justify-content: flex-start*/
  }
  .pic-list .pic-item{

    box-shadow: 0px 4px 5px #a0a0a0;
    display: inline-block;
    width: 22%;
    margin-top: 5px;
    text-align: center;
    border-radius: 3px;
    padding: 3px 0;
    margin-left: 2.4%;
  }
  .pic-list .pic-item img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
  }
  .pic-list .pic-item .span-class{
    display: block;
    font-size: $assist-size;
    padding: 3px;
  }
  .none-default{
    text-align: center;
    height: 20px;
    font-size: $common-size;
    color: $shallow-black-color;
    background-color: $white;
    padding-top: 10px;
  }
</style>

<template>
<div class="setting-score-detail">
  <!--<w-header :title="headerName"></w-header>-->
  <div class="person-top" v-if="myList!=null">
    <img :src="myList.headImgUrl"/>
    <div class="person-top-bottom">
        <span class="icon-man">
                </span>
      <span>{{myList.wechatGroupNickName}}&nbsp;</span>
    </div>
    <div class="person-div qun">
      所在群：{{myList.group}}
    </div>
    <div ><mt-progress :value="myList.points==0 ? 0 :  myList.endPoints==0 ? 100 : myList.endPoints<myList.points ? 100 : Math.ceil((100*myList.points)/myList.endPoints)" :bar-height="7">
      <div slot="start">LV.{{myList.level}}&nbsp;</div>
      <div slot="end">&nbsp;{{myList.points}}/{{myList.endPoints}}</div></mt-progress></div>
  </div>
  <div class="score-detail-center">
    <div v-show="detailList.length==0" class="no-data">
        暂无数据
    </div>
    <div v-show="detailList.length>0">
    <el-collapse v-model="activeNames" @change="handleChange">
      <div v-for="(item,index) in detailList">
      <el-collapse-item :title="item.addTime | formatDate" :name="index" >
        <div class="expand-score">
          <div>
            <span class="score-point"></span>
            <div v-for="item1 in item.detail">{{item1.contents}}<span class="score-left">{{item1.points}}</span></div>
          </div>
        </div>
      </el-collapse-item>
      </div>
    </el-collapse>
    </div>
  </div>

</div>

</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  import { formatDate } from '@/util/common.js'
  export default {
    name: 'setting-score-detail',
    components: {
      WHeader
    },
    data() {
      return {
        headerName:"群积分",
        activeNames: [0],
        myList:{},
        id:'',
        detailList:[],
      }
    },
    created (){
      document.title = '群积分';
    },
    mounted() {
      var vm=this;
      vm.myList={level:this.$route.params.level,headImgUrl:this.$route.params.headImgUrl,id:this.$route.params.id,group:this.$route.params.group,points:this.$route.params.points,endPoints:this.$route.params.endPoints,wechatGroupNickName:this.$route.params.wechatGroupNickName}
      vm.getPointsDetail();
    },
    methods:{
      handleChange(val) {
      },
      getPointsDetail(){
        var vm=this;
        this.$http.get("/xiaov/pointsCenter/findUserPointsHistory.do",{params:{id:vm.myList.id}}).then(function (res) {
          if(res.data.success){
            var list=res.data.result;
            for(var i=0;i<list.length;i++){
              list[i].addTime=formatDate(new Date(list[i].addTime), 'yyyy-MM-dd');
            }
            var num=0;
            var isBreak=false;
            for(var i=num;i<list.length;i++){
              var listNew={addTime:list[i].addTime,detail:[]}
              for(var j=num;j<list.length;j++){
                if(j==list.length-1 && list[i].addTime==list[j].addTime){
                  isBreak=true;
                }
                if(list[i].addTime==list[j].addTime){
                  listNew.detail.push(list[j]);
                }else{
                    num=j;
                    i=num-1;
                    j=num-1;
                  break;
                }
              }
              vm.detailList.push(listNew);
              if(isBreak){
                break;
              }
            }
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
  }
  </script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .setting-score-detail{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .no-data{
    padding-top: 20px;
    color: $shallow-black-color;
    text-align: center;
  }
  .qun{
    font-size: $assist-size;
    color: $shallow-black-color;
  }
  .person-top {
    padding: 10px 20px;
    background-color: $white;
    text-align: center;
  }
  .expand-score{
    padding-left: 10px;
  }
 .expand-score div:first-child{
   border-left: 2px solid $color-text;
   padding-left: 10px;
 }
 .score-point{
   width: 8px;
   height: 8px;
   border-radius:50%;
   border: 1px solid $color-text;
   background-color: $color-text;
   display: inline-block;
   position: absolute;
   margin-left: -16px;
   margin-top: -10px
 }
 .score-left{
   float: right;
 }
  .person-top img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .person-div{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .person-top-bottom {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .score-detail-center{
    background-color: $white;
    padding: 10px 20px;
    margin-top: 10px;
  }
</style>

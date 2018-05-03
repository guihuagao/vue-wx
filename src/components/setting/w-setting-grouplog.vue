<template>
<div class="setting-grouplog">
  <!--<w-header :title="headerName"></w-header>-->
  <!-- <div class="grouplog-content">
     <div class="stepslog">
    <log-list></log-list>
   </div>
 </div>-->

  <div class="score-detail-center">
    <div v-show="detailList.length==0" class="noContent">
      暂无数据
    </div>
    <div v-show="detailList.length>0">
      <el-collapse v-model="activeNames" @change="handleChange">
        <div v-for="(item,index) in detailList">
          <el-collapse-item :title="item.date" :name="index" >
            <div class="expand-score">
              <div>
                <span class="score-point"></span>
                <div class="div-log" v-for="log in item.sysLogs"><span class="log-content">{{log.contents}}</span><span class="score-left">{{log.addTime  | formatDate}}</span></div>
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
  import { formatDate } from '@/util/common.js';
  import { Toast } from 'mint-ui';
    export default {
      name: 'w-setting-grouplog',
      components: {
        WHeader
      },
      filters: {
        formatDate (time) {
          let date = new Date(time)
          return formatDate(date, 'hh:mm')
        }
      },
        data() {
            return {
              headerName: '群日志',
              loglist:true,
              activeNames: [0],
              detailList:[]
            }
        },

      created (){
        document.title = '群日志';
      },
      mounted() {
       this.getLogDetail();
      },
      methods:{
        handleChange(val) {
        },
       getLogDetail(){
          var vm=this;
          this.$http.get("/xiaov/groupCenter/findGroupBase.do").then(function (res) {
            if(res.data.success){
              vm.detailList=res.data.result;

            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        }

      }
    }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .grouplog-content{
    padding: 10px;
    background: $white;
    margin-bottom: 60px;
  }
  .setting-grouplog{
    margin-bottom: 52px;
  }
  .stepslog{
    overflow: hidden;
    background-color: #fff;
    padding: 0 0 10px 55px;
  }

  .score-detail-center{
    background-color: $white;
    padding: 10px 20px;
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
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .div-log{
    position: relative;
  }
  .div-log .log-content{
    word-break: break-all;
    word-wrap: break-word;
    padding-right: 40px;
    display: inline-block;
  }

</style>

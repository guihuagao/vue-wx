<template>
  <div class="setting-grouphit">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="grouphit-top">
      <p><span>*&nbsp;</span>本榜单统计关键词在群内被呼叫次数排名，切换可分别查看总呼叫次数、月呼叫次数、周呼叫次数，同一回复内容多个关键词的合并统计.</p>
    </div>
    <div class="grouphit-center">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">总榜</mt-tab-item>
        <mt-tab-item id="3">日榜</mt-tab-item>
        <mt-tab-item id="2">周榜</mt-tab-item>
        <mt-tab-item id="1">月榜</mt-tab-item>
      </mt-navbar>
      <div class="grouphit-block"></div>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <div class="content1">
            <div class="w">排名</div>
            <div class="w">关键词</div>
            <div class="w">被呼叫数</div>
          </div>
          <div class="content1" v-for="(item,index) in totalList">
            <div class="w" style="color: #f25d2a" v-show="index==0">{{index+1}}</div>
            <div class="w" style="color: #129e87" v-show="index==1">{{index+1}}</div>
            <div  class="w" style="color: #4590dd" v-show="index==2">{{index+1}}</div>
            <div  class="w" v-show="index>2">{{index+1}}</div>
            <div class="w" style="color: #129e87">{{item.keyWords}}</div>
            <div class="w">{{item.totalCount}}</div>
          </div>
          <div class="noContent" v-if="totalList.length==0">暂无数据</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="content1">
            <div class="w">排名</div>
            <div class="w">关键词</div>
            <div class="w">被呼叫数</div>
          </div>
          <div class="content1" v-for="(item,index) in dateList">
            <div class="w" style="color: #f25d2a" v-show="index==0">{{index+1}}</div>
            <div class="w" style="color: #129e87" v-show="index==1">{{index+1}}</div>
            <div  class="w" style="color: #4590dd" v-show="index==2">{{index+1}}</div>
            <div  class="w" v-show="index>2">{{index+1}}</div>
            <div class="w" style="color: #129e87">{{item.keyWords}}</div>
            <div class="w">{{item.totalCount}}</div>
          </div>
          <div class="noContent" v-if="dateList.length==0">暂无数据</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="content1">
            <div class="w">排名</div>
            <div class="w">关键词</div>
            <div class="w">被呼叫数</div>
          </div>
          <div class="content1" v-for="(item,index) in weekList">
            <div class="w" style="color: #f25d2a" v-show="index==0">{{index+1}}</div>
            <div class="w" style="color: #129e87" v-show="index==1">{{index+1}}</div>
            <div  class="w" style="color: #4590dd" v-show="index==2">{{index+1}}</div>
            <div  class="w" v-show="index>2">{{index+1}}</div>
            <div class="w" style="color: #129e87">{{item.keyWords}}</div>
            <div class="w">{{item.totalCount}}</div>
          </div>
          <div class="noContent" v-if="weekList.length==0">暂无数据</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <div class="content1">
            <div class="w">排名</div>
            <div class="w">关键词</div>
            <div class="w">被呼叫数</div>
          </div>
          <div class="content1" v-for="(item,index) in monthList">
            <div class="w" style="color: #f25d2a" v-show="index==0">{{index+1}}</div>
            <div class="w" style="color: #129e87" v-show="index==1">{{index+1}}</div>
            <div  class="w" style="color: #4590dd" v-show="index==2">{{index+1}}</div>
            <div  class="w" v-show="index>2">{{index+1}}</div>
            <div class="w" style="color: #129e87">{{item.keyWords}}</div>
            <div class="w">{{item.totalCount}}</div>
          </div>
          <div class="noContent" v-if="monthList.length==0">暂无数据</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

  </div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui'
    export default {
      name: 'w-setting-grouphit',
      components: {
        WHeader
      },
        data() {
            return {
              headerName: '本群热词榜',
              selected:'0',
              totalList:[],
              monthList:[],
              weekList:[],
              dateList:[],
            }
        },
      mounted () {
        this.getHotList();
      },
      created (){
        document.title = '本群热词榜';
      },
      methods:{
          getHotList(){
            var vm=this;
            this.$http.get("xiaov/dataStatis/selectByHotType.do",{params:{hotType:vm.selected}}).then(function (res) {
              if(res.data.success){
                  switch (parseInt(vm.selected)){
                    case 0: vm.totalList=res.data.result;break;
                    case 1: vm.monthList=res.data.result;break;
                    case 2: vm.weekList=res.data.result;break;
                    case 3: vm.dateList=res.data.result;break;
                  }
              }else{
                Toast(res.data.message);
              }
            }).catch(function (err) {
              Toast(err);
            })
          }
      },
      watch:{
        selected:{
          handler:function(val,oldval){
            this.getHotList();
          },
        },
      }
    }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .setting-grouphit{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .grouphit-top{
    padding: 10px 20px;
    background-color: $white;
  }
  .grouphit-top p{
    margin: 0;
    font-size: $assist-size;
    line-height: 16px;
  }
  .grouphit-center{
    margin-top: 10px;
  }
  .grouphit-block{
    height: 10px;
    background-color: $white;
    border-bottom: 1px solid $border-color;
  }
  .content1{
    border-bottom: 1px solid $border-color;
  }
  .content1 .w{
    width: 29.5%;
    display: inline-block;
    text-align: center;
    line-height: 35px;
    font-size: $assist-size;
  }



</style>

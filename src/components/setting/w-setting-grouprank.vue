<template>
<div class="setting-grouprank">
  <!--<w-header :title="headerName"></w-header>-->

  <div class="grouprabk-center">
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">总榜</mt-tab-item>
      <mt-tab-item id="3">日榜</mt-tab-item>
      <mt-tab-item id="2">周榜</mt-tab-item>
      <mt-tab-item id="1">月榜</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <div class="content1" @click="goPage(0,'signHistory')">
          <div class="w"><span>签到榜 </span></div>
          <div class="w">
            <div v-show="totalList.maxLength1>0">
            <div class="img-default" v-for="(item,index) in totalList.rankingSignHistory">
              <div v-show="item.wechatUser!=null">
                <div v-show="index==0">
                <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                </div>
                <div v-show="index==1">
                  <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                </div>
                <div v-show="index==2">
                  <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                </div>
              </div>
            </div>
            </div>
            <div v-show="totalList.maxLength1==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(0,'message')">
          <div class="w"><span>发言榜 </span></div>
          <div class="w" >
            <div v-show="totalList.maxLength2>0">
              <div class="img-default" v-for="(item,index) in totalList.messageHistories">
                <div v-show="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
                </div>
            </div>
            <div v-show="totalList.maxLength2==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(0,'moments')">
          <div class="w"><span>动态榜 </span></div>
          <div class="w">
            <div v-show="totalList.maxLength3>0">
              <div class="img-default" v-for="(item,index) in totalList.rankingMoments">
                <div v-show="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
                </div>
            </div>
            <div v-show="totalList.maxLength3==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(0,'relation')">
          <div class="w"><span>邀请榜 </span></div>
          <div class="w">
            <div v-show="totalList.maxLength4>0">
              <div class="img-default" v-for="(item,index) in totalList.relations">
                <div v-show="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
                </div>
            </div>
            <div v-show="totalList.maxLength4==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="content1" @click="goPage(3,'signHistory')">
          <div class="w"><span>签到榜 </span></div>
          <div class="w">
            <div v-show="dateList.maxLength1>0">
              <div class="img-default" v-for="(item,index) in dateList.rankingSignHistory">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="dateList.maxLength1==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(3,'message')">
          <div class="w"><span>发言榜 </span></div>
          <div class="w" >
            <div v-show="dateList.maxLength2>0">
              <div class="img-default" v-for="(item,index) in dateList.messageHistories">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="dateList.maxLength2==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(3,'moments')">
          <div class="w"><span>动态榜 </span></div>
          <div class="w">
            <div v-show="dateList.maxLength3>0">
              <div class="img-default" v-for="(item,index) in dateList.rankingMoments">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="dateList.maxLength3==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(3,'relation')">
          <div class="w"><span>邀请榜 </span></div>
          <div class="w">
            <div v-show="dateList.maxLength4>0">
              <div class="img-default" v-for="(item,index) in dateList.relations">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="dateList.maxLength4==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="content1" @click="goPage(2,'signHistory')">
          <div class="w"><span>签到榜 </span></div>
          <div class="w">
            <div v-show="weekList.maxLength1>0">
              <div class="img-default" v-for="(item,index) in weekList.rankingSignHistory">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="weekList.maxLength1==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(2,'message')">
          <div class="w"><span>发言榜 </span></div>
          <div class="w" >
            <div v-show="weekList.maxLength2>0">
              <div class="img-default" v-for="(item,index) in weekList.messageHistories">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="weekList.maxLength2==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(2,'moments')">
          <div class="w"><span>动态榜 </span></div>
          <div class="w">
            <div v-show="weekList.maxLength3>0">
              <div class="img-default" v-for="(item,index) in weekList.rankingMoments">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="weekList.maxLength3==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(2,'relation')">
          <div class="w"><span>邀请榜 </span></div>
          <div class="w">
            <div v-show="weekList.maxLength4>0">
              <div class="img-default" v-for="(item,index) in weekList.relations">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="weekList.maxLength4==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div class="content1" @click="goPage(1,'signHistory')">
          <div class="w"><span>签到榜 </span></div>
          <div class="w">
            <div v-show="monthList.maxLength1>0">
              <div class="img-default" v-for="(item,index) in monthList.rankingSignHistory">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="monthList.maxLength1==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(1,'message')">
          <div class="w"><span>发言榜 </span></div>
          <div class="w" >
            <div v-show="monthList.maxLength2>0">
              <div class="img-default" v-for="(item,index) in monthList.messageHistories">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="monthList.maxLength2==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(1,'moments')">
          <div class="w"><span>动态榜 </span></div>
          <div class="w">
            <div v-show="monthList.maxLength3>0">
              <div class="img-default" v-for="(item,index) in monthList.rankingMoments">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="monthList.maxLength3==0" class="gray-default">暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
        <div class="content1" @click="goPage(1,'relation')">
          <div class="w"><span>邀请榜 </span></div>
          <div class="w">
            <div v-show="monthList.maxLength4>0">
              <div class="img-default" v-for="(item,index) in monthList.relations">
                <div v-if="item.wechatUser!=null">
                  <div v-show="index==0">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img" /><img class="first" src="~/common/image/first.png"/>
                  </div>
                  <div v-show="index==1">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/second.png"/>
                  </div>
                  <div v-show="index==2">
                    <img :src="item.wechatUser.headImgUrl" class="rank-img"/><img class="first" src="~/common/image/third.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="monthList.maxLength4==0" class="gray-default" >暂无数据</div>
          </div>
          <div class="w"><i class="mint-cell-allow-right"></i></div>
        </div>
        <div class="group-div"></div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui'
    export default {
        name: 'w-setting-grouprank',
      components: {
        WHeader
      },
        data() {
            return {
              headerName: '本群排行',
              selected:'0',
              totalList:{},
              monthList:{},
              weekList:{},
              dateList:{},
            }
        },
      created (){
        document.title = '本群排行';
      },
      mounted () {
        this.getRankList();
      },
      methods:{
//          checkList(data){
//            if(data.length>0){
//              data=data.splice(0,data.length);
//            }
//          },
        //获取排行榜
         getRankList(){
          var vm=this;
          this.$http.get("xiaov/dataStatis/selectGroupRanking.do",{params:{hotType:vm.selected}}).then(function (res) {
            if(res.data.success){
              if(res.data.result==null){
                res.data.result={};
                res.data.result.rankingSignHistory=[];
                res.data.result.messageHistories=[];
                res.data.result.rankingMoments=[];
                res.data.result.relations=[];
              }
              if(res.data.result.rankingSignHistory==null){
                res.data.result.rankingSignHistory=[];
              }
              if(res.data.result.messageHistories==null){
                res.data.result.messageHistories=[];
              }
              if(res.data.result.rankingMoments==null){
                res.data.result.rankingMoments=[];
              }
              if(res.data.result.relations==null){
                res.data.result.relations=[];
              }
              if(vm.totalList.length>0){
                vm.totalList.splice(0,vm.totalList.length);
              }
              if(vm.monthList.length>0){
                vm.monthList.splice(0,vm.monthList.length);
              }
              if(vm.weekList.length>0){
                vm.weekList.splice(0,vm.weekList.length);
              }
              if(vm.dateList.length>0){
                vm.dateList.splice(0,vm.dateList.length);
              }
              res.data.result.maxLength1=res.data.result.rankingSignHistory.length;
              res.data.result.maxLength2=res.data.result.messageHistories.length;
              res.data.result.maxLength3=res.data.result.rankingMoments.length;
              res.data.result.maxLength4=res.data.result.relations.length;
              if(vm.selected=="0"){
                vm.totalList=res.data.result;
              }else if(vm.selected=='1'){
                vm.monthList=res.data.result;
              }else if(vm.selected=='2'){
                vm.weekList=res.data.result;
              }else if(vm.selected=='3'){
                vm.dateList=res.data.result;
              }

//              switch (parseInt(vm.selected)){
//                case 0: vm.totalList=res.data.result;console.log(vm.totalList);break;
//                case 1: vm.monthList=res.data.result;break;
//                case 2: vm.weekList=res.data.result;break;
//                case 3: vm.dateList=res.data.result;break;
//              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
        goPage(value,condition){
           this.router.push({name:'w-setting-grouprank-detail',params:{value:value,condition:condition}});
           sessionStorage.setItem("value",value.toString());
           sessionStorage.setItem("condition",condition.toString());
        }
      },
      watch:{
        selected:{
          handler:function(val,oldval){
            this.getRankList();
          },
        },
      }
    }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .setting-grouprank{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .grouprabk-center{
    background-color: $white;
  }

  .group-div{
    height: 10px;
    background-color: $grey-background;
  }
  .content1{
    padding: 10px 20px;
  }
  .content1 .w{
    display: inline-block;
    vertical-align: middle;
    font-size: $assist-size;
  }
  .content1 .w:first-child{
    text-align: left;
    width: 15%;
  }
  .content1 .w:nth-child(2){
    text-align: left;
    width: 77%;
  }
  .content1 .w:nth-child(3){
    text-align: right;
    width: 5%;
  }
  .rank-img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .first{
    width: 20px;
    height: 24px;
    position: absolute;
    margin-left: -26px;
    margin-top: 15px;
  }
  .img-default{
    width: 32%;
    display: inline-block;
    text-align: center;
  }
  .w span{
    height: 17px;
    line-height: 17px;
    display: inline-block;
    width: 100%;
    color: $color-text;
    border-right: 2px solid $border-color;
  }
  .gray-default{
    text-align: center;
    height: 32px;
    line-height: 32px;
    color: $shallow-black-color;
  }
</style>

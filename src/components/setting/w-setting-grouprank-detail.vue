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
      <div class="detail-center">
        <div><input class="input-default detail-input" placeholder="请输入昵称查询" v-model.trim="searchCondition"/></div>
        <div><button class="button-default" @click="goBack()"><label>返回上一层</label></button></div>
      </div>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <div class="content myself" v-if="personal!=null && personal.id!=null">
            <div class="col">
              <img src="~common/image/first.png" class="image-default" v-if="personal.index==1"/>
              <img src="~common/image/second.png" class="image-default" v-if="personal.index==2"/>
              <img src="~common/image/third.png" class="image-default" v-if="personal.index==3"/>
              <span v-if="personal.index>3">{{personal.index}}</span>
            </div>
            <div class="col"><img :src="personal.headImgUrl" class="title-img"/>&nbsp;&nbsp;{{personal.wechatNickName}}</div>
            <div class="col">{{personal.total}}次</div>
          </div>
          <div v-if="rankList!=null && rankList.length>0" >
          <div v-for="(item,index) in rankList" >
          <div class="content" v-if="index<totalIndex" :class="{'div-class':index==0}">
            <div class="col">
              <img src="~common/image/first.png" class="image-default" v-if="item.index==1"/>
              <img src="~common/image/second.png" class="image-default" v-if="item.index==2"/>
              <img src="~common/image/third.png" class="image-default" v-if="item.index==3"/>
              <span v-if="item.index>3">{{item.index}}</span>
            </div>
            <div class="col"><span><img :src="item.headImgUrl" class="title-img"/><span>&nbsp;&nbsp;{{item.wechatNickName }}</span></span></div>
            <div class="col"><span>{{item.total}}次</span></div>
          </div>
            </div>
            <div v-if="rankList.length>10">
            <div v-if="rankList.length>totalIndex" class="more-class" @click="getMore('total')">查看更多</div>
            <div v-if="rankList.length<totalIndex" class="noContent">没有更多数据了</div>
            </div>
          </div>
          <div v-if="rankList==null || rankList.length==0" class="noContent">
            没有更多数据了
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="content myself" v-if="personal!=null && personal.id!=null">
            <div class="col">
              <img src="~common/image/first.png" class="image-default" v-if="personal.index==1"/>
              <img src="~common/image/second.png" class="image-default" v-if="personal.index==2"/>
              <img src="~common/image/third.png" class="image-default" v-if="personal.index==3"/>
              <span v-if="personal.index>3">{{personal.index}}</span>
            </div>
            <div class="col"><img :src="personal.headImgUrl" class="title-img"/>&nbsp;&nbsp;{{personal.wechatNickName}}</div>
            <div class="col">{{personal.total}}次</div>
          </div>
          <div v-if="rankList!=null && rankList.length>0">
            <div v-for="(item,index) in rankList" >
              <div class="content" v-if="index<totalIndex" :class="{'div-class':index==0}">
                <div class="col">
                  <img src="~common/image/first.png" class="image-default" v-if="item.index==1"/>
                  <img src="~common/image/second.png" class="image-default" v-if="item.index==2"/>
                  <img src="~common/image/third.png" class="image-default" v-if="item.index==3"/>
                  <span v-if="item.index>3">{{item.index}}</span>
                </div>
                <div class="col"><span><img :src="item.headImgUrl" class="title-img"/><span>&nbsp;&nbsp;{{item.wechatNickName }}</span></span></div>
                <div class="col"><span>{{item.total}}次</span></div>
              </div>
            </div>
            <div v-if="rankList.length>10">
              <div v-if="rankList.length>totalIndex" class="more-class" @click="getMore('total')">查看更多</div>
              <div v-if="rankList.length<totalIndex" class="noContent">没有更多数据了</div>
            </div>
          </div>
          <div v-if="rankList==null || rankList.length==0" class="noContent">
            没有更多数据了
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="content myself" v-if="personal!=null && personal.id!=null">
            <div class="col">
              <img src="~common/image/first.png" class="image-default" v-if="personal.index==1"/>
              <img src="~common/image/second.png" class="image-default" v-if="personal.index==2"/>
              <img src="~common/image/third.png" class="image-default" v-if="personal.index==3"/>
              <span v-if="personal.index>3">{{personal.index}}</span>
            </div>
            <div class="col"><img :src="personal.headImgUrl" class="title-img"/>&nbsp;&nbsp;{{personal.wechatNickName}}</div>
            <div class="col">{{personal.total}}次</div>
          </div>
          <div v-if="rankList!=null && rankList.length>0" >
            <div v-for="(item,index) in rankList" >
              <div class="content" v-if="index<totalIndex" :class="{'div-class':index==0}">
                <div class="col">
                  <img src="~common/image/first.png" class="image-default" v-if="item.index==1"/>
                  <img src="~common/image/second.png" class="image-default" v-if="item.index==2"/>
                  <img src="~common/image/third.png" class="image-default" v-if="item.index==3"/>
                  <span v-if="item.index>3">{{item.index}}</span>
                </div>
                <div class="col"><span><img :src="item.headImgUrl" class="title-img"/><span>&nbsp;&nbsp;{{item.wechatNickName }}</span></span></div>
                <div class="col"><span>{{item.total}}次</span></div>
              </div>
            </div>
            <div v-if="rankList.length>10">
              <div v-if="rankList.length>totalIndex" class="more-class" @click="getMore('total')">查看更多</div>
              <div v-if="rankList.length<totalIndex" class="noContent">没有更多数据了</div>
            </div>
          </div>
          <div v-if="rankList==null || rankList.length==0" class="noContent">
            没有更多数据了
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <div class="content myself" v-if="personal!=null && personal.id!=null">
            <div class="col">
              <img src="~common/image/first.png" class="image-default" v-if="personal.index==1"/>
              <img src="~common/image/second.png" class="image-default" v-if="personal.index==2"/>
              <img src="~common/image/third.png" class="image-default" v-if="personal.index==3"/>
              <span v-if="personal.index>3">{{personal.index}}</span>
            </div>
            <div class="col"><img :src="personal.headImgUrl" class="title-img"/>&nbsp;&nbsp;{{personal.wechatNickName}}</div>
            <div class="col">{{personal.total}}次</div>
          </div>
          <div v-if="rankList!=null && rankList.length>0">
            <div v-for="(item,index) in rankList" >
              <div class="content" v-if="index<totalIndex" :class="{'div-class':index==0}">
                <div class="col">
                  <img src="~common/image/first.png" class="image-default" v-if="item.index==1"/>
                  <img src="~common/image/second.png" class="image-default" v-if="item.index==2"/>
                  <img src="~common/image/third.png" class="image-default" v-if="item.index==3"/>
                  <span v-if="item.index>3">{{item.index}}</span>
                </div>
                <div class="col"><span><img :src="item.headImgUrl" class="title-img"/><span>&nbsp;&nbsp;{{item.wechatNickName }}</span></span></div>
                <div class="col"><span>{{item.total}}次</span></div>
              </div>
            </div>
            <div v-if="rankList.length>10">
              <div v-if="rankList.length>totalIndex" class="more-class" @click="getMore('total')">查看更多</div>
              <div v-if="rankList.length<totalIndex" class="noContent">没有更多数据了</div>
            </div>
          </div>
          <div v-if="rankList==null || rankList.length==0" class="noContent">
            没有更多数据了
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

  </div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui'
  export default {
    name: 'w-setting-grouprank-detail',
    components: {
      WHeader
    },
    data() {
      return {
        headerName: '本群排行',
        selected:'0',
        value:0,
        condition:'',
        rankList:[],
        personal:{},
        totalIndex:10,
        id:this.$store.state.userInfo.id,
        searchCondition:'',
        list:[],
      }
    },
    created (){
      var vm=this;
      vm.value=this.$route.params.value;
      vm.condition=this.$route.params.condition;
      if(vm.value==null) vm.value=sessionStorage.getItem("value");
      if(vm.condition==null) vm.condition=sessionStorage.getItem("condition");
      if(vm.value.toString()=='0') vm.selected='0';
      if(vm.value.toString()=='1') vm.selected='1';
      if(vm.value.toString()=='2') vm.selected='2';
      if(vm.value.toString()=='3') vm.selected='3';
      if(vm.condition=='signHistory') document.title = '签到榜';
      if(vm.condition=='message') document.title = '发言榜';
      if(vm.condition=='moments') document.title = '动态榜';
      if(vm.condition=='relation') document.title = '邀请榜';
    },
    mounted () {
      if(this.selected.toString()=='0'){
        this.getPersonMessage();
      }
    },
    methods:{
      getMore(val){
        var vm=this;
        if(val=='total') vm.totalIndex=vm.totalIndex+10;
      },
      setList(data){
        var vm=this;
        var list=data;
        var num = 0;
        var isHave = false;
        for(var i=0;i<list.length;i++){
          var obj={index:(i+1),total:list[i].total};
          if(list[i].wechatUser!=null){
            obj.wechatNickName =list[i].wechatUser.wechatNickName ;
            obj.headImgUrl=list[i].wechatUser.headImgUrl;
            if(vm.personal!=null && vm.personal.id!=null){
              if(list[i].wechatUser.id==vm.personal.id){
                num=i;
                isHave=true;
              }
            }
          }else{
            obj.wechatGroupNickName="";
            obj.headImgUrl="";
            obj.total=0;
          }
          vm.rankList.push(obj);
        }
        if(isHave){
          vm.personal.index=num+1;
          vm.rankList.splice(num,1);
        }else{
          if(list.length>0){
            vm.personal.index=list.length+1;
          }else{
            vm.personal={};
          }
        }
        vm.list=vm.rankList;
      },
      getRankList(){
        var vm=this;
        if(vm.rankList.length>0){
          vm.rankList.splice(0,vm.rankList.length);
        }
        if(vm.list.length>0){
          vm.list.splice(0,vm.list.length);
        }
        this.$http.get("/xiaov/dataStatis/selectGroupRankingSingle.do",{params:{hotType:vm.selected,single:vm.condition,wechatName:''}}).then(function (res) {
          if(res.data.success) {
            if (res.data.result!=null) {
              if (vm.condition == 'signHistory' && res.data.result.rankingSignHistory != null) {
                vm.setList(res.data.result.rankingSignHistory);
              } else if (vm.condition == 'message' && res.data.result.messageHistories !=null){
                vm.setList(res.data.result.messageHistories);
              }else if (vm.condition == 'moments' && res.data.result.rankingMoments!=null) {
                vm.setList(res.data.result.rankingMoments);
              }else if (vm.condition == 'relation' && res.data.result.relationVos!=null) {
                vm.setList(res.data.result.relationVos);
              }
            }
            } else {
              Toast(res.data.message);
            }
          }).catch(function (err) {
          Toast(err);
        });
      },
      setPersonList(item){
        var vm=this;
        vm.personal.total=item.total;
        if(item.wechatUser!=null){
          vm.personal.id=item.wechatUser.id;
          vm.personal.wechatNickName=item.wechatUser.wechatNickName;
          vm.personal.headImgUrl=item.wechatUser.headImgUrl;
        }else{
          vm.personal.wechatNickName="";
          vm.personal.headImgUrl="";
        }
      },
      getPersonMessage(){
        var vm=this;
        this.$http.get("/xiaov/dataStatis/selectGroupRankingPersonalRanking.do",{params:{hotType:vm.selected}}).then(function (res) {
          if(res.data.success){
            if(res.data.result!=null){
              if (vm.condition == 'signHistory' && res.data.result.signHistory  != null) {
                vm.setPersonList(res.data.result.signHistory);
              }else if (vm.condition == 'message' && res.data.result.messageHistory  !=null){
                vm.setPersonList(res.data.result.messageHistory);
              }else if (vm.condition == 'moments' && res.data.result.moments !=null) {
                vm.setPersonList(res.data.result.moments);
              }else if (vm.condition == 'relation' && res.data.result.relationVo!=null) {
                vm.setPersonList(res.data.result.relationVo);
              }else{
                vm.personal={};
              }
            }
            vm.getRankList();
          }else{
            Toast(res.data.message());
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      getList: function (item) {
        var vm=this;
        return item.wechatNickName.indexOf(vm.searchCondition)!=-1;
      },
      goBack(){
        this.router.push({name:'w-setting-grouprank',params:{}});
      }
      },
    watch:{
      selected:{
        handler:function(val,oldval){
          var vm=this;
          this.searchCondition="";
          vm.totalIndex=10;
          sessionStorage.setItem("value",vm.selected);
          sessionStorage.setItem("condition",vm.condition);
          this.getPersonMessage();
        },
      },
      searchCondition:{
        handler:function(val,oldval){
          var vm=this;
          if(val=='total') vm.totalIndex=10;
          vm.rankList=vm.list.filter(vm.getList);
        },
      }
    },
  }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .setting-grouprank{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .detail-center{
    background-color: $white;
    font-size: 0px;
    padding: 10px 20px;
  }
  .detail-center div:first-child{
    display: inline-block;
    font-size: $assist-size;
    width: 70%;
    vertical-align: middle;
  }
  .detail-center div:last-child{
    display: inline-block;
    font-size: $assist-size;
    vertical-align: middle;
    width: 27%;
    float: right;
  }
  .detail-center div:last-child button{
    background-color: $footer-icon;
    border: 1px solid $footer-icon;
    font-size: $assist-size;
    min-width: auto;
    float: right;
    width: 100%;
  }
  .detail-input{
    background-color: $white;
    border: 1px solid $border-color;
    height: 22px;
  }
  .div-class{
    border-top: 1px solid $border-color;
  }

  .content{
    font-size: 0px;
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid $border-color;
  }
  .content div{
    display: inline-block;
    font-size: 0px;
    vertical-align: middle;
  }
  .content .col:first-child{
    text-align: center;
    font-size: $assist-size;
    width: 17%;

  }
  .content .col:nth-child(2){
    font-size: $assist-size;
    width: 65%;
  }
  .content .col:nth-child(3){
    font-size: $assist-size;
    width: 17%;
    text-align: center;
  }
  .image-default{
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    width: 20px;
  }
  .myself{
    background-color:rgba(18,158,135,0.1);
    color: $color-text;
    border: none;
  }
  .myself div{
    color: $color-text;
  }
  .title-img{
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
  .no-data{
    text-align: center;
    background-color: $white;
    padding-top: 10px;
    color: $shallow-black-color;
    font-size: $assist-size;
  }
  .more-class{
    text-align: center;
    background-color: $white;
    padding-top: 10px;
    color: $color-text;
    font-size: $assist-size;
  }
</style>

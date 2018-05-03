<template>
  <div class="home-personalnet">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="net-top">
    <div class="dis-div default-width">
      <div class="top-centent">
      <img :src="wechatUser.headImgUrl" class="netimg-default">
      </div>
    <div class="nowarp">{{wechatUser.wechatNickName}}</div><!---->
    </div>
    <div class="dis-div">
      <div class="top-centent">{{actualNum}}</div>
      <div class="assist">有效下级</div>
    </div>
    <div class="dis-div">
      <div class="top-centent">{{ranking}}</div>
      <div class="assist">排名</div>
    </div>
    <div class="dis-div">
      <div class="top-centent">{{inviteNum}}</div>
      <div class="assist">邀请人数</div>
    </div>
    <div class="dis-div">
      <div class="top-centent">{{signOutNum}}</div>
      <div class="assist">退群人数</div>
    </div>
    </div>
    <div class="net-center">
      <div v-if="highLevel">
      <div class="net-center-div">
        <img :src="highLevel.headImgUrl" class="img-default"/>
        <div class="assist nowarp">{{highLevel.wechatNickName}}</div>
      </div>
      <div class="net-center-text">上级</div>
      </div>
      <div class="net-center-div">
        <img :src="wechatUser.headImgUrl" class="img-default"/>
        <div class="assist nowarp">{{wechatUser.wechatNickName}}</div>
      </div>
    </div>
    <div class="net-bottom">
    <div class="bottom-div">
      <div>邀请人数&nbsp;<span class="green-color">{{lowLevel.length}}</span></div>
      <div class="bottom-centent" v-for="item in lowLevel"><img :src="item.headImgUrl"/><span class="nowarp">{{item.wechatNickName}}</span></div>
    </div>
    <div class="bottom-div left-default">
      <div>退群人数&nbsp;<span class="green-color">{{signOutLowLevel.length}}</span></div>
      <div class="bottom-centent" v-for="item in signOutLowLevel"><img :src="item.headImgUrl" /><span class="nowarp">{{item.wechatNickName}}</span></div>

    </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  export default {
    name: 'w-home-personnet',
    components: {
      WHeader
    },
    created (){
      document.title = '个人关系网';
    },
    data() {
      return {
        headerName: '个人关系网',
        wechatUser:'',
        highLevel:[],
        lowLevel:[],
        signOutLowLevel:[],
        inviteNum:'',
        ranking:'',
        actualNum:'',
        signOutNum:'',
        id:'',

      }
    },
    mounted() {
      var vm=this;
      if(sessionStorage.getItem("searchId")!=null && sessionStorage.getItem("searchId")!=""){
        vm.id=sessionStorage.getItem("searchId");
      }else{
        vm.id="";
      }
    this.userRelation();
    },
    methods:{

      /*关系网数据*/
      userRelation() {
        var vm = this;
        this.$http.get('/xiaov/userCenter/userRelation.do',{params:{id:vm.id}}).then(function(res) {
          if(res.data.success){
            vm.wechatUser=res.data.result.wechatUser;
            vm.highLevel=res.data.result.highLevel;
            vm.lowLevel=res.data.result.lowLevel;
            vm.signOutLowLevel=res.data.result.signOutLowLevel;
            vm.inviteNum=res.data.result.inviteNum;
            vm.ranking=res.data.result.ranking;
            vm.actualNum=res.data.result.actualNum;
            vm.signOutNum=res.data.result.signOutNum;

          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        });
      },


    }



  }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .home-personalnet{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .net-top{
    padding: 10px 0px;
    font-size: 0px;
    background-color: $white;
  }
  .dis-div{
    display: inline-block;
    font-size: $common-size;
    color: $black-color;
    width: 18%;
    text-align: center;
    border-left: 1px solid $light-green;
  }
  .default-width{
    width: 25%;
    border-left: none;
  }
  .top-centent{
    height: 30px;
    line-height: 30px;
    width: 100%;
    color: $color-text;
    text-align: center;
  }
  .dis-div .assist{
    font-size: $assist-size;
  }
  .dis-div div:nth-child(2){
    padding-top: 8px;
  }

  .netimg-default{
    width: 35px;
    height: 35px;

    border-radius: 50%;
  }
  .net-center{
    margin-top: 10px;
    padding: 10px 20px;
    background-color: $white;
    text-align: center;
  }
  .net-center-div{
    margin: 0 auto;
    width: 80px;
    height: 80px;
    text-align: center;
    box-shadow:0px 4px 10px $shallow-black-color;
  }
  .img-default{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
  }
  .net-center-text{
    padding: 10px 0px;
  }
  .net-bottom{
    background-color: $white;
    padding: 0px 20px;
  }
  .assist{
    font-size: $assist-size;
  }
  .net-bottom .bottom-div{
    text-align: left;
    background-color: $white;
    display: inline-block;
    width: 59%;
    vertical-align: top;
  }
  .bottom-div:last-child{
    /*text-align: right;*/
    /*padding-left: 10%;*/
    width: 39.5%;
  }
  .bottom-centent{
    padding: 5px 0px;
    vertical-align: middle;
  }
  .bottom-centent img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .bottom-centent span{
    display: inline-block;
    height: 25px;
    line-height: 25px;
    vertical-align: top;
    margin-left: 3px;
    font-size: $assist-size;
  }
  .green-color{
    color: $color-text;
  }




</style>

<template>
    <div class="user-me">
      <!--<w-header :title="headerName"></w-header>-->
      <div class="me-top">
        <div class="me-top-portrait">
          <img :src="imageSrc">
        </div>
        <div class="me-top-name">
          <span :class="[sex==1 ? 'icon-man' : 'icon-woman', 'icon']"></span><span>{{this.$store.state.userInfo.wechatNickName}}</span>
          &nbsp;&nbsp;{{points}}&nbsp;<span class="level-class">
          <span style="text-align: center" id="left"></span>
          <span style="text-align: center" id="right"></span>
        </span>&nbsp;
          {{endPoints}}

        </div>
      </div>

      <div class="me-middle">
        <div class="yellow-bg">
          <div>
            <img src="../../common/image/me-logo.png">
            <span class="bt">小微助手个人版</span>
            <span class="gm" @click="goBuy()">立即购买</span>
          </div>

        </div>
      </div>

      <div class="me-bind-phone me-ds-list">
        <p>手机绑定&nbsp;&nbsp;<i> | </i><span v-if="mobile">已绑定手机号：{{mobile}}</span> <span v-else @click="connect()">去绑定<i class="mint-cell-allow-right"></i></span></p>
      </div>
      <div class="me-bind-order me-ds-list">
        <p>我的订单&nbsp;&nbsp;<i> | </i><a @click="goOrder(0)">已支付订单</a><a  @click="goOrder(1)">未支付订单</a></p>
      </div>
      <div class="me-bind-group me-ds-list">
        <p>我的群&nbsp;&nbsp;　<i> | </i><a  @click="goGroup(0)">我开通的群</a><a  @click="goGroup(1)">我参加的群</a></p>
      </div>
      <div class="me-bind-func me-ds-list">
        <p>功能说明&nbsp;&nbsp;<i> | </i><a  @click="goFuDescription(0)">使用说明</a><a  @click="goFuDescription(1)">常见问题</a></p>
      </div>
      <div class="me-bind-ccservice me-ds-list">
        <p>联系客服&nbsp;&nbsp;<i> | </i><span @click="goContactCuService()">去联系<i class="mint-cell-allow-right"></i></span></p>
      </div>
      <div style="margin-top:10px;background:white; height:10px;"></div>
    </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  export default {
    name: 'w-user-me',
    components: {
      WHeader
    },
    data () {
      return {
        headerName: "我",
        imageSrc:this.$store.state.userInfo.headImgUrl,
        mobile:this.$store.state.userInfo.mobileNumber,
        sex:this.$store.state.userInfo.sex,
        points:0,
        endPoints:0,
        isSignOut:this.$store.state.userInfo.isSignOut,
      }
    },
    created (){
      document.title = '我';
    },
    mounted() {
      this.getEndPoints();
    },
    watch: {
      'imageSrc':function () {

        return this.$store.state.imgUrl + this.imageSrc
      }

    },
    methods: {
      getEndPoints(){
        var vm=this;
        if(vm.isSignOut==0) {
          this.$http.get("/xiaov/userCenter/getUserEndPoints.do").then(function (res) {
            if (res.data.success) {
              vm.endPoints = res.data.result.endPoints;
              vm.points=res.data.result.wechatUser.points==null ? 0 : res.data.result.wechatUser.points;
              vm.points = vm.points == null ? 0 : vm.points;
              vm.endPoints = vm.points == null ? 0 : vm.endPoints;
              var leftWidth = 0;
              var rightWidth = 0;
              if (vm.points == 0) {
                leftWidth = 0;
                rightWidth = 70;
              } else if (vm.endPoints == 0 || vm.endPoints < vm.points) {
                leftWidth = 70;
                rightWidth = 0;
              } else {
                leftWidth = Math.ceil(vm.points * 70 / vm.endPoints);
                rightWidth = 70 - leftWidth;
              }
              document.getElementById("left").style.width = leftWidth + "px";
              document.getElementById("right").style.width = rightWidth + "px";
            } else {
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        }
      },

      connect(){
        this.router.push({name:'w-user-bindphone'});
      },

      goBuy(){
        this.router.push({name:'w-user-gobuy'});
      },
      goOrder(id){
        this.router.push({name:'w-user-me-order',params:{id:id}});
      },
      goGroup(id){
        this.router.push({name: 'w-user-mygroup', params:{id: id}});
      },
      goFuDescription(id){
        this.router.push({name: 'w-user-fuescription', params:{id: id}});
      },
      goContactCuService(){
        this.router.push({name: 'w-user-contactcuservice'});
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .user-me{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .me-top{
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 20px 0;
    background-color: $white;
  }
  .me-top-portrait{
    display: inline-block;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .me-top-portrait img{
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  .me-top-name i{
    margin-right: 5px;
  }
  .me-ds-list{
    margin-top: 10px;
    background-color: $white;
    padding: 10px 20px;
  }
  .me-ds-list p{
    margin: 0;
    padding: 3px 0;
  }
  .me-ds-list p i{
    font-style: normal;
    font-size: 16px;
  }
  .me-ds-list span{
    float: right;
    font-size: 12px;
    color: $dark-green;
    line-height: 16px;
    margin-right: 15px;
    position: relative;
  }
  .me-bind-group a, .me-bind-func a, .me-bind-order a{
    color: $dark-green;
    margin-left: 10px;
    background-color: $white;
    font-size: 13px;
    text-decoration: none;
  }
  .mint-cell-allow-right::after{
    border: solid 1px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 9px;
    right: -15px;
    position: absolute;
    width: 6px;
    height: 6px;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
  }
  .me-middle{
    background: #fff;
    margin-top: 10px;
    padding: 15px 10px;
  }
.yellow-bg{
  background: #faeddd;
  border: 1px solid #fccec3;
  border-radius: 20px;
  height: 40px;
  position: relative;
}
  .yellow-bg img{
    width: 30px;
    padding-left: 10px;
    padding-top: 5px;
  }
  .bt{
    font-size: 16px;
    position: absolute;
    top:12px;
    left: 45px;
  }
  .gm{
    background:#ee6e50;
    float: right;
    padding: 8px 16px;
    margin-right: 10px;
    margin-top: 5px;
    border-radius: 20px;
    color:#fff;
  }
  .level-class{
    display: inline-block;
    width: 70px;
    height: 14px;
    vertical-align: top;
    background-color: $border-color;
    font-size: 0px;

  }
  #left{
    display: inline-block;
    font-size: $assist-size;
    text-align: center;
    background-color: $color-text;
    line-height: 14px;
    height: 14px;
    vertical-align: top;

  }
  #right{
    height: 14px;
    display: inline-block;
    font-size: $assist-size;
    text-align: center;
    line-height: 14px;
    vertical-align: top;
  }
</style>


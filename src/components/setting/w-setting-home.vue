<template>
  <div class="setting-home">
    <!--<w-header :title="headerName"></w-header>-->
  <mt-cell v-if="userType!=0 && isSignOut==0" title="微设置"></mt-cell>
    <div v-if="userType!=0 && isSignOut==0" class="con-wrap">
      <div class="content" >
        <router-link to="/w-setting/w-setting-manager" tag="div" class="w">
          <div class="icon-steward" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">管家设置</span>
        </router-link>

        <router-link to="/w-setting/w-setting-news" tag="div" class="w">
                <div class="icon-infomanage" style="font-size: 45px;padding-bottom: 3px;">
                <span class="path1"></span><span class="path2"></span>
                </div>
          <span class="sub">群信息管理</span>
        </router-link>

        <router-link to="/w-setting/w-setting-keywords" tag="div" class="w">
          <div class="icon-keymanage" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">关键词管理</span>
       </router-link>

        <router-link to="/w-setting/w-setting-adwords" tag="div" class="w">
          <div class="icon-greeting" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </div>
          <span class="sub">入群欢迎语</span>
        </router-link>
      </div>
    </div>

    <mt-cell title="热门功能" ></mt-cell>
    <div class="con-wrap">
      <div class="content">
        <div   class="w" @click="goPageScore()">
          <div class="icon-integral" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">群积分</span>
        </div>

        <div  class="w"  @click="goPageDetail('w-setting-sign')">
          <div class="icon-signin" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">群签到</span>
        </div>

       <!-- <router-link to="/w-member/w-member-leaguer-detail" tag="div" class="w">
          <div class="icon-kick" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">踢人</span>
        </router-link>-->

        <div  class="w" @click="goPageDetail('w-home-groupnotice')">
          <div class="icon-notice" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">群通知</span>
        </div>

        <div  class="w" @click="goPageDetail('w-setting-groupdata')">
          <div class="icon-data" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">群数据</span>
        </div>

        <!--<router-link to="/foo" tag="div" class="w">-->
          <!--<div class="icon-userchange" style="font-size: 45px;padding-bottom: 3px;">-->
            <!--<span class="path1"></span><span class="path2"></span>-->
          <!--</div>-->
          <!--<span class="sub">群主变更</span>-->
        <!--</router-link>-->

        <!--<router-link to="/foo" tag="div" class="w">-->
          <!--<div class="icon-packet" style="font-size: 45px;padding-bottom: 3px;">-->
            <!--<span class="path1"></span><span class="path2"></span>-->
          <!--</div>-->
          <!--<span class="sub">红包</span>-->
        <!--</router-link>-->

      </div>

    </div>

    <mt-cell title="增值服务" v-if="isSignOut==0"></mt-cell>
    <div class="con-wrap" v-if="isSignOut==0">
      <div class="content" style="margin-bottom: 60px;">
        <router-link to="/w-setting/w-setting-incrementservice" tag="div" class="w">
          <div class="icon-weather" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">天气查询</span>
        </router-link>

        <router-link to="/w-setting/w-setting-incrementservice" tag="div" class="w">
          <div class="icon-joke" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">小笑话</span>
        </router-link>

        <router-link to="/w-setting/w-setting-incrementservice" tag="div" class="w">
          <div class="icon-almanac" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">黄历</span>
        </router-link>

        <router-link to="/w-setting/w-setting-incrementservice" tag="div" class="w">
          <div class="icon-horoscope" style="font-size: 45px;padding-bottom: 3px;">
            <span class="path1"></span><span class="path2"></span>
          </div>
          <span class="sub">星座运势</span>
        </router-link>

        <!--<router-link to="/w-setting/w-setting-incrementservice" tag="div" class="w">-->
          <!--<div class="icon-cookbook" style="font-size: 45px;padding-bottom: 3px;">-->
            <!--<span class="path1"></span><span class="path2"></span>-->
          <!--</div>-->
          <!--<span class="sub">菜谱</span>-->
        <!--</router-link>-->

        <!--<router-link to="/w-setting/w-setting-incrementservice" tag="div" class="w">-->
          <!--<div class="icon-hotmessage" style="font-size: 45px;padding-bottom: 3px;">-->
            <!--<span class="path1"></span><span class="path2"></span>-->
          <!--</div>-->
          <!--<span class="sub">热点资讯-->
          <!--</span>-->
        <!--</router-link>-->

        <!--<router-link to="/w-setting/w-setting-incrementservice" tag="div" class="w">-->
          <!--<div class="icon-expresscheck" style="font-size: 45px;padding-bottom: 3px;">-->
            <!--<span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span>-->
          <!--</div>-->
          <!--<span class="sub">快递查询</span>-->
        <!--</router-link>-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui'
  export default {
    name:'w-setting-home',
    components: {
      WHeader
    },
    data(){
      return{
        headerName:'微中心',
        userType:this.$store.state.userInfo.userType,
        isSignOut:this.$store.state.userInfo.isSignOut,
      }
    },
    methods:{
      goPageScore(){
        if(this.isSignOut==1) {
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }
        sessionStorage.setItem("searchId","");
        this.router.push({name:"w-setting-score",params:{}});
      },
      goPageDetail(url){
        if(this.isSignOut==1){
            Toast("您不是本群成员，不能使用此功能！");
            return;
        }else{
          this.router.push({name:url,params:{}});
        }
      }
    },
    created (){
      document.title = '微中心';
    },
  }


</script>

<style scoped lang="scss" type="text/css">
 @import "~common/sass/variable";
 .mint-cell{
   min-height: $second-title;
 }
 .mint-cell:last-child{
   background-image:none;
 }

 .con-wrap{
   width: 100%;
   background: #fff;
   padding: 10px auto;
   margin-top: 10px;
   margin-bottom: 10px;

 }
  .content .w{
    width: 24%;
    display: inline-block;
    padding-bottom: 9px;
    padding-top: 9px;
    text-align: center;
 }
 /*.content img{
   margin: 0 auto 0.3em auto;
   display: block;
   width:$image-size;
   height: $image-size;
 }*/
.content .sub{
   font-size: 11px;
 }

</style>

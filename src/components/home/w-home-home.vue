<template>
  <div class="home-home">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="home-content">
      <div class="home-content-top" >
        <div class="left" v-if="groupInfo.headImgs!=null">
          <img :src="groupInfo.headImgs" v-if="(groupInfo.headImgs.indexOf('http')!=-1)&&(this.$store.state.userInfo.userType!=0)&&(signOut==0)" @click="goQun()">
          <img :src="imgUrl + groupInfo.headImgs" @click="goQun()" v-if="(groupInfo.headImgs.indexOf('http')==-1)&&(this.$store.state.userInfo.userType!=0)&&(signOut==0)">
          <img :src="groupInfo.headImgs" v-if="(groupInfo.headImgs.indexOf('http')!=-1)&&(this.$store.state.userInfo.userType!=0)&&(signOut==1)">
          <img :src="imgUrl + groupInfo.headImgs" v-if="(groupInfo.headImgs.indexOf('http')==-1)&&(this.$store.state.userInfo.userType!=0)&&(signOut==1)">

          <img :src="groupInfo.headImgs" v-if="(groupInfo.headImgs.indexOf('http')!=-1)&&(this.$store.state.userInfo.userType==0)">
          <img :src="imgUrl + groupInfo.headImgs" v-if="(groupInfo.headImgs.indexOf('http')==-1)&&(this.$store.state.userInfo.userType==0)">

        </div>
        <div class="right">
          <div class="group-name">
            <p style="display:inline" v-if="groupInfo.signHistory">
              <span class="font-left">{{groupInfo.groupName | limitString}}</span>
              <span class="font-right">[已签到:{{groupInfo.signHistory.signTime | formatDate}}]</span>
            </p>
            <p style="display:inline" v-else>
              <span class="font-left">{{groupInfo.groupName}}</span>
              <span class="font-right" @click="goPage('w-setting-sign')" v-if="signOut==0">[去签到]</span>
            </p>
          </div>
          <div class="group-desc">
            <span v-if="groupInfo.groupIntroduce!=null">{{groupInfo.groupIntroduce}}</span>
            <span v-else>群主很懒，没有留下任何信息<span v-if="(this.$store.state.userInfo.userType!=0)&&(signOut==0)" @click="goQun()">去设置</span></span>
          </div>
          <div class="group-sign" v-if="groupInfo.tags">
            <span>群标签:</span><span class="sign-item" v-for="tag in groupInfo.tags">{{tag.tagName}}</span>
          </div>
          <div class="group-sign" v-else>
            <span>群标签:</span><span>暂无<span v-if="(this.$store.state.userInfo.userType!=0)&&(signOut==0)" @click="goQun()">去设置</span></span>
          </div>

        </div>
      </div>
      <div class="top-img">
        <div class="left">
          <span>群管/成员<br>已有:<span class="num"><span class="choose">{{masterNum}}</span>/{{groupNum}}</span></span>
        </div>
        <div class="right">
          <img v-for="image in imgList" :src="image.headImgUrl">
          <span v-if="(masterNum < 11)&&(this.$store.state.userInfo.userType!=0)" @click="goPage('w-member-leaguer-detail')" class="icon">
          <span class="icon-plus"></span>
          </span>
        </div>
      </div>

      <div class="con-wrap" >
        <div class="content" >
          <div  class="w" @click="goPageDetail('w-setting-sign')">
            <div class="icon-signin" style="font-size: 45px;padding-bottom: 3px;">
              <span class="path1"></span><span class="path2"></span>
            </div>
            <span class="sub">签到</span>
          </div>

          <div  class="w" @click="goPageDetail('w-home-groupnotice')">
            <div class="icon-notice" style="font-size: 45px;padding-bottom: 3px;">
              <span class="path1"></span><span class="path2"></span>
            </div>
            <span class="sub">群通知</span>
          </div>

          <div  class="w" @click="goPageDetail('w-home-groupYou')">
            <div class="icon-you" style="font-size: 45px;padding-bottom: 3px;">
              <span class="path1"></span><span class="path2"></span>
            </div>
            <span class="sub">微友圈</span>
          </div>

          <div class="w" @click="goPageDetail('w-setting-incrementservice')">
            <div class="icon-c-weather" style="font-size: 45px;padding-bottom: 3px;">
              <span class="path1"></span><span class="path2"></span><span class="path3"></span>
            </div>
            <span class="sub">增值服务</span>
          </div>
        </div>
      </div>
      <!-- <div>{{this.$store.state.commentList}}</div>-->
      <div class="comment-list">
        <div v-if="commentList.length>0" class="list" v-for="(item,index) in commentList">
          <comment-list :item="item" :index="index" :userId="userInfoId" :commentsList="commentList"></comment-list>
        </div>

        <div v-show="commentList.length==0" class="noContent" @click="issueYou()"><span style="position: relative;">微友圈还没有消息，立即去发布<span class="icon-issue"></span></span></div>

      </div>

    </div>


  </div>



</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  import CommentList from '../common/comment-list';
  import { formatDate } from '@/util/common.js';
  import {mapGetters, mapMutations,mapActions} from 'vuex'
  export default {
    name: 'w-home-home',
    components: {
      WHeader,CommentList
    },
    filters:{
      formatDate(time){
        let date=new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      limitString(str){
        if(str && str.length > 4){
          return str.substr(0,4) + '...';
        }else{
          return str;
        }
      }
    },
    data() {
      return {
        headerName: '首页',
        groupInfo:'',
        imgList:[],
        groupNum:0,
        masterNum:0,
        replayList:[],
        signOut:this.$store.state.userInfo.isSignOut,
        userInfoId:this.$store.state.userInfo.id,
        imgUrl: this.$store.state.imgUrl,
        userType:this.$store.state.userType
      }
    },
    mounted() {
      /*查询所有评论*/
        this.$store.dispatch("queryComments")
        this.queryGroupInfo();

    },

    created (){
      document.title = '首页';

    },

   computed: mapGetters([
      'commentList'
    ]),

    methods:{

      ...mapActions([
        'queryComments'
      ]),


      goQun(){
        if(this.signOut==1){
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }else{
          this.router.push({name:'w-setting-news'});
        }
      },

      issueYou(){

        if(this.signOut==1){
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }else{
          this.router.push({name:'w-home-publish-dynamics'});
        }

      },

      goPage(path){
        if(this.signOut==1){
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }
        if(this.userType==0){
          return;
        }

        if(path=='w-member-leaguer-detail'){
          this.router.push({name:path,params:{select:3}});
        }else{
          this.router.push({name:path,params:{}});
        }
      },

      /*查询群信息*/
      queryGroupInfo(){
        var vm = this;
        this.$http.get('/xiaov/groupCenter/groupInfo.do').then(function(res) {
          if(res.data.success){
            vm.groupInfo = res.data.result;
            vm.groupNum=vm.groupInfo.wechatUser.length;
            vm.masterNum=0;
            for(var i=0;i<vm.groupInfo.wechatUser.length;i++){
              if((vm.groupInfo.wechatUser[i].userType==1)||(vm.groupInfo.wechatUser[i].userType==2)){
                vm.masterNum=vm.masterNum+1;
              }
            }
            /*群成员数量*/
            if(vm.groupInfo.wechatUser.length>0){
              if(vm.groupInfo.wechatUser.length>5){
                /*取前5条用户头像信息*/
                vm.imgList=vm.groupInfo.wechatUser.splice(0,5);
              }else{
                vm.imgList=vm.groupInfo.wechatUser;
              }

            }else{
              vm.groupNum=0;
            }

          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        });
      },
      goPageDetail(url){
        if(this.signOut==1){
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }else{
          this.router.push({name:url,params:{}});
        }
      }

    }
  }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .home-content-top{
    background: $light-green;
    padding: 15px;
    padding-right: 0;
    position: relative;
  }
  .home-content-top .left{
    /* width: 25%;*/
    display: inline-block;
  }
  .icon-issue{
    color: rgb(240, 52, 27);
    position: absolute;
    top:-3px;
    font-size: 18px;
  }
  .home-content-top .left img{
    height: 85px;
    width: 85px;
    border-radius: 3px;
  }
  .home-content-top .right{
    /* width:72%;
     float: right;*/
    display: inline-block;
    padding-left: 10px;
    position: absolute;
    top:20px;
  }

  .home-content-top .right .group-name{
    padding: 5px 0;
  }
  .home-content-top .right .group-name .font-left{
    color: $white;
    font-size: $title-size;
    font-weight: bolder;
  }
  .home-content-top .right .group-name .font-right{
    color: $yellow;
    padding-left: 5px;
    font-size:$assist-size;
  }
  .group-desc span{
    color: $white;
    font-size: $assist-size;
    line-height: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

  }
  .group-sign{
    color: $white;
    font-size: $assist-size;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding-top: 5px;
    height: 20px;
  }

  .group-sign .sign-item{
    background: $grey-green;
    color:$dark-green-header;
    padding: 2px 8px;
    border-radius: 4px;
    margin: 0 3px;
  }

  .top-img{
    background: $dark-green;
    padding: 8px 15px;

  }
  .top-img .left{
    width: 26%;
    color: $white;
    font-size: $assist-size;
    line-height: 20px;
    display: inline-block;
  }
  .top-img .left .num{
    font-size: $title-size;
  }
  .top-img .left .num .choose{
    color: $yellow;
  }
  .top-img .right{
    width: 72%;
    float: right;
  }
  .top-img .right img{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 0 2px;
  }
  .icon{
    background:$dark-green-header;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    position: relative;
    display: inline-block;
  }
  .icon-plus{
    color: $white;
    position: absolute;
    top:7px;
    left: 7.5px;

  }

  .con-wrap{
    width: 100%;
    background: #fff;
    padding: 10px auto;


  }
  .content .w{
    width: 24%;
    display: inline-block;
    padding-bottom: 9px;
    padding-top: 9px;
    text-align: center;
  }

  .content .sub{
    font-size: 11px;
  }
  .comment-list{
    margin-top:$space-height;
    background: $white;
    margin-bottom: $bottom-page-marginbottom-height;

  }
  .comment-list .list{
    border-bottom: 1px solid $border-color;
    padding: 10px 15px;
  }
  .comment-list .list:last-child{
    border: none;
  }


</style>

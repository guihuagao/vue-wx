<template>
  <div class="member-card">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="card-top">
      <img :src="wechatUser.headImgUrl">
      <div class="username"><span :class="[wechatUser.sex==1 ? 'icon-man' : 'icon-woman', 'icon']"></span><span>{{wechatUser.wechatNickName}}</span>
        &nbsp;&nbsp;{{wechatUser.points}}&nbsp;<span class="level-class">
          <span style="text-align: center" id="left"></span>
          <span style="text-align: center" id="right"></span>
        </span>&nbsp;
        {{wechatUser.endPoints}}
      </div>

    </div>

    <div class="card-middle">
      <div @click="goScore()" class="border-default">
      <mt-cell :title="userlevel" is-link>
        <span slot="icon" class="icon icon-level"><span class="path1"></span><span class="path2"></span><span
          class="path3"></span><span class="path4"></span><span class="path5"></span>                                                                                                       <span class="path5"></span></span>
      </mt-cell>
      </div>
      <mt-cell :title="addTime">
        <span slot="icon" class="icon icon-clock"></span>
      </mt-cell>
      <div @click="goPage()" class="border-default">
        <mt-cell :title="newTalkTime"  is-link>
          <span slot="icon" class="icon icon-c-speak"></span>
        </mt-cell>
      </div>
      <mt-cell title="个人关系网" to="w-home/w-home-personnet" is-link>
        <span slot="icon" class="icon icon-relationship"></span>
      </mt-cell>
      <mt-cell title="微友圈" to="w-home/w-home-groupYou" is-link>
        <span slot="icon" class="icon icon-a-you"></span>
      </mt-cell>
    </div>

    <div class="card-bottom">
      <div>个人活跃度：</div>
      <div class="circle-list">
        <div class="list">
        <div class="circle">
          <div class="circle-right"></div>
          <div class="name">
            发言数
          </div>
          <div class="num">{{usercard.talkCount}}次</div>
        </div>

        </div>

        <div class="list">
        <div class="circle">
          <div class="circle-right"></div>
          <div class="name">
            每日签到
          </div>
          <div class="num">{{usercard.signCount}}次</div>
        </div>

        </div>


        <div class="list">
          <div class="circle">
            <div class="circle-right"></div>
            <div class="name">
              评论数
            </div>
            <div class="num">{{usercard.commentCount}}次</div>
          </div>

        </div>


        <div class="list">
          <div class="circle">
            <div class="circle-right"></div>
            <div class="name">
              点赞数
            </div>
            <div class="num">{{usercard.likeCount}}次</div>
          </div>

        </div>

        <div class="list">
          <div class="circle">
            <div class="circle-right"></div>
            <div class="name">
              访问空间
            </div>
            <div class="num">{{usercard.visitCount}}次</div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!--微聊等级：-->
</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  import { formatDate } from '@/util/common.js';
  export default {
    name: 'w-member-card',
    components: {
      WHeader
    },
    filters:{
      formatDate(time){
        let date=new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },
    data() {
      return {
        headerName: '个人名片',
        usercard:'',
        wechatUser:'',
        userlevel:'',
        addTime:'',
        newTalkTime:'',
        id:'',
        groupId:'',
      }
    },
    created (){
      document.title = '个人名片';
    },
    /*http://localhost:8089/xiaov/userCenter/userCard.do*/
    mounted() {
      var vm=this;
      if(sessionStorage.getItem("searchId")!=null){
        vm.id=sessionStorage.getItem("searchId");
      }else{
          vm.id="";
      }
      this.userCard();
    },

    methods:{
      userCard(){
        var vm = this;
        this.$http.get('/xiaov/userCenter/userCard.do',{params:{id:vm.id}}).then(function(res) {
          if(res.data.success){
            vm.usercard = res.data.result;
            vm.groupId=res.data.result.wechatUser.groupId;
            vm.userlevel='微聊等级：LV.'+vm.usercard.level;

            vm.wechatUser = res.data.result.wechatUser;
            vm.wechatUser.points=vm.wechatUser.points==null ? 0 : vm.wechatUser.points;
            if(vm.usercard.levelScope!=null){
                vm.wechatUser.endPoints=vm.usercard.levelScope;
            }else{
              vm.wechatUser.endPoints=0;
            }
            var leftWidth=0;
            var rightWidth=0;
            if(vm.wechatUser.points==0){
              leftWidth=0;
              rightWidth=70;
            }else if(vm.wechatUser.endPoints==0 || vm.wechatUser.endPoints<vm.wechatUser.points){
              leftWidth=70;
              rightWidth=0;
            }else{
              leftWidth=Math.ceil(vm.wechatUser.points*70/vm.wechatUser.endPoints);
              rightWidth=70-leftWidth;
            }
            document.getElementById("left").style.width=leftWidth+"px";
            document.getElementById("right").style.width=rightWidth+"px";
            let dateAddTime=new Date(vm.wechatUser.addTime);
            vm.addTime='入群时间：'+ formatDate(dateAddTime,'yyyy-MM-dd hh:mm');
            if(vm.wechatUser.newTalkTime==null){
              vm.newTalkTime='最近发言时间：未发言';
            }else{
              let dateNewTalkTime=new Date(vm.wechatUser.newTalkTime);
              vm.newTalkTime='最近发言时间：'+ formatDate(dateNewTalkTime,'yyyy-MM-dd hh:mm');
            }


          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        })



      },
      goPage(){
        this.router.push({name:'w-member-speak',params:{id:this.id}});
      },
      goScore(){
        var vm=this;
        this.router.push({name:'w-setting-score',params:{id:this.id,groupId:vm.groupId}});

      },
    }

  }




</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .card-top {
    margin: 0 auto;
    background: $white;
    padding: 10px;
    text-align: center;
  }

  .card-top img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .card-top .username {
    padding-top: 5px;
  }

  .card-top .username .icon {
    padding-right: 5px;
  }

  .card-middle {
    margin-top: $space-height;
  }

  .card-middle .icon {
    font-size: 20px;
    top: 30%;
    left: 20px;
    position: absolute;
  }

  .card-bottom {
    margin-top: $space-height;
    background: $white;
    padding: 10px 20px;
    margin-bottom: $bottom-page-marginbottom-height;
  }

  .card-bottom .circle-list {
    padding-top: 10px;
    font-size: 0px;
  }
  .card-bottom .circle-list .list{
    text-align: center;
    width: 25%;
    margin: 10px 0px 15px 0px;
    display: inline-block;
  }
  .card-bottom .circle-list .circle {
    width: 56px;
    height: 56px;
    border: 1px solid $color-text;
    border-radius: 50%;
    position: relative;

  }

  .circle-right {
    width: 64px;
    height: 64px;
    border: 1px solid $color-text;
    border-radius: 50%;
    border-top-color: transparent;
    border-bottom-color: transparent;
    position: absolute;
    top: -5px;
    left: -5px;
    -webkit-transform: rotate(30deg);
  }

  .card-bottom .circle-list .circle .name {
    position: absolute;
    font-size: $assist-size;
    color: $color-text;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }

  .card-bottom .circle-list .circle .num{
    position: absolute;
    font-size: $assist-size;
    color: $shallow-black-color;
     bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .border-default{
    border-bottom: 1px solid $border-color;
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

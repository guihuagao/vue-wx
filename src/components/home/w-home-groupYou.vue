<template>
  <div class="home-groupYou">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="group-content">
      <div class="group-top">
        <div class="left"><span class="icon-a-notice"></span><span>今天新增{{commentNum}}条微友圈</span></div>
        <div class="right"><span class="icon-issue"></span><span @click="issueYou()">发起微友圈</span></div>
      </div>
      <div class="comment-list">
        <div v-if="commentList.length>0" class="list" v-for="(item,index) in commentList">
          <comment-list :item="item" :index="index" :userId="userInfoId"></comment-list>
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
    name: 'w-home-groupYou',
    components: {
      WHeader,CommentList
    },

    mounted() {
    /*  this.userInfo();*/
      this.momentToday();
    },

    data() {
      return {
        headerName: '微友圈',
        userInfoId:this.$store.state.userInfo.id,
        commentNum:''
      }
    },
    created (){
      /*查询所有评论*/
      this.$store.dispatch("queryComments");
      document.title = '微友圈';


    },

    computed: mapGetters([
      'commentList'
    ]),
    methods:{
      issueYou(){
        this.router.push({name:'w-home-publish-dynamics'});
      },
      /*当日新增的微友圈条数*/
      momentToday(){
        var vm = this;
        this.$http.get('/xiaov/moments/momentToday.do').then(function(res) {
          if(res.data.success){
            vm.commentNum = res.data.result;

          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        })
      }


    }


  }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .group-top{
    padding: 10px;
    height: 20px;
    font-size: $comment-size;
    background: $white;
    line-height: 22px;
  }
  .group-top .left{
    float: left;
  }
  .group-top .right{
    float: right;
    color: rgb(240, 52, 27);
  }
  .group-top .icon-a-notice{
    font-size: $common-size;
    margin-right: 4px;
  }
  .group-top .icon-issue{
    color: rgb(240, 52, 27);
    font-size: $common-size;
    margin-right: 4px;
  }

  .group-top .icon-issue::before{
    position: relative;
    top: 1px;
  }
/*  .icon-issue{
    color: rgb(240, 52, 27);
    position: absolute;
    top:-3px;
    font-size: 18px;
  }*/

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

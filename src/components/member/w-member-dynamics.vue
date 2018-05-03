<template>
<div class="member-dynamics">
  <!--<w-header :title="headerName"></w-header>-->
  <div class="card-top">
    <img :src="wechatUser.headImgUrl">
    <div class="username"><span :class="[wechatUser.sex==1 ? 'icon-man' : 'icon-woman', 'icon']"></span><span>{{wechatUser.wechatNickName}}</span>
      <span style="color: #3bc7b0;font-size: 12px;">{{wechatUser.points}}</span><!--:class="[wechatUser.sex==1 ? 'icon-man' : 'icon-woman', 'icon']"-->
      <!--<span class="">
        <mt-progress :value="60" :bar-height="20">
         <div slot="start">0</div>
         <div slot="end">100</div>
       </mt-progress>
      </span>-->
    </div>
  </div>
  <div class="member-middle">
    <div class="dy-list">
      <div class="dy-item">
        <div class="item-left"><span class="time">今天</span></div>
        <div class="top-item-right">
        <div class="top-up" @click="issue()">
          <span class="icon-issue"></span>
        </div>
        </div>
      </div>
      <div class="dy-item" v-for="(item,index) in userMoments.moments">
       <!-- <dynamic-list :item="item" :index="index" :userInfo="wechatUser"></dynamic-list>-->



        <div class="item-left"><span class="time">{{item.addTime,1 | formatDate}}</span><span class="month">{{item.addTime,2 | formatDate}}月</span></div>
        <div class="item-right">
          <div v-if="item.image">
            <img :src="imgUrl+item.image[0]" @click="toDetail(item,index)">
            <span v-show="item.contents.toString().length<=24" class="desc" @click="toDetail(item,index)">{{item.contents}}</span>
            <span v-show="item.contents.toString().length>24" class="desc" @click="toDetail(item,index)">{{item.contents.toString().substr(0,24)}}..</span>
            <span class="num" v-if="item.image">共{{item.image.length}}张</span><span></span>
          </div>

          <div v-else class="only-content">
            <span v-show="item.contents.toString().length<=24" class="contents" @click="toDetail(item,index)">{{item.contents}}</span>
            <span v-show="item.contents.toString().length>24" class="contents" @click="toDetail(item,index)">{{item.contents.toString().substr(0,24)}}..</span>

          </div>

          <div class="assist">
          <span class="icon-operate" @click="showBottomTab(item.id)" ref="main">
              <div class="float-content" v-if="isActive&&showEditId==item.id">
                <span class="icon-repeal" @click="repealDialog(item,index)" v-if="(wechatUser.id==item.addUserId)||(wechatUser.userType!=0)">撤销</span>
                <span class="icon-support"  :class="{'zan-open': item.zan }" @click="zan(item,index)"><span class="tab">赞</span></span>
                <span class="icon-comment" @click="comment(item,index)">评论</span>
                <span class="icon-issue" @click="issue()"><span style="color: #a0a0a0">发布</span></span>
              </div>
            </span>
          </div>
        </div>

        <van-popup v-model="showPop" :close-on-click-overlay="false">
          <div class="dialog-default">
            <div class="dialog-top">
              发表评论
            </div>
            <div class="dialog-default-content">
              <div class="comment-div"><span><textarea class="comment-div-area" v-model.trim="commentContent"></textarea></span></div>
            </div>
            <div class="dialog-default-bottom">
              <div @click="closeDialog()">取消</div>
              <div @click="confirmDialog(commentitem,commentContent)">确定</div>
            </div>
          </div>
        </van-popup>

        <!--撤销动态弹窗-->
        <van-popup v-model="isDelete" :close-on-click-overlay="false">
          <div class="dialog-default">
            <div class="dialog-top">
              撤销动态<span class="icon-close" @click="closeDelete()"></span>
            </div>
            <div class="delete-dialog">
              是否确定撤销动态:{{repealItem.contents}}
            </div>
            <div class="dialog-default-bottom">
              <div @click="closeDelete()">取消</div>
              <div @click="comfirmDelete()">确定</div>
            </div>
          </div>
        </van-popup>





      </div>

    </div>


  </div>

</div>



</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import { formatDate } from '@/util/common.js';
  import DynamicList from '../common/dynamic-list';
  import { Toast } from 'mint-ui';
  /*contains方法*/
  Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  }
    export default {
        name: 'w-member-dynamics',
      components: {
        WHeader,DynamicList
      },
      filters:{
        formatDate(time,i){
          let date=new Date(time);
          if(i==1){
            return formatDate(date,'dd')
          }else{
            return formatDate(date,'MM')
          }

        }
      },
        data() {
            return {
                headerName: '个人动态',
              userMoments:{},
              wechatUser:'',
              headImgUrl:'',
              isActive:false,
              result:'',
              showEditId:'',
              zanchoose:false,
              showPop:false,
              commentContent:'',
              commentitem:'',
              imgUrl: this.$store.state.imgUrl,
              repealItem:'',
              isDelete:false
            }
        },
      created (){
        document.title = '个人动态';
      },
      mounted() {

      this.getUserMoments();

      },
      methods:{
        /*用户信息*/
        getUserMoments() {
          var vm = this;

          if(sessionStorage.getItem("dyuserId")!=null){
            vm.id=sessionStorage.getItem("dyuserId");
          }else{
            vm.id="";
          }

          this.$http.get('/xiaov/userCenter/userMoments.do',{params:{id:vm.id}}).then(function(res) {
            if(res.data.success){
              vm.userMoments=res.data.result;
              vm.wechatUser=vm.userMoments.wechatUser;

            }else{
              Toast(res.data.message);
            }

          }).catch(function(err) {
            Toast(err)
          });
        },

        issue(){
          this.$router.push({name: 'w-home-publish-dynamics'});
        },
        /*显示隐藏*/
        showBottomTab(id){
          this.showEditId=id;
          this.isActive?this.hideWindow():this.showWindow()
        },
        showWindow () {
          this.isActive = true
          document.addEventListener('click', this.hidePanel, false)
        },

        hideWindow () {
          this.isActive = false
          document.removeEventListener('click', this.hidePanel, false)
        },

        hidePanel (e) {
          if (!this.$refs.main.contains(e.target)) {
            this.hideWindow()
          }
        },
        /*撤销*/
        repealDialog(item,index){
          this.isDelete=true;
          this.repealItem=item;
        },
        closeDelete(){
          this.isDelete=false;
        },

        comfirmDelete(){
          this.isDelete=false;
          this.$store.dispatch("repeal",this.repealItem);
          this.getUserMoments();

        },

        /*点赞帖子*/
        zan(item,index){
          this.$store.dispatch("zan",item);
        },
        /*评论*/
        comment(item,index){
          this.commentitem=item;
          this.showPop=true;

        },
        /*发表评论*/
        confirmDialog(commentitem,content){
          this.showPop=false;
          var obj={replytouserid:'',momentId:commentitem.id,contents:content};
          this.$store.dispatch("confirmDialog",obj);
        },

        closeDialog(){
          this.showPop=false;
        },

        issue(){
          this.$router.push({name: 'w-home-publish-dynamics'});
        },
        toDetail(item,index){
          this.$router.push({name: 'w-member-dynamic-detail',params:{item:item,userInfo:this.wechatUser,index:index}});
        }

      },
      beforeDestroy () {
        this.hideWindow()
      },
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
  .member-middle{
    margin-top: $space-height;
    background: $white;
    padding: 10px 15px;
  }
  .member-middle .dy-list{
    margin-bottom: 60px;
  }
  .member-middle .dy-list .dy-item{
    padding: 10px 0;

  }
  .top-up{
    height: 60px;
    width: 60px;
    border-radius: 5px;
    background: #a0a0a0;
    margin-left: 50px;
    text-align: center;
  }
  .top-up .icon-issue{
    color: $white;
    font-size: 28px;
    line-height: 60px;

  }
  .dy-list .dy-item .time{
    font-size: $title-size;
    padding-top: 10px;
    font-weight: 600;
    padding-right: 5px;
  }
  .dy-list .dy-item .item-left{
    float: left;
    width: 50px;
    white-space:nowrap;
    /* padding-top: 10px;*/
  }
  .delete-dialog{
    height: 60px;
    text-align: center;
    padding: 10px;
  }
  .dy-list .dy-item .item-left{
    float: left;
    width: 50px;
    /* padding-top: 10px;*/
  }

  .dy-list .dy-item .top-item-right{
    position: relative;
    padding-right: 30px;
  }

  .dy-list .dy-item .item-right{
    position: relative;
    padding-left: 55px;
    padding-right: 30px;
  }
  .item-right .contents{
    line-height: 20px;

  }

  .item-right .only-content{
    height: 60px;
  }
  .only-content .contents{
    word-wrap:break-word;
    word-break:break-all;
  }
  .icon-comment{
    color: #f7f8fa;
  }
  .item-right .desc{
    position: absolute;
    padding-left: 5px;
    line-height: 20px;
    font-size: $assist-size;
    /* display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 2;
     overflow: hidden;*/
  }
  .item-right .num{
    font-size: $assist-size;
    color: $shallow-black-color;
    padding-left: 5px;
  }
  .item-right .assist{
    font-size: $assist-size;
    color: $shallow-black-color;
    position: absolute;
    right:0;
    bottom:0;
  }

  .item-right .assist .icon-operate{
    font-size: 20px;
    float: right;
    position: relative;
  }
  .item-right .assist .float-content{
    position: absolute;
    font-size: $assist-size;
    width: 190px;
    left: -180px;
    background: #1b1a1a;
    padding: 5px 6px;
    border-radius: 4px;
    text-align: center;
    z-index: 100;
  }
  .item-right .assist .float-content span{
    padding: 0 3px;
  }
  .item-right .assist .float-content .tab{
    color:#a0a0a0;
  }

  .icon-support{
    color: #f7f8fa;
  }

  .zan-open{
    color: #fc301b;
  }
  .icon-issue{
    color: #f7f8fa;
  }


  .dy-list .dy-item .time{
    font-size: $title-size;
    padding-top: 10px;
    font-weight: 600;
    padding-right: 5px;
  }

  .dy-list .dy-item .month{
    font-size: $assist-size;
    padding-right: 5px;
    font-weight: 600;
  }

  .dy-list .dy-item img{
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
  /*弹窗*/
  .comment-div{
    height: 100px;
  }
  .comment-div .comment-div-area{
    height: 100px;
    width: 100%;
    border: 1px solid $border-color;
  }
</style>

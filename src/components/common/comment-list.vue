<template>
  <div>
    <div class="img"><img @click="goDynamic(item.wechatUser.id)" :src="item.wechatUser.headImgUrl"></div>
    <div class="comment">
      <div class="nickname" @click="goDynamic(item.wechatUser.id)">{{item.addUserName}}</div>
      <div class="content"><span v-show="item.contents!=''">{{item.contents}}<br></span>

        <div class="img-div" v-for="(image,index) in item.imageList">
          <div class="img-default" :style="image.url" @click="clickImg(item.image,index)"></div>
        </div>

      </div>

      <div class="assist">
        <span>{{item.addTime | formatDate}}</span>
        <span class="icon-operate" @click="showBottomTab()" v-if="this.$store.state.userInfo.isSignOut==0" ref="main"><!--ref="main"-->
              <div class="float-content" v-if="isActive">
                <span class="icon-repeal" v-if="(userId==item.addUserId)||(this.$store.state.userInfo.userType!=0)" @click="repealDialog(item,index)">撤销</span><!--@click="repeal(item,index)"-->
                <span class="icon-support"  :class="{'zan-open': item.zan }" @click="zan(item,index)"><span class="tab">赞</span></span>
                <span class="icon-comment" @click="comment(item,index)">评论</span>
                <span class="icon-issue" @click="issue(item,index)"><span style="color: #a0a0a0">发布</span></span>
              </div>
            </span>
      </div>
      <div  v-if="item.comments||item.orderZanNum>0" class="padding">
        <div class="listZan">
          <span class="zanName" v-for="(orderZanName,index) in item.orderZanName"><img v-if="index==0" src="../../common/image/zan-red.png">{{orderZanName}}<span v-show="(item.orderZanNum>1)&&(item.orderZanNum!=index+1)">,</span></span>
        </div>
        <div v-if="item.comments.length>0" class="review" v-for="(comment,index) in item.comments" v-show="index<numIndex">
          <div class="review-content">
            <span class="username" @click="addComments(item,comment.addUserId)" v-if="comment.replyToUserName">{{comment.addUserName}}<span style="color: #323232">回复</span><span>{{comment.replyToUserName}}:</span></span>
            <span class="username" @click="addComments(item,comment.addUserId)" v-else>{{comment.addUserName}}:</span>

            <span class="comments">{{comment.contents}}</span>
            <span class="icon-delete" v-if="(userId==comment.addUserId||userType!=0)  && isSignOut==0" @click="delReployContent(comment)"></span><!---->
          </div>

          <!-- <div class="tiptop" v-if="item.commentsNum>1&&index%2!=0">
             <span class="num">还有{{item.commentsNum-2}}条回复</span>
             <span class="check" @click="loadMoreComments">点击查看</span>
           </div>-->

        </div>
        <div class="record-bottom" v-show="dataLength > 2">
          <span class="more" v-show="numIndex<dataLength" @click="loadMoreComments()">更多回复</span>
          <span class="none" v-show="numIndex>=dataLength">没有更多内容 <i @click="packUpComments()">收起</i></span>
        </div>
      </div>
    </div>

   <!--发表评论弹窗-->
    <van-popup v-model="showPop" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          发表评论
        </div>
        <div class="dialog-default-content">
          <div class="comment-div"><span><textarea class="comment-div-area" v-model="commentContent"></textarea></span></div>
        </div>
        <div class="dialog-default-bottom">
          <div @click="closeDialog()">取消</div>
          <div @click="confirmDialog(commentitem,commentContent)">确定</div>
        </div>
      </div>
    </van-popup>

    <!--回复评论弹窗-->
    <van-popup v-model="showComment" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          回复评论
        </div>
        <div class="dialog-default-content">
          <div class="comment-div"><span><textarea class="comment-div-area" v-model="reployContent"></textarea></span></div>
        </div>
        <div class="dialog-default-bottom">
          <div @click="reploycloseDialog()">取消</div>
          <div @click="reployconfirmDialog(reployItem,reployUserId,reployContent)">确定</div>
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
    <!--删除评论弹窗-->
    <van-popup v-model="isDeleteComment" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          删除评论<span class="icon-close" @click="closeDelete()"></span>
        </div>
        <div class="delete-dialog">
          是否确定删除评论:{{commentsdelItem.contents}}
        </div>
        <div class="dialog-default-bottom">
          <div @click="closeCommentDelete()">取消</div>
          <div @click="comfirmCommentDelete()">确定</div>
        </div>
      </div>
    </van-popup>




  </div>
</template>
<script type="text/ecmascript-6">
  import { formatDate } from '@/util/common.js';
  import { Toast } from 'mint-ui';
  import { ImagePreview } from 'vant'
  import {mapGetters, mapMutations,mapActions} from 'vuex';
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
    name:'comment-list',

    props:['item','index','userId','commentsList'],
    filters:{
      formatDate(time){
        let date=new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },
    data(){
      return{
        isActive:false,
        result:'',
        zanchoose:false,
        showPop:false,
        showComment:false,
        commentContent:'',
        commentitem:'',
        reployContent:'',
        reployItem:'',
        reployUserId:'',
        numIndex:2,
        dataLength:0,
        imgUrl: this.$store.state.imgUrl,
        userType:this.$store.state.userInfo.userType,
        showImg: false,
        imgSrc: '',
        isSignOut:this.$store.state.userInfo.isSignOut,
        isDelete:false,
        repealItem:'',
        isDeleteComment:false,
        commentsdelItem:'',
        main:''
      }

    },

    mounted() {
      if(this.item.comments){
      this.dataLength = this.item.comments.length;
      }
    },
    methods:{
      /*点击图片*/
      clickImg(imgList,index){
        var vm=this;
        var imgUrlList=[];
        for(var i=0;i<imgList.length;i++){
          imgUrlList[i]=vm.imgUrl+imgList[i];
        }
        ImagePreview(imgUrlList,index);
      },
      viewImg(){
        this.showImg = false;
      },
      /*跳转到个人动态*/
      goDynamic(userid){
        if(this.isSignOut==1){
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }
        sessionStorage.setItem("dyuserId",userid);

        this.router.push({name:"w-member-dynamics",params:{id:userid}});

      },

      /*显示隐藏*/
      showBottomTab(){
        /*this.isActive = !this.isActive;*/
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

      /*加载更多回复*/
      loadMoreComments(){
        var vm=this;
        vm.numIndex=vm.numIndex+2;
      },
      /*收起回复*/
      packUpComments(){
        var vm=this;
        vm.numIndex=2;
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
        if(content.trim()==''){
          Toast('请输入评论内容');
          return;
        }
        var obj={replyToUserId:'',momentId:commentitem.id,contents:content};
        this.$store.dispatch("confirmDialog",obj);
        this.dataLength += 1;
        this.commentContent='';
      },

      closeDialog(){
        this.showPop=false;
      },

      /*回复某人的评论*/
      addComments(item,userId){
        this.reployItem=item;
        this.reployUserId=userId;
        this.showComment=true;
      },

      reploycloseDialog(){
        this.showComment=false;
      },

      reployconfirmDialog(item,userId,content){
        this.showComment=false;
        if(content.trim()==''){
          Toast('请输入评论内容');
          return;
        }
        var param={replyToUserId:userId,momentId:item.id,contents:content};
        this.$store.dispatch("reployconfirmDialog",param);
        this.reployContent='';

      },

      /*删除回复内容*/

      delReployContent(comment){

        this.commentsdelItem=comment;
        this.isDeleteComment=true;

      },
      closeCommentDelete(){
        this.isDeleteComment=false;
      },
      comfirmCommentDelete(){
        this.isDeleteComment=false;
        this.$store.dispatch("delReployContent",this.commentsdelItem);
        this.dataLength -= 1;
      },

      /*发布*/
      issue(item,index){

        this.$router.push({name:'w-home-publish-dynamics'})
      }

    },
    beforeDestroy () {
      this.hideWindow()
    },

  }


</script>

<style scoped lang="scss">
  .delete-dialog{
    height: 60px;
    text-align: center;
    padding: 10px;
  }
  .img-default{
    background-repeat: no-repeat;
    background-position:center center;
    width:100%;
    height:100%;
    background-size: cover;
  }
  .img-div{
    display: inline-block;
    width: 21vw;
    height: 21vw;
    margin-right: 2%;
    vertical-align: middle;
    margin-bottom: 2%;
  }
  .comment-list .img{
    display: inline-block;
    float: left;

  }
  .icon-comment{
    color: #f7f8fa;
  }

  .assist .icon-comment::before{
    margin-right: 3px;
  }

  .comment-list .img img{
    border-radius: 4px;
    width: 48px;
    height: 48px;
  }
  .comment-list .comment{
    display: inline-block;
    width: 79%;
    padding-left: 10px;
  }
  .comment-list .comment .nickname{
    font-size: $common-size;
    color:$color-text;
    padding-bottom: 8px;
    padding-top: 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .comment-list .comment .content{
    line-height: 20px;
    font-size: $comment-size;
    word-break:break-all;
    word-wrap:break-word
  }

  .comment-list .comment .content .img-div img{
    width: 100%;
    height: 100%;
  }

  .comment-list .comment .assist{
    font-size: $assist-size;
    color: $shallow-black-color;
    padding-bottom: 10px;
  }

  .comment-list .comment .assist .icon-operate{
    font-size: 20px;
    float: right;
    position: relative;
  }
  .comment-list .comment .assist .float-content{
    position: absolute;
    font-size: $assist-size;
    width: 190px;
    left: -170px;
    background: #1b1a1a;
    padding: 5px 6px;
    border-radius: 4px;
    text-align: center;
    z-index: 100;
    white-space:nowrap;
  }
  .comment-list .comment .assist .float-content span{
    padding: 0 3px;
  }
  .comment-list .comment .assist .float-content .tab{
    color:#a0a0a0;
  }

  .icon-support{
    color: #f7f8fa;
  }
  .icon-delete{
    color: #acaeae;;
  }
  .zan-open{
    color: #fc301b;
  }
  .icon-issue{
    color: #f7f8fa;
  }

  .padding{
    background: $grey-background;
    padding: 7px 0;
  }
  .padding .listZan{
    padding: 4px 2px;
  }
  .padding .listZan .zanName{
    font-size: $assist-size;
    color:$color-text;
  }
  .padding .listZan .zanName img{
    height: 10px;
    padding-left: 4px;
    padding-right: 4px;
  }

  .comment-list .comment .review{
    background: $grey-background;
    padding: 0px 9px 0px 10px;
    border-radius: 4px;

  }

  .comment-list .comment .review .review-content{
    position: relative;
  }

  .comment-list .comment .review span{
    line-height: 22px;
  }

  .comment-list .comment .review .comments{
    font-size: $comment-size;
    padding-right: 4px;

  }
  .comment-list .comment .review .icon-delete{
    position: absolute;
    bottom:2px;
    right:-5px;
    font-size: $assist-size;
  }
  .comment-list .comment .review .username{
    color: $color-text;
  }


  .comment-list .comment .review .tiptop{
    padding-top: 10px;
    font-size: $assist-size;
    padding-bottom: 5px;
  }
  .comment-list .comment .review .tiptop .num{

    color: $shallow-black-color;
  }
  .comment-list .comment .review .tiptop .check{
    color:$color-text;
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

  .comment .record-bottom{
    background: #f7f8fa;
    padding: 5px 25px 5px 10px;
    border-radius: 4px;
  }
  .comment .record-bottom .none{
    color: $shallow-black-color;
  }
  .comment .record-bottom .more{
    color: $color-text;
  }
  .comment .record-bottom .none i{
    color: $color-text;
    font-style: normal;
    float: right;
  }


</style>

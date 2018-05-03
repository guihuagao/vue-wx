<template>
<div class="dynamic-detail">
  <!--<w-header :title="headerName"></w-header>-->

  <div class="comment-list">
    <div class="list">

      <div class="img"><img :src="userInfo.headImgUrl"></div>
      <div class="comment">
        <div class="nickname">{{item.addUserName}}</div>
        <div class="content"><span v-show="item.contents!=''">{{item.contents}}<br></span>
          <div class="img-div" v-for="(image,index) in item.imageList">
            <div class="img-default" :style="image.url" @click="clickImg(item.image,index)"></div>
          </div>
         <!-- <img :src="imgUrl+image" v-for="image in item.image">-->
        </div>

        <div class="assist">
          <span>{{item.addTime | formatDate}}</span>
          <span class="icon-operate" @click="showBottomTab()" ref="main">
              <div class="float-content" v-if="isActive">
                <span class="icon-repeal"  v-if="(userInfo.userType==item.addUserId)||(userInfo.userType!=0)" @click="repealDialog(item,index)">撤销</span>
                <span class="icon-support"  :class="{'zan-open': item.zan }" @click="zan(item,index)"><span class="tab">赞</span></span>
                <span class="icon-comment" @click="comment(item,index)">评论</span>
                <span class="icon-issue" @click="issue()"><span style="color: #a0a0a0">发布</span></span>
              </div>
            </span>
        </div>


        <div  class="padding" v-if="item.comments||item.orderZanNum>0">
          <div class="listZan">
            <span class="zanName" v-for="(orderZanName,index) in item.orderZanName"><img v-if="index==0" src="../../common/image/zan-red.png">{{orderZanName}}<span v-show="(item.orderZanNum>1)&&(item.orderZanNum!=index+1)">,</span></span>
          </div>
        <div v-if="item.comments">
          <div class="review" v-for="(comment,index) in item.comments">
            <div class="review-content">
              <span class="username" @click="addComments(item,comment.addUserId)" v-if="comment.replyToUserName">{{comment.addUserName}}<span style="color: #323232">回复</span><span>{{comment.replyToUserName}}:</span></span>
              <span class="username" @click="addComments(item,comment.addUserId)" v-else>{{comment.addUserName}}:</span>

              <span class="comments">{{comment.contents}}</span>
              <span class="icon-delete" v-if="userType!=0||userInfo.id==addUserId"@click="delReployContent(comment)"></span>
            </div>

            <!-- <div class="tiptop" v-if="item.commentsNum>1&&index%2!=0">
               <span class="num">还有{{item.commentsNum-2}}条回复</span>
               <span class="check" @click="loadMoreComments">点击查看</span>
             </div>-->

          </div>
        </div>
        </div>
      </div>


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
  </div>

</div>
</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  import { ImagePreview } from 'vant'
  import { formatDate } from '@/util/common.js';
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
        name: 'w-member-dynamic-detail',
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
              headerName: '个人动态',
              item:'',
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
              headImgUrl:'',
              userInfo:'',
              imgUrl: this.$store.state.imgUrl,
              userType:this.$store.state.userInfo.userType,
              styleUrl:'',
              isDelete:false,
              repealItem:'',
              isDeleteComment:false,
              commentsdelItem:''
            }
        },
      created (){
        document.title = '个人动态';
      },
      mounted() {
       this.queryTnfo();
      },
      methods:{
         /*接收数据*/
          queryTnfo(){
            this.item=this.$route.params.item;

            /*this.styleUrl="backgroundImage: url("+this.imgUrl+this.item[i].image[j]+")";*/
            this.item.imageList=[];

              if(this.item.image!=null && this.item.image.length>0){
                for(var j=0;j<this.item.image.length;j++){
                  this.item.imageList.push({url:{backgroundImage: "url("+this.imgUrl+this.item.image[j]+")"}});
                }
              }


            this.userInfo=this.$route.params.userInfo;
            this.index=this.$route.params.index;
          },

        /*点击图片*/
        clickImg(imgList,index){
          var vm=this;
          var imgUrlList=[];
          for(var i=0;i<imgList.length;i++){
            imgUrlList[i]=vm.imgUrl+imgList[i];
          }
          ImagePreview(imgUrlList,index);
        },

        /*显示隐藏*/
        showBottomTab(){
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

        },
        repealDialog(item,index){
          this.isDelete=true;
          this.repealItem=item;
        },
        closeDelete(){
          this.isDelete=false;
        },
        /*撤销*/
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
          var obj={replytouserid:'',momentId:commentitem.id,contents:content};
          this.$store.dispatch("confirmDialog",obj);
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
          var param={replytouserid:userId,momentId:item.id,contents:content};
          this.$store.dispatch("reployconfirmDialog",param);
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

        },

        /*发布*/
        issue(){
            this.$router.push({name: 'w-home-publish-dynamics'});
        }

      },
      beforeDestroy () {
        this.hideWindow()
      },
    }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
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
  .comment-list{
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
  .comment-list .img{
    display: inline-block;
    float: left;

  }
  .icon-comment{
    color: #f7f8fa;
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

  .comment-list .comment .content img{
    width: 30%;
    height: 30%;
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
    width: 180px;
    left: -170px;
    background: #1b1a1a;
    padding: 5px 6px;
    border-radius: 4px;
    text-align: center;
    z-index: 100;
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
    padding: 10px 25px 3px 10px;
    border-radius: 4px;

  }

  .comment-list .comment .review .review-content{
    position: relative;
  }

  .comment-list .comment .review span{
    line-height: 20px;
  }

  .comment-list .comment .review .comments{
    font-size: $comment-size;
    padding-right: 2px;

  }
  .comment-list .comment .review .icon-delete{
    position: absolute;
    bottom:2px;
    right:-5px;
    font-size:  $assist-size;;
  }
  .comment-list .comment .review .username{
    color: $color-text;
  }

.icon-delete{
  color: #acaeae;;
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
</style>

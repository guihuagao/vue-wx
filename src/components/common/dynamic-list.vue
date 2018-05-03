<template>
<div>

    <div class="item-left"><span class="time">{{item.addTime,1 | formatDate}}</span><span class="month">{{item.addTime,2 | formatDate}}月</span></div>
    <div class="item-right">
      <div v-if="item.image">
      <img :src="imgUrl+item.image[0]" @click="toDetail(item,index)">
        <span v-show="item.contents.toString().length<=43" class="desc" @click="toDetail(item,index)">{{item.contents}}</span>
        <span v-show="item.contents.toString().length>43" class="desc" @click="toDetail(item,index)">{{item.contents.toString().substr(0,43)}}..</span>
      <span class="num" v-if="item.image">共{{item.image.length}}张</span><span></span>
      </div>

      <div v-else class="only-content">
        <span v-show="item.contents.toString().length<=43" class="contents" @click="toDetail(item,index)">{{item.contents}}</span>
        <span v-show="item.contents.toString().length>43" class="contents" @click="toDetail(item,index)">{{item.contents.toString().substr(0,43)}}..</span>

      </div>

      <div class="assist">
          <span class="icon-operate" @click="showBottomTab()">
              <div class="float-content" v-if="isActive">
                <span class="icon-repeal" @click="repealDialog(item,index)" v-if="(userInfo.id==item.addUserId)||(userInfo.userType!=0)">撤销</span>
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
        <div class="comment-div"><span><textarea class="comment-div-area" v-model="commentContent"></textarea></span></div>
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

</template>
<script type="text/ecmascript-6">
  import { formatDate } from '@/util/common.js';
  import { Toast } from 'mint-ui';
    export default {
        name: 'dynamic-list',
      props:['item','index','userInfo'],
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
              headImgUrl:'',
              isActive:false,
              result:'',
              zanchoose:false,
              showPop:false,
              commentContent:'',
              commentitem:'',
              imgUrl: this.$store.state.imgUrl,
              repealItem:'',
              isDelete:false

            }
        },
      methods:{
        /*显示隐藏*/
        showBottomTab(){
          this.isActive = !this.isActive;
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
          this.$router.push({name: 'w-member-dynamic-detail',params:{item:item,userInfo:this.userInfo,index:index}});
        }


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
  .dy-list .dy-item .item-left{
    float: left;
    width: 50px;
   /* padding-top: 10px;*/
  }

  .dy-list .dy-item .item-right{
    position: relative;
  }
  .item-right .contents{
    line-height: 20px;
    padding-left: 5px;
  }

  .item-right .only-content{
    height: 50px;
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
    width: 180px;
    left: -170px;
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

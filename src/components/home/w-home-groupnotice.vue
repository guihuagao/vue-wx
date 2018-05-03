<template>
  <div class="setting-groupnotice">
   <!-- <w-header :title="headerName"></w-header>-->
    <div class="groupnotice-top">
      <span class="icon-a-notice"></span>
      <span class="gray-default">今天新增{{noticeNumToday}}条记录</span>
      <span class="select-list" @click="openDialog()">筛选</span>
      <span class="icon-issue" v-if="userType!=0" @click="assiue()">发起群通知</span>
    </div>



    <div class="groupnotice-center" v-for="notice in noticeList">
      <div @click="showNoticeDialog(notice)">
        <span v-show="notice.noticeType==0" class="icon-a-notice"></span>
        <span v-show="notice.noticeType==1" class="icon-comment"></span>
         <span v-show="notice.noticeType==2" class="icon-warning">
         <span class="path1"></span><span class="path2"></span><span class="path3"></span>
         </span>
        &nbsp;{{notice.noticeTitle}}&nbsp;<span class="red-default" v-show="notice.reading==0"></span>
      </div>
      <div class="groupnotice-center-centent">
        <div class="content"><p>{{notice.noticeContent | limitString}}</p>
          <p class="time">{{reverseTime(notice.publishTime)}}</p>
        </div>
        <div class="operate" v-if="userType!=0">
          <span class="icon-operate" @click="showTools(notice.id)" ref="main"></span>
          <span class="assits-tool" v-show="toolselect==notice.id&&toolshow"><!--<span class="icon-repeal">撤销</span>&nbsp;&nbsp;-->
            <span class="icon-edit" @click="editNotice(notice)">编辑</span>&nbsp;&nbsp;<span class="icon-delete" @click="deleteNotice(notice)">删除</span>
          </span>
        </div>
      </div>
      <div v-show="noticeList.length==0">
        <div class="no-notice">群通知还没有消息<span v-if="userType!=0" @click="issueNew()">，立即去发布<span class="icon-issue issue1"></span></span></div>
      </div>
    </div>

    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          只看这些<span class="icon-close" @click="closeDialog()"></span>
        </div>
        <div class="dialog-default-content notice-dialog">
            <div v-show="!isTrue">
              &nbsp;<input type="checkbox" id="checkbox-2-1" v-model="all" class="regular-checkbox big-checkbox"/><label
              for="checkbox-2-1"></label> <span>&nbsp;全选</span>
            </div>
          <div v-show="isTrue" @click="clickChange()">
            &nbsp;<div  id="checkbox-2-6"  class="regular-checkbox big-checkbox" ></div><label
            for="checkbox-2-6"></label> <span>&nbsp;全选</span>
          </div>
            <div class="check-default">
              &nbsp;<input type="checkbox" id="checkbox-2-2" v-model="rule" class="regular-checkbox big-checkbox"/><label
              for="checkbox-2-2"></label><span>&nbsp;群规</span>
            </div>
            <div class="check-default">
              &nbsp;<input type="checkbox" id="checkbox-2-3" v-model="notice" class="regular-checkbox big-checkbox"/><label
              for="checkbox-2-3"></label><span>&nbsp;公告</span>
            </div>
         <!-- <div >
            &nbsp;<input type="checkbox" id="checkbox-2-4" v-model="inform" class="regular-checkbox big-checkbox"/><label
            for="checkbox-2-4"></label><span>&nbsp;通知</span>
          </div>-->
        </div>
        <div class="dialog-default-bottom">
          <div @click="closeDialog()">取消</div>
          <div @click="confirmDialog(all,rule,notice)">确定</div>
        </div>
      </div>
    </van-popup>



    <van-popup v-model="showNotice" :close-on-click-overlay="false">
      <div class="dialog-default-notice">
        <div class="dialog-top">
          通知详情<span class="icon-close" @click="confirmDialogNotice()"></span>
        </div>
        <div class="dialog-default-content notice-dialog-content">
         <div class="detail-title">标题:{{noticedetail.noticeTitle}}</div>
          <div class="detail-content">内容:{{noticedetail.noticeContent}}</div>

          </div>
        </div>
      <!--  <div class="dialog-default-bottom">
          <div @click="closeDialogNotice()">取消</div>
          <div @click="confirmDialogNotice()">确定</div>
        </div>-->

    </van-popup>

    <!--删除弹窗-->
    <van-popup v-model="isDelete" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          删除公告<span class="icon-close" @click="closeDelete()"></span>
        </div>
        <div class="delete-dialog">
          是否确定删除公告:{{isDeleteItem.noticeContent}}
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
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  import { formatDate,getDateDiff } from '@/util/common.js';
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
    name: 'w-setting-grouprank',
    components: {
      WHeader
    },
    created (){
      document.title = '群通知';
    },
    filters:{
      limitString(str){
        if(str && str.length > 44){
          return str.substr(0,44) + '...';
        }else{
          return str;
        }
      }
    },
    data() {
      return {
        headerName: '群通知',
        show:false,
        showNotice:false,
        noticeList:[],
        noticeNumToday:'',
        toolselect:'',
        all:false,
        rule:false,
        notice:false,
        inform:false,
        toolshow:false,
        isTrue:false,
        isChang:0,
        noticedetail:'',
        userType:this.$store.state.userInfo.userType,
        isDelete:false,
        isDeleteItem:'',
        main:''

      }
    },
    mounted () {
      this.getNoticeList('3');
    },
    methods:{
      /*转换时间*/
      reverseTime(date){

        return getDateDiff(date)
      },

      openDialog(){
        this.show=true;
      },

      closeDialog(){
        this.show=false;
      },
      /*显示详情弹窗*/
      showNoticeDialog(notice){
        var vm=this;
        vm.noticedetail=notice;
        vm.showNotice=true;
        this.$http.get("/xiaov/notice/readHistory.do",{params:{noticeId:notice.id}}).then(function (res) {
            if(res.data.success){

            }else{
           /*   Toast(res.data.message);*/
            }
          }).catch(function (err) {
            Toast(err);
          })


      },
      confirmDialogNotice(){
        this.getNoticeList('3');
        this.showNotice=false;
      },


      closeDialogNotice(){
        this.showNotice=false;
      },
      /* "type"0公告1通知2群规 */
      confirmDialog(all,rule,notice){
        var vm=this;
        this.show=false;
        if(vm.rule || vm.notice){
          all=false;
        }
        if(vm.rule && vm.notice){
          all=true;
        }
        if((all==true)||(rule==true&&notice==true)){
          this.getNoticeList('3');
          return;
        }else{
          if(rule){
            if(notice){
              this.getNoticeList('6');
              return
            }

            else{
              this.getNoticeList('2');
              return
            }
          }
          else if(notice){
            if(rule){
              this.getNoticeList('6');
              return
            }

            else{
              this.getNoticeList('0');
              return
            }
          }
        }

      },
      showTools(id){
        this.toolselect=id;
        this.toolshow?this.hideWindow():this.showWindow()
     },
      showWindow () {
        this.toolshow = true
        document.addEventListener('click', this.hidePanel, false)
      },

      hideWindow () {
        this.toolshow = false
        document.removeEventListener('click', this.hidePanel, false)
      },

      hidePanel (e) {
        if (!this.$refs.main.contains(e.target)) {
          this.hideWindow()
        }
      },


      /*发起*/
      assiue(){
        this.$router.push({name:'w-home-add-notice'});
      },
      issueNew(){
        this.$router.push({name:'w-home-add-notice'});
      },
      /*获取公告*/
     getNoticeList(type){
       var vm = this;
       this.$http.get('/xiaov/notice/noticeList.do',{params:{type:type}}).then(function(res) {

         if(res.data.success){
           vm.noticeList=res.data.result.groupNotices;
           vm.noticeNumToday=res.data.result.noticeNumToday;
         }else{
           Toast(res.data.message);
         }

       }).catch(function(err) {
         Toast(err)
       });
     },
      /*编辑*/
      editNotice(notice){
        this.$router.push({name:'w-home-update-notice',params:{notice:notice}});
      },
      /*删除*/

      closeDelete(){
        this.isDelete=false;
      },

      deleteNotice(notice){
        this.isDelete=true;
        this.isDeleteItem = notice;
      },

      comfirmDelete(){
        var vm = this;
        vm.isDelete=false;
        this.$http.get('/xiaov/notice/delNotice.do',{params:{id:vm.isDeleteItem.id}}).then(function(res) {
          if(res.data.success){
            vm.getNoticeList('3');
            Toast('删除成功');

          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        });
      },



      clickChange(){
        var vm=this;
        vm.all=false;
        vm.isTrue=false;
        vm.isChang=1;
      }
    },
    beforeDestroy () {
      this.hideWindow()
    },
    watch:{
      all:{
        handler:function(val,oldval){
          var vm=this;
          if(vm.isChang==1){
            vm.all=true;
            vm.rule=true;
            vm.notice=true;
            return;
          }
          if(vm.all){
            vm.rule=true;
            vm.notice=true;

          }else{
            vm.rule=false;
            vm.notice=false;

          }
          vm.isChang=0;
        },
      },
      rule:{
        handler:function(val,oldval){
          var vm=this;
          vm.isChang=0;
          if(vm.rule && vm.notice){
            vm.all=true;
            vm.isTrue=false;
            return;
          }
          if(vm.rule || vm.notice){
            vm.isTrue=true;
            return;
          }
          if(!vm.rule && !vm.notice){
            vm.all=false;
            vm.isTrue=false;
          }

        },
      },
      notice:{
        handler:function(val,oldval){
          var vm=this;
          vm.isChang=0;
          if(vm.rule && vm.notice){
            vm.all=true;
            vm.isTrue=false;
            return;
          }
          if(vm.rule || vm.notice){
            vm.isTrue=true;
            return;
          }
          if(!vm.rule && !vm.notice){
            vm.all=false;
            vm.isTrue=false;
          }
        },
      },
    }

  }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .delete-dialog{
    height: 50px;
    text-align: center;
    padding: 10px;
  }
  .setting-groupnotice{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .groupnotice-top{
    background-color: $white;
    padding: 10px 20px;
  }
  .gray-default{
    color: $shallow-black-color;
  }
  .icon-issue{
    color: red;
    float: right;
  }
  .select-list{
    color: $color-text;
    float: right;
    padding-left: 5px;
    margin-left: 5px;
    margin-top: 2px;
    border-left: 1px solid $color-text;
    font-size: $assist-size;
  }
  .groupnotice-center{
    margin-top: 10px;
    padding: 10px 20px;
    background-color: $white;
  }
  .groupnotice-center-centent{
    padding-left: 14px;
    padding-top: 10px;
    font-size:$assist-size;
  }
  .icon-comment{
    color: $color-text;
  }
  .groupnotice-center-centent .time{
    padding-top: 5px;
  }
  .groupnotice-center-centent div{
    display: inline-block;
    vertical-align: bottom;
  }
  .groupnotice-center-centent .content{
    width: 85%;

  }

  .groupnotice-center-centent .content p
  {
    /*display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;*/
    line-height: 15px;
    white-space: pre;
  }
  .groupnotice-center-centent .operate{
    width: 12%;
    text-align: right;
  }
  p{
    margin: 0;
    padding: 0;
    color: $shallow-black-color;
    line-height: 17px;
  }
  .red-default{
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
  }
  .assits-tool{
    padding: 5px 6px;
    border-radius: 4px;
    text-align: center;
    background: #1b1a1a;
    position: absolute;
    z-index: 20;
    margin-top: 14px;
    right: 25px;
    color: #f7f8fa;
    font-size: $assist-size;
  }
  .icon-operate{
    font-size: 16px;
  }
  .notice-dialog{
    height:110px;
  }
  .regular-checkbox {
    display: none;
  }

  .regular-checkbox + label {
    background-color: $white;
    border: 1px solid $border-color;
    border-radius: 3px;
    height: 12px;
    width: 12px;
    display: inline-block;
    position: relative;
  }

  .regular-checkbox + label:active, .regular-checkbox:checked + label:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .regular-checkbox:checked + label {
    background-color: $color-text;
    border: 1px solid $color-text;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #99a1a7;
  }

  .regular-checkbox:checked + label:after {
    content: '\2714';
    font-size: 15px;
    position: absolute;
    top: -3px;
    left: 1px;
    color: $white;
  }

  .big-checkbox:checked + label:after {
    font-size: 13px;
  }
  .check-default{
    margin: 10px 0px;
  }
  .no-notice{
      text-align: center;
      padding-top: 20px;
      font-size: $assist-size;
      color: $shallow-black-color;
  }
  .issue1{
    float: none;
  }
  .icon-close{
    font-size: 12px;
    float: right;
    opacity: 0.9;
  }
  .detail-title{
    border-bottom: 1px solid #e0e1e3;
    padding: 2px 0;
  }
  .detail-content{
    padding: 4px 0;
    font-size: 13px;
  }
 .notice-dialog-content{
  height: 130px;
}
  .dialog-default-notice{
    background: $white;
    width: 300px;
    font-size: 14px;
    border-radius: 10px;
    height: 300px;

  }
</style>

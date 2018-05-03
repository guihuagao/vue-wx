<template>
  <div class="update-notice">
   <!-- <w-header :title="headerName"></w-header>-->
    <div class="up-notice-top">
      &nbsp;选择标签&nbsp;&nbsp;
      <span v-for="(tag,index) in tags" class="title-default" :class="{'title-active':tag.id==selectId}" @click="chooseTag(tag.id,tag.name)">{{tag.name}}</span>
    </div>
    <div class="up-notice-center">
      <div class="notice-text">{{titleName}}标题</div>
      <div class="notice-default-div notice-title">
        <div>{{titleName}}标题</div>
        <div><input class="input-default notice-input" v-model.trim="title" placeholder="设置好的标题能获得更多的人关注"/></div>
      </div>
      <div class="notice-default-div notice-text">
        {{titleName}}内容
      </div>
      <div class="notice-area">
        <textarea class="notice-area-default area-text" v-model.trim="content" placeholder="请输入内容"></textarea>
      </div>
      <div class="notice-default-div upda-date">
        <div>发布时间:</div>
        <div class="date-set">
          <div>
            <span class="keywords-radio"><input type="radio" id="radio-1-1" name="radio-1-set" class="regular-radio" value="now" v-model="chooseTime" @change="changeTime(chooseTime)"/><label for="radio-1-1"></label></span>
            <span class="radio-text">立即发布</span>
          </div>
          <div>
            <span class="keywords-radio"><input type="radio" id="radio-1-2" name="radio-1-set" class="regular-radio" value="defineTime" v-model="chooseTime" @change="changeTime(chooseTime)"/><label for="radio-1-2"></label></span>
            <span class="radio-text">自定义时间 <span class="dateSpan" @click="openDate()">{{pickerValue | formatDate}}</span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="notice-center-bottom">
      <div>
        &nbsp;<input type="checkbox" id="checkbox-2-1" class="regular-checkbox big-checkbox" v-model="isTop"/><label
        for="checkbox-2-1"></label><span>&nbsp;置顶该内容</span>
      </div>
      <div class="notice-default-div">
        &nbsp;<input type="checkbox" id="checkbox-2-2" class="regular-checkbox big-checkbox" v-model="isUrl"/><label
        for="checkbox-2-2"></label><span>&nbsp;向群内发布新链接通知</span>
      </div>
      <div>
        &nbsp;<input type="checkbox" id="checkbox-2-3" class="regular-checkbox big-checkbox" v-model="isAtAll"/><label
        for="checkbox-2-3"></label><span>&nbsp;@所有人</span>
      </div>
    </div>
    <div class="notice-bottom">
      <button class="button-default" @click="addNotice()"><label>保存设置</label></button>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      v-model="pickerValue"
      @confirm="handleConfirm"
      :startDate='currentDate'
    >
    </mt-datetime-picker>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  import WHeader from '../w-header'
  import { formatDate } from '@/util/common.js'
  export default {
    name: 'w-home-add-notice',
    components: {
      WHeader
    },
    mounted () {

    },
    filters: {
      formatDate (time) {
        if(time==""){
          return "";
        }else{
          let date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        }
      }
    },
    data () {
      return {
        headerName: '发布公告',
        value1: true,
        pickerValue:'',
        currentDate:new Date(),
        minDate:'',
        activeClass: 'title-active',
        errorClass: 'title-default',
        selectId:0,
        titleName:'公告',
        tags:[
          {name:'公告', id:0},
          {name:'群规', id:2}
         /* {name:'通知', id:1}*/
        ],
        title:'',
        content:'',
        isTop:true,
        isUrl:false,
        isAtAll:false,
        chooseTime:'now'
      }
    },

    created (){
      document.title = this.headerName;
    },


    methods: {
      openDate(){
        this.$refs.picker.open();
      },
      chooseTag(id,name){
        this.selectId=id;
        this.titleName=name;
        this.headerName='发布'+name;

      },
      handleConfirm(date){
        this.pickerValue=date;
      },
      changeTime(time){

        this.chooseTime=time;
      },

      addNotice(){
        var vm = this;

        if(vm.title.trim()==''){
          Toast("请输入标题");
          return;
        }

        if(vm.content.trim()==''){
          Toast("请输入公告");
          return;
        }
        if(vm.chooseTime=='now'){
          vm.publishTime=formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
        }else{

          vm.currentDate=new Date();

          if(vm.pickerValue==''){
            Toast("请选择自定义时间");
            return;
          }else{
            vm.publishTime=formatDate(vm.pickerValue,'yyyy-MM-dd hh:mm:ss');
          }
        }

        /*比较时间*/
        if((vm.chooseTime=='defineTime')&&(new Date(vm.publishTime)<new Date())){

          Toast("时间已成过往，请重新选择发布时间");
          return;
        }

        if(vm.isTop){
          vm.Top=1;
        }else{
          vm.Top=0;
        }

        if(vm.isUrl){
          vm.Url=1;
        }else{
          vm.Url=0;
        }

        if(vm.isAtAll){
          vm.AtAll=1;
        }else{
          vm.AtAll=0;
        }
        /* "type"0公告1通知2群规 */
        /*0 false 1 true*/
        /*
        * type
          title
          content
          publishTime
          isTop
          isUrl
          isAtAll
        * */
        this.$http.get('/xiaov/notice/addNotice.do',{params:{type:vm.selectId,title:vm.title,content:vm.content,publishTime:vm.publishTime,isTop:vm.Top,isUrl:vm.Url,isAtAll:vm.AtAll}}).then(function(res) {
          if(res.data.success){

            Toast('添加成功');
            vm.$router.push({name: 'w-home-groupnotice'});

          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        });
      }







    },

  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .title-default{
    margin-left: 5px;
    color: $shallow-black-color;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 4px 10px;
  }


  .title-active{
    margin-left: 5px;
    color: $color-text;
    border: 1px solid $color-text;
    border-radius: 4px;
    padding: 2px 5px;
  }

  .update-notice {
    border-bottom: $bottom-page-marginbottom-height;
  }
  .update-notice .icon-a-notice{
    font-size: $common-size;
  }
  .up-notice-top {
    padding: 15px 20px;
    background-color: $white;
  }

  .notice-delete {
    float: right;
    color: $color-text;
    cursor: pointer;
  }

  .up-notice-center {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: $white;
  }

  .notice-text {
    color: $shallow-black-color;
    padding-left: 5px;
  }

  .notice-default-div {
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 3px;

  }

  .notice-title div {
    background-color: $grey-background;
    height: 35px;
    line-height: 35px;
    vertical-align: top;
    font-size: $assist-size;
  }

  .notice-title div:first-child {
    width: 70px;
    padding-left: 5px;
  }

  .notice-title div:last-child {
    margin-left: 70px;
    margin-top: -35px;
  }

  .notice-input {
    height: 33px;
  }

  .notice-area {
    padding: 10px 10px;
    height: 40px;
    background-color: $grey-background;
    font-size: $assist-size;
  }
  .area-text{
    font-size: $assist-size !important;
  }
  .notice-area-default {
    height: 36px;
    resize: none;
    border: none;
    outline: none;
    width: 100%;
    font-size: $common-size;
    background-color: $grey-background;
    color: $black-color;
    font-family: 'PingFangSC-Light, sans-serif', 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  }

  .icon-setting {
    color: $color-text;
    font-weight: 900;
    height: 15px;
    line-height: 15px;
  }

  .notice-right {
    float: right;
  }

  .notice-assist {
    margin-top: 7px;
    font-size: $assist-size;
    color: $shallow-black-color;
    line-height: 14px;
  }

  .notice-center-bottom {
    margin-top: 10px;
    background-color: $white;
    padding: 10px 20px;
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
    vertical-align: middle;
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
    top: 0px;
    left: 1px;
    color: $white;
  }

  .big-checkbox:checked + label:after {
    font-size: 13px;
  }

  .notice-left-pad {
    padding-left: 5px;
  }

  .notice-bottom {
    margin-top: 10px;
    padding: 10px 20px;
    text-align: center;
    background-color: $white;
  }
  .button-default{
    min-width: 100px;
  }
  .regular-radio {
    display: none;
  }

  .regular-radio + label {
    background-color: #999999;
    border: 1px solid $border-color;
    padding: 6px;
    border-radius: 50px;
    display: inline-block;
    position: relative;
    box-shadow: inset 0 0 1px 2px #ffffff;
  }

  .regular-radio:checked + label:after {
    content: ' ';
    width: 8px;
    height: 8px;
    border-radius: 50px;
    position: absolute;
    top: 2px;
    background: $color-text;
    left:2px;
    font-size: 32px;
  }
  .regular-radio:checked + label {
    background-color: $white;
    color: $color-text;
    border: 1px solid $color-text;
  }
  .keywords-radio{
    position: absolute;
  }
  .radio-text{
    margin-left: 20px;
  }
  .upda-date div{
    display: inline-block;
    font-size: 0px;
    vertical-align: top;
    font-size: $assist-size;
  }
 /* .upda-date div:first-child{
    font-size: $assist-size;
  }
  .upda-date div:nth-child(2){
    font-size: $assist-size;
  }*/
  .date-set div{
    display: block;
  }
  .date-set div:first-child{
    margin-bottom: 10px;
  }
  .dateSpan{
    position: absolute;
    height: 18px;
    line-height: 18px;
    width: 112px;
    padding: 0px 4px;
    border: 1px solid $border-color;
    border-radius: 3px;
    margin-left: 95px;
    margin-top: -16px;
  }
</style>

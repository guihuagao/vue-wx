<template>
  <div class="user-fuescription">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="fuescription-top">
      <span class="icon-csc"></span> 联系客服
    </div>
    <div class="fuescription-content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">使用说明</mt-tab-item>
        <mt-tab-item id="1">常见问题</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <div class="fuescription-content-left">
            <div>
              <div class="fuescription-content-left-ds">如何购买小管家？</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-left-ds">使用教程【新人必看】</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-left-ds">管理员设置</div>
              <div class="fuescription-block"></div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <div class="fuescription-content-right">
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-buy"></span>&nbsp;&nbsp;购买小微助手<i class="redpoint"></i></div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-activate"></span>&nbsp;&nbsp;开通激活</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-setting" style="color: #ee6e50"></span>&nbsp;&nbsp;群设置</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-c-member"></span>&nbsp;&nbsp;群成员</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-c-sign"></span>&nbsp;&nbsp;群签到</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-c-kick"></span>&nbsp;&nbsp;踢人</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-c-you"></span>&nbsp;&nbsp;微友圈</div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-c-notice"></span>&nbsp;&nbsp;群通知<i class="redpoint"></i></div>
              <div class="fuescription-block"></div>
            </div>
            <div>
              <div class="fuescription-content-right-fu">
                <span class="icon-c-groupdata"></span>&nbsp;&nbsp;群数据</div>
              <div class="fuescription-block"></div>
            </div>
           <!-- <div>
              <div class="fuescription-content-right-fu">
                群设置</div>
              <div class="fuescription-block"></div>
            </div>-->
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import {
    TabContainer,
    TabContainerItem
  } from 'mint-ui';
  export default {
    name: 'w-user-fuescription',
    components: {
      WHeader
    },
    data() {
      return {
        headerName: "功能说明",
        selected: '0'
      }
    },
    created (){
      document.title = '功能说明';
    },
    mounted(){
      var vm=this;
      var selected=this.$route.params.id;
      if(selected!=null && selected!=""){
        vm.selected=selected.toString();
      }
    },
  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .user-fuescription {
    margin-bottom: $bottom-page-marginbottom-height;
  }
 .icon-setting,.icon-c-kick{
   font-size: 18px;
 }

  .fuescription-top {
    text-align: right;
    padding: 7px 20px;
    background-color: $white;
    font-size: 14px;
    color: $color-toptip-text;
  }
  .fuescription-content-left,
  .fuescription-content-right {
    padding-top: 5px;
  }
  .fuescription-content-left-ds,
  .fuescription-content-right-fu {
    padding: 10px 20px;
  }
  .fuescription-content-right-fu span{
    margin-right: 3px;
  }
  .fuescription-content-right-fu .redpoint{
    position: relative;
  }
  .fuescription-content-right-fu .redpoint::after{
    content: '';
    position: absolute;
    top: -3px;
    left: 5px;
    border-radius: 50%;
    background: #FC301B;
    height: 5px;
    width: 5px;
  }
  .fuescription-block {
    height: 10px;
    background-color: $grey-background;
  }

</style>

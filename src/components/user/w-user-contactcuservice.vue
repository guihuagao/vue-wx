<template>
    <div class="user-contactcuservice">
      <!--<w-header :title="headerName"></w-header>-->
      <div class="contactcuservice-top">
        长按识别下图二维码，添加客服为好友，即可随时联系客服呦
      </div>
      <div class="contactcuservice-center">
        <div>
          <img src="~common/image/chat.jpg" alt="二维码" class="chat-class">
        </div>
      </div>
      <div class="contactcuservice-center-bottom">
        无法添加好友 <span class="icon-question"></span>
      </div>
      <div class="contactcuservice-bottom">
        <p><span>*温馨提示</span><br>
        当加好友失败时，请关注 <span>“小微助手”</span> 微信公众号，可直接在公众号内反馈问题。</p>
        <div>
          <img src="~common/image/gong.jpg" alt="二维码" chat-class>
        </div>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  export default {
    name: 'w-user-contactcuservice',
    components: {
      WHeader
    },
    data () {
      return {
        headerName: "联系客服"
      }
    },
    created (){
      document.title = '联系客服';
    },
  }

</script>

<style scoped lang="scss">
  .user-contactcuservice{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .contactcuservice-top{
    background-color: $white;
    padding: 10px 20px;
    font-size: 13px;
    line-height: 20px;
  }
  .contactcuservice-center{
    margin-top: 10px;
    background-color: $white;
    padding: 10px;
  }
  .contactcuservice-center div{
    margin: 0 auto;
    width: 258px;
    height: 258px;
    background-color: aquamarine;
  }
  .contactcuservice div img{
    width: 150px;
    height: 150px;
  }
  .contactcuservice-center-bottom{
    background-color: $white;
    padding: 15px;
    margin-top: 10px;
  }
  .contactcuservice-bottom{
    background-color: $white;
    padding: 10px 20px;
    margin-top: 10px;
  }
  .contactcuservice-bottom{
    background-color: $white;
    margin-top: 10px;
  }
  .contactcuservice-bottom p{
    background-color: $white;
    font-size: 12px;
    line-height: 20px;
  }
  .contactcuservice-bottom span{
    background-color: $white;
    color: $color-toptip-text;
  }
  .contactcuservice-bottom div{
    margin: 0 auto;
    width: 258px;
    height: 258px;
    background-color: aquamarine;
  }
  .contactcuservice-bottom div img{
    width: 258px;
    height: 258px;
  }
  .chat-class{
    width: 258px;
    height: 258px;
  }
</style>


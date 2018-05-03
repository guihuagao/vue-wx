<template>
<div class="user-activationgroup">
  <div class="activationgroup-center">
    <div class="activationgroup-icon">
      <span class="icon-question"></span>
    </div>
  <p>激活链接失效，请重新拉机器人进群，以重新获得激活链接。</p>
</div>
</div>

</template>
<script type="text/ecmascript-6">
  export default {
    name: 'error',
    data () {
      return {

      }
    },
    created (){
      document.title = '激活群组';
    },
  }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .user-activationgroup{
    margin-bottom: $bottom-page-marginbottom-height;
    background-color: $white;
  }
  .activationgroup-center{
    padding: 30px 0 10px 0;
  }
  .activationgroup-icon{
    text-align: center;
  }
  .activationgroup-icon .icon-question{
    font-size: 60px;
  }
  .activationgroup-center p{
    text-align: center;
    margin-top: 20px;
    padding: 0 40px;
    line-height: 20px;
  }
</style>

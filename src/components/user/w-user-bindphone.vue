<template>
  <div class="user-bindphone">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="bindphone-top">
      <div class="bindphone-icon">
        <span class="icon-set-phone"></span>
      </div>
      <p>为了您的账户安全，请及时绑定手机</p>
    </div>
    <div class="bindphone-form">
      <div class="bindphone-phone">
        <span>+86</span>
        <input type="text" placeholder="请输入手机号" v-model.trim="phone">
      </div>
      <div class="bindphone-verification">
        <div>
          <span class="icon-c-code"></span>
          <input type="text" placeholder="请输入验证码" v-model.trim="code">
        </div>
        <button @click="getCode(phone)">获取验证码</button>
      </div>
      <div class="bindphone-bind">
        <button @click="connect(phone,code)">立即绑定</button>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import {
    Toast
  } from 'mint-ui'
  export default {
    name: 'w-user-bindphone',
    components: {
      WHeader
    },
    data() {
      return {
        headerName: "",
        phone:'',
        code:''

      }
    },
    created() {
      document.title = '绑定手机';
    },
    mounted() {

    },
    methods: {
      getCode(phone){
        var vm = this;
        this.$http.get('/xiaov/userCenter/getMobileCode.do',{params: {mobile:phone}}).then(function(res) {
          if(res.data.success){
            Toast('已发送，请在手机上查收！');

          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })

      },

      connect(phone,code){

        var vm = this;
        this.$http.get('/xiaov/userCenter/bindMobile.do',{params: {mobile:phone,code:code}}).then(function(res) {
          if(res.data.success){
            vm.$store.dispatch("getUserInfo");
            Toast('绑定成功！');
            vm.router.push({name:'w-user-me'});
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
  .user-bindphone {
    margin-bottom: $bottom-page-marginbottom-height;
    background-color: $white;
  }

  .bindphone-top {
    padding: 30px 0 10px 0;
  }

/*  .bindphone-icon {
    width: 70px;
    height: 70px;
    background: aquamarine;
    margin: 0 auto;
    border-radius: 100%;
  }

  .bindphone-icon img {
    width: 70px;
    height: 70px;
    border-radius: 100%;
  }*/
  .bindphone-icon{
    text-align: center;
  }
  .icon-set-phone{
    font-size: 60px;
  }
  .bindphone-top p {
    text-align: center;
    margin-top: 20px;
  }

  .bindphone-form{
    padding: 0 35px;
    font-size: 13px;
  }

  .bindphone-phone{
    padding: 7px 10px;
    margin-bottom: 10px;
    border: 1px solid $border-color;
    background-color: $grey-background;
    border-radius: 5px;
  }
  .bindphone-phone span::after{
    content: '|';
    position: relative;
    top: -1px;
    margin-left: 5px;
    font-size: 13px;
  }
  .bindphone-phone input, .bindphone-verification input{
    border: none;
    background-color: inherit;
    outline: none;
    padding-left: 10px;
  }

  .bindphone-verification{
    margin-bottom: 20px;
  }

  .bindphone-verification div{
    width: 65%;
    padding: 7px 0 7px 10px;
    border: 1px solid $border-color;
    background-color: $grey-background;
    border-radius: 5px;
    display: inline-block;
  }

  .bindphone-verification span img{
    vertical-align: middle;
  }

  .bindphone-verification span{
    width: 15%;
    display: inline-block;
  }

  .bindphone-verification span::after{
    content: '|';
    position: relative;
    top: 0px;
    margin-left: 11px;
    font-size: 13px;
  }

  .bindphone-verification input{
    width: 76%;
    padding-left: 12px;
  }

  .bindphone-verification button{
    width: 29.5%;
    float: right;
    font-size: 13px;
    border: none;
    background-color: $grey-background;
    border: 1px solid $border-color;
    border-radius: 5px;
    padding: 7px 0px;
    color: $color-toptip-text;
  }

  .bindphone-bind{
    margin-top: 20px;
  }
  .bindphone-bind button{
    width: 100%;
    border: none;
    background-color: $color-text;
    color: white;
    padding: 10px 0;
    border-radius: 5px;
  }

</style>

<template>
    <div class="user-activationgroup">
      <!--<w-header :title="headerName"></w-header>-->
      <div class="activationgroup-center">
          <div class="activationgroup-icon">
              <span class="icon-question"></span>
          </div>
          <p>是否立即激活群组<span> “{{wxname}}” </span></p>
      </div>
      <table class="activationgroup-bottom">
          <tr><td @click="cancelButton()">取消</td><td @click="confirmButton()">确定</td></tr>
      </table>
    </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import { parseUrl } from '@/util/common.js';
  import {
    Toast
  } from 'mint-ui'
  export default {
    name: 'w-user-activationgroup',
    components: {
      WHeader
    },
    data () {
      return {
        headerName: "激活群组",
        result:'',
        wxname:''
      }
    },

    beforeRouteEnter (to, from, next) {
      var currenturl=window.location.href;
      var resulturl=parseUrl(currenturl);
     next(vm=>{
       vm.result=resulturl;
     });
    },

    created (){
      document.title = '激活群组';
      var vm = this;
      vm.init();
    },

    mounted() {
      var vm = this;
      setTimeout(
        function () {
          vm.init();
        },1000
      )

    },

    methods: {

      init(){
        var vm = this;
        vm.wxname=decodeURI(vm.result.wgn)
      },

      confirmButton(){
        var vm = this;
        vm.wxname=decodeURI(vm.result.wgn);
        this.$http.get('/xiaov/activaionCenter/confirmActivaion.do',{params:
          {wgId:vm.result.wgId,gId:vm.result.gId,wrId:vm.result.wrId,
            uId:vm.result.uId,opId:vm.result.opId,orId:vm.result.orId}
        }).then(function(res) {
          if(res.data.success){
            debugger;
            Toast(res.data.message);

          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })

      },

      cancelButton(){
        this.$router.push({name: 'w-user-me-order'});
      }


    }


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
  /*.activationgroup-icon{
      width: 70px;
      height: 70px;
      background: aquamarine;
      margin: 0 auto;
      border-radius: 100%;
  }*/
/*  .activationgroup-icon img{
      width: 70px;
      height: 70px;
      border-radius: 100%;
  }*/
  .activationgroup-center p{
      text-align: center;
      margin-top: 20px;
  }
  .activationgroup-center p span{
      color: $color-toptip-text;
      margin-left: 5px;
  }
  .activationgroup-bottom{
      width: 100%;
      text-align: center;
      border-collapse: collapse;
  }
  .activationgroup-bottom td{
      width: 50%;
      padding: 15px;
      background-color: #F1F0F0;
      border-top: 1px solid #E8E9EA;
      border-bottom: 1px solid #E8E9EA;
  }
  .activationgroup-bottom td:first-child{
      border-right: 1px solid #E1E0E0;
  }
  .activationgroup-bottom td:last-child{
      border-left: 1px solid #E1E0E0;
      color: $color-text;
  }
</style>


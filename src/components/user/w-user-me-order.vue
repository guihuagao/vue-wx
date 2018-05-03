<template>
  <div class="user-me-order">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="me-order-top">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">已支付订单</mt-tab-item>
        <mt-tab-item id="1">未支付订单</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <div class="me-order-content" v-if="paidproductList.length>0" v-for="(item,index) in paidproductList">
            <div class="me-order-list">
              <div class="me-order-list-top">
                订单编号:{{item.orderNum}}<a v-show="item.activationNum!=item.productNum" class="me-order-list-pay" @click="activation()">立即激活</a>
              </div>
              <div class="me-order-list-center">
                <table>
                  <tr>
                    <td rowspan="2" style="width:12%;">
                      <div>
                        <img  :src="imgUrl + item.robotProduct.images">
                      </div>
                    </td>
                    <td class="lefttxt" style="width:44%;"><span>{{item.robotProduct.productName}}</span><!--<i>免费</i>--></td>
                    <td class="smalltxt" style="width:16%;">购买数量</td>
                    <td class="smalltxt" style="width:14%;">单价</td>
                    <td class="smalltxt" style="width:14%;">金额</td>
                  </tr>
                  <tr>
                    <td class="smalltxt lefttxt">({{item.robotProduct.productDescribe}})</td>
                    <td>{{item.productNum}}</td>
                    <td>{{item.unitPrice}}</td>
                    <td>{{item.totalPrice}}</td>
                  </tr>
                </table>
              </div>
              <div class="me-order-list-bottom">
                已激活数量:{{item.activationNum}} <span>购买日期：{{item.createTime | formatDate}}</span>
              </div>
            </div>
            <div class="me-order-block"></div>
          </div>

          <div v-if="paidproductList.length==0" class="noContent"><span style="position: relative;">暂无已支付订单</span></div>

        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <div class="me-order-content" v-if="nopaidproductList.length>0" v-for="(item,index) in nopaidproductList">
            <div class="me-order-list">
              <div class="me-order-list-top">
                订单编号:{{item.orderNum}} <a @click="goPay(item)">去支付</a>
              </div>
              <div class="me-order-list-center">
                <table>
                  <tr>
                    <td rowspan="2" style="width:12%;">
                      <div>
                        <img :src="imgUrl + item.robotProduct.images">
                      </div>
                    </td>
                    <td class="lefttxt" style="width:44%;"><span>{{item.robotProduct.productName}}</span><!--<i>免费</i>--></td>
                    <td class="smalltxt" style="width:16%;">购买数量</td>
                    <td class="smalltxt" style="width:14%;">单价</td>
                    <td class="smalltxt" style="width:14%;">金额</td>
                  </tr>
                  <tr>
                    <td class="smalltxt lefttxt">({{item.robotProduct.productDescribe}})</td>
                    <td>{{item.productNum}}</td>
                    <td>{{item.unitPrice}}</td>
                    <td>{{item.totalPrice}}</td>
                  </tr>
                </table>
              </div>
              <div class="me-order-list-bottom">
                已激活数量:{{item.activationNum}} <span>购买日期：{{item.createTime | formatDate}}</span>
              </div>
            </div>
            <div class="me-order-block"></div>
          </div>
          <div v-if="nopaidproductList.length==0" class="noContent"><span>暂无未支付订单</span></div>

        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <van-popup v-model="show" :close-on-click-overlay="false">
        <div class="dialog-default">
          <div class="dialog-top">
            激活群组
            <span class="icon-close" @click="closeDialog()"></span>
          </div>
          <div class="dialog-default-content me-order-dialog">
            <div class="me-order-dialog-top">
              长按识别下图二维码，添加为好友并拉此好友进入需要管理的群，获取激活链接激活群组。
            </div>
            <div class="me-order-dialog-block"></div>
            <div class="me-order-dialog-center">
              <div>
                <img :src="imgUrl + qrcode" alt="二维码">
              </div>
            </div>
            <div class="me-order-dialog-block"></div>
            <div class="me-order-dialog-bottom">
              <span>*</span>温馨提示
              <br>
              加好友失败时，请关注<span> “小微助手” </span>微信公众号，可直接在公众号内反馈问题。
            </div>
          </div>
        </div>
      </van-popup>
  </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { formatDate } from '@/util/common.js';
  import {
    Toast
  } from 'mint-ui'
  export default {
    name: 'w-user-fuescription',
    components: {
      WHeader
    },
    filters:{
      formatDate(time){
        let date=new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },

    beforeRouteEnter (to, from, next) {
     if(from.name=='w-user-gobuy-new'){
       sessionStorage.setItem("isShow",'0');
     }
      next();
    },



    data() {
      return {
        headerName: "我",
        selected: '0',
        show: false,
        orderListImg:'',
        imgUrl: this.$store.state.imgUrl,
        paidproductList:[],
        nopaidproductList:[],
        qrcode:'',
        wxconfigUrl: this.$store.state.wxconfigUrl,
        sdkConfig:{url:this.wxconfigUrl,jsApiList:'chooseWXPay'},
        invokePay:''
      }
    },
    mounted() {
      var vm=this;
      var selected=this.$route.params.id;
      if(selected!=null && selected!=""){
        vm.selected=selected.toString();
      }
      this.getOrder();
      this.$store.dispatch("jssdkConfig",this.sdkConfig);
    },

    methods: {
      openDialog(data){
        this.show = true;
      },
      closeDialog(data){
        this.show = false;
      },
      getOrder(){
        var vm = this;
        this.$http.get('/xiaov/shopCart/getOrderByMember.do').then(function(res) {
           if(res.data.success){
             vm.paidproductList = res.data.result.paid;
             vm.nopaidproductList = res.data.result.noPaid;

           }else{
             Toast(res.data.message);
           }
        }).catch(function(err) {
          Toast(err)
        })
      },

      activation(){
        var vm = this;
        this.$http.get('/xiaov/activaionCenter/getAssistant.do').then(function(res) {
          if(res.data.success){
            vm.qrcode = res.data.result.qrCode;
            vm.show = true;
          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })
      },


      //调起支付方法
      onBridgeReady() {
        var vm = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": vm.invokePay.appId,     //公众号名称，由商户传入
            "timeStamp": vm.invokePay.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": vm.invokePay.nonceStr, //随机串
            "package": "prepay_id=" + vm.invokePay.prepayId,
            "signType": vm.invokePay.signType,         //微信签名方式：
            "paySign": vm.invokePay.paySign //微信签名
          },
          function (res) {
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 支付成功后续操作
              /* afterPaySave(objStr);*/
              vm.selected='0';
              vm.getOrder();
              setTimeout(function (){

                Toast('恭喜您，购买成功');
              }, 200);

             /* vm.router.push({name:'w-user-me-order',params:{id:'0'}});*/
            } else {
              Toast('取消支付或支付失败');
            }
          }
        );
      },



      /*去支付*/
      goPay(item){
        var vm = this;
        this.$http.get('/xiaov/shopCart/unifiedOrderAgain.do',{params:{orderId:item.id}}).then(function(res) {
          if(res.data.success){
            vm.invokePay=res.data.result;
            if (typeof (WeixinJSBridge) == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady);
              }
            } else {
              vm.onBridgeReady();
            }


          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })


      }


    },
    created (){
      document.title = '我';
    },
  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .user-me-order {
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .user-me-order .icon-close{
    float: right;
    opacity: 0.9;
  }
  .me-order-top {
    /*margin-top: 10px;*/
    background-color: $white;
  }
  .me-order-block{
    height: 10px;
    background-color: $grey-background;
  }
  .me-order-list {
    padding: 10px 15px 0 15px;
  }
  .me-order-list-top{
    border-bottom: 1px solid $border-color;
    padding: 10px 0;
    font-size: 12px;
  }
  .me-order-list-top span{
    border: 1px solid $color-toptip-text;
    font-size: 12px;
    color: $color-toptip-text;
    padding: 1px 5px;
    border-radius: 5px;
    margin-left: 5px;
  }
  .me-order-list-top a{
    background-color: $color-text;
    color: $white;
    float: right;
    font-size: 12px;
    line-height: 12px;
    border-radius: 5px;
    text-decoration: none;
    padding: 3px 10px;
    margin-top: -5px;
  }
  .me-order-list-center div{
    display: inline-block;
  }
  .me-order-list-center{
    padding: 10px 0;
    border-bottom: 1px solid $border-color;
  }
  .me-order-list-center img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  .me-order-list-center table{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    height: 40px;
  }
  .me-order-list-center td{
  }
  .me-order-list-center .smalltxt{
    font-size: 12px;
    color: $shallow-black-color;
  }
  .me-order-list-center .lefttxt{
    text-align: left;
  }
  .me-order-list-center td.lefttxt span{
    padding-left: 5px;
  }
  .dialog-default{
    height: 380px;
  }

  td.lefttxt i{
    font-size: 12px;
    background-color: #24C0A6;
    font-style: normal;
    color: $white;
    padding: 1px 3px;
    border-radius: 5px;
    position: relative;
    margin-left: 3px;
    top: -5px;
  }
  td.lefttxt i::after{
    width: 0;
    height: 0;
    content: '';
    position: absolute;
    top: 16px;
    left: 8px;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    border-top: 4px solid #24C0A6;
  }
  .me-order-list-bottom{
    padding: 10px 0;
    font-size: 12px;
    color: $shallow-black-color;
  }
  .me-order-list-bottom span{
    float: right;
  }
  a.me-order-list-pay{
    background-color: $color-toptip-text;
  }
  tr td i.me-order-list-paybc{
    background-color: $color-toptip-text;
  }
  tr td i.me-order-list-paybc::after{
    border-top: 4px solid $color-toptip-text;
  }
  // 弹窗
  .me-order-dialog{
    font-size: 13px;
    padding: 0;
  }
  .user-me-order .dialog-top{
  }
  .me-order-dialog-block{
    height: 5px;
    background-color: $grey-background;
  }
  .me-order-dialog-top, .me-order-dialog-bottom{
    padding: 10px 20px ;
    line-height: 20px;
    color: #323232;

  }
  .me-order-dialog-center img{
    width: 150px;
    height: 150px;
    margin: 0 auto;

  }
  .me-order-dialog-center{
    padding: 20px 0;
    text-align: center;
  }
  .me-order-dialog-bottom{
    font-size: 12px;
  }
  .me-order-dialog-bottom span{
    color: $color-toptip-text;
  }
</style>

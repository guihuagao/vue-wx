<template>
  <div class="user-gobuy">
    <!-- <w-header :title="headerName"></w-header>-->
    <div class="gobuy-top">
      <img style="width:100%" src="../../common/image/vds1.png" alt="">
    </div>
    <div class="gobuy-center">
      <div v-for="(item,index) in productList" :key="index" @click="choiceProduct(index,item)" :class='{gobuyChoice:index == choiceIndex}'>
        <div class="gobuy-center-productlist">
          <table>
            <tr>
              <td rowspan="2" style="width:40px;">
                <div class="gobuy-center-img">
                  <img :src="imgUrl + item.images" alt="产品图片">
                </div>
              </td>
              <td class="pa">{{item.productName}}</td>
              <td style="width:40px;"></td>
            </tr>
            <tr>
              <td class="smalltxt pa">{{item.productDescribe}}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td class="pa pat">￥ {{item.price}}</td>
              <td class="pa">* 1</td>
            </tr>
          </table>
        </div>
        <div class="gobuy-block"></div>
      </div>
    </div>
    <div class="gobuy-bottom">
      <table>
        <tr>
          <td>购买数量</td>
          <td class="txtright">
            <button class="leftbtn" @click="buyCount -= 1">-</button>
            <input class="counttxt" type="text" v-model="buyCount" @change="countPrice">
            <button class="rightbtn" @click="buyCount += 1">+</button>
          </td>
        </tr>
        <tr>
          <td>优惠价</td>
          <td class="txtright graytxt">￥{{totalDiscountPrice}}</td>
        </tr>
      </table>
    </div>
    <div class="gobuy-100-block"></div>
    <div class="gobuy-buy">
      <table>
        <tr>
          <td class="ortext"><span @click="goContactCuService()"><span class="icon-csc"></span>&nbsp;联系客服</span></td>
          <td class="righttext">共计：￥{{totalDiscountPrice}}</td>
          <td class="righttext" style="width:70px;">
            <button @click="unifiedOrderFree">立即购买</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import {
    Toast
  } from 'mint-ui'
  export default {
    name: 'w-user-gobuy-new',
    components: {
      WHeader
    },
    data() {
      return {
        headerName: "套餐",
        productList: [],
        imgUrl: this.$store.state.imgUrl,
        wxconfigUrl: this.$store.state.wxconfigUrl,
        choiceIndex: 0,
        buyCount: 0,
        buyId: '',
        productPrice: 0,
        discountPrice: 0,
        totalDiscountPrice: 0,
        totalPrice: 0,
        sdkConfig:{url:this.wxconfigUrl,jsApiList:'chooseWXPay'},
        invokePay:''

      }
    },
    mounted() {
      this.getProduct();
      this.getUserInfo();
      this.$store.dispatch("jssdkConfig",this.sdkConfig);
    },
    created (){
      document.title = '套餐';
    },
    watch: {
      //监听数量，验证输入，计算价格
      'buyCount': function(){
        var vm = this;
        const regex = /^[1-9][0-9]*$/
        if(!regex.test(vm.buyCount)) {//如果小于等于零
          vm.buyCount = 0;
          vm.totalDiscountPrice = 0;
          //vm.totalPrice = 0;
        }
        vm.totalDiscountPrice = vm.discountPrice * vm.buyCount;
        //vm.totalPrice = vm.buyCount * vm.productPrice;
      }
    },
    methods: {

      getUserInfo(){
        this.$http.get('/auth/xiaov/main/getUserInfo.do',{params:{}}).then(function(res) {
          if(res.data.success){

            sessionStorage.setItem("getUserInfoSession",JSON.stringify(res.data.result));

          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        })

      },



      //获取产品列表
      getProduct(){
        var vm = this;
        this.$http.get('/xiaov/shopCart/getProduct.do').then(function(res) {
          if(res.data.success){
            vm.productList = res.data.result;
            vm.choiceProduct(0, vm.productList[0]);
          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })
      },
      //选择产品
      choiceProduct: function (index,row) {
        var vm = this;
        vm.choiceIndex = index;
        vm.buyCount = 1;
        vm.buyId = row.id;
        vm.productPrice = row.price;
        vm.discountPrice = row.discountPrice;
        vm.totalDiscountPrice = row.discountPrice * vm.buyCount;
        //vm.totalPrice = vm.buyCount * row.price;
      },
      //手动输入
      countPrice(){
        var vm = this;
        vm.buyCount = Number(vm.buyCount);
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
              Toast('恭喜您，购买成功');
              vm.router.push({name:'w-user-me-order-new',params:{id:'0'}});
            } else {
              Toast('取消支付或支付失败');
            }
          }
        );
      },


      //购买产品
      unifiedOrderFree(){
        var vm = this;
        this.$http.get('/xiaov/shopCart/unifiedOrder.do',{params:{productId:vm.buyId,productNum:vm.buyCount}}).then(function(res) {

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
      },
      goContactCuService(){
        this.router.push({name: 'w-user-contactcuservice'});
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .user-buy {
    position: relative;
  }
  .gobuyChoice{
    background-color: #F7F9FB;
  }
  .gobuy-top {
    width: 100%;
  }

  .gobuy-center {
    background-color: $white;
  }

  .gobuy-block {
    height: 10px;
    background-color: $grey-background;
  }

  .gobuy-center-productlist{
    padding: 10px 20px;
  }

  .gobuy-center table {
    width: 100%;
    border-collapse: collapse;
  }

  .gobuy-center-img {
    display: inline-block;
    margin: 0 auto;
  }

  .gobuy-center-img img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .gobuy-center .pa {
    padding-left: 10px;
  }
  .gobuy-center .pat {
    padding-top: 5px;
  }

  .gobuy-center .smalltxt {
    font-size: 12px;
    color: $color-toptip-text;
  }

  .gobuy-bottom {
    background-color: $white;
    padding: 10px 20px;
  }

  .gobuy-bottom table {
    width: 100%;
  }

  .gobuy-bottom td {
    padding: 3px 0;
  }

  .gobuy-bottom .txtright {
    text-align: right;
  }

  .gobuy-bottom .txtright button {
    background-color: white;
    border: none;
    border: 1px solid #BFBFBF;
  }

  .gobuy-bottom .txtright .counttxt {
    text-align: center;
    border: none;
    width: 40px;
    border: 1px solid #BFBFBF;
  }

  .gobuy-bottom .txtright .leftbtn {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .gobuy-bottom .txtright .rightbtn {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .gobuy-bottom .graytxt {
    color: #A0A0A0;
  }

  .gobuy-100-block{
    width: 100%;
    height: 100px;
    background-color: $white;
  }

  .gobuy-buy {
    background-color: $grey-background;
    height: 40px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    line-height: 40px;
    padding: 0 10px;
  }

  .gobuy-buy table {
    width: 100%;
  }

  .gobuy-buy .ortext {
    color: $color-toptip-text;
    font-size: 13px;
  }

  .gobuy-buy .righttext {
    text-align: right;
    color: $color-text;
  }

  .gobuy-buy button {
    background-color: $color-text;
    color: $white;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    padding: 3px 8px;
  }

</style>

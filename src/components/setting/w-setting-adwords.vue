<template>
    <div class="setting-adwords bottom-left">
      <!--<w-header :title="headerName"></w-header>-->
      <div class="adwords-center">
        <div>添加文字&nbsp;<span class="ad-view" @click="openDialog()">浏览系统预设</span></div>
        <div class="ad-bac">
            <textarea class="default-textArea"  v-model.trim="checkWord"></textarea>
        </div>
        <div class="adwords-div"><span slot="icon" class="icon-switch" :class="{'switch-open':autoOpen}" @click="changeValue(1)">
        <span class="path1"></span><span class="path2"></span>
        </span> 开启自动发送</div>
        <div class="adwords-div"><span slot="icon" class="icon-switch" :class="{'switch-open':keyOpen}" @click="changeValue(2)">
        <span class="path1"></span><span class="path2"></span>
        </span> 发送关键词列表</div>
        <div class="adwords-div"><span slot="icon" class="icon-switch" :class="{'switch-open':linkOpen}" @click="changeValue(3)">
        <span class="path1"></span><span class="path2"></span>
        </span> 发送社群空间链接</div>
      </div>
      <div class="ad-bottom">
        <button class="button-default" @click="updateAdwords()"><label>确认提交</label></button>
      </div>
      <van-popup v-model="show" :close-on-click-overlay="false">
        <div class="dialog-default">
          <div class="dialog-top">
            系统欢迎语<span class="icon-close" @click="closeDialog()"></span>
          </div>
          <div class="dialog-default-content adwords-dialog">
             <span class="sys-adwords" :class="{active:checkid==item.id}" v-for="item in wordList" @click="selectKeyWord(item)">{{item.welcomeWords}}</span>
          </div>
          <div class="dialog-default-bottom">
            <div @click="closeDialog()">取消</div>
            <div @click="confirmDialog()">确定</div>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  export default {
    name:'setting-adwords',
    components: {
      WHeader
    },
    data() {
      return {
        headerName: '入群欢迎语',
        wordList:[],
        show:false,
        checkid:'',
        autoOpen:false,
        keyOpen:false,
        linkOpen:false,
        checkWord:'',
        result:{},
      }
    },
    mounted () {
      this.getAdwords();

    },
    created (){
      document.title = '入群欢迎语';
    },
    methods:{
      //关闭弹窗
      closeDialog(){
        this.show=false;
        this.checkWord="";
      },
      //提交弹窗
      confirmDialog(data){
        this.show=false;
      },
      //打开弹窗
      openDialog(){
        this.getAdwordList();

      },
      //创建欢迎语
     /* createAdwords(){
        var vm=this;
        var params = new URLSearchParams();
        params.append('welcomeWords', vm.checkWord);
        params.append('isOpen', vm.autoOpen==true ? 1 : 0);
        params.append('SendKeyWordsUrl', vm.keyOpen==true ? 1 : 0);
        params.append('isSendSiteUrl', vm.linkOpen==true ? 1 : 0);
        this.$http.post("/xiaov/groupCenter/insertWelcomeWords.do",params).then(function (res) {
          if(res.data.success){
            vm.result=res.data.result;
          }else{
            Toast(res.data.success);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },*/

      createAdwords(){
        var vm=this;
        this.$http.get("/xiaov/groupCenter/insertWelcomeWords.do",{params:
          {welcomeWords:vm.checkWord,isOpen:vm.autoOpen==true ? 1 : 0,SendKeyWordsUrl:vm.keyOpen==true ? 1 : 0,isSendSiteUrl:vm.linkOpen==true ? 1 : 0}}).then(function (res) {
          if(res.data.success){
            vm.result=res.data.result;
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })

      },


      //更新广告语
 /*     updateAdwords(){
        var vm=this;
        if(vm.checkWord==""){
          Toast("请输入欢迎语!");
          return;
        }
        var isOpen=vm.autoOpen ? 1 : 0;
        var SendKeyWordsUrl=vm.keyOpen ? 1 : 0;
        var isSendSiteUrl=vm.linkOpen ? 1 : 0;
        var params=new URLSearchParams();
        params.append('welcomeWords', vm.checkWord);
        params.append('isOpen', isOpen);
        params.append('SendKeyWordsUrl', SendKeyWordsUrl);
        params.append('isSendSiteUrl', isSendSiteUrl);
        this.$http.post("/xiaov/groupCenter/insertWelcomeWords.do",params).then(function (res) {
          if(res.data.success){
            Toast("添加成功!");
            vm.$router.push({name: 'w-setting-home'});

          }else{
            Toast(res.data.success);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },*/

      updateAdwords(){
        var vm=this;
        if(vm.checkWord==""){
          Toast("请输入欢迎语!");
          return;
        }

        this.$http.get("/xiaov/groupCenter/insertWelcomeWords.do",{params:
          {welcomeWords:vm.checkWord,isOpen:vm.autoOpen ? 1 : 0,SendKeyWordsUrl:vm.keyOpen ? 1 : 0,isSendSiteUrl:vm.linkOpen ? 1 : 0}}).then(function (res) {
          if(res.data.success){
            Toast("添加成功!");
            vm.$router.push({name: 'w-setting-home'});
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })



      },



      //查询广告语
 /*     getAdwords(){
        var vm=this;
        var params=new URLSearchParams();
        this.$http.post("/xiaov/groupCenter/selectWelcomeWords.do",params).then(function (res) {
          if(res.data.success){
            if(res.data.result==null){
                vm.checkWord=""
                vm.autoOpen=false;
                vm.keyOpen=false;
                vm.linkOpen=false;
            }else{
              vm.checkWord=res.data.result.welcomeWords;
              vm.autoOpen=res.data.result.isOpen==1 ? true :false;
              vm.keyOpen=res.data.result.isSendKeyWordsUrl==1 ? true :false;
              vm.linkOpen=res.data.result.isSendSiteUrl==1 ? true :false;
            }
            vm.createAdwords();
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },*/
      getAdwords() {
        var vm = this;
        this.$http.get("/xiaov/groupCenter/selectWelcomeWords.do").then(function (res) {
          if(res.data.success){
            if(res.data.result==null){
              vm.checkWord=""
              vm.autoOpen=false;
              vm.keyOpen=false;
              vm.linkOpen=false;
            }else{
              vm.checkWord=res.data.result.welcomeWords;
              vm.autoOpen=res.data.result.isOpen==1 ? true :false;
              vm.keyOpen=res.data.result.isSendKeyWordsUrl==1 ? true :false;
              vm.linkOpen=res.data.result.isSendSiteUrl==1 ? true :false;
            }
            vm.createAdwords();
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })

      },

      getAdwordList(){
        var vm=this;
        this.$http.get("/xiaov/groupCenter/selectSystemWelcomeWords.do").then(function (res) {
          if(res.data.success){
            vm.checkid="";
            vm.show=true;
              vm.wordList=res.data.result
          }else{
            Toast(res.data.success);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      //选择系统欢迎语
      selectKeyWord(data){
        var vm=this;
        vm.checkid=data.id;
        vm.checkWord=data.welcomeWords;
      },
      //开关改变
      changeValue(value){
        switch (value){
          case 1: this.autoOpen=!this.autoOpen;break;
          case 2: this.keyOpen=!this.keyOpen;break;
          case 3: this.linkOpen=!this.linkOpen;break;
        }
      }
    },
  }
  </script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .icon-close{
    float: right;
    opacity: 0.9;
  }
  .adwords-dialog{
    height: 300px;
    overflow-y: auto;
  }
  .adwords-center{
    padding: 10px 20px;
    background-color: $white;
  }
  .adwords-div{
    margin-top: 10px;
  }
  .default-textArea{
    width: 100%;
    height: 50px;
    background-color: $grey-background;
    border-radius: 5px;
    font-size: $common-size;
    color: $black-color;
    outline: none;
    resize:none;
    border: none;
    font-weight: 500;
    margin: 0px;
    padding: 0px;
    font-family: 'PingFangSC-Light, sans-serif','PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback'
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
  .ad-view{
    color: $color-text;
    margin-left: 5px;
  }
  .ad-bac{
    background-color: $grey-background;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  .ad-link{
    background-color: $grey-background;
    color: $color-text;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 5px;
  }
  .ad-link span{
    display: block;
    width: 90px;
    height: 20px;
    line-height: 20px;
    border-radius: 4px;
    border: 1px solid $color-text;
    margin: 0 auto;
    text-align: center;
  }
  .ad-bottom{
    background-color: $white;
    padding: 10px 20px;
    margin-top: 10px;
    text-align: center;
  }
  .ad-bottom button{
    width: 100px;
  }
  .sys-adwords{
    display: inline-block;
    padding: 3px 3px;
    font-size: $assist-size;
    border: 1px solid $border-color;
    color: $shallow-black-color;
    border-radius: 3px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
  .active{
    border: 1px solid $color-text;
    color:$color-text
  }
  .switch-open{
    color: $color-text;
  }
</style>

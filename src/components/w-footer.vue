<template>
  <mt-tabbar v-model="selected" v-show="isShow=='1'" class="footer-bottom">
    <mt-tab-item id="home">
      <div class="icon-home" @click="chooseItem('1')"></div>
      <span @click="chooseItem('1')">
      首页
      </span>
    </mt-tab-item>
    <mt-tab-item id="member">
      <div class="icon-member" @click="chooseItem('2')"></div>
      <span @click="chooseItem('2')">
      微成员
      </span>
    </mt-tab-item>

    <mt-tab-item id="setting">
      <div class="icon-setting"  @click="chooseItem('3')"></div>
      <span @click="chooseItem('3')">
      微中心
      </span>
    </mt-tab-item>

    <mt-tab-item id="user">
      <div class="icon-user" @click="chooseItem('4')"></div>
      <span @click="chooseItem('4')">
      我
      </span>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'w-header',
    data() {
      return{
        selected: '',
        currentUrl:window.location.href,
        routeUrl:this.$route,
        isShow:'1',
      }
    },
    watch:{
      selected:function (val,oldValue) {

        if(this.$route.path.indexOf('w-home')!=-1){
          this.selected='home';
        }
        if(this.$route.path.indexOf('w-member')!=-1){
          this.selected='member';

        }
        if(this.$route.path.indexOf('w-setting')!=-1){
          this.selected='setting';
        }
        if(this.$route.path.indexOf('w-user')!=-1){
          this.selected='user';
        }
      },

      '$route':'route',

    currentUrl:function (val,oldValue) {

         if(val!=oldValue){

           if(val.indexOf('w-home')!=-1){
             this.selected='home';
           }

           if(val.indexOf('w-member')!=-1){
             this.selected='member';
           }
           if(val.indexOf('w-setting')!=-1){
             this.selected='setting';
           }
           if((val.indexOf('w-user')!=-1)){
             this.selected='user';
           }

         }
      }

    },

    created(){
      this.isShow=sessionStorage.getItem("isShow");
      if(this.currentUrl.indexOf('w-home')!=-1){
        this.selected='home';
      }
      if(this.currentUrl.indexOf('w-member')!=-1){
        this.selected='member';

      }
      if(this.currentUrl.indexOf('w-setting')!=-1){
        this.selected='setting';
      }
      if(this.currentUrl.indexOf('w-user')!=-1){
        this.selected='user';
      }

    },

    methods:{
      /*选择*/
      chooseItem(item){
        if(item=='1'){
          this.$router.push({name:'w-home-home'});
        }
        if(item=='2'){
          this.$router.push({name:'w-member-leaguer'});
        }
        if(item=='3'){
          this.$router.push({name:'w-setting-home'});
        }
        if(item=='4'){
          this.$router.push({name:'w-user-me'});
        }
      },

      route(){
        if(this.$route.path.indexOf('w-home')!=-1){
          this.selected='home';
        }
        if(this.$route.path.indexOf('w-member')!=-1){
          this.selected='member';
        }
        if(this.$route.path.indexOf('w-setting')!=-1){
          this.selected='setting';
        }
        if(this.$route.path.indexOf('w-user')!=-1){
          this.selected='user';
        }

      }

    }


  }

</script>

<style lang="scss">
  /**********************************字体图标*********************************/
  @font-face {
    font-family: 'icomoon';
    src:  url('../common/fonts/icomoon.eot?vyndqt');
    src:  url('../common/fonts/icomoon.eot?vyndqt#iefix') format('embedded-opentype'),
    url('../common/fonts/icomoon.ttf?vyndqt') format('truetype'),
    url('../common/fonts/icomoon.woff?vyndqt') format('woff'),
    url('../common/fonts/icomoon.svg?vyndqt#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-almanac .path1:before {
    content: "\e911";
    color: #f4c062;
  }
  .icon-almanac .path2:before {
    content: "\e912";
    color: #fff;
    margin-left: -1em;
  }
  .icon-a-switch:before {
    content: "\e913";
    color: #afb0b1;
  }
  .icon-cookbook .path1:before {
    content: "\e914";
    color: #ee7f43;
  }
  .icon-cookbook .path2:before {
    content: "\e915";
    color: #fff;
    margin-left: -1em;
  }
  .icon-data .path1:before {
    content: "\e916";
    color: #5cb0e6;
  }
  .icon-data .path2:before {
    content: "\e917";
    color: #fff;
    margin-left: -1em;
  }
  .icon-expresscheck .path1:before {
    content: "\e918";
    color: rgb(58, 204, 199);
  }
  .icon-expresscheck .path2:before {
    content: "\e919";
    margin-left: -1em;
    color: rgb(255, 255, 255);
  }
  .icon-expresscheck .path3:before {
    content: "\e91a";
    margin-left: -1em;
    color: rgb(255, 255, 255);
  }
  .icon-expresscheck .path4:before {
    content: "\e91b";
    margin-left: -1em;
    color: rgb(255, 255, 255);
  }
  .icon-expresscheck .path5:before {
    content: "\e91c";
    margin-left: -1em;
    color: #fff;
  }
  .icon-greeting .path1:before {
    content: "\e91d";
    color: #f17e72;
  }
  .icon-greeting .path2:before {
    content: "\e91e";
    color: #fff;
    margin-left: -1em;
  }
  .icon-greeting .path3:before {
    content: "\e91f";
    color: #ed7f59;
    margin-left: -1em;
  }
  .icon-home:before {
    content: "\e920";
    /*color: #767676;*/
  }
  .icon-horoscope .path1:before {
    content: "\e921";
    color: #f377ef;
  }
  .icon-horoscope .path2:before {
    content: "\e922";
    color: #fff;
    margin-left: -1em;
  }
  .icon-hotmessage .path1:before {
    content: "\e923";
    color: #f85a5a;
  }
  .icon-hotmessage .path2:before {
    content: "\e924";
    color: #fff;
    margin-left: -1em;
  }
  .icon-hotmessage .path3:before {
    content: "\e925";
    color: #f34d4d;
    margin-left: -1em;
  }
  .icon-infomanage .path1:before {
    content: "\e926";
    color: #9ad181;
  }
  .icon-infomanage .path2:before {
    content: "\e927";
    color: #f7f8fa;
    margin-left: -1em;
  }
  .icon-integral .path1:before {
    content: "\e928";
    color: #9c76f1;
  }
  .icon-integral .path2:before {
    content: "\e929";
    color: #fff;
    margin-left: -1em;
  }
  .icon-joke .path1:before {
    content: "\e92a";
    color: #6f62eb;
  }
  .icon-joke .path2:before {
    content: "\e92b";
    color: #fff;
    margin-left: -1em;
  }
  .icon-keymanage .path1:before {
    content: "\e92c";
    color: #fca940;
  }
  .icon-keymanage .path2:before {
    content: "\e92d";
    color: #fff;
    margin-left: -1em;
  }
  .icon-kick .path1:before {
    content: "\e92e";
    color: #40c5d8;
  }
  .icon-kick .path2:before {
    content: "\e92f";
    color: #fff;
    margin-left: -1em;
  }
  .icon-member:before {
    content: "\e930";
    /*color: #767676;*/
  }
  .icon-notice .path1:before {
    content: "\e931";
    color: #febc43;
  }
  .icon-notice .path2:before {
    content: "\e932";
    color: #fff;
    margin-left: -1em;
  }
  .icon-packet .path1:before {
    content: "\e933";
    color: #f34d4d;
  }
  .icon-packet .path2:before {
    content: "\e934";
    color: #fff;
    margin-left: -1em;
  }
  .icon-setting:before {
    content: "\e935";
    /*color: #767676;*/
  }
  .icon-signin .path1:before {
    content: "\e936";
    color: #00bd8e;
  }
  .icon-signin .path2:before {
    content: "\e937";
    color: #fff;
    margin-left: -1em;
  }
  .icon-steward .path1:before {
    content: "\e938";
    color: #4fc6d7;
  }
  .icon-steward .path2:before {
    content: "\e939";
    color: #fff;
    margin-left: -1em;
  }
  .icon-switch .path1:before {
    content: "\e93a";
    color: #f2f2f3;
  }
  .icon-switch .path2:before {
    content: "\e93b";
   /* color: #afb0b1;*/
    margin-left: -1em;
  }

  .icon-user:before {
    content: "\e93c";
   /* color: #767676;*/
  }
  .icon-userchange .path1:before {
    content: "\e93d";
    color: #f5b25d;
  }
  .icon-userchange .path2:before {
    content: "\e93e";
    color: #fff;
    margin-left: -1em;
  }
  .icon-weather .path1:before {
    content: "\e93f";
    color: #38b46a;
  }
  .icon-weather .path2:before {
    content: "\e940";
    color: #fff;
    margin-left: -1em;
  }

  .icon-a-almanac:before {
    content: "\e941";
    color: rgb(244, 192, 98);
  }
  .icon-a-cookbook:before {
    content: "\e942";
    color: rgb(238, 127, 67);
  }
  .icon-a-expresscheck:before {
    content: "\e943";
    color: rgb(58, 204, 199);
  }
  .icon-a-horoscope:before {
    content: "\e944";
    color: rgb(243, 119, 239);
  }
  .icon-a-hotmessage .path1:before {
    content: "\e945";
    color: #f85a5a;
  }
  .icon-a-hotmessage .path2:before {
    content: "\e946";
    color: #fff;
    margin-left: -1em;
  }
  .icon-a-joke:before {
    content: "\e947";
    color: rgb(111, 98, 235);
  }

  .icon-a-weather:before {
    content: "\e948";
    color: #38b46a;
  }
  .icon-b-weather:before {
    content: "\e949";
    color: #fff;
  }
  .icon-a-notice:before {
    content: "\e94a";
    color: #febc43;
  }
  .icon-a-you:before {
    content: "\e94b";
    color: #129e87;
  }
  .icon-clock:before {
    content: "\e94c";
    color: #28adea;
  }
  .icon-close:before {
    content: "\e94d";
    /*color: #7c7c7c;*/
  }
  .icon-comment:before {
    content: "\e94e";
   /* color: #f7f8fa;*/
  }
  .icon-c-weather .path1:before {
    content: "\e94f";
    color: #38a4b4;
  }
  .icon-c-weather .path2:before {
    content: "\e950";
    color: #fff;
    margin-left: -1em;
  }
  .icon-delete:before {
    content: "\e951";
   /* color: #acaeae;*/
  }
  .icon-edit:before {
    content: "\e952";
   /* color: #129e87;*/
  }
  .icon-fire:before {
    content: "\e953";
    color: #ff7e00;
  }
  .icon-issue:before {
    content: "\e954";
    /*color: #f7f8fa;*/
  }
  .icon-level .path1:before {
    content: "\e955";
    color: #f1f33b;
  }
  .icon-level .path2:before {
    content: "\e956";
    color: #b8282f;
    margin-left: -1em;
  }
  .icon-level .path3:before {
    content: "\e957";
    color: #b8282f;
    margin-left: -1em;
  }
  .icon-level .path4:before {
    content: "\e958";
    color: #f9434b;
    margin-left: -1em;
  }
  .icon-level .path5:before {
    content: "\e959";
    color: #fff;
    margin-left: -1em;
  }
  .icon-link:before {
    content: "\e95a";
    color: #7c7c7c;
  }
  .icon-log:before {
    content: "\e95b";
    color: #129e87;
  }
  .icon-man:before {
    content: "\e95c";
    color: #39a795;
  }
  .icon-minus .path1:before {
    content: "\e95d";
    color: #f0341b;
  }
  .icon-minus .path2:before {
    content: "\e95e";
    color: #fff;
    margin-left: -1em;
  }
  .icon-money:before {
    content: "\e95f";
    color: #f34d4d;
  }
  .icon-operate:before {
    content: "\e960";
    color: #c7d1cf;
  }
  .icon-pie .path1:before {
    content: "\e961";
    color: #34a6ce;
  }
  .icon-pie .path2:before {
    content: "\e962";
    color: #60c8ec;
    margin-left: -1em;
  }
  .icon-plus:before {
    content: "\e963";
    /*color: #7c7c7c;*/
  }
  .icon-rank:before {
    content: "\e964";
    color: #fda796;
  }
  .icon-repeal:before {
    content: "\e965";
    color: #f7f8fa;
  }
  .icon-support:before {
    content: "\e966";

  }
  .icon-warning .path1:before {
    content: "\e967";
    color: #c72b1b;
  }
  .icon-warning .path2:before {
    content: "\e968";
    color: #fc301b;
    margin-left: -1em;
  }
  .icon-warning .path3:before {
    content: "\e969";
    color: #fff;
    margin-left: -1em;
  }
  .icon-woman:before {
    content: "\e96a";
    color: #fec153;
  }
  .icon-you .path1:before {
    content: "\e96b";
    color: #ed7f59;
  }
  .icon-you .path2:before {
    content: "\e96c";
    color: #fff;
    margin-left: -1em;
  }

  .icon-set-phone:before {
    content: "\e900";
    color: #ee6e50;
  }

  .icon-buy:before {
    content: "\e901";
    color: #129e87;
  }
  .icon-relationship:before {
    content: "\e902";
    color: #ed7f59;
  }

  .icon-activate:before {
    content: "\e903";
    color: #f85a5a;
  }
  .icon-csc:before {
    content: "\e904";
    color: #ee6e50;
  }

  .icon-c-member:before {
    content: "\e905";
    color: #f488f3;
  }
  .icon-c-sign:before {
    content: "\e906";
    color: #00bd8e;
  }

  .icon-c-groupdata:before {
    content: "\e907";
    color: #5cb0e6;
  }

  .icon-c-notice:before {
    content: "\e908";
    color: #febc43;
  }

  .icon-question:before {
    content: "\e90b";
    color: #ed7f59;
  }

  .icon-c-kick:before {
    content: "\e90c";
    color: #40c5d8;
  }

  .icon-c-you:before {
    content: "\e90d";
    color: #ee6e50;
  }

  .icon-c-code:before {
    content: "\e90f";
    color: #ee6e50;
  }

  .icon-c-speak:before {
    content: "\e910";
    color: #f1b686;
  }
  .icon-home,.icon-member,.icon-setting,.icon-user{
    padding-bottom: 3px;
    font-size: 25px;
  }

</style>

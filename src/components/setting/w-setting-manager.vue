<template>

  <div class="setting-manage bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="manage-content" >
      <mt-cell title="系统指令设置" label="群内操作方式：直接发送指令" class="manage-label"></mt-cell>
    </div>
    <div class="manage-div">
      <div class="setting-list" v-for="item in manageList" >
      <mt-cell :title="item.orderDesc">
        <input class="direct-message" type="text" v-model.trim="item.orderKeyWord" @change="updateOrder(item)">
        <span slot="icon" class="icon-switch" :class="{'switch-open': item.isOpen==1 }" @click="updateOrder(item)">
        <span class="path1"></span><span class="path2"></span>
        </span>
      </mt-cell>
      </div>

    </div>
    <div class="manage-div">
      <mt-cell title="群内快速指令设置" label="群内操作方式：@群成员+指令" class="manage-label"></mt-cell>
    </div>

    <div class="manage-bottom">
      *指令设置字数不超过10个字
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  export default {
    components: {
      WHeader
    },
    name: 'w-setting-manage',
    data() {
      return {
        headerName:'管家设置',
        manageList:[]

      }
    },
    created (){
      document.title = '管家设置';
    },
    mounted() {
      this.selectOrder();
    },
    methods: {
      /*查询所有设置*/
      selectOrder(){
        var vm = this;
         this.$http.get('/xiaov/groupCenter/selectOrder.do').then(function(res) {
           if(res.data.success){
             vm.manageList = res.data.result;
           }else{
             Toast(res.data.message);
           }

       }).catch(function(err) {
           Toast(err)
       })
      },
      /*修改设置*/
      updateOrder(item){
        var vm = this;
        /*输入字数限制10个字*/
        if(item.orderKeyWord.length>10){

            Toast('字数不得超过10个字');

          return;
        }
        if(item.orderKeyWord.trim()==''){

            Toast('请输入指令，指令不可为空');

          return;
        }

        if(item.orderCode=='home'){
          item.open=true;
        }

        this.$http.get('/xiaov/groupCenter/updateOrder.do',
          {params:{id:item.id,orderKeyWord:item.orderKeyWord,isOpen:item.isOpen ? 0 : 1}}).then(function(res) {
          if(res.data.success){
            Toast('设置成功！');
            }else{
            Toast(res.data.message);
          }

          item.isOpen=!item.isOpen;
        }).catch(function(err) {
          Toast(err)
        })

      }


    }

  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .mint-cell{
    min-height: 35px;
  }
  .manage-icon,.icon-switch{
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    font-size: 22px;

    color: rgb(175, 176, 177);
  }
  .switch-open{
    color:$header-background;
  }

  .manage-label{
    min-height: 50px;
  }


  .manage-div .setting-list {
    border-bottom: 1px solid $border-color;
  }
  .manage-div .setting-list:first-child .icon-switch{
    opacity: 0;

  }
  .manage-div .setting-list:last-child {
    border: none;
  }

  .mint-cell:last-child {
    background-image: none;
  }

  .manage-div {
    margin-top: 10px;
  }

  .direct-message {
    height: 23px;
    line-height: 23px;
    width: 100px;
    text-align: center;
    font-size: 12px;
    border: 1px solid $border-color;
    color:$black-color;
    outline:none;
  }
  .manage-bottom{
    height: 24px;
    line-height: 24px;
    background-color: white;
    color: $color-toptip-text;
    font-size: 12px;
    padding-left: 22px;
    border-top: 1px  solid $border-color;
    margin-bottom: $bottom-page-marginbottom-height;
  }

</style>

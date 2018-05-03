<template>
  <div class="user-mygroup">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="mygroup-content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">我开通的群</mt-tab-item>
        <mt-tab-item id="1">我参加的群</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <div class="mygroup-content-right">
            <div class="mygroup-content-right-search">
              <input class="input-default mygroup-input" placeholder="请输入群组名称查询" v-model.trim="openGroupName"/>
              <button class="button-default mygroup-button" @click="myOpentUpGroup">
                查询
              </button>
            </div>
            <div class="mygroup-block"></div>
            <div class="mygroup-content-right-list" v-for="(item,index) in myOpentUpGroupList">
              <table>
                <tr @click="goGroup(item.id)">
                  <td rowspan="2" style="width:40px;"><div><img :src='item.headImgs' alt=""></div></td>
                  <td class="lefttxt">{{item.groupName}}</td>
                  <td rowspan="2" style="width:40px;"><span class="go">进入 &gt;</span></td>
                </tr>
                <tr @click="goGroup(item.id)">
                  <td class="lefttxt graytxt">开通日期：{{item.robotActivationHistory.addTime | formatDate}}</td>
                </tr>
              </table>
            </div>
            <!-- <div class="mygroup-content-right-list">
              <table>
                <tr>
                  <td rowspan="2" style="width:40px;"><div><img src="../../common/image/cat.jpg" alt=""></div></td>
                  <td class="lefttxt">OH ~ 洋气的玩意儿</td>
                </tr>
                <tr>
                  <td class="lefttxt graytxt">开通日期：2018-01-31</td>
                </tr>
              </table>
            </div> -->
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <div class="mygroup-content-right">
            <div class="mygroup-content-right-search">
              <input class="input-default mygroup-input" placeholder="请输入关键词查询" v-model.trim="partInGroupName"/>
              <button class="button-default mygroup-button" @click="myParticipateInGroup">
                查询
              </button>
            </div>
            <div class="mygroup-block"></div>
            <div class="mygroup-content-right-list" v-for="(item,index) in myParticipateInGroupList">
              <table>
                <tr @click="goGroup(item.id)">
                  <td rowspan="2" style="width:40px;"><div><img :src='item.headImgs' alt=""></div></td>
                  <td class="lefttxt">{{item.groupName}}</td>
                   <td rowspan="2" style="width:40px;"><span class="go">进入 &gt;</span></td>
                </tr>
                <tr @click="goGroup(item.id)">
                  <td class="lefttxt graytxt">开通日期：{{item.robotActivationHistory.addTime | formatDate}}</td>
                </tr>
              </table>
            </div>
            <!-- <div class="mygroup-content-right-list">
              <table>
                <tr>
                  <td rowspan="2" style="width:40px;"><div><img src="../../common/image/cat.jpg" alt=""></div></td>
                  <td class="lefttxt">OH ~ 洋气的玩意儿</td>
                  <td rowspan="2" style="width:40px;"><span class="go">进入 &gt;</span></td>
                </tr>
                <tr>
                  <td class="lefttxt graytxt"></td>
                </tr>
              </table>
            </div> -->

          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import { formatDate } from '@/util/common.js'
  import {
    TabContainer,
    TabContainerItem,
    Toast

  } from 'mint-ui';
  export default {
    name: 'w-user-mygroup',
    components: {
      WHeader
    },
    filters:{
      formatDate (time,num) {
        if(time==""){
          return "";
        }else{
          let date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd')
        }
      }
    },
    data() {
      return {
        headerName: "我的群",
        selected: '0',
        openGroupName:'',
        partInGroupName: '',
        myOpentUpGroupList: [],
        myParticipateInGroupList: [],
        opId: this.$store.state.opId,
        gId:this.$store.state.gId,
      }
    },
    created (){
      document.title = '我的群';
    },
    mounted(){
      var vm=this;
      var selected=this.$route.params.id;
      if(selected!=null && selected!=""){
        vm.selected=selected.toString();
      }
      this.myOpentUpGroup();
      this.myParticipateInGroup();
    },
    methods:{
      //我开通的群
      myOpentUpGroup(){
        var vm = this;
        this.$http.get('/xiaov/userCenter/myOpentUpGroup.do',{params:{groupName:vm.openGroupName}}).then(function(res) {
          if(res.data.success){
            vm.myOpentUpGroupList = res.data.result;
          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })
      },
      //我参与的群
      myParticipateInGroup(){
        var vm = this;
        this.$http.get('/xiaov/userCenter/myParticipateInGroup.do',{params:{groupName:vm.partInGroupName}}).then(function(res) {
          if(res.data.success){
            vm.myParticipateInGroupList = res.data.result;
          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        })
      },
      goGroup(id){
        var vm=this;
        window.location.replace(this.$http.defaults.baseURL+"/auth/xiaov/main/index.do?"+new Date().getTime()+"&gId="+id+"&opId="+vm.opId+"&urlType=home");
//        this.$http.get("/auth/xiaov/main/index.do",{params:{gId:id,opId:vm.opId,urlType:"home"}}).then(function (res) {
//          if(res.data.success){
//
//          }else{
//            Toast(res.data.message);
//          }
//        }).catch(function (err) {
//          Toast(err);
//        })
      },

    }
  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .user-mygroup {
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .mygroup-input {
    height: 22px;
    border: 1px solid $border-color;
    width: 81%;
    color: $shallow-black-color;
  }
  .mygroup-content {
    /*margin-top: 10px;*/
  }
  .mygroup-content-right-search{
    padding: 10px 15px;
  }
  .mygroup-button{
    background-color: $color-toptip-text;
    color: $white;
    border: none;
    height: auto;
    padding: 4px 12px 6px 12px;
    margin-left: 5px;
    font-size: 12px;
    float: right;
  }
  .mygroup-block{
    height: 10px;
    background-color: $grey-background;
  }
  .mygroup-content-right-list{
    padding: 10px 20px;
    border-bottom: 1px solid $border-color;
  }
  .mygroup-content-right-list table{
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 13px;
  }
  .mygroup-content-right-list td div{
    display: inline-block;
  }
  .mygroup-content-right-list td div img{
    height: 40px;
    width: 40px;
    border-radius: 10px;
  }
  .mygroup-content-right-list td{
  }
  .mygroup-content-right-list td.lefttxt{
    text-align: left;
    padding-left: 10px;
  }
  .mygroup-content-right-list td.graytxt{
    color: $shallow-black-color;
  }
  .mygroup-content-right-list .go{
    color: $dark-green;
  }
</style>

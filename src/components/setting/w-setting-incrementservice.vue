<template>
<div class="incrementservice">
  <!--<w-header :title="headerName"></w-header>-->
<div class="incrementservice-div">


    <div class="setting-list">
      <div v-for="(item,index) in incrementDs" :key="index" >
      <mt-cell :title='item.orderDesc'>
         <span slot="icon" :class='item.switchClass'></span>
      <mt-switch v-if="userType!=0" v-model="item.isOpen" :data-id='item.id' @change="changeIncrementSwitch($event,item)" ></mt-switch>
      </mt-cell>
      <div class="detail-class">{{item.detail}}</div>
      </div>
      <!-- <mt-cell title="小笑话">
        <span slot="icon" class="icon-a-joke"></span>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell title="黄历">
        <span slot="icon" class="icon-a-almanac"></span>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell title="星座运势">
        <span slot="icon" class="icon-a-horoscope"></span>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>

      <mt-cell title="菜谱">
        <span slot="icon" class="icon-a-cookbook"></span>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell title="热点资讯">
        <span slot="icon" class="icon-a-hotmessage">
          <span class="path1"></span><span class="path2"></span>
                </span>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell title="快递查询">
        <span slot="icon" class="icon-a-expresscheck"></span>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell> -->

    </div>


</div>

</div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import { Toast } from 'mint-ui'
    export default {
      name: 'w-setting-incrementservice',
      components: {
        WHeader
      },
      data() {
          return {
            headerName: '增值服务',
            incrementDs: [],
            incrementClass: [
              "icon-a-weather",
              "icon-a-joke",
              "icon-a-almanac",
              'icon-a-horoscope',
              'icon-a-cookbook',
              'icon-a-hotmessage',
              'icon-a-expresscheck'
            ],
            value:'',
            userType:this.$store.state.userInfo.userType
          }
      },
      created (){
        document.title = '增值服务';
      },
      mounted() {
        this.getServiceSwitch();
      },
      methods:{
        //获取最近发言
        getServiceSwitch(){
          var vm = this;
          this.$http.get('/xiaov/groupCenter/findIncrement.do').then(function(res) {
            if(res.data.success){
              vm.incrementDs = res.data.result;
              for(var i = 0; i < vm.incrementDs.length; i++){
                if(vm.incrementDs[i].isOpen == "1"){
                  vm.incrementDs[i].isOpen = true;
                }else{
                  vm.incrementDs[i].isOpen = false;
                }
              }
              for(var j = 0; j < vm.incrementDs.length; j++){
                vm.incrementDs[j].switchClass = vm.incrementClass[j];
              }
              vm.incrementDs[0].detail="群内@管家【城市+天气】，为您查询相关城市的天气（例：@管家 北京 天气）";
              vm.incrementDs[1].detail="群内@管家【笑话】，为您提供轻松一刻（例：@管家 笑话）";
              vm.incrementDs[2].detail="群内@管家【黄历】，为您提供当天的黄历（例：@管家 黄历）";
              vm.incrementDs[3].detail="群内@管家【XX星座+星座】，为您提供星座运势（例：@管家 处女座 星座）";
            }else{
              Toast(res.data.message);
            }
          }).catch(function(err) {
            Toast(err)
          })
        },
        //更改增值服务
        changeIncrementSwitch: function ($event,row) {
          var id = row.id;
          var isOpen = $event;
          if(isOpen == true){
            isOpen = 0;
          }else{
            isOpen = 1;
          }
          this.$http.get('/xiaov/groupCenter/updateIncrement.do',
          {params:{id:id,isOpen:isOpen}}).then(function (res) {
            if(res.data.success){
              Toast('操作成功');
            }else{
              Toast(res.data.result);
            }
          }).catch(function (err) {
            Toast(err);
          })
        }
      }
    }


</script>

<style scoped lang="scss">

  .icon-a-weather,.icon-a-joke,.icon-a-almanac,.icon-a-horoscope,.icon-a-cookbook,.icon-a-hotmessage,.icon-a-expresscheck{
    float: left;
    font-size: 22px;
  }
  .detail-class{
    font-size: 12px;
    color: $shallow-black-color;
    background-color: white;
    padding: 0px 20px 10px 20px;
    line-height: 18px;
    margin-bottom: 10px;
  }

</style>

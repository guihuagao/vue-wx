<template>
<div class="groupdata">
  <!--<w-header :title="headerName"></w-header>-->

  <div class="incrementservice-div">


    <div class="setting-list">
      <!--<mt-cell title="红包统计" to="//github.com" is-link>-->
        <!--<span slot="icon" class="icon-money"></span>-->

      <!--</mt-cell>-->
      <mt-cell title="本群排行榜" to="/w-setting/w-setting-grouprank" is-link>
        <span slot="icon" class="icon-rank"></span>

      </mt-cell>


      <mt-cell title="群热词榜" to="/w-setting/w-setting-grouphit" is-link>
        <span slot="icon" class="icon-fire"></span>

      </mt-cell>
      <mt-cell title="群内统计数据" to="/w-setting/w-setting-groupaccess" is-link>
        <span slot="icon" class="icon-pie">
         <span class="path1"></span><span class="path2"></span>
        </span>

      </mt-cell>

      <mt-cell title="群日志" to="/w-setting/w-setting-grouplog" is-link>
        <span slot="icon" class="icon-log"></span>

      </mt-cell>

      <mt-cell></mt-cell>

    </div>


  </div>

</div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
    export default {
        name: 'w-setting-groupdata',
      components: {
        WHeader
      },
        data() {
            return {
                headerName: '群数据'
            }
        },
    created (){
    document.title = '群数据';
  },
    }


</script>

<style scoped lang="scss">

  .icon-money,.icon-rank,.icon-fire,.icon-pie,.icon-log{
    font-size: 22px;
    float: left;
  }

</style>

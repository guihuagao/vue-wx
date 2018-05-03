<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <w-footer></w-footer>
  </div>
</template>

<script>
import WLoading from './components/w-loading';
import WFooter from './components/w-footer';
import { Toast } from 'mint-ui';
export default {
  components: {
    WLoading,
    WFooter
  },
  name: 'App',

  mounted() {

  },


  data(){
    return{

    }

  },
  methods:{


  }
}
</script>

<style lang="scss" scoped>
#app {
background-color: $grey-background;
}
</style>

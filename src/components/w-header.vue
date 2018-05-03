<template>
  <mt-header :class="{ 'is-fixed': fixed }" :title="title">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="fallback()"></mt-button>
    </router-link>

  </mt-header>
</template>

<script type="text/ecmascript-6">
export default {
  name:'w-header',
  props: {
    fixed: Boolean,
    title: String

  },
  data(){
    return{

    }

  },

  methods:{
    fallback() {
      this.$router.go(-1);
    },
  }

}

</script>

<style scoped lang="scss">


</style>

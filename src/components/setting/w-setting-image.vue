<template>
  <van-swipe :autoplay="3000" :loop="false" :initial-swipe="3">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" style="width: 100%;height: 100%"/>
    </van-swipe-item>
  </van-swipe>

</template>
<script>
  export default {
    data() {
      return {
        images: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524457692122&di=31c59db7327646d87256aa96ff9bc64c&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120727%2F201995-120HG1030762.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524457692123&di=0f1bd62b31e4f60d624b812273448e53&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0142135541fe180000019ae9b8cf86.jpg%401280w_1l_2o_100sh.png',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524457692123&di=0f1bd62b31e4f60d624b812273448e53&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0142135541fe180000019ae9b8cf86.jpg%401280w_1l_2o_100sh.png',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524457692123&di=0f1bd62b31e4f60d624b812273448e53&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0142135541fe180000019ae9b8cf86.jpg%401280w_1l_2o_100sh.png',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524457692123&di=0f1bd62b31e4f60d624b812273448e53&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0142135541fe180000019ae9b8cf86.jpg%401280w_1l_2o_100sh.png',
        ]
      }
    }
  }

</script>

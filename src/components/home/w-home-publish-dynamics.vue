<template>
    <div class="home-dynamics">
     <!-- <w-header :title="headerName"></w-header>-->
      <div class="dynamics-top">
        <div class="dynamics-content">
          <textarea class="dynamics-area" placeholder="这一刻的想法" v-model.trim="addCommentContent">
          </textarea>
        </div>
        <div class="dynamics-center">
          <div class="img-button" v-show="isShow">
            <div>
              <div class="img-show add" ><span class="icon-plus" ></span><a href="javascript:;" class="file-class">
               <!-- <uploader url="url"></uploader>-->
              <van-uploader :after-read="onRead" accept="image/jpeg,image/png">
              </van-uploader>

              </a> </div>
            </div>
          </div>
          <div class="img-showAll" v-if="imageList.length>0">
            <div v-for="(image,index) in imageList" style="width: 70px;position: relative;display: inline-block;">
            <span class="icon-minus" style="position: absolute;right:0;" @click="deleteImg(image)">
            <span class="path1"></span><span class="path2"></span>
            </span>
              <img :src="image" @click="clickImg(index)"/>
            </div>
          </div>
        </div>
      </div>
      <div class="dynamics-bottom">
        <button class="button-default" @click="publishComment(addCommentContent)"><label><span class="icon-issue"></span>&nbsp;发布</label></button>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  import { formatDate } from '@/util/common.js';
  import {hex_md5} from '@/util/md5.js';
  import { ImagePreview } from 'vant'
  export default {
    name: 'home-dynamics',
    components: {
      WHeader
    },
    data () {
      return {
        headerName: "发布个人动态",
        addCommentContent:'',
        pwd:'',
        url:'',
        userInfoId:'',
        imageList:[],
        imageString:'',
        nolinkimageList:[],
        imgUrl: this.$store.state.imgUrl,
        isShow:true,
      }
    },

    created (){
      document.title = '发布个人动态';
    },

    methods:{
      onRead(file,content) {
        var vm = this;
        let date=new Date();
        this.pwd = hex_md5('wusehua' +formatDate(date,'yyyy-MM-dd'));
        this.pwd = this.pwd.toUpperCase();
        this.url=vm.imgUrl+ "fileUpload?pwd="+ this.pwd + "&type=weiyouquan";
        let param = new FormData();
        /*if(file.length>0){
          let picList=[];
          for(let i=0;i<file.length;i++){
            picList.push(file[i].file);
          }
          param.append('file', picList);
        }else{
          param.append('file', file.file);
        }*/
        param.append('file', file.file);
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }

        this.$http.post(this.url,param,config).then(function(res) {
          if(res.data.success){
            Toast("图片上传成功");
            vm.imageList.push(vm.$store.state.imgUrl+res.data.newFilePath);
            vm.nolinkimageList.push(res.data.newFilePath);
          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        });

      },
      //删除图片
      deleteImg(img){
        var vm = this;
        for (var i = 0; i <vm.nolinkimageList.length; i++) {
          if (vm.nolinkimageList[i] == img) {
            vm.nolinkimageList.splice(i, 1);
          }
        }

       for (var j = 0; j <vm.imageList.length; j++) {
        if (vm.imageList[j] == img) {
         vm.imageList.splice(j, 1);
           }
       }

      },


      /*点击图片*/
      clickImg(index){
        var vm=this;
        ImagePreview(vm.imageList,index);
      },


      /*提交*/
      publishComment(addCommentContent){
        var vm = this;
        if(vm.nolinkimageList.length==0 && vm.addCommentContent==""){
          Toast("发布动态不能为空！");
          return;
        }

        if(this.nolinkimageList.length>9){
          Toast('最多上传9张图片');
          return;
        }
        if(addCommentContent.trim()==''){
          addCommentContent='';
        }


        if(this.nolinkimageList.length>0){
          vm.imageString=this.nolinkimageList.join(',');
        }else{
          vm.imageString='';
        }

       this.$http.get('/xiaov/moments/addMoments.do',{params:{contents:addCommentContent,images:vm.imageString,urls:''}}).then(function(res) {
          if(res.data.success){
            Toast("个人动态发布成功");
            vm.addCommentContent='';
            vm.imageList=[];
            vm.router.push({name:'w-home-home'});
          }else{
            Toast(res.data.message);
          }

        }).catch(function(err) {
          Toast(err)
        });
      }
    },
    watch:{
      nolinkimageList:{
        handler:function(val,oldval){
          var vm=this;
          if(vm.nolinkimageList.length==9){
            vm.isShow=false;
            Toast("最多上传9张图片！");
          }
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .home-dynamics{
    margin-bottom: $bottom-page-marginbottom-height;
  }
  .dynamics-top{
    background-color: $white;
    padding: 10px 15px;
  }
  .dynamics-content{
    height: 138px;
    border: 1px solid $border-color;
    border-radius: 5px;
    padding: 10px;
    padding-bottom: 0px;
  }
  .dynamics-area{
    width: 100%;
    height: 130px;
    resize: none;
    margin: 0px;
    padding: 0px;
    outline: none;
    border: 1px solid $white;
    font-size: $common-size;
    font-family: 'PingFangSC-Light, sans-serif','PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  }
  .dynamics-center{

  }
  img{
    width: 60px;
    height: 60px;
    border: 1px solid $border-color;
  }
  .img-show{
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    vertical-align:top;
    background-color: $grey-background;
    border-radius: 5px;
    position: relative;
  }
  .img-show img{
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
  .button-default{
    padding: 0 14px;
  }
  .add{
    font-size: 16px;
    border: 1px solid $border-color;
    width: 50px;
    height:50px;
    line-height: 50px;
  }
  .file-class{
    width: 50px;
    height: 50px;
    display: inline-block;
    vertical-align:top;
  }
  .file-class {
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
  }
  .file-class input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file-class:hover {
    text-decoration: none;
  }
  .img-button{
    margin-top: 10px;
    text-align: left;
  }
  .img-showAll{
    margin-top: 10px;
  }
  .img-showAll img{
    width: 60px;
    height: 60px;
    border-radius: 5px;
    border: 1px solid $border-color;
    margin: 2px 5px;
  }
 /* .img-showAll img:first-child{
    margin: 0 5px 0 0;
  }*/

  .dynamics-bottom{
    background-color: $white;
    margin-top: 10px;
    height: 50px;
    padding-top: 10px;
    text-align: center;
  }
  .icon-plus{
    color: $shallow-black-color;
  }
  .icon-issue{
    color: #f7f8fa;
    font-size: 14px;
  }
</style>

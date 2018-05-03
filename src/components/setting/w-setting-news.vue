<template>
  <div class="setting-news bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="news-main">
        <div class="news-top">
          <div>群头像<span class="toptip">（展示在微中心，建议小于200k的正方形图片）</span></div>
          <div class="pic-content">
            <div class="img-show" v-if="imageShow&&groupInfo.headImgs!=null">
              <img v-if="groupInfo.headImgs.indexOf('http')==-1" :src="imgUrl + groupInfo.headImgs" />
              <img v-if="groupInfo.headImgs.indexOf('http')!=-1" :src="groupInfo.headImgs" />

              <span class="icon-minus" style="margin-top: -55px;position: absolute;margin-left: 17px" @click="imageHide()">
                <span class="path1"></span><span class="path2"></span>
                </span>
            </div>
            <div v-else class="img-show add"><span class="icon-plus" ></span><a href="javascript:;" class="file-class">
              <van-uploader :after-read="onRead">
              </van-uploader>
            </a> </div>
          </div>
        </div>
    </div>
    <div class="news-content">
      <div class="news-input">
      <div class="news-div">请选择群类别，获取行业资源</div>
      <div @click="all()">
        <input class="input-default" placeholder="点击选择分类" disabled  v-model="selecttagName"/><!--v-model="groupTag.tagName==null?'':groupTag.tagName"-->

      </div>
      <div class="news-div">群空间名称</div>
      <div><input class="input-default" placeholder="请输入群空间名称" v-model.trim="groupInfo.groupName"/></div>
      <div class="news-div" >群空间介绍</div>
      <div>
        <textarea class="default-textArea" v-model.trim="groupInfo.groupIntroduce"></textarea>
      </div>
    </div>
    </div>
    <div class="news-bottom">
      <button class="button-default" @click="submitSetting(groupInfo.headImgs,groupInfo.groupName,groupInfo.groupIntroduce)"><label>确认提交</label></button>
    </div>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          选择分类<span class="icon-close" @click="closeDialog()"></span>
        </div>
        <div class="dialog-default-content news-dialog">
          <div class="news-select" v-for="first in groupCata">
            <div>{{first.tagName}}</div>
            <div class="news-select-span"><a v-for="second in first.childGroupTagList" :class="{'selected':second.id===selected}"><span @click="selectTag(second.id,second.tagName)">{{second.tagName}}</span></a></div>
          </div>
        </div>
        <div class="dialog-default-bottom">
          <div @click="closeDialog()">取消</div>
          <div @click="confirmDialog(selected,selecttagName)">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  import { formatDate } from '@/util/common.js';
  import {hex_md5} from '@/util/md5.js';
  export default {
    components: {
      WHeader
    },
    name: 'w-setting-signrecord',
    data() {
      return {
        headerName: '群信息管理',
        show:false,
        imgSrc:'',
        groupInfo:'',
        groupCata:[],
        selected:'',
        imageList:[],
        imageShow:true,
        selecttagName:'',
        groupTag:'',
        nolinkimageList:[],
        imgUrl: this.$store.state.imgUrl,
      }
    },
    created (){
      document.title = '群信息管理';
    },
    mounted() {
    this.getGroupInfo();
    this.getAllCata();
    },

    methods:{
      /*获取群信息*/
      getGroupInfo(){
        var vm = this;
        this.$http.get('/xiaov/groupCenter/selectGroupInformation.do').then(function(res) {
          if(res.data.success){
            vm.groupInfo=res.data.result;

            vm.groupTag=vm.groupInfo.groupTag;
            if(vm.groupTag!=null){
              vm.selected=vm.groupInfo.groupTagIds;
              if(vm.groupInfo.groupTagIds==null){
                vm.selecttagName='';
              }else{
                vm.selecttagName=vm.groupTag.tagName;
              }
            }else{
              vm.selected="";
              vm.selecttagName="";
            }
          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        });
      },

      /*查询所有分类*/
      getAllCata(){
        var vm = this;
        this.$http.get('/xiaov/groupCenter/findGroupTagList.do').then(function(res) {
          if(res.data.success){
            vm.groupCata=res.data.result;
          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        });
      },
      /*选择标签*/
      selectTag(id,tagName){
        this.selected=id;
        this.selecttagName=tagName;
       /* this.groupTag.tagName=tagName;*/
        /*this.groupInfo.tagName=tagName;*/
      },
      /*选择分类*/
      all(){
       this.show=true;
      },
      closeDialog(){
        this.show=false;
      },
      /*确认分类*/
      confirmDialog(id,tagName){
        this.show=false;
        this.groupInfo.tagName=tagName
      },
    /* 隐藏头像*/
      imageHide(){
       this.imageShow=false;
      },

      /*上传图片*/
      onRead(file) {
          var vm = this;
          let date=new Date();
          this.pwd = hex_md5('wusehua' +formatDate(date,'yyyy-MM-dd'));
          this.pwd = this.pwd.toUpperCase();
          this.url=vm.imgUrl+"fileUpload?pwd="+ this.pwd + "&type=robot";
          let param = new FormData();

          param.append('file', file.file);
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }

          this.$http.post(this.url,param,config).then(function(res) {
            if(res.data.success){
              Toast("图片上传成功");
              vm.groupInfo.headImgs=vm.$store.state.imgUrl+res.data.newFilePath;
              vm.nolinkimageList.push(res.data.newFilePath);
              vm.imageShow=true;
              /*vm.imageList.push('http://192.168.0.107:8088/'+res.data.newFilePath);*/
            }else{
              Toast(res.data.message);
            }

          }).catch(function(err) {
            Toast(err)
          });

      },
      submitSetting(headImgs,groupName,groupIntroduce){

        var vm = this;
        if(vm.imageShow==false){
          Toast('请选取群头像');
          return;
        }
        if(groupName.trim()==''){
          Toast('请输入群空间名称');
          return;
        }
      /*  if(groupIntroduce.trim()==''){
          Toast('请输入群空间介绍');
          return;
        }*/

       /* if(vm.selected.trim()==''){
          vm.selected=vm.groupInfo.groupTagIds;
        }*/

        if(vm.nolinkimageList.length>0){
          headImgs=vm.nolinkimageList.join(',');
        }

//        var param=new URLSearchParams();
//        param.append('headImgs', headImgs);
//        param.append('groupName', groupName);
//        param.append('groupIntroduce', groupIntroduce);
//        param.append('groupTagids', vm.selected);
        this.$http.get('/xiaov/groupCenter/updateGroupInformation.do',{params:{headImgs:headImgs,groupName:groupName,groupIntroduce:groupIntroduce,groupTagids:vm.selected}}).then(function(res) {
          if(res.data.success){
            Toast("信息提交成功");
            vm.$store.dispatch("getUserInfo");
            vm.$router.push({name: 'w-home-home'});

          }else{
            Toast(res.data.message);
          }
        }).catch(function(err) {
          Toast(err)
        });

      }

    }

  }
</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .news-main{
    padding: 10px;
    background-color: $white;
    margin-bottom: 10px;
  }
  .news-top{
    padding-left: 10px;
    background-color: $white;
    font-size: 0px;
  }
  .news-top div:first-child{
    font-size: $common-size;
  }
  .toptip{
    font-size: $assist-size;
  }
  .news-top .pic-content{
    padding-top: 10px;
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
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  .news-content{
    padding:10px;
    background-color: $white;
  }

  .news-content .news-input{
    padding-left: 10px;
    padding-right: 10px;
  }
  .news-div:first-child{
    margin-top: 0;
  }
  .news-div{
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 5px;
  }
  .default-textArea{
    -webkit-appearance:none;
    width: 100%;
    height: 50px;
    border: 1px solid $grey-background;
    background-color: $grey-background;
    border-radius: 5px;
    font-size: $assist-size;
    color: $black-color;
    outline: none;
    resize:none;
    text-indent:10px;
    font-weight: 500;
    margin: 0px;
    padding: 0px;
    font-family: 'PingFangSC-Light, sans-serif','PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback'
  }
  .news-bottom{
    background-color: $white;
    text-align: center;
    padding-top: 10px;
    margin-top: 10px;
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
  .icon-plus{
    color: $shallow-black-color;
  }

  .news-select{
    padding: 5px 0;
    overflow-y: auto;
  }
  .news-dialog{
    padding: 10px 20px;
    height: 300px;
    overflow: scroll;
  }
  .news-select-span a{
    border: 1px solid $border-color;
    color: $shallow-black-color;
    font-size: $assist-size;
    display: inline-block;
    margin-top: 5px;
    padding: 3px 5px;
    border-radius: 3px;
    margin-right: 3px;
  }

  .news-select-span .selected{
    border: 1px solid $color-text;
    color: $color-text;
    font-size: $assist-size;
    display: inline-block;
    margin-top: 5px;
    padding: 3px 5px;
    border-radius: 3px;
    margin-right: 3px;
  }

 /* .news-select-span .select:focus,.news-select-span .select:visited,.news-select-span .select:active{
    border: 1px solid $color-text;
  }
  .news-select-span .select:focus span,.news-select-span .select:visited span,.news-select-span .select:active span {
    color: $color-text;
  }*/
  .icon-close{
    font-size: 10px;
    float: right;
    opacity: 0.9;
    cursor: pointer;
  }
</style>

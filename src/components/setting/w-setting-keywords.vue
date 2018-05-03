<template>
  <div class="setting-keywords bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="setting-keywords-main">
      <div class="keywords-top">
        <div><input class="input-default keywords-input" placeholder="请输入关键词查询" v-model.trim="keyWords"/></div>
        <div>
          <button class="button-default keywords-button" @click="selectByKeyWords()"><label>搜索</label></button>
        </div>
      </div>
      <div class="setting-keywords-center">
        <div>关键词 </div>
        <div class="part2">
          <div>
            <input class="input-default" placeholder="请输入关键词" v-model.trim="addkeyWords"/>
          </div>
          <div>
            <button class="button-default" @click="addKeyWordsAnd()"><label>新增关键词</label></button>
          </div>
        </div>
        <div>回复 <span class="keywords-green">+文字</span></div>
        <div class="keywords-div">
          <div class="area-div">
            <textarea v-model.trim="replyContent" class="replayArea"></textarea>
          </div>
        </div>
        <div class="keywords-div" >回复方式：
          <span class="keywords-radio"><input type="radio" id="radio-1-1" name="radio-1-set" class="regular-radio" v-model="replyMode" value="all"/><label for="radio-1-1"></label></span>
          <span class="radio-text">全部回复</span>
          <span class="keywords-radio"><input type="radio" id="radio-1-2" name="radio-1-set" class="regular-radio" v-model="replyMode" value="one"/><label for="radio-1-2"></label></span>
          <span class="radio-text">随机一条</span>
        </div>

      </div>
      <div class="keywords-div-border">
        <span>开启关键词回复</span>
        <div>
          <mt-switch v-model="isOpen"></mt-switch>
        </div>
      </div>
      <div class="keywords-div-border">
        <span>触发关键词@管家</span>
        <div>
          <mt-switch v-model="isNeedAt"></mt-switch>
        </div>
      </div>
      <div class="keywords-div-border">
        <span>是否精准匹配</span>
        <div>
          <mt-switch v-model="isMatch"></mt-switch>
        </div>
      </div>
      <div class="keywords-div-border">
        <span>关键词列表</span>
        <!--<span class="key-delete">删除</span>-->
      </div>
      <div class="keywords-div-border" v-for="item in keyList">
        <el-tooltip class="item" effect="dark" :content="item.keyWords" placement="top-start">
          <span class="key-bac" v-if="item.keyWords.toString().length<=6">{{item.keyWords}}</span>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="item.keyWords" placement="top-start">
        <span class="key-bac" v-if="item.keyWords.toString().length>6">{{item.keyWords.toString().substr(0,6)}}..</span>
        </el-tooltip>
        <span class="key-right">
        <span class="icon-edit" @click="openDialog(item)"></span>
        <span class="icon-delete" @click="openDelete(item)" ></span>
        <span class="switch-disable">
          <span v-show="item.isOpen==1">已开启</span>
          <span v-show="item.isOpen==0" class="gray-class">已关闭</span>
        </span>
        </span>
      </div>
    </div>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          修改关键词<span class="icon-close" @click="closeDialog()"></span>
        </div>
        <div class="dialog-default-content keywords-dialog">
          <div class="setting-keywords-center  dialog-center">
            <div>关键词 </div>
            <div class="part2">
              <div style="width: 100%">
                <input class="input-default" placeholder="请输入关键词" v-model.trim="updatekeyWords"/>
                <span v-show="adIsNull" class="red-default">请输入关键词</span>
                <span v-show="contentLength" class="red-default">关键词请控制在20字之内！</span>
                <span class="red-default" v-show="isRepeat">关键词重复</span>
              </div>
              <div></div>
            </div>
            <div>回复 <span class="keywords-green">+文字</span></div>
            <div class="keywords-div">
              <div class="area-div">
                <textarea v-model.trim="replyContentUpdate" class="replayArea"></textarea>
              </div>
              <div v-show="contentIsNull" class="red-default">请输入回复内容</div>
              <div v-show="isUpdateMax" class="red-default">当前回复内容不能超过40个字！</div>
            </div>
            <div class="keywords-div" >回复方式：
              <span class="keywords-radio"><input type="radio" id="radio-1-11" name="radio-12-set" class="regular-radio" v-model="replyModeUpdate" value="all"/><label for="radio-1-11" class="dialog-label"></label></span>
              <span class="radio-text">全部回复</span>
              <span class="keywords-radio"><input type="radio" id="radio-1-22" name="radio-12-set" class="regular-radio" v-model="replyModeUpdate" value="one"/><label for="radio-1-22" class="dialog-label"></label></span>
              <span class="radio-text">随机一条</span>
            </div>

          </div>
          <div class="keywords-div-border boder-top">
            <span>开启关键词回复</span>
            <div>
              <mt-switch v-model="isOpenUpdate"></mt-switch>
            </div>
          </div>
          <div class="keywords-div-border">
            <span>触发关键词@管家</span>
            <div>
              <mt-switch v-model="isNeedAtUpdate"></mt-switch>
            </div>
          </div>
          <div class="keywords-div-border border-default">
            <span>是否精准匹配</span>
            <div>
              <mt-switch v-model="isMatchUpdate"></mt-switch>
            </div>
          </div>

        </div>
        <div class="dialog-default-bottom">
          <div @click="closeDialog()">取消</div>
          <div @click="updateKeyWords()">确定</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="isDelete" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          删除关键词<span class="icon-close" @click="closeDelete()"></span>
        </div>
        <div class="keywords-delete-dialog">
          是否确定删除关键词:{{deleteItem.keyWords}}
        </div>
        <div class="dialog-default-bottom">
          <div @click="closeDelete()">取消</div>
          <div @click="comfirmDelete()">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';

  export default {
    components: {
      WHeader
    },
    name: 'w-setting-signrecord',
    data() {
      return {
        headerName: '关键词管理',
        keyList:[],
        keyWords:'',
        addkeyWords:'',
        replyContent:'',
        replyMode:'all',
        replyType:'0',
        isOpen:true,
        isNeedAt:false,
        isMatch:true,
        updatekeyWords:'',
        replyContentUpdate:'',
        replyModeUpdate:'all',
        replyTypeUpdate:'0',
        isOpenUpdate:false,
        isNeedAtUpdate:false,
        isMatchUpdate:false,
        openList:[],
        show:false,
        adIsNull:false,
        contentIsNull:false,
        id:'',
        isDelete:false,
        deleteId:'',
        deleteItem:'',
        imgUrl: this.$store.state.imgUrl,
        contentLength:false,
        isUpdateMax:false,
        isRepeat:false,
      }
    },
    created (){
      document.title = '关键词管理';
    },
    mounted () {
      this.getKeyWordsList();
    },
    methods:{
      openDelete(val){
        this.deleteId=val.id;
        this.deleteItem=val;
        this.isDelete=true;
      },
      closeDelete(){
        this.isDelete=false;
      },
      comfirmDelete(){
        this.isDelete=false;
        this.deleteKey();
      },
      //关闭弹框
      closeDialog(){
        var vm=this;
        vm.show=false;
        vm.adIsNull=false;
        vm.contentIsNull=false;
        vm.isUpdateMax=false;
        vm.contentLength=false;
        vm.isRepeat=false;
        vm.id="";
      },
      //打开弹框
      openDialog(data){
        var vm=this;
        vm.show=true;
        vm.adIsNull=false;
        vm.contentIsNull=false;
        vm.isUpdateMax=false;
        vm.contentLength=false;
        vm.isRepeat=false;
        vm.updatekeyWords=data.keyWords;
        vm.replyContentUpdate=data.replyContent;
        vm.replyModeUpdate=data.replyMode===0 ? 'all' :'one';
        vm.isOpenUpdate=data.isOpen ===1;
        vm.isNeedAtUpdate=data.isNeedAt===1;
        vm.isMatchUpdate=data.isAccurateMatch===1;
        vm.id=data.id;
      },
      //获取关键词列表
      getKeyWordsList(){
          var vm=this;
          this.$http.get("/xiaov/groupCenter/selectKeyWords.do").then(function (res) {
            if(res.data.success){
              if(vm.keyList.length>0){
                vm.keyList.splice(0,vm.keyList.length);
              }
              if(res.data.result!=null && res.data.result.length>0){
                vm.keyList=res.data.result;
              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
      //添加关键词
      addKeyWordsAnd(){
        var vm=this;
          if(vm.addkeyWords==""){
          Toast("请输入关键词！");
          return;
        }
        if(vm.addkeyWords.toString().length>20){
            Toast("关键词请控制在20字以内！")
          return;
        }
        if(vm.replyContent==""){
            Toast("请输入回复内容！");
            return;
        }
        if(vm.replyContent.toString().length>40){
          Toast("当前回复内容不能超过40个字!");
          return;
        }
        var isOpen=vm.isOpen ? 1:0;
        var isNeedAt=vm.isNeedAt ? 1:0;
        var isMatch=vm.isMatch ? 1:0;
        var mode=vm.replyMode=='all' ? 0 : 1;
//        var params=new URLSearchParams();
//        params.append("keyWords",vm.addkeyWords);
//        params.append("replyContent",vm.replyContent);
//        params.append("replyType",vm.replyType);
//        params.append("replyMode",mode);
//        params.append("isOpen",isOpen);
//        params.append("isNeedat",isNeedAt);
//        params.append("isAccurateMatch",isMatch);
        this.$http.get('/xiaov/groupCenter/addKeyWords.do',{params:{keyWords:vm.addkeyWords,replyContent:vm.replyContent,replyType:vm.replyType,replyMode:mode,isOpen:isOpen,isNeedat:isNeedAt,isAccurateMatch:isMatch}}).then(function (res) {
          if(res.data.success){
            Toast("添加成功！");
            vm.keyWords='';
              vm.addkeyWords='';
              vm.replyContent='';
              vm.replyMode='all';
              vm.isOpen=true;
              vm.isNeedAt=false;
              vm.isMatch=true;
            vm.getKeyWordsList();
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      //修改关键词
      updateKeyWords(){
        var vm=this;
        if(vm.updatekeyWords==""){
          vm.adIsNull=true;
          return;
        }else{
          vm.adIsNull=false;
          if(vm.updatekeyWords.toString().length>20){
            vm.contentLength=true;
            return;
          }else{
            vm.contentLength=false;
          }
        }
        if(vm.replyContentUpdate==""){
          vm.contentIsNull=true;
          return;
        }else{
          vm.contentIsNull=false;
          if(vm.replyContentUpdate.toString().length>40){
            vm.isUpdateMax=true;
            return;
          }else{
            vm.isUpdateMax=false;
          }
        }

        var isOpen=vm.isOpenUpdate ? 1:0;
        var isNeedAt=vm.isNeedAtUpdate ? 1:0;
        var isMatch=vm.isMatchUpdate ? 1:0;
        var mode=vm.replyModeUpdate==='all' ? 0 :1
//        var params=new URLSearchParams();
//        params.append("keyWords",vm.updatekeyWords);
//        params.append("replyContent",vm.replyContentUpdate);
//        params.append("replyType",vm.replyTypeUpdate);
//        params.append("replyMode",mode);
//        params.append("isOpen",isOpen);
//        params.append("isNeedat",isNeedAt);
//        params.append("isAccurateMatch",isMatch);
//        params.append("id",vm.id);
        this.$http.get("/xiaov/groupCenter/updateKeyWords.do",{params:{keyWords:vm.updatekeyWords,replyContent:vm.replyContentUpdate,replyType:vm.replyTypeUpdate,replyMode:mode,isOpen:isOpen,isNeedat:isNeedAt,isAccurateMatch:isMatch,id:vm.id}}).then(function (res) {
          if(res.data.success){
            vm.id="";
            vm.show=false;
            vm.isRepeat=false;
            vm.getKeyWordsList();
          }else{
            vm.isRepeat=true;
            vm.show=true;
            setTimeout(function () {
              vm.isRepeat=false;
            },1000);
          }
        }).catch(function (err) {
          vm.isRepeat=true;
          vm.show=true;
          setTimeout(function () {
            vm.isRepeat=false;
          },1000);
        })
      },
      //通过关键词查询
      selectByKeyWords(){
        var vm=this;
        this.$http.get("/xiaov/groupCenter/selectByKeyWords.do",{params:{keyWords:vm.keyWords}}).then(function (res) {
          if(res.data.success){
            if(vm.keyList.length>0){
              vm.keyList.splice(0,vm.keyList.length);
            }
            vm.keyList=res.data.result;
            if(res.data.result.length==0){
              Toast("暂无关键词，去添加！");
            }
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      //删除关键词
      deleteKey(){
        var vm=this;
        var id=vm.deleteId;
        this.$http.get("/xiaov/groupCenter/deleteById.do",{params:{id:id}}).then(function (res) {
          if(res.data.success){
            Toast("删除成功！");
            vm.getKeyWordsList();
          }else{
            Toast(res.data.success);
          }
        }).catch(function (err) {
          Toast(err);
        })
      }
    },
    watch:{
      updatekeyWords:{
        handler:function(val,oldval){
          var vm=this;
          if(vm.updatekeyWords==""){
            vm.adIsNull=true;
          }else{
            vm.adIsNull=false;
            if(vm.updatekeyWords.toString().length>20){
              vm.contentLength=true;
            }else{
              vm.contentLength=false;
            }
          }
        },
      },
      replyContentUpdate:{
        handler:function(val,oldval){
          var vm=this;
          if(vm.replyContentUpdate==""){
            vm.contentIsNull=true;
          }else{
            vm.contentIsNull=false;
            if(vm.replyContentUpdate.toString().length>40){
              vm.isUpdateMax=true;
              return;
            }else{
              vm.isUpdateMax=false;
            }
          }
        },
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .icon-close{
    float: right;
    opacity: 0.9;
  }
  .keywords-dialog{
    height: 340px;
  }

  .keywords-delete-dialog{
    height: 50px;
    text-align: center;
    padding: 10px;
  }
  .switch-disable{
    color: $color-text;
    font-size: $common-size;
    text-align: center;
  }
  .area-div{
    background-color: $grey-background;
    padding: 5px 10px;
  }
  .replayArea{
    height: 30px;
    border: none;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: $grey-background;
    outline: none;
    resize: none;
    font-size: $common-size;
    color: $black-color;
    font-family: 'PingFangSC-Light, sans-serif','PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  }
  .icon-delete{
    padding-top: 9px;
    margin-left: 10px;
    margin-right: 10px;
    color: #acaeae;
  }
  .icon-edit{
    color: #acaeae;
    padding-top: 9px;
  }
  .keywords-div {
    margin-top: 10px;
  }

  .keywords-input {
    height: 22px;
    background-color: $white;
    border: 1px solid $border-color;
  }

  .keywords-top {
    font-size: 0px;
    background-color: $white;
    padding-top: 10px;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-right: 20px;
  }

  .keywords-top div {
    display: inline-block;
  }

  .keywords-top div:first-child {
    width: 72%;
  }

  .keywords-top div:last-child {
    text-align: right;
    width: 25%;
    float: right;
  }

  .keywords-button {
    width: 100%;
  }

  .setting-keywords-center {
    margin-top: 10px;
    padding: 10px 20px;
    margin-bottom: 10px;
    background-color: $white;
  }
  .part2{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .part2 div:first-child {
    vertical-align: top;
    display: inline-block;
    width: 70%;
  }
  .part2 div:last-child {
    vertical-align: top;
    display: inline-block;
    width: 30%;
    float: right;
  }

  .part2 div:last-child button {
    height: 30px;
    width: 100%;
    border-radius: 0px;
  }
  .keywords-green{
    color: $color-text;
    float: right;
  }

  .regular-radio {
    display: none;
  }

  .regular-radio + label {
    background-color: #999999;
    border: 1px solid $border-color;
    padding: 6px;
    border-radius: 50px;
    display: inline-block;
    position: relative;
    box-shadow: inset 0 0 1px 2px #ffffff;
  }
  .dialog-label{
    margin-top: 2.5px;
  }

  .regular-radio:checked + label:after {
    content: ' ';
    width: 8px;
    height: 8px;
    border-radius: 50px;
    position: absolute;
    top: 2px;
    background: $color-text;
    left:2px;
    font-size: 32px;
  }
  .regular-radio:checked + label {
    background-color: $white;
    color: $color-text;
    border: 1px solid $color-text;
  }
  .keywords-radio{
    position: absolute;
  }
  .radio-text{
    margin-left: 20px;
  }
  .keywords-div-border{
    background-color: $white;
    padding-left: 20px;
    padding-right: 20px;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid $border-color;
  }
  .keywords-div-border div{
  padding-top: 8px;
    float: right;
  }
  .keywords-div-border:first-child{
    margin-top: 10px;
  }
  .key-delete{
    margin-top: 8px;
    height: 18px;
    line-height: 18px;
    border: 1px solid $color-text;
    border-radius: 4px;
    color: $color-text;
    float: right;
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .key-bac{
    border: 1px solid #d4d1d1;
    width: 100px;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #d4d1d1;
    color: $white;
    border-radius: 4px;
  }
  .dialog-center{
    padding: 10px 20px;
    margin: 0px;
  }
  .dialog-default-content{
    padding: 0px;
  }
  .boder-top{
    border-top: 1px solid $border-color;
  }
  .border-default{
    border-bottom: none;
  }
  .red-default{
    color: red;
    text-align: left;
    border-color: 1px solid red;
  }
  .key-right{
    float: right;
  }
  .gray-class{
    color: $shallow-black-color;
  }
  .center-default{
    padding-top: 10px;
    text-align: center;
  }
</style>

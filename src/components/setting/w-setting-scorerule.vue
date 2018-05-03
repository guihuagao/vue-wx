<template>
<div class="setting-scorerule">
  <!--<w-header :title="headerName"></w-header>-->
  <div class="scorerule-content">
    <div class="scorerule-top">
    <span>当前已开启群积分</span>
      <mt-switch v-if="userType!=0" class="switch" v-model="value"></mt-switch>
    </div>
    <div class="scorerule-middle">
      <div class="top">
      <span>活跃积分规则</span>
      <button class="button-default" @click="setConfig()" v-if="userType!=0">
        <label v-show="isActive">设置</label>
        <label v-show="!isActive">取消</label>
      </button>
      </div>
      <div class="assist">
        <span>开启积分体系，群成员可以通过签到、发言、参与活动等操作获得积分，累计积分可获得奖励。有助于激励大家踊跃发言，提高群活跃度。</span>
      </div>
      <div class="table">
        <div class="content1">
          <div class="f1">行为</div>
          <div class="s1">分值</div>
          <div class="s1">每日上限</div>
          <div class="y1"></div>
        </div>
        <div class="content1" v-for="item in ruleList" >
          <div class="f1" > <el-tooltip class="item" effect="dark" :content="item.pointsAction" placement="top-start">
                                      <span class="el-tooltip item">
                                        <span v-show="item.pointsAction.length>7">{{item.pointsAction.toString().substr(0,7)}}..</span>
                                        <span v-show="item.pointsAction.length<=7">{{item.pointsAction}}</span>
                                      </span>
                                      </el-tooltip></div>
          <div class="s1" ><span>+<span class="span-input"><input  type="text" v-model.trim="item.points"  :class="{'border-default':isActive,'border-default1':!isActive}" @change="changeValue(item)"/></span>/次</span></div>
          <div class="s1" ><input type="text"  v-model.trim="item.pointsMax"   class="up-input" /></div>
          <div class="y1"><button class="button-default" v-show="!isActive" @click="updateConfig(item)"><label>保存</label></button></div>
          </div>
      </div>
    </div>
    <div class="scorerule-middle-bottom">
      <span>积分修改</span><span class="assist-content">(每次积分修改间隔时间60s)</span>
      <div class="assist-content">
        <ul>
          <li>一次手动修改增加积分上限为2000分</li>
          <li>一次手动减少积分不能超过该成员当前总积分</li>
        </ul>
      </div>
    </div>
    <div class="scorerule-bottom">
      <div class="top">
        <span>积分等级成长体系</span>
        <button class="button-default" @click="changeLevel()" v-if="userType!=0">
          <label v-show="levelActive">设置</label>
          <label v-show="!levelActive">取消</label>
        </button>
      </div>
      <div class="assist">
        <span>积分等级是用户在所在群内活跃体现，支持名称修改。</span>
      </div>
      <div class="table">
        <div class="content1">
          <div class="f">等级</div>
          <div class="s">名称</div>
          <div class="s" >分值</div>
          <div class="y"></div>
        </div>
        <div class="content" v-for="(item,index) in levelList">
          <div class="f lev-text">
            <span>Lv.{{index+1}}</span>
          </div>
          <div class="s">
            <span v-if="item.levelName!=null && item.levelName.length>4 && levelActive">{{item.levelName.toString().substr(0,4)}}..</span>
            <span v-if="item.levelName!=null &&  item.levelName.length<=4 && levelActive">{{item.levelName}}</span>
            <input type="text" v-model.trim="item.levelName" class="input-class1" :class="{levelActive:levelActive,levelUn:!levelActive}" v-show="!levelActive"/>
          </div>
          <div class="s" style="text-align: left;"><input type="text" v-model.trim="item.endPoints" class="input-class1" :class="{levelActive:levelActive,levelUn:!levelActive}"/></div>
          <div class="y"><button class="button-default" v-show="!levelActive" @click="checkLevel(item,(index+1))"><label>保存</label></button><button class="button-default default1" v-show="!levelActive" @click="deleteLevel(item)"><label>删除</label></button></div>
        </div>
        <div v-if="userType!=0"><span class="icon-plus" @click="addLevel()"></span></div>
      </div>
    </div>

  </div>

</div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
    export default {
        name: 'w-setting-scorerule',
      components: {
        WHeader
      },
        data() {
            return {
              headerName: '群积分规则',
              value:true,
              ruleList:[],
              levelList:[],
              points:'',
              maxPoints:'',
              isActive:true,
              levelActive:true,
              testScore:false,
              endList:[],
              isAdd:true,
              userType:this.$store.state.userInfo.userType
            }
        },
      created (){
        document.title = '群积分规则';
      },
      mounted() {
        var vm=this;
        vm.getConfigList();
      },
      methods:{
          //获取配置列表
        getConfigList(){
          var vm=this;
          this.$http.get("/xiaov/pointsCenter/findPointsConfig.do").then(function (res) {
            if(res.data.success){
              if(res.data.result.pointsConfigList!=null){
                vm.ruleList=res.data.result.pointsConfigList;
              }
              if(res.data.result.pointsLevelList!=null){
                vm.levelList=res.data.result.pointsLevelList;
              }
              if(res.data.result.pointsConfigList[0].isOpen==1){
                  vm.value=true;
                }else{
                vm.value=false;
              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
        //设置积分规则
        setConfig(){
          this.isActive=!this.isActive;
          this.getConfigList();
        },
        //保存积分设置
        updateConfig(data){
          var vm=this;
          if(vm.testScore){
            this.$http.get("/xiaov/pointsCenter/updatePointsConfigById.do",{params:{id:data.id,points:data.points,pointsMax:data.pointsMax}}).then(function (res) {
              if(res.data.success){
                Toast("积分修改成功！");
              }else{
                Toast(res.data.message);
              }
            }).catch(function (err) {
              Toast(err);
            })
          }
        },
        //分值改变
        changeValue(data){
          var vm=this;
          vm.testScore=false;
          var reg=/^[1-9]\d*$/
          if(!reg.test(data.points)){
            Toast("积分必须是大于0的整数!");
            return;
          }
          if(data.points>2000){
            Toast("分值上限为2000！");
            return;
          }
          vm.testScore=true;
          data.pointsMax=data.points*10;
        },
        changeLevel(){
          this.levelActive=!this.levelActive;
          this.getConfigList();
        },
        //删除等级
        deleteLevel(data){
          var vm=this;
          if(data.id=='more'){
            vm.levelList.splice(vm.levelList.length-1,1);
          }else{
          this.$http.get("/xiaov/pointsCenter/deletePointsLevel.do",{params:{id:data.id}}).then(function (res) {
            if(res.data.success){
                Toast("删除成功!");
                vm.getConfigList();
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
          }
        },
        //修改等级
        updateLevel(data){
          var vm=this;
          this.$http.get("/xiaov/pointsCenter/updatePointsLevel.do",{params:{id:data.id,levelName:data.levelName,endPoints:data.endPoints}}).then(function (res) {
            if(res.data.success){
              Toast("修改成功！");
              vm.getConfigList();
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
        getList(){
          var vm=this;
          this.$http.get("/xiaov/pointsCenter/findPointsConfig.do").then(function (res) {
            if(res.data.success){
              if(res.data.result.pointsLevelList!=null){
                vm.endList=res.data.result.pointsLevelList;
              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
        addLevelList(data){
          var vm=this;
          this.$http.get('/xiaov/pointsCenter/addPointsLevel.do',{params:{levelName:data.levelName,endPoints:data.endPoints}}).then(function (res) {
            if(res.data.success){
              Toast("添加成功");
              vm.isAdd=true;
              vm.getConfigList();
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
        //检查等级
        checkLevel(data,index){
          var vm=this;
          this.$http.get("/xiaov/pointsCenter/findPointsConfig.do").then(function (res) {
            if(res.data.success){
              if(res.data.result.pointsLevelList!=null){
                vm.endList=res.data.result.pointsLevelList;
                if(data.levelName==""){
                  Toast("等级名称不能为空！");
                  return;
                }
                var reg=/^[1-9]\d*$/;
                if(!reg.test(data.endPoints)){
                  Toast("积分必须是大于0的整数!");
                  return;
                }
                if(data.id!='more'){
                  var listLength=vm.endList.length;
                  if(listLength==0 || listLength==1){
                    vm.updateLevel(data);
                    return;
                  }
                  if(index==1 && listLength>1){
                    if(data.endPoints>=vm.endList[index].endPoints){
                      Toast("当前等级的分数必须小于下一个等级的分数！");
                      return;
                    }else{
                      vm.updateLevel(data);
                      return;
                    }
                  }
                  if(index==listLength){
                    if(data.endPoints<=vm.endList[index-2].endPoints){
                      Toast("当前等级的分数必须大于上一个等级的分数！")
                      return;
                    }else{
                      vm.updateLevel(data);
                      return;
                    }
                  }
                  if(data.endPoints<=vm.endList[index-2].endPoints){
                    Toast("当前等级的分值必须大于上一等级的分值！");
                    return;
                  }
                  if(data.endPoints>=vm.endList[index].endPoints){
                    Toast("当前等级的分值必须小于下一等级的分值！");
                    return;
                  }
                  vm.updateLevel(data);
                }else{
                  if(vm.levelList.length==1){
                    vm.addLevelList(data);
                  }else{
                    if(parseInt(vm.levelList[vm.levelList.length-1].endPoints)<=vm.endList[vm.endList.length-1].endPoints){
                      Toast("新增的分值必须大于上一等级的分值！");
                      return;
                    }else{
                      vm.addLevelList(data);
                    }
                  }
                }
              }
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })

        },
        //添加等级
        addLevel(){
          var vm=this;
          vm.levelActive=false;
          if(vm.levelList.length>0 && vm.levelList[vm.levelList.length-1].id=='more'){
            Toast("请先保存新增的的等级！");
            return;
          }
          vm.levelList.push({level:'',levelName:'',endPoints:'',id:'more'});
        }
      },
      watch:{
      value:{
        handler:function(val,oldval){
          var vm=this;
          var open=vm.value ? 1 :0;
          this.$http.get("/xiaov/pointsCenter/updatePointsConfig.do",{params:{isOpen:open}}).then(function (res) {
            if(res.data.success){
                  Toast("设置成功!");
                  vm.getConfigList();
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })
        },
        },
      },
    }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .content1{
    width:100%;
    height: 35px;
    font-size: $assist-size;
    line-height: 35px;
  }
  .content1 .f1{
    text-align: left;
    width: 35%;
    vertical-align: middle;
    display: inline-block;
  }
  .content1 .s1{
    text-align: center;
    width: 23%;
    vertical-align: middle;
    display: inline-block;
  }
  .content1 .y1{
    text-align: center;
    float: right;
    vertical-align: middle;
    display: inline-block;
  }

  .scorerule-top{
    background: $white;
    padding: 10px 15px;
  }
  .scorerule-top .switch{
    float: right;
  }
  .scorerule-middle,.scorerule-middle-bottom,.scorerule-bottom{
    margin-top:$space-height;
    background: $white;
    padding: 10px 15px;
  }
  .scorerule-bottom{
    margin-bottom: 60px;
  }
  .scorerule-middle .top,.scorerule-bottom .top{
   height: 30px;
    line-height: 30px;
  }
  .scorerule-middle .top .button-default,.scorerule-bottom .top .button-default{
    float: right;
  }

  .scorerule-middle .assist,.scorerule-bottom .assist{
    font-size: $assist-size;
    color: $shallow-black-color;
  }
  .scorerule-middle .assist>span,.scorerule-bottom .assist>span{
    line-height: 20px;
  }
  .scorerule-middle .table,.scorerule-bottom .table{
    padding-left: 10px;
  }
  .scorerule-content .button-default{
    padding: 1px 3px;
    height: auto;
    min-width: 0;
  }

  .content {
    width: 100%;
    height: 35px;
    background: $white;
  }
  .scorerule-middle .content input{
    outline: none;
    text-align: center;
    color: $black-color;
    font-size: 12px;
   }

  .content1 {
    width: 100%;
    height: 35px;
  }

  .content1 .y,.content1 .s,.content1 .f,.content .y,.content .s,.content .f {
    display: inline-block;

    line-height: 35px;
    font-size: $assist-size;
  }

  .content1 .y,.content .y{
    text-align: center;
    float: right;
  }
  .content1 .s,.content .s{
    width: 23%;
    text-align: center;
  }
  .content1 .f,.content .f{
    width: 22%;
    text-align: left;
  }
 .scorerule-middle-bottom .assist-content{
  font-size: $assist-size;
 }

  .scorerule-middle-bottom ul{
    margin-bottom: 0;
    padding-left: 16px;
  }
  .scorerule-middle-bottom ul li{
    height: 20px;
    line-height: 20px;
    list-style-type:decimal;
  }
  .default1{
    margin-left: 5px;
  }

  .lev-text input{
    width: 90%;
    text-align: left;
    border: 1px solid $border-color;
    vertical-align: middle;
    font-size: 12px;
    color: $black-color;
  }
  .input-class1{
    -webkit-appearance:none;
    padding: 0px;
    width: 90%;
    text-align: center;
    border: 1px solid $border-color;
    vertical-align: middle;
    outline: none;
    color: $black-color;
    font-size: 12px;
    margin-top: -2px;
  }
  .border-default{
    -webkit-appearance:none;
    padding: 0px;
    border: none;
    pointer-events: none;
    cursor: default;
    width: 30px;
    text-align: center;
  }
  .border-default1{
    -webkit-appearance:none;
    padding: 0px;
    width: 30px;
    text-align: center;
    height: 12px;
    pointer-events: auto;
    cursor:pointer;
    border: 1px solid $border-color;
  }
  .span-input{
    width: 32px;
    display: inline-block;
    font-size: 12px;
  }
  .up-input{
    width: 40px;
    border: none;
    pointer-events: none;
    cursor: default;
    color: $black-color;
    text-align: center;
  }
  .s-left{
    text-align: left;
  }
  .levelActive{
    border: none;
    pointer-events: none;
    cursor: default;
  }
  .level-span-default{
    width: 31px;
    display: inline-block;
    text-align: center;
  }
  .c2{
    margin-top: -3px;
    font-size: 12px;
    text-align: center
  }
  .icon-plus{
    color: $color-text;
    border: 1px solid $color-text;
    padding: 3px;
    border-radius: 3px;
    font-size: 12px;
  }
</style>

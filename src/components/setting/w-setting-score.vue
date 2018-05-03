<template>
  <div class="setting-score bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="person-top" v-if="myList.length>0">
      <img :src="myList[0].headImgUrl"/>
      <div class="person-top-bottom">
        <span class="icon-man">
                </span>
        <span >{{myList[0].wechatGroupNickName}}&nbsp;</span>
        <span @click="goPage()">
          积分明细
        </span>
        <span @click="goPageToRule()">
          积分规则
        </span>
      </div>
      <div class="person-div qun">
        所在群：{{myList[0].groupName}}
      </div>
      <div ><mt-progress :value="myList[0].points==0 ? 0 :  myList[0].endPoints==0 ? 100 : myList[0].endPoints<myList[0].points ? 100 : Math.ceil((100*myList[0].points)/myList[0].endPoints)" :bar-height="7">
        <div slot="start">LV.{{myList[0].level}}&nbsp;</div>
        <div slot="end">&nbsp;{{myList[0].points}}/{{myList[0].endPoints}}</div></mt-progress></div>
    </div>
    <div class="person-center">
      <div class="person-center-top">
        <div>
          <input class="input-default" placeholder="请输入关键词查询" v-model.trim="nickName"/>
        </div>
        <div>
          <button class="button-default" @click="getMySelfInfo()"><label>搜索</label></button>
          <span v-if="userType!=0" @click="openPoint()" class="span-class">积分重置</span>
        </div>
      </div>
    </div>

    <div class="person-bottom">
      <div class="score-table1">
        <el-table
          :data="myList"
          style="width:100%"
          :show-header="false"
          @cell-click="goToDetail"
        >
          <el-table-column
            prop="pointsNum"
            label="排行"
            min-width="25px"
          >
            <template slot-scope="scope">
              <div>
                <span style="color: #f25d2a" v-if="scope.row.pointsNum!=null && scope.row.pointsNum.toString()=='1'">{{scope.row.pointsNum}}</span>
                <span style="color: #129e87" v-if="scope.row.pointsNum!=null && scope.row.pointsNum.toString()=='2'">{{scope.row.pointsNum}}</span>
                <span style="color: #4590dd" v-if="scope.row.pointsNum!=null && scope.row.pointsNum.toString()=='3'">{{scope.row.pointsNum}}</span>
                <span  v-if="scope.row.pointsNum!=null && parseInt(scope.row.pointsNum)>3">{{scope.row.pointsNum}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="wechatNickName"
            label="群成员"
            min-width="30px"
          >
            <template slot-scope="scope">
              <div class="m-class"><img :src="scope.row.headImgUrl" class="score-img"/>
                <div v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.toString().length>2">{{scope.row.wechatNickName.toString().substr(0,2)}}..</div>
                <div v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.toString().length<=2">{{scope.row.wechatNickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="wechatGroupNickName"
            label="群名片"
            min-width="70px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.wechatGroupNickName!=null">
              <div v-if="scope.row.wechatGroupNickName.toString().length>7">{{scope.row.wechatGroupNickName.toString().substr(0,7)}}..</div>
              <div v-if="scope.row.wechatGroupNickName.toString().length<=7">{{scope.row.wechatGroupNickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="level"
            label="当前等级"
            min-width="40px"
          >
            <template slot-scope="scope">
              <div>Lv.{{scope.row.level}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="pointsNum"
            label="当前积分"
            min-width="60px"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.points!=null"><span>{{scope.row.points}}</span><span v-if="userType!=0" class="icon-edit" @click="openDialog(scope.row)"></span></div>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="score-table2 inner-table">
        <el-table
          :data="scoreList"
          style="width:100%"
          @cell-click="goToDetail"
          :default-sort = "{prop: 'pointsNum', order: 'ascending'}"
        >
          <el-table-column
            prop="points"
            label="排行"
            min-width="25px"
          >
            <template slot-scope="scope">
              <div>
                <span style="color: #f25d2a" v-if="scope.row.pointsNum!=null && scope.row.pointsNum.toString()=='1'">{{scope.row.pointsNum}}</span>
                <span style="color: #129e87" v-if="scope.row.pointsNum!=null && scope.row.pointsNum.toString()=='2'">{{scope.row.pointsNum}}</span>
                <span style="color: #4590dd" v-if="scope.row.pointsNum!=null && scope.row.pointsNum.toString()=='3'">{{scope.row.pointsNum}}</span>
                <span  v-if="scope.row.pointsNum!=null && parseInt(scope.row.pointsNum)>3">{{scope.row.pointsNum}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="wechatNickName"
            label="群成员"
            min-width="30px"
          >
            <template slot-scope="scope">
              <div class="m-class"><img :src="scope.row.headImgUrl" class="score-img"/>
                <div v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.toString().length>2">{{scope.row.wechatNickName.toString().substr(0,2)}}..</div>
                <div v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.toString().length<=2">{{scope.row.wechatNickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="wechatGroupNickName"
            label="群名片"
            min-width="70px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.wechatGroupNickName!=null">
              <div v-if="scope.row.wechatGroupNickName.toString().length>7">{{scope.row.wechatGroupNickName.toString().substr(0,7)}}..</div>
              <div v-if="scope.row.wechatGroupNickName.toString().length<=7">{{scope.row.wechatGroupNickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="level"
            label="当前等级"
            min-width="40px"
          >
            <template slot-scope="scope">
              <div>Lv.{{scope.row.level}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="pointsNum"
            label="当前积分"
            min-width="60px"
            sortable>
            <template slot-scope="scope">
              <div><span>{{scope.row.points}} </span> <span class="icon-edit" v-if="userType!=0" @click="openDialog(scope.row)" ></span></div>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <van-popup v-model="show" :close-on-click-overlay="false">
        <div class="dialog-default">
          <div class="dialog-top">
            积分修改<span class="icon-close" @click="closeDialog()"></span>
          </div>
          <div class="dialog-default-content score-dialog">
            <div class="score-div">成员昵称：{{selectData.wechatGroupNickName}}</div>
            <div class="score-div">当前积分：<span>{{selectData.points}}</span></div>
            <div class="score-div">积分操作：<span class="keywords-radio"><input type="radio" id="radio-1-1" name="radio-1-set" class="regular-radio" v-model="type" value="增加" /><label for="radio-1-1" class="label-default"></label></span>
              <span class="radio-text">增加</span>
              <span class="keywords-radio"><input type="radio" id="radio-1-2" name="radio-1-set" class="regular-radio" v-model="type" value="减少"/><label for="radio-1-2" class="label-default" ></label></span>
              <span class="radio-text">减少</span></div>
            <div class="score-div">积分数值：<input class="score-input" v-model.trim="points"/></div>
            <span v-if="isPoint" class="red-default">{{showMessage}}</span>
            <div class="score-div"><span>备　　份：</span><span><textarea class="score-area" v-model.trim="contents"></textarea></span></div>
          </div>
          <div class="dialog-default-bottom">
            <div @click="closeDialog()">取消</div>
            <div @click="confirmDialog()">确定</div>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="showReset" :close-on-click-overlay="false">
        <div class="dialog-default">
          <div class="dialog-top">
            积分重置<span class="icon-close" @click="closePoint()"></span>
          </div>
          <div class="dialog-default-content center-default">
            是否确定积分重置
          </div>
          <div class="dialog-default-bottom">
            <div @click="closePoint()">取消</div>
            <div @click="comfirmPoint()">确定</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui';
  export default {
    name: 'setting-score',
    components: {
      WHeader
    },
    data() {
      return {
        show:false,
        selectData:{},
        headerName: '群积分',
        scoreList:[],
        nickName:'',
        myList:[],
        listLength:0,
        type:'增加',
        points:' ',
        contents:'',
        isPoint:false,
        showMessage:'请输入积分数',
        all:false,
        myId:'',
        id:'',
        groupId:'',
        userType:this.$store.state.userInfo.userType,
        showReset:false,
      }
    },
    created (){
      document.title = '群积分';
    },
    mounted() {
      var vm=this;
      if(sessionStorage.getItem("searchId")!=null && sessionStorage.getItem("groupId")!=null && sessionStorage.getItem("searchId")!=""){
        vm.id=sessionStorage.getItem("searchId");
        vm.groupId=sessionStorage.getItem("groupId");
      }else{
        vm.id="";
        vm.groupId=""
      }
      this.getMySelfInfo();
    },

    methods:{
      openPoint(){
        this.showReset=true;
      },
      closePoint(){
        this.showReset=false;
      },
      comfirmPoint(){
        this.showReset=false;
        this.resetPoints();
      },
      //获取积分列表
      getScoreList(){
        var vm=this;
        this.$http.get("/xiaov/pointsCenter/searchName.do",{params:{nickName:vm.nickName}}).then(function (res) {
            if(res.data.success){
              vm.listLength=res.data.result.length;
              if(vm.scoreList.length>0){
                vm.scoreList.splice(0,vm.scoreList.length);
              }
              var list=res.data.result;
              var num=0;
              var isHave=false;
              for(var i=0;i<list.length;i++){
                list[i].wechatUser.level=list[i].level;
                list[i].wechatUser.endPoints=list[i].endPoints;
                list[i].wechatUser.groupName=list[i].groupName;
                if(list[i].wechatUser != null){
                  if(list[i].wechatUser.id==vm.myList[0].id){
                      num=i;
                      isHave=true;
                  }
                }else{
                  list[i].wechatUser=[];
                }
                list[i].wechatUser.points=list[i].wechatUser.points==null ? 0 : list[i].wechatUser.points;
                list[i].wechatUser.endPoints=list[i].wechatUser.endPoints==null ? 0 : list[i].wechatUser.endPoints;
                vm.scoreList.push(list[i].wechatUser);
              }
              if(isHave){
                vm.scoreList.splice(num,1);
              }
            }else{
              Toast(res.data.message);
            }
        }).catch(function (err) {
            Toast(err);
        })
      },
      //获取本人信息
      getMySelfInfo(){
        var vm=this;
        this.$http.get("/xiaov/pointsCenter/selectUserInformation.do",{params:{id:vm.id,groupId:vm.groupId}}).then(function (res) {
          if(res.data.success){
            if(vm.myList.length>0){
              vm.myList.splice(0,vm.myList.length);
            }
            var list=res.data.result;
            list.wechatUser.level=list.level;
            list.wechatUser.levelName=list.levelName;
            list.wechatUser.groupName=list.groupName;
            list.wechatUser.endPoints=list.endPoints;
            vm.myList.push(list.wechatUser);
            vm.myId=vm.myList[0].id;
            vm.myList[0].points=vm.myList[0].points==null ? 0 : vm.myList[0].points;
            vm.myList[0].endPoints=vm.myList[0].endPoints==null ? 0 : vm.myList[0].endPoints;
            vm.getScoreList();
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      //打开弹窗
      openDialog(data){
        this.showMessage="请输入积分数";
        this.selectData=data;
        this.show=true;
        this.type='增加';
        this.all=true;
      },
      //修改积分
      confirmDialog(){
        var vm=this;
        if(vm.points==""){
          vm.isPoint=true;
          return;
        }
        if(vm.points.toString().replace(" ",'').toString()==""){
          vm.showMessage="请输入积分数";
          vm.isPoint=true;
          return;
        }
        var point=parseInt(vm.points.replace(" ","").toString());
        if(vm.isPoint){
          return;
        }
        this.$http.get("/xiaov/pointsCenter/updatePoints.do",{params:{id:vm.selectData.id,type:vm.type,contents:vm.contents,points:point}}).then(function (res) {
          if(res.data.success){
            vm.all=false;
            Toast("修改成功！");
            vm.points=' ';
            vm.isPoint=false;
            vm.show=false;
            vm.getMySelfInfo();
          }else{
            Toast(res.data.message);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      //关闭弹窗
      closeDialog(){
        var vm=this;
        vm.all=false;
        vm.show=false;
        vm.points=' ';
        vm.isPoint=false;
      },
      //积分重置
      resetPoints(){
        var vm=this;
        this.$http.get("/xiaov/pointsCenter/resetUserPoints.do").then(function (res) {
          Toast("积分重置成功！");
          vm.getMySelfInfo();
        }).catch(function (err) {
          Toast(err);
        })
      },
      //跳转详情页面
      goToDetail(row, column){
        var vm=this;
        if(column!=null && column.property.toString()!='pointsNum'){
        if(row==null){
          this.router.push({name:'w-setting-score-detail',params:{level:vm.myList[0].level,id:vm.myList[0].id,group:vm.myList[0].groupName,points:vm.myList[0].points,endPoints:vm.myList[0].endPoints,wechatGroupNickName:vm.myList[0].wechatGroupNickName,headImgUrl:vm.myList[0].headImgUrl}});
        }else{
          this.router.push({name:'w-setting-score-detail',params:{level:row.level,id:row.id,group:row.groupName,points:row.points,endPoints:row.endPoints,wechatGroupNickName:row.wechatGroupNickName,headImgUrl:row.headImgUrl}});
        }
      }
      },
      goPage(){
        var vm=this;
        this.router.push({name:'w-setting-score-detail',params:{level:vm.myList[0].level,id:vm.myList[0].id,group:vm.myList[0].groupName,points:vm.myList[0].points,endPoints:vm.myList[0].endPoints,wechatGroupNickName:vm.myList[0].wechatGroupNickName,headImgUrl:vm.myList[0].headImgUrl}});
      },
      goPageToRule(){
        this.router.push({name:'w-setting-scorerule',params:{}});
      }
    },
    watch: {
      //监控积分变化
      points: {
        handler: function (val, oldval) {
          var vm = this;
          if(vm.all){
          if (vm.points == "") {
            vm.isPoint=true;
            vm.showMessage="积分必须是大于0的整数";
          } else {
            var point=parseInt(vm.points.replace(" ","").toString());
            var reg=/^[1-9]\d*$/
            if(!reg.test(point)){
              vm.isPoint=true;
              vm.showMessage="积分必须是大于0的整数";
              return;
            }else{
              vm.isPoint=false;
            }
            if(vm.type=='增加'){
              if(point+vm.selectData.points>2000){
                vm.isPoint=true;
                vm.showMessage="积分最大值是2000，您增加的太多了";
                return;
              }else{
                vm.isPoint=false;
              }
            }else if(vm.type=="减少"){
              if(vm.selectData.points-point<0){
                vm.isPoint=true;
                vm.showMessage="您的积分减少的太多了，已经为负值了";
                return;
              }else{
                vm.isPoint=false;
              }
            }else{
              vm.isPoint=false;
            }
          }
          }
        },
      },
    }
  }


</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .score-img{
    width:30px;
    height: 30px;
    border-radius: 50%;
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
    margin-left: 15px;
  }

  .score-input{
    border: 1px solid $border-color;
    border-radius: 5px;
    width: 170px;
    text-indent:10px;
    outline: none;
  }
  .score-area{
    border: 1px solid $border-color;
    border-radius: 5px;
    width: 170px;
    outline: none;
    resize:none;
    text-indent:10px;
    height: 70px;
    font-family: 'PingFangSC-Light, sans-serif','PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback'
  }
  .score-div{
    margin-top: 10px;
  }
  .score-div:first-child{
    margin-top: 0px;
  }
  .score-div:nth-child(2) span{
    color: $color-text;
  }
  .score-div:last-child span{
    vertical-align: top;
    display: inline-block;
  }
  .person-top {
    padding: 10px 20px;
    background-color: $white;
    text-align: center;
  }

  .person-top img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .person-div{
    margin-top: 9px;
    margin-bottom: 9px;
  }

  .person-top-bottom {
    margin-top: 7px;
    margin-bottom: 7px;
  }

  .person-top span:nth-child(3){
    display: inline-block;
    border: 1px solid $color-text;
    color: $color-text;
    border-radius: 5px;
    font-size: $assist-size;
    padding: 3px 10px 3px 10px;
  }
  .person-top span:nth-child(4){
    display: inline-block;
    border: 1px solid $color-text;
    color: $color-text;
    border-radius: 5px;
    font-size: $assist-size;
    padding: 3px 10px 3px 10px;
  }
  .qun{
    font-size: $assist-size;
    color: $shallow-black-color;
  }
  .person-center{
    margin-top: 10px;
    background-color: $white;
    padding: 10px 20px;
  }
  .person-center div:first-child{
  }
  .person-center div:first-child span{
    text-align: center;
    border-radius: 5px;
    border: 1px solid #767676;
    color: $white;
    background-color: #767676;
    float: right;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: $assist-size;
    min-width: 55%;
  }
  .person-center-top {
    font-size: 0px;
    background-color: $white;
  }

  .person-center-top div {
    display: inline-block;
  }

  .person-center-top div:first-child {
    width: 60%;
  }
  .person-center-top div:first-child input{
    background-color: white;
    border: 1px solid $border-color;
    border-radius: 5px;
    height: 22px;
  }

  .person-center-top div:last-child {
    text-align: left;
    width: 38%;
    float: right;
  }
  .person-center-top div:last-child  button{
    min-width:40%;
    text-align: center;
    display: inline-block;
  }
  .person-bottom{
    background-color: $white;
    margin-top: 10px;
  }
  .person-bottom-header{
    height: 35px;
    font-size: 0px;
    border-top: 1px solid $border-color;
  }
  .header-content{
    display: inline-block;
    font-size: $common-size;
    color: $black-color;
    text-align: center;
    width: 19.5%;
    line-height: 35px;
  }
  .person-bottom-content{
    height: 50px;
    font-size: 0px;
    border: 1px solid $border-color;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .con-tr, .con-tr-img{
    display: inline-block;
    width: 19.5%;
    font-size: $common-size;
    color: $black-color;
    vertical-align: top;
    text-align: center;
  }
  .con-tr{
    line-height: 50px;
  }
  .con-tr-img img{
    width: 30px;
    height: 30px;
    border: 1px solid red;
    border-radius: 50%;
    margin-bottom: 3px;
    display: inline-block;
  }
  .icon-edit{
    float: right;
    padding-right: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .score-table1{
    margin-top: 40px;
    position: absolute;
    z-index: 1;
    width: 100%
  }
  .label-default{
    margin-top: 3px;
  }
  .score-dialog{
    height: 250px;
  }
  .red-default{
    color: red;
  }
.icon-close{
  font-size: 12px;
  float: right;
  opacity: 0.9;
}
  .m-class{
    margin-left: -10px;
  }
  .center-default{
    text-align: center;
    margin-top: -1px;
  }
</style>

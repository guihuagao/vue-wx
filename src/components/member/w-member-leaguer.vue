<template>
  <div class="member-leaguer bottom-left">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="leaguer-detail-top">
      <div><input class="input-default" placeholder="请输入关键词查询" v-model.trim="searchCon"/></div>
      <div><button class="button-default button1" @click="searchList()"><label>搜索</label></button>
        <button class="button-default back-button" @click="goMan()" v-if="userType!=0"><label>管理成员</label></button></div>
    </div>


    <div class="member-leaguer-bottom">
      <div class="table1">
        <el-table
          :data="member"
          style="width:100%"
          :show-header="false"
          :default-sort="{prop: 'newTalkTime', order: 'descending'}"
          @row-click="goPage"
        >
          <el-table-column
            prop="wechatNickName"
            label="群成员"
            min-width="100px"
          >
            <template slot-scope="scope">
              <div class="member-leaguer-text">
                <span class="icon-user user-default" v-if="scope.row.myself!=null && scope.row.myself==1"></span>
                <span class="icon-user"  v-if="scope.row.myself!=null && scope.row.myself==0 && scope.row.userType==2"></span>
                <img :src="scope.row.headImgUrl" class="member-img-default"/>
                <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length>3">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,3)}}..</span>
                <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length<=3">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="wechatGroupNickName"
            label="群名片"
            min-width="60px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.wechatGroupNickName!=null" class="card-class">
              <div v-if="scope.row.wechatGroupNickName.length>3">{{scope.row.wechatGroupNickName.toString().substr(0,3)}}..</div>
              <div v-if="scope.row.wechatGroupNickName.length<=3">{{scope.row.wechatGroupNickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="points"
            label="积分"
            min-width="60px"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.points!=null">
              <div v-if="scope.row.points.toString().length <= 5">{{scope.row.points}}</div>
              <div v-if="scope.row.points.toString().length >5">{{scope.row.points.toString().substr(0,3)}}...</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="newTalkTime"
            label="最后发言"
            min-width="100px"
            sortable>
            <template slot-scope="scope">
              <div v-if="scope.row.newTalkTime!=null">
              <div>{{scope.row.newTalkTime | formatDate}}<i class="mint-cell-allow-right"></i></div>
              </div>
            </template>
          </el-table-column>

        </el-table>
        <div class="table1-bottom">
          <span>群组人员（{{totalCount}}人）</span><span>*每个群可设置10个管理员</span>

        </div>
      </div>
      <div class="table2 inner-table">
        <el-table
          :data="memberList"
          style="width:100%"
          :default-sort="{prop: 'newTalkTime', order: 'descending'}"
          @row-click="goPage"
        >
          <el-table-column
            prop="wechatNickName"
            label="群成员"
            min-width="100"
          >
            <template slot-scope="scope">
              <div class="member-leaguer-text">
                <span class="icon-user" v-if="scope.row.userType!=null && scope.row.userType==2" ></span>
                <span class="icon-user man" v-if="scope.row.userType!=null && scope.row.userType==1" ></span>
                <span class="icon-user user-default" v-if="scope.row.userType!=null && scope.row.userType==0" ></span>
                <img :src="scope.row.headImgUrl" class="member-img-default"/>
                <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length>3">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,3)}}..</span>
                <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length<=3">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="wechatGroupNickName"
            label="群名片"
            min-width="60px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.wechatGroupNickName!=null" class="card-class">
              <div v-if="scope.row.wechatGroupNickName.length>3">{{scope.row.wechatGroupNickName.toString().substr(0,3)}}..</div>
              <div v-if="scope.row.wechatGroupNickName.length<=3">{{scope.row.wechatGroupNickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="points"
            label="积分"
            min-width="60px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.points!=null">
              <div v-if="scope.row.points.toString().length <= 5">{{scope.row.points}}</div>
              <div v-if="scope.row.points.toString().length >5">{{scope.row.points.toString().substr(0,3)}}...</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="newTalkTime"
            label="最后发言"
            min-width="100px"
            sortable>
            <template slot-scope="scope">
              <div v-if="scope.row.newTalkTime!=null">{{scope.row.newTalkTime | formatDate}}<i class="mint-cell-allow-right"></i></div>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from '../w-header'
  import { Toast } from 'mint-ui'
  import { formatDate } from '@/util/common.js'
  export default {
    name: 'member-leagure',
    components: {
      WHeader
    },
    data () {
      return {
        headerName: '微成员',
        memberList: [],
        member:[],
        searchCon:'',
        totalCount:0,
        userType:this.$store.state.userInfo.userType,
        isSignOut:this.$store.state.userInfo.isSignOut,
      }
    },
    created (){
      document.title = '微成员';
    },
    mounted () {
      this.getMemberList();
    },
    methods: {

      setList(isHave,isHaveLeader,num,myNum){
        var vm=this;
        if(isHave){
          vm.memberList.splice(myNum,1);
          if(isHaveLeader && myNum!=num){
            if(num!=0){
              vm.memberList.splice(num-1,1);
            }else{
              vm.memberList.splice(0,1);
            }
          }
        }else{
          if(isHaveLeader){
            vm.memberList.splice(num,1);
          }
        }
        vm.totalCount=vm.memberList.length;
        var num=0;
        if(vm.member.length==1){
          num=72;
        }
        if(vm.member.length==0){
          num=92;
        }
        if(vm.member.length<2){
          setTimeout(function () {
            var x=document.getElementsByClassName("el-table__body-wrapper is-scrolling-none");
            x[1].style.marginTop= num+"px";
          },100);
        }
      },
      getMemberList () {
        var vm = this
        this.$http.get('/xiaov/groupUser/wechatUserList.do',{params:{wechatGroupNickName:vm.searchCon}}).then(function (res) {
          if (res.data.success) {
            vm.totalCount=0;
            if(vm.member.length>0){
              vm.member.splice(0,vm.member.length);
            }
            if(vm.memberList.length>0){
              vm.memberList.splice(0,vm.memberList.length);
            }
            if(res.data.result==null){
              res.data.result={};
            }
            if(res.data.result.wechatUser!=null){
              res.data.result.wechatUser.myself='1';
              vm.member.push(res.data.result.wechatUser);
            }
            if(res.data.result.wechatUserLeader!=null){
              res.data.result.wechatUserLeader.myself='0';
              vm.member.push(res.data.result.wechatUserLeader);
            }
              if(res.data.result.wechatUsers==null ){
                res.data.result.wechatUsers=[];
              }else{
                vm.memberList = res.data.result.wechatUsers;
                var num=0;
                var myNum=0;
                vm.leaderNum=0;
                var isHave=false;
                var isHaveLeader=false;
                for(var i=0;i<vm.memberList.length;i++){
                  if(vm.memberList[i].userType==2){
                    num=i;
                    isHaveLeader=true;
                  }
                    if(res.data.result.wechatUser!=null){
                      if(vm.memberList[i].id.toString()==vm.member[0].id.toString()){
                        myNum=i;
                        isHave=true;
                      }
                    }
                }
                vm.setList(isHave,isHaveLeader,num,myNum);
              }
          } else {
            Toast(res.data.message)
          }
        }).catch(function (err) {
          Toast(err)
        })
      },
      goPage(row){
        if(this.isSignOut==1){
          return;
        }
        sessionStorage.setItem("searchId",row.id);
        sessionStorage.setItem("groupId",row.groupId);
        this.router.push({name: 'w-member-card', params:{}});
      },
      searchList(){
        var vm=this;
        if(this.isSignOut==1){
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }
        vm.getMemberList();
      },
      goMan(){
        if(this.isSignOut==1){
          Toast("您不是本群成员，不能使用此功能！");
          return;
        }
        this.router.push({name:'w-member-leaguer-detail',params:{}});
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "~common/sass/variable";

  .leaguer-detail-top{
    padding: 10px 10px;
    background-color: $white;
    font-size: 0px;
  }
  .leaguer-detail-top div{
    display: inline-block;
  }
  .leaguer-detail-top div:first-child{
    width: 54%;
  }
  .leaguer-detail-top div:first-child input{
    height: 22px;
  }
  .leaguer-detail-top div:last-child{
    width: 44%;
    float: right;
    text-align: right;
    margin-left: 1%;
  }

  button:first-child {
    width: 35%;
    min-width: auto;
  }

  button:last-child {
    width: 60%;
    min-width: auto;
    margin-left: 3%;
    font-size: $assist-size;
    background-color: $color-toptip-text;
    border: 1px solid $color-toptip-text;
  }

  .member-leaguer-bottom {
    background-color: $white;
  }

  .member-leaguer-m {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    vertical-align: middle;
    font-size: $assist-size;
  }

  .member-leaguer-text {
    text-align: left;
    font-size: 0px;
    margin-left: -7px;
  }

  .icon-user {
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    display: inline-block;
    float: left;
    color: $color-toptip-text;
    margin-right: 3px;
    font-size: $common-size;
    padding-bottom: 0px;
  }
   .user-default{
    color: $white;
     opacity: 0;
  }
   .man{
     color: #3d97ee;
  }

  .icon-man, .icon-woman {
    height: 20px;
    line-height: 20px;
    vertical-align: top;
    display: inline-block;
    font-size: $common-size;
    margin-top: -8px;
    /*margin-left: 5px;*/
  }

  .member-img-default {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    vertical-align: middle;

  }

  .member-leaguer-center {
    margin-top: 10px;
    font-size: 0px;
    background-color: $white;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .member-leaguer-center div {
    font-size: 14px;
    display: inline-block;
  }

  .member-leaguer-center div:first-child {
    height: 30px;
    line-height: 30px;
    min-width: 90px;
  }

  .table1-bottom {
    background-color: $grey-background;
    height: 30px;
    font-size: $assist-size;
    line-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .table1-bottom span:first-child {
    color: $shallow-black-color;
  }

  .table1-bottom span:last-child {
    float: right;
    color: $color-toptip-text;
  }

  .table1 {
    margin-top: 39px;
    position: absolute;
    z-index: 1;
    width: 100%
  }

  .mint-cell-allow-right {
    float: right;
  }
  .button-default label{
    font-size: $assist-size;
  }
  .button2{
    height: 26px;
    font-size: 0px;
    margin: 0px;
    padding: 0px;
    color: $white;
    border-radius: 4px;
    outline: none;
  }
  .input-default{
    background-color: $white;
    border: 1px solid $border-color;
  }
  .card-class{
    margin-left: -3px;
  }
</style>

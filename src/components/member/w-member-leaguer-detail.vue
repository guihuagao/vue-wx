<template>
  <div class="leaguer-detail">
    <!--<w-header :title="headerName"></w-header>-->
    <div class="leaguer-detail-top">
      <div><input class="input-default" placeholder="请输入关键词查询" v-model.trim="searchCon"/></div>
      <div><button class="button-default button1" @click="searchList()"><label>搜索</label></button>
        <button class="button-default back-button" @click="goBack()"><label>返回上层</label></button></div>
    </div>
    <div class="leaguer-detail-center">
      <mt-navbar v-model="selected">
        <!--<mt-tab-item id="1">快速踢人</mt-tab-item>-->
        <mt-tab-item id="2">潜水查询</mt-tab-item>
        <mt-tab-item id="3">设置管理员</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <!--<mt-tab-container-item id="1">-->
          <!--<div class="leaguler-detail-table1" >-->
            <!--<el-table-->
              <!--:data="member"-->
              <!--style="width:100%"-->
              <!--:show-header="false"-->
              <!--@row-click="goPage"-->
              <!--:default-sort = "{prop: 'newTalkTime', order: 'descending'}"-->
            <!--&gt;-->
              <!--<el-table-column-->
                <!--width="30">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="wechatNickName"-->
                <!--label="群成员"-->
                <!--min-width="90px"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--<div class="member-leaguer-text">-->
                    <!--<span class="icon-user user-default" v-if="scope.row.myself==1"></span>-->
                    <!--<span class="icon-user" v-if="scope.row.myself==0 && scope.row.userType==2"></span>-->
                    <!--<img :src="scope.row.headImgUrl" class="member-img-default"/>-->
                    <!--<span class="member-leaguer-m" v-if="scope.row.wechatNickName.length>2">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,2)}}..</span>-->
                    <!--<span class="member-leaguer-m" v-if="scope.row.wechatNickName.length<=2">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>-->
                  <!--</div>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="wechatGroupNickName"-->
                <!--label="群名片"-->
                <!--min-width="70px"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--<div v-if="scope.row.wechatGroupNickName.toString().length<=5">{{scope.row.wechatGroupNickName}}</div>-->
                  <!--<div v-if="scope.row.wechatGroupNickName.toString().length>5">{{scope.row.wechatGroupNickName.toString().substr(0,5)}}..</div>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="newTalkTime"-->
                <!--label="最后发言"-->
                <!--min-width="100px"-->
                <!--sortable>-->
                <!--<template slot-scope="scope">-->
                  <!--<div>{{scope.row.newTalkTime | formatDate}}<i class="mint-cell-allow-right"></i></div>-->
                <!--</template>-->
              <!--</el-table-column>-->

            <!--</el-table>-->
            <!--<div class="table1-bottom">-->
              <!--<span>群组人员（{{totalNum}}人）</span><span>*每个群可设置10个管理员</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="leaguler-detail-table2">-->
            <!--<el-table-->
              <!--ref="multipleTable1"-->
              <!--:data="memberList"-->
              <!--style="width:100%"-->
              <!--:default-sort = "{prop: 'newTalkTime', order: 'descending'}"-->
              <!--@selection-change="handleSelectionChange"-->
              <!--@cell-click="selectOut"-->
              <!--@select-all="selectAllOut">-->
              <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="30"-->
                <!--prop="id"-->
              <!--&gt;-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="wechatNickName"-->
                <!--label="群成员"-->
                <!--min-width="90px"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--<div class="member-leaguer-text">-->
                    <!--<span class="icon-user user-default" v-if="scope.row.userType==0"></span>-->
                    <!--<span class="icon-user man" v-if="scope.row.userType==1"></span>-->
                    <!--<img :src="scope.row.headImgUrl" class="member-img-default"/>-->
                    <!--<span class="member-leaguer-m" v-if="scope.row.wechatNickName.length>2">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,2)}}..</span>-->
                    <!--<span class="member-leaguer-m" v-if="scope.row.wechatNickName.length<=2">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>-->
                  <!--</div>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="wechatGroupNickName"-->
                <!--label="群名片"-->
                <!--min-width="70px"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--<div v-if="scope.row.wechatGroupNickName.toString().length<=5">{{scope.row.wechatGroupNickName}}</div>-->
                  <!--<div v-if="scope.row.wechatGroupNickName.toString().length>5">{{scope.row.wechatGroupNickName.toString().substr(0,5)}}..</div>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="newTalkTime"-->
                <!--label="最后发言"-->
                <!--min-width="100px"-->
                <!--sortable>-->
                <!--<template slot-scope="scope">-->
                  <!--<div>{{scope.row.newTalkTime | formatDate}}<i class="mint-cell-allow-right"></i></div>-->
                <!--</template>-->
              <!--</el-table-column>-->

            <!--</el-table>-->
          <!--</div>-->
          <!--<div class="leaguer-detail-bottom">-->
            <!--<div class="detail-table1-bottom">-->
              <!--<button class="button-default" @click="signOut()"><label>批量踢人</label></button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</mt-tab-container-item>-->
        <mt-tab-container-item id="2">
          <div class="leaguer-detail-search-top" v-if="userType!=0">
            设置连续潜水天数：<input class="day-input" v-model.trim="stayDate"/> <button class="button-default button2" @click="searchList()">确定</button>
          </div>
          <div class="leaguler-detail-table1" >
            <el-table
              :data="member"
              style="width:100%"
              :show-header="false"
              @row-click="goPage"
              :default-sort = "{prop: 'newTalkTime', order: 'descending'}"
            >
              <el-table-column
                prop="wechatNickName"
                label="群成员"
                min-width="90px"
              >
                <template slot-scope="scope">
                  <div class="member-leaguer-text text1">
                    <span class="icon-user user-default" v-if="scope.row.myself!=null && scope.row.myself==1"></span>
                    <span class="icon-user" v-if="scope.row.myself!=null && scope.row.myself==0 && scope.row.userType==2"></span>
                    <img :src="scope.row.headImgUrl" class="member-img-default"/>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length>2">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,2)}}..</span>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length<=2">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wechatGroupNickName"
                label="群名片"
                min-width="70px"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.wechatGroupNickName!=null" class="m-class">
                  <div v-if="scope.row.wechatGroupNickName.toString().length<=5">{{scope.row.wechatGroupNickName}}</div>
                  <div v-if="scope.row.wechatGroupNickName.toString().length>5">{{scope.row.wechatGroupNickName.toString().substr(0,5)}}..</div>
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
          <div class="leaguler-detail-search-table2 inner-table">
            <el-table
              ref="multipleTable2"
              :data="memberList"
              style="width:100%"
              :default-sort = "{prop: 'newTalkTime', order: 'descending'}"
              @selection-change="handleSelectionChange"
              @cell-click="selectOut"
              @select-all="selectAllOut">
              <el-table-column
                prop="wechatNickName"
                label="群成员"
                min-width="90px"
              >
                <template slot-scope="scope">
                  <div class="member-leaguer-text text1">
                    <span class="icon-user user-default" v-if="scope.row.userType!=null && scope.row.userType==0"></span>
                    <span class="icon-user man" v-if="scope.row.userType!=null && scope.row.userType==1"></span>
                    <img :src="scope.row.headImgUrl" class="member-img-default"/>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length>2">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,2)}}..</span>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length<=2">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wechatGroupNickName"
                label="群名片"
                min-width="70px"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.wechatGroupNickName!=null" class="m-class">
                  <div v-if="scope.row.wechatGroupNickName.toString().length<=5">{{scope.row.wechatGroupNickName}}</div>
                  <div v-if="scope.row.wechatGroupNickName.toString().length>5">{{scope.row.wechatGroupNickName.toString().substr(0,5)}}..</div>
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
          <!--<div class="detail-search-bottom">-->
            <!--<div class="detail-search-bottom-end">-->
              <!--<span class="warn-all">-->
                <!--<span class="warn-all-button" @click="selectAllSearch()" v-if="isSearch"></span>-->
                <!--<span class="warn-all-button1" @click="clearSelectedAll()" v-if="!isSearch"></span>-->
                <!--@潜水成员</span><button class="button-default" @click="signOut()"><label >批量踢人</label></button>-->
            <!--</div>-->
          <!--</div>-->
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="leaguler-detail-table1 table1" >
            <el-table
              :data="member"
              style="width:100%"
              :show-header="false"
              @row-click="goPage"
              :default-sort = "{prop: 'newTalkTime', order: 'descending'}"
            >
              <el-table-column
                width="30">
              </el-table-column>
              <el-table-column
                prop="wechatNickName"
                label="群成员"
                min-width="90px"
              >
                <template slot-scope="scope">
                  <div class="member-leaguer-text">
                    <span class="icon-user user-default" v-if="scope.row.myself!=null && scope.row.myself==1"></span>
                    <span class="icon-user" v-if="scope.row.myself!=null && scope.row.myself==0 && scope.row.userType==2"></span>
                    <img :src="scope.row.headImgUrl" class="member-img-default"/>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length>2">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,2)}}..</span>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length<=2">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wechatGroupNickName"
                label="群名片"
                min-width="70px"
              >
                <template slot-scope="scope">
                  <div class="m-class" v-if="scope.row.wechatGroupNickName!=null && scope.row.wechatGroupNickName.toString().length<=5">{{scope.row.wechatGroupNickName}}</div>
                  <div class="m-class" v-if="scope.row.wechatGroupNickName!=null && scope.row.wechatGroupNickName.toString().length>5">{{scope.row.wechatGroupNickName.toString().substr(0,5)}}..</div>
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
            <div class="table1-bottom">
              <span>群组人员（{{totalNum}}人）</span><span>*每个群可设置10个管理员</span>

            </div>
          </div>
          <div class="leaguler-detail-table2 inner-table">
            <el-table
              ref="multipleTable3"
              :data="memberList"
              style="width:100%"
              :default-sort = "{prop: 'newTalkTime', order: 'descending'}"
              @select-all="selectAllOut"
              @cell-click="selectOut"
              @select="deleteUser"
              @selection-change="handleSelectionChange"
              >
              <el-table-column
                type="selection"
                width="30"
                prop="id"
                :selectable="selectOrNot"
              >
              </el-table-column>
              <el-table-column
                prop="wechatNickName"
                label="群成员"
                min-width="90px"
              >
                <template slot-scope="scope">
                  <div class="member-leaguer-text">
                    <span class="icon-user user-default" v-if="scope.row.userType!=null && scope.row.userType==0"></span>
                    <span class="icon-user man" v-if="scope.row.userType!=null && scope.row.userType==1"></span>
                    <img :src="scope.row.headImgUrl" class="member-img-default"/>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length>2">&nbsp;&nbsp;{{scope.row.wechatNickName.toString().substr(0,2)}}..</span>
                    <span class="member-leaguer-m" v-if="scope.row.wechatNickName!=null && scope.row.wechatNickName.length<=2">&nbsp;&nbsp;{{scope.row.wechatNickName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wechatGroupNickName"
                label="群名片"
                min-width="70px"
              >
                <template slot-scope="scope">

                  <div v-if="scope.row.wechatGroupNickName!=null" class="m-class">
                  <div v-if="scope.row.wechatGroupNickName.toString().length<=5">{{scope.row.wechatGroupNickName}}</div>
                  <div v-if="scope.row.wechatGroupNickName.toString().length>5">{{scope.row.wechatGroupNickName.toString().substr(0,5)}}..</div>
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
          <div class="leaguer-detail-bottom">
            <div class="detail-table1-bottom">
              <button class="button-default" @click="addManage()"><label>设置管理员</label></button>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

    </div>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="dialog-default">
        <div class="dialog-top">
          取消管理员<span class="icon-close" @click="closeDialog()"></span>
        </div>
        <div class="dialog-default-content leaguer-detail-dialog">
            是否确定取消管理员：{{selectRow.wechatNickName}}
        </div>
        <div class="dialog-default-bottom">
          <div @click="closeDialog()">取消</div>
          <div @click="confirmDialog()">确定</div>
        </div>
      </div>
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
  import WHeader from '../w-header';
  import { Toast } from 'mint-ui'
  import { formatDate } from '@/util/common.js'
  export default {
    name: 'member-leagure-detail',
    components: {
      WHeader
    },

    data() {
      return {
        headerName: "微成员",
        selected:'2',
        multipleSelection: [],
        member:[],
        memberList:[],
        searchCon:'',
        totalNum:0,
        leaderUser:[],
        signOutId:'',
        stayDate:'',
        isSearch:true,
        countNum:0,
        memberId:[],
        isDelete:false,
        num:0,
        userType:this.$store.state.userInfo.userType,
        show:false,
        selectRow:{},
      }
    },
    created (){
      document.title = '微成员';
    },
    mounted () {
      var vm=this;
      var selected=this.$route.params.select;
      if(selected!=null && selected!=""){
        vm.selected=selected.toString();
      }
      this.getMemberList();
    },
    methods:{
      closeDialog(){
        this.show=false;
        this.$refs["multipleTable"+this.selected].toggleRowSelection(this.selectRow,true);
      },
      confirmDialog(){
        this.deleteManage(this.selectRow.id);
      },
      //返回上一级
      goBack(){
        this.router.push({name:'w-member-leaguer',params:{}});
      },
      deleteUser(select,row){
        this.selectRow=row;
        if(row.userType.toString()=='1'){
          this.show=true;
        }
      },
      //勾选改变
      handleSelectionChange(val) {
        var vm=this;
        //传值id
        vm.signOutId="";
        var list=[];
        for(var i=0;i<val.length;i++){
          list.push(val[i].id)
        }
        if(list.length==10){
          for(var i=0;i<vm.memberList.length;i++){
            var isB=false;
            for(var j=0;j<list.length;j++){
              if(vm.memberList[i].id==list[j]){
                isB=true;
                break;
              }
            }
            if(!isB){
              vm.memberList[i].isChange=1;
            }
          }
        }else{
          for(var i=0;i<vm.memberList.length;i++){
            vm.memberList[i].isChange=0;
          }
        }
        vm.signOutId=list.join(",");
        //判断管理员是否剔除
//        if(vm.selected.toString()=='3' && vm.num==1){
//        if(vm.memberId!=null && vm.memberId.length>0 && vm.isDelete){
//          for(var i=0;i<vm.memberId.length;i++){
//            var isTrue=true;
//            for(var j=0;j<list.length;j++){
//              if(vm.memberId[i]==list[j]){
//                isTrue=false;
//              }
//            }
//            //如果勾选取消管理员则进行删除
//            if(isTrue){
//                vm.deleteManage(vm.memberId[i]);
//                break;
//            }
//          }
//        }
//        }
//        if(val.length==vm.memberId.length){
//          vm.num=1;  //判断是否是全选
//        }
      },
      //取消管理员
      deleteManage(id){
        var vm=this;
          this.$http.get("/xiaov/groupUser/delAdmin.do",{params:{id:id}}).then(function (res) {
            if(res.data.success){
              vm.show=false;
              Toast("取消管理员成功!");
              vm.getMemberList();
            }else{
              Toast(res.data.message);
            }
          }).catch(function (err) {
            Toast(err);
          })

      },
      //选择全部
      selectAllOut(selection){
        var vm=this;
        vm.signOutId="";
        vm.num=0;
        var list=[];
        for(var i=0;i<selection.length;i++){
          list.push(selection[i].id);
        }
        vm.signOutId=list.join(',');
        //一个群里只能设置10个管理员
        if((list.length>(10-vm.countNum) && vm.selected=='3') || vm.countNum==10){
          vm.signOutId="";
          Toast("每个群只可设置10个管理员！");
        }
        //如果是管理员则勾选不取消
        if(vm.selected.toString()=='3'){
          for(var i=0;i<vm.memberList.length;i++){
            if(vm.memberList[i].userType.toString()=='1'){
              this.$refs["multipleTable"+vm.selected].toggleRowSelection(vm.memberList[i],true);
            }
          }
        }
        vm.isSearch=!vm.isSearch; //判断是否@潜水成员
      },
      //进行页面跳转
      selectOut(row,column){
        var vm=this;
        vm.num=1;
        //如果是第一列则不进行跳转
        if(column.property.toString()=='id'){
          if(vm.selected!='3'){
            this.$refs["multipleTable"+vm.selected].toggleRowSelection(row);
          }
        }else{
          this.router.push({name: 'w-member-card', params:{}});
        }
      },
      //组装list
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
        vm.totalNum=vm.memberList.length;
        vm.isDelete=false;
        //页面加载完成管理员默认选中
        setTimeout(function () {
          if(vm.selected.toString()=='3'){
            for(var i=0;i<vm.memberList.length;i++){
              if(vm.memberList[i].userType.toString()=='1'){
                vm.$refs["multipleTable"+vm.selected].toggleRowSelection(vm.memberList[i],true);
              }
            }
          }
          vm.isDelete=true;
        },500);
        var num=0;
        if(vm.member.length==1 && vm.selected.toString()=="2"){
          num=44;
        }
        if(vm.member.length==0 && vm.selected.toString()=="2"){
          num=62;
        }
        if(vm.member.length==1 && vm.selected.toString()=="3"){
          num=74;
        }
        if(vm.member.length==0 && vm.selected.toString()=="3"){
          num=91;
        }
        if(vm.member.length<2){
          setTimeout(function () {
            var x=document.getElementsByClassName("el-table__body-wrapper is-scrolling-none");
            if(vm.selected.toString()=="2"){
              x[1].style.marginTop= num+"px";
            }else if(vm.selected.toString()=="3"){
              if(vm.member.length==0){
                x[2].style.marginTop=num+"px";
              }
              if(vm.member.length==1){
                x[1].style.marginTop=num+"px";
              }
            }
          },100);
        }
      },
      //获取memberlist
      getMemberList () {
        var vm = this
        if(vm.stayDate!=""){
          var reg = /^[0-9]+.?[0-9]*$/;
          if (!reg.test(vm.stayDate.toString())) {
           Toast("请输入数字格式的天数！");
           return;
          }else{
            if(vm.stayDate.length>4){
              Toast("您输入的天数太大了，请您输入万位数以内的！");
            }
          }
        }
        if(vm.selected!='2'){
          vm.stayDate="";
        }
        this.$http.get('/xiaov/groupUser/wechatUserList.do',{params:{wechatGroupNickName:vm.searchCon,noTalkDay:vm.stayDate}}).then(function (res) {
          if (res.data.success) {
            if(vm.member.length>0){
              vm.member.splice(0,vm.member.length);
            }
            if(vm.memberList.length>0){
              vm.memberList.splice(0,vm.memberList.length);
            }
            if(vm.memberId.length>0){
              vm.memberId.splice(0,vm.memberId.length);
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
              if(res.data.result.wechatUsers==null){
                res.data.result.wechatUsers=[];
              }else{
                vm.memberList = res.data.result.wechatUsers;
                var num=0;
                var myNum=0;
                var isHave=false;
                var isHaveLeader=false;
                vm.countNum=0;
                //将群主和自己从list中移除
                for(var i=0;i<vm.memberList.length;i++){
                  if(vm.memberList[i].userType==1){
                    vm.countNum++;
                  }
                  if(vm.memberList[i].userType.toString()=='1'){
                    vm.memberId.push(vm.memberList[i].id);
                  }
                  vm.memberList[i].isChange=0;
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
                //10个管理员则设置其他不能选择
                if(vm.countNum==10){
                  for(var i=0;i<vm.memberList.length;i++){
                    vm.memberList[i].isChange=1;
                  }
                }
                vm.setList(isHave,isHaveLeader,num,myNum)
              }
          } else {
            Toast(res.data.message)
          }
        }).catch(function (err) {
          Toast(err)
        })
      },
      //查询
      searchList(){
        var vm=this;
        vm.getMemberList();
      },
      //剔除
      signOut(){
        var vm=this;
        if(vm.signOutId==''){
          Toast("请选择要剔除的成员！");
          return;
        }
//        var params = new URLSearchParams();
//        params.append('id', vm.signOutId);
        this.$http.get('/xiaov/groupUser/signOutUser.do',{params:{id:vm.signOutId}}).then(function (res) {
          if(res.data.success){
              vm.getMemberList()
          }else{
            Toast(res.data.result);
          }
        }).catch(function (err) {
          Toast(err);
        })
      },
      selectAllSearch(){
        var vm=this;
        vm.isSearch=false;
        this.$refs["multipleTable"+vm.selected].data.forEach(row => {
          this.$refs["multipleTable"+vm.selected].toggleRowSelection(row);
        });
      },
      //跳转页面
      goPage(row){
        sessionStorage.setItem("searchId",row.id);
        sessionStorage.setItem("groupId",row.groupId);
        this.router.push({name: 'w-member-card', params:{id: row.id}});
      },
      //清空选项
      clearSelectedAll(){
        var vm=this;
        vm.isSearch=true;
        if(vm.selected.toString()=='3'){
          for(var i=0;i<vm.memberList.length;i++){
            if(vm.memberList[i].userType=='1'){
              vm.$refs["multipleTable"+vm.selected].toggleRowSelection(vm.memberList[i],true);
            }else{
              vm.$refs["multipleTable"+vm.selected].toggleRowSelection(vm.memberList[i],false);
            }
          }
        }else{
          this.$refs["multipleTable"+vm.selected].clearSelection();
        }
      },
      //判断是否可选
      selectOrNot(row,index){
        var vm=this;
        if(vm.countNum>10){
          return false;
        }
        if(vm.selected=='3'){
          if(row.isChange==1){
//            Toast("这是最后一个管理员名额了！!");
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      },
      //添加管理员
      addManage(){
        var vm=this;
        if(vm.signOutId==""){
          Toast("请选择您需要设置的管理员！");
          return;
        }
        if(vm.signOutId.split(",").length>10){
          Toast("每个群只可设置10个管理员！");
          return;
        }
        var list=vm.signOutId.split(",");
        for(var i=0;i<vm.memberList.length;i++){
          var isHave=false;
          var num=0;
          for(var j=0;j<list.length;j++){
            if(vm.memberList[i].userType.toString()=='1' && vm.memberList[i].id.toString()==list[j]){
              num=j;
              isHave=true;
            }
          }
          if(isHave){
            list.splice(num,1);
          }
        }
        vm.signOutId=list.join(",");
        var params = new URLSearchParams();
        params.append('id', vm.signOutId);
        this.$http.get('/xiaov/groupUser/setAdmin.do',{params:{id:vm.signOutId}}).then(function (res) {
          if(res.data.success){
            Toast("设置管理员成功!");
            vm.$store.dispatch("getUserInfo");
            vm.getMemberList()
          }else{
            Toast(res.data.result);
            vm.clearSelectedAll();
          }
        }).catch(function (err) {
          Toast(err);
        })
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    watch:{
      selected:{
        handler:function(val,oldval){
          var vm=this;
          this.$refs["multipleTable"+val].clearSelection();
          vm.getMemberList();
          vm.isSearch=true;
        },
      },
    }
    }
</script>

<style scoped lang="scss">
  @import "~common/sass/variable";
  .leaguer-detail{
    margin-bottom: 100px;
  }
  .day-input{
    -webkit-appearance:none;
    display: inline-block;
    width: 70px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid $border-color;
    outline: none;
    font-size: $common-size;
    color: $black-color;
    text-indent: 10px;
  }
  .leaguer-detail-search-top{
    background-color: $white;
    padding: 10px 20px;
  }
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
  button:first-child{
    width: 35%;
    min-width: auto;
  }
  .back-button{
    width: 60%;
    min-width: auto;
    margin-left: 3%;
    background-color: $footer-icon;
    border: 1px solid $footer-icon;
    font-size: $assist-size;
  }
  .button-default label{
    font-size: $assist-size;
  }
  .member-leaguer-m{
    height: 20px;
    line-height: 20px;
    display: inline-block;
    vertical-align: middle;
    font-size: $assist-size;
  }
  .member-leaguer-text{
    text-align: left;
    font-size: 0px;
    margin-left: -7px;
  }
  .icon-user{
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
  .man{
    color: #3d97ee;
  }
  .user-default{
    /*display: none;*/
    color: $white;
    opacity: 0;
  }
  .icon-man, .icon-woman {
    height: 20px;
    line-height: 30px;
    vertical-align: top;
    display: inline-block;
    font-size: $common-size;
    margin-top: -8px;
    /*margin-left: 5px;*/
  }
  .member-img-default{
    width: 20px;
    height: 20px;
    border-radius: 7px;
    vertical-align: middle;
  }
  .table1-bottom{
    background-color: $grey-background;
    height: 30px;
    font-size: $assist-size;
    line-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .table1-bottom span:first-child{
    color: $shallow-black-color;
  }
  .table1-bottom span:last-child{
    float: right;
    color: $color-toptip-text;
  }
  table:last-child{
    border: 1px solid red;
  }
  .leaguler-detail-table1{
    margin-top: 40px;
    position: absolute;
    z-index: 1;
    width: 100%
  }
  .table1{
    margin-top: 40px;
  }
  .detail-table1-bottom{
    padding: 10px 20px;
    background-color: $border-color;
    text-align: right;
    vertical-align: bottom;
  }
  .leaguer-detail-bottom{
    background-color: $white;
    position: fixed;
    width: 100%;
    bottom: 47px;
    z-index: 2000;
  }
  .detail-table1-bottom button{
    width: 90px;
  }
  .detail-search-bottom{
    position: fixed;
    width: 100%;
    bottom: 52px;
    background-color: $white;
  }
  .detail-search-bottom-end{
    text-align: right;
    background-color: $border-color;
    padding: 10px 20px;
  }
  .detail-search-bottom-end button{
    width: 80px;
    margin-left: 10px;
  }
  .detail-search-bottom-end button:last-child{
    width: 90px;
  }
  .warn-all{
    float: left;
    height: 26px;
    line-height: 26px;
    display: inline-block;
  }
  .warn-all-button{
    height: 14px;
    width: 14px;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid #999999;
    vertical-align: middle;
    margin-right: 5px;
  }
  .warn-all-button1{
    height: 14px;
    width: 14px;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid $color-text;
    background-color: $color-text;
    vertical-align: middle;
    margin-right: 5px;
  }
  .input-default{
    background-color: $white;
    border: 1px solid $border-color;
  }
  .button2{
    height: 24px;
    line-height: 22px;
    vertical-align: top;
    margin: 0;
    color: $white;
  }
  .text1{
    /*padding-left: 10px;*/
  }
  .m-class{
    margin-left: -10px;
  }
  .leaguer-detail-dialog{
    /*height: 50px;*/
    margin-top: 1px;
  }
  .icon-close{
    opacity: 0.9;
  }
</style>

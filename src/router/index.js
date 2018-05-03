import Vue from 'vue'
import Router from 'vue-router'

/*首页*/
import WHome from 'components/home/w-home'
/*首页主页*/
import WHomeHome from 'components/home/w-home-home'
/*发布个人动态*/
import WHomePublishDynamics from 'components/home/w-home-publish-dynamics'
/*修改公告*/
import WHomeUpdateNotice from 'components/home/w-home-update-notice'
/*发布公告*/
import WHomeAddNotice from 'components/home/w-home-add-notice'
/*群友圈*/
import WHomeGroupYou from 'components/home/w-home-groupYou'
/*个人关系网*/
import WHomePersonNet from 'components/home/w-home-personnet'
/*群公告*/
import WHomeGroupNotice from 'components/home/w-home-groupnotice'


/*******************************************************************************/

/*微中心*/
import WSetting from 'components/setting/w-setting'
/*微中心主页*/
import WSettingHome from 'components/setting/w-setting-home'
/*管家设置*/
import WSettingManager from 'components/setting/w-setting-manager'
/*群签到列表*/
import WSettingSign from 'components/setting/w-setting-sign'
/*群签到设置*/
import WSettingSignIn from 'components/setting/w-setting-signin'
/*签到记录*/
import WSettingSignRecord from 'components/setting/w-setting-signrecord'
/*群消息管理*/
import WSettingNews from 'components/setting/w-setting-news'
/*关键词管理*/
import WSettingKeyWord from 'components/setting/w-setting-keywords'
/*入群欢迎语*/
import WSettingAdwords from 'components/setting/w-setting-adwords'
/*群积分*/
import WSettingScore from 'components/setting/w-setting-score'
/*群积分详情页面*/
import WSettingScoreDetail from 'components/setting/w-setting-score-detail'
/*本群热词榜*/
import WSettingGroupHit from 'components/setting/w-setting-grouphit'
/*增值服务*/
import WSettingIncrementservice from 'components/setting/w-setting-incrementservice'
/*群数据*/
import WSettingGroupData from 'components/setting/w-setting-groupdata'
/*本群排行*/
import WSettingGroupRank from 'components/setting/w-setting-grouprank'
/*本群排行详情*/
import WSettingGroupRankDetail from 'components/setting/w-setting-grouprank-detail'
/*群日志*/
import WSettingGroupLog from 'components/setting/w-setting-grouplog'
/*群空间访问数据*/
import WSettingGroupAccess from 'components/setting/w-setting-groupaccess'
/*群积分规则*/
import WSettingScoreRule from 'components/setting/w-setting-scorerule'

/********************************************************************************/


/*微成员*/
import WMember from 'components/member/w-member'
/*微成员页面*/
import WMemberLeaguer from 'components/member/w-member-leaguer'
/*微成员详情*/
import WMemberLeaguerDetail from 'components/member/w-member-leaguer-detail'
/*最近发言信息*/
import WMemberSpeak from 'components/member/w-member-speak'
/*个人名片*/
import WMemberCard from 'components/member/w-member-card'
/*个人动态*/
import WMemberDynamics from 'components/member/w-member-dynamics'
/*个人动态详情*/
import WMemberDynamicDetail from 'components/member/w-member-dynamic-detail'

/********************************************************************************/
/*个人*/
import WUser from 'components/user/w-user'
/*我*/
import WUserMe from 'components/user/w-user-me'
/*我的订单*/
import WUserMeOrder from 'components/user/w-user-me-order'
/*联系客服*/
import WUserContactCuService from 'components/user/w-user-contactcuservice'
/*功能说明*/
import WUserFuEscription from 'components/user/w-user-fuescription'
/*激活群组*/
import WUserActivationGroup from 'components/user/w-user-activationgroup'
/*我的群*/
import WUserMyGroup from 'components/user/w-user-mygroup'
/*购买套餐*/
import WUserGoBuy from 'components/user/w-user-gobuy'
/*购买套餐后台跳转*/
import WUserGoBuyNew from 'components/user/w-user-gobuy-new'
/*手机绑定*/
import WUserBindPhone from 'components/user/w-user-bindphone'
/*激活链接失效*/
import WUserActivationGroupError from 'components/user/w-user-activationgrouperror'
/*没有发现有效的服务订单*/
import WUserActivationGroupErrorNoOrder from 'components/user/w-user-activationgrouperrornoorder'
/*订单后台跳转*/
import WUserMeOrderNew from 'components/user/w-user-me-order-new'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/w-home',
      name: 'w-home',
      component: WHome,
      children:[
        {
          path: 'w-home-home',
          name: 'w-home-home',
          component: WHomeHome,
          meta:{
            keepAlive:false,
          }
        },

        {
          path: 'w-home-publish-dynamics',
          name: 'w-home-publish-dynamics',
          component: WHomePublishDynamics,
          meta:{
            keepAlive:false,
          }
        },{
          path: 'w-home-update-notice',
          name: 'w-home-update-notice',
          component: WHomeUpdateNotice,
          meta:{
            keepAlive:false,
          }
        },{
          path: 'w-home-add-notice',
          name: 'w-home-add-notice',
          component: WHomeAddNotice,
          meta:{
            keepAlive:false,
          }
        },{
          path: 'w-home-groupYou',
          name: 'w-home-groupYou',
          component: WHomeGroupYou,
          meta:{
            keepAlive:false,
          }
        },{
          path: 'w-home-personnet',
          name: 'w-home-personnet',
          component: WHomePersonNet,
          meta:{
            keepAlive:false,
          }
        },{
          path: 'w-home-groupnotice',
          name: 'w-home-groupnotice',
          component: WHomeGroupNotice,
          meta:{
            keepAlive:false,
          }
        }

      ]
    },

/********************************************/
    {
      path: '/w-setting',
      name: 'w-setting',
      component: WSetting,
      children:[
        {
          path: 'w-setting-home',
          name: 'w-setting-home',
          component: WSettingHome,
          meta:{
            keepAlive:false,
          }
        },
        {
          path:'w-setting-manager',
          name:'w-setting-manager',
          component:WSettingManager,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-sign',
          name:'w-setting-sign',
          component:WSettingSign,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-signin',
          name:'w-setting-signin',
          component:WSettingSignIn,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-signrecord',
          name:'w-setting-signrecord',
          component:WSettingSignRecord,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-news',
          name:'w-setting-news',
          component:WSettingNews,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-keywords',
          name:'w-setting-keywords',
          component:WSettingKeyWord,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-adwords',
          name:'w-setting-adwords',
          component:WSettingAdwords,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-score',
          name:'w-setting-score',
          component:WSettingScore,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-score-detail',
          name:'w-setting-score-detail',
          component:WSettingScoreDetail,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-grouphit',
          name:'w-setting-grouphit',
          component:WSettingGroupHit,
          meta:{
            keepAlive:false,
          }

        },{
          path:'w-setting-incrementservice',
          name:'w-setting-incrementservice',
          component:WSettingIncrementservice,
          meta:{
            keepAlive:false,
          }

        },{
          path:'w-setting-groupdata',
          name:'w-setting-groupdata',
          component:WSettingGroupData,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-grouprank',
          name:'w-setting-grouprank',
          component:WSettingGroupRank,
          meta:{
            keepAlive:false,
          }

        },{
          path:'w-setting-grouprank-detail',
          name:'w-setting-grouprank-detail',
          component:WSettingGroupRankDetail,
          meta:{
            keepAlive:false,
          }

        },

        {
          path:'w-setting-grouplog',
          name:'w-setting-grouplog',
          component:WSettingGroupLog,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-groupaccess',
          name:'w-setting-groupaccess',
          component:WSettingGroupAccess,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-setting-scorerule',
          name:'w-setting-scorerule',
          component:WSettingScoreRule,
          meta:{
            keepAlive:false,
          }}
      ]
    },

/************************************************/
    {
      path: '/w-member',
      name: 'w-member',
      component: WMember,
      children:[
        {
          path: 'w-member-leaguer',
          name: 'w-member-leaguer',
          component: WMemberLeaguer,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-member-card',
          name: 'w-member-card',
          component: WMemberCard,
          meta:{
            keepAlive:false,
          }
        }, {
          path: 'w-member-leaguer-detail',
          name: 'w-member-leaguer-detail',
          component: WMemberLeaguerDetail,
          meta:{
            keepAlive:false,
          }
        },{
          path:'w-member-speak',
          name:'w-member-speak',
          component:WMemberSpeak,
          meta:{
            keepAlive:false,
          }
        },{
          path: 'w-member-dynamics',
          name: 'w-member-dynamics',
          component: WMemberDynamics,
          meta:{
            keepAlive:false,
          }
        },{
          path: 'w-member-dynamic-detail',
          name: 'w-member-dynamic-detail',
          component:WMemberDynamicDetail,
          meta:{
            keepAlive:false,
          }
        }
        ]
    },
    /**************************************************/
    {
      path: '/w-user',
      name: 'w-user',
      component: WUser,
      children:[
        {
          path: 'w-user-me',
          name: 'w-user-me',
          component: WUserMe,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-me-order',
          name: 'w-user-me-order',
          component: WUserMeOrder,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-contactcuservice',
          name: 'w-user-contactcuservice',
          component: WUserContactCuService,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-fuescription',
          name: 'w-user-fuescription',
          component: WUserFuEscription,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-activationgroup',
          name: 'w-user-activationgroup',
          component: WUserActivationGroup,
          meta:{
            keepAlive:false,
          },
        },
        {
          path: 'w-user-mygroup',
          name: 'w-user-mygroup',
          component: WUserMyGroup,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-gobuy',
          name: 'w-user-gobuy',
          component: WUserGoBuy,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-gobuy-new',
          name: 'w-user-gobuy-new',
          component: WUserGoBuyNew,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-bindphone',
          name: 'w-user-bindphone',
          component: WUserBindPhone,
          meta:{
            keepAlive:false,
          }
        },
        {
          path: 'w-user-activationgrouperror',
          name: 'w-user-activationgrouperror',
          component:  WUserActivationGroupError,
          meta:{
            keepAlive:false,
          }

        },
        {
          path: 'w-user-activationgrouperrornoorder',
          name: 'w-user-activationgrouperrornoorder',
          component:  WUserActivationGroupErrorNoOrder,
          meta:{
            keepAlive:false,
          }

        },
        {
          path: 'w-user-me-order-new',
          name: 'w-user-me-order-new',
          component: WUserMeOrderNew,
          meta:{
            keepAlive:false,
          }
        }

      ]
    },

    {
      path: '/',
      redirect: '/w-home/w-home-home'
    }


/**************************************************/

  ]
})

import store from '../store/index.js'
import { Toast } from 'mint-ui';

/*判断路由参数，进行不同页面的跳转*/
router.beforeEach((to, from, next) => {

  /*session存储登录信息*/
  var sessionGetUserInfo = JSON.parse(sessionStorage.getItem('getUserInfoSession'));

  if(sessionGetUserInfo!=null){
    store.commit('setUserInfo',sessionGetUserInfo);
  }

  /*session存储opid*/
  var getUserOpid = sessionStorage.getItem('getUserOpid');
  if(getUserOpid!=null){
    store.commit('setOpid',getUserOpid);
  }


  if(to.path=="/w-user/w-user-gobuy-new"||to.path=="/w-user/w-user-me-order-new"){
    sessionStorage.setItem("isShow",'0');
  }else{
    sessionStorage.setItem("isShow",'1');
  }
  if(to.query.flag=='distributeRoute'){
    /*查询用户信息*/
 /*   var param={
      opId:to.query.opId,
      gId:to.query.gId
    }*/
    store.commit('setOpid',to.query.opId);
    sessionStorage.setItem("getUserOpid",to.query.opId);

    store.dispatch("getUserInfo");


      /*首页*/
      if(to.query.urlType=='home'){
        setTimeout(function (){
        next({
          path: '/w-home/w-home-home'
        })
        }, 200);
      }
      /*公告列表*/
      if(to.query.urlType=='gonggao'){
        setTimeout(function (){

        next({
          path: '/w-home/w-home-groupnotice'
        })
        }, 200);
      }
      /*群规列表*/
      if(to.query.urlType=='qungui'){
        setTimeout(function (){

        next({
          path: '/w-home/w-home-groupnotice'
        })
      }, 200);
      }

      /*关键词列表*/
      if(to.query.urlType=='guanjianci'){
        setTimeout(function (){

        next({
          path: '/w-setting/w-setting-keywords'
        })
      }, 200);
      }

      /*微友圈*/
      if(to.query.urlType=='weiyouquan'){
        setTimeout(function (){
        next({
          path: '/w-home/w-home-groupYou'
        })
        }, 200);
      }

      /*签到*/
      if(to.query.urlType=='qiandao'){
        setTimeout(function (){
        next({
          path: '/w-setting/w-setting-sign'
        })
        }, 200);
      }

      /*积分*/
      if(to.query.urlType=='jifen'){
        setTimeout(function (){
        next({
          path: '/w-setting/w-setting-score'
        })

        }, 200);
      }

    /*购买*/
    if(to.query.urlType=='goBuy'){
      setTimeout(function (){
        next({
          path: '/w-user/w-user-gobuy-new'
        })

      }, 200);
    }

    /*订单*/
    if(to.query.urlType=='getOrder'){
      setTimeout(function (){
        next({
          path: '/w-user/w-user-me-order-new'
        })

      }, 200);
    }

  }
  setTimeout(function (){
    next();
  }, 200);


})


export default router



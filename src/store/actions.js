/**
 * Created by DELL on 2018/3/26.
 */
/*import * as types from './mutation-types'*/
import { Toast } from 'mint-ui';
import axios from 'axios'
import image from './index.js'
import { wxconfig } from '@/util/common.js';
export default{
/*  showloader: ({ commit }) => {
    commit(types.SHOWLOADING)
  },
  hideloader: ({ commit }) => {
    commit(types.HIDELOADING)
  }*/

/*查询用户信息*/
  getUserInfo({commit}){
    axios.get('/auth/xiaov/main/getUserInfo.do').then(function(res) {
      if(res.data.success){

        commit('setUserInfo',res.data.result);
        sessionStorage.setItem("getUserInfoSession",JSON.stringify(res.data.result));

      }else{
        Toast(res.data.message);
      }

    }).catch(function(err) {
      Toast(err)
    })

  },



  /*查询所有评论*/
  queryComments({commit}){
    axios.get('/xiaov/moments/momentsList.do').then(function(res) {
    if(res.data.success){
    for(var i=0;i<res.data.result.length;i++){
      res.data.result[i].imageList=[];
      if(res.data.result[i].image!=null && res.data.result[i].image.length>0){
        for(var j=0;j<res.data.result[i].image.length;j++){
          res.data.result[i].imageList.push({url:{backgroundImage: "url("+image.state.imgUrl+res.data.result[i].image[j]+")"},img:res.data.result[i].image[j]});
        }
      }
    }
    commit('setCommentList',res.data.result);

  }else{
    Toast(res.data.message);
  }

}).catch(function(err) {
  Toast(err)
})
  },
  /*撤销*/
  repeal({commit,dispatch},item){
    axios.get('/xiaov/moments/delMoments.do',{params:{momentId:item.id}}).then(function(res) {

      if(res.data.success){

        dispatch('queryComments');

        Toast('撤销成功');

      }else{
        Toast(res.data.message);
      }

    }).catch(function(err) {
      Toast(err)
    })
  },
  /*发表评论*/
  confirmDialog({commit,dispatch},param){

    axios.get('/xiaov/moments/addPL.do',{params:param}).then(function(res) {

      if(res.data.success){

        dispatch('queryComments');

        Toast("评论成功");

      }else{
        Toast(res.data.message);
      }

    }).catch(function(err) {
      Toast(err)
    })
  },
  /*回复某人的评论*/
  reployconfirmDialog({commit,dispatch},param){

    axios.get('/xiaov/moments/addPL.do',{params:param}).then(function(res) {

      if(res.data.success){

        dispatch('queryComments');

        Toast(res.data.message);

      }else{
        Toast(res.data.message);
      }

    }).catch(function(err) {
      Toast(err)
    })
  },

  /*删除回复内容*/
  delReployContent({commit,dispatch},comment){
    axios.get('/xiaov/moments/delPL.do',{params:{commentId:comment.id}}).then(function(res) {

      if(res.data.success){

        dispatch('queryComments');

        Toast("删除成功");

      }else{
        Toast(res.data.message);
      }

    }).catch(function(err) {
      Toast(err)
    })
  },

  /*点赞帖子*/
   zan({commit,dispatch},item){
    if(item.zan){
      axios.get('/xiaov/moments/delZan.do',{params:{momentId:item.id}}).then(function(res) {
        if(res.data.success){
          Toast("您已取消点赞");
          dispatch('queryComments');
          item.zan=!item.zan;
        }else{
          Toast(res.data.message);
        }

      }).catch(function(err) {
        Toast(err)
      })

    }else{
      axios.get('/xiaov/moments/addZan.do',{params:{momentId:item.id}}).then(function(res) {

        if(res.data.success){
          Toast("点赞成功");
          dispatch('queryComments');
          item.zan=!item.zan;

        }else{
          Toast(res.data.message);
        }

      }).catch(function(err) {
        Toast(err)
      })
    }
  },

  /*获取js-sdk接口的config方法*/
  jssdkConfig({commit,dispatch},param){
    axios.get('/xiaov/shopCart/jssdk.do',{params:param}).then(function(res) {
      if(res.data.success){
        var obj = res.data.result;
        //调用config.js，获取js-sdk接口
        wxconfig(false, obj.appid, obj.timestamp,obj.noncestr, obj.signature, obj.jsApiList);
      }else{
        Toast('取jssdk参数失败');
      }

    }).catch(function(err) {
      Toast(err)
    })

  }


}

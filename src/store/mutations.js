/**
 * Created by DELL on 2018/3/26.
 */
import * as types from './mutation-types'


/*const mutations = {
  [types.SHOWLOADING] (state) {
    state.showLoading = true
  },
  [types.HIDELOADING] (state) {
    state.showLoading = false
  }
}*/



export default {
  /*mutations*//*types*/
  setCommentList(state,commentList){
    state.commentList=commentList;

  },

  setUserInfo(state,userInfo){
    state.userInfo=userInfo;
  },
  setOpid(state,opId){
    state.opId=opId;
  },





}

import request from 'api/request'

const state = {};

const mutations = {};

const actions = {
  getAllMessage:function(){
    return request.get('classes/messageBoard')
  },
  addMessage:function(context,data){
    return request.post('classes/messageBoard', data)
  }
};

const getters = {};

export default {
  state,mutations,actions,getters
}

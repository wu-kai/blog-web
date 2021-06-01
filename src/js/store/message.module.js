import request from 'api/request'
import AV from 'leanengine';

const MessageBoard = AV.Object.extend('messageBoard');
const messageBoard = new MessageBoard();

const state = {};

const mutations = {};

const actions = {
  getAllMessage:function(){
    return request.get('classes/messageBoard')
  },
  addMessage:function(context,data){
    // return request.post('classes/messageBoard', data)
    messageBoard.set('name', data.name);
    messageBoard.set('content', data.content);
    messageBoard.set('email', data.email);
    messageBoard.set('city', data.city);
    return messageBoard.save()
  }
};

const getters = {};

export default {
  state,mutations,actions,getters
}

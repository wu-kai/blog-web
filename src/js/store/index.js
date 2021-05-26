import Vue from 'vue';
import Vuex from 'vuex';
import blogModule from './blog.module.js';
import messageModule from './message.module.js';
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    homeTitle:'Better Yichen',
    menuShow:false,
    menuList:[
      {name:'home',value:'Home',path:'/',showName:'首页'},
      {name:'blogList',value:'BlogList',path:'/blogList',showName:'博客'},
      {name:'resume',value:'Resume',path:'/resume',showName:'个人简历'},
      {name:'messageBoard',value:'MessageBoard',path:'/messageBoard',showName:'留言板'}
    ],
    musicList:[
      'http://cdn.yichenk.com/music/Imagine%20Dragons-Radioactive.mp3',
      'http://cdn.yichenk.com/music/Spoken%20-%20Through%20It%20All.mp3',
      'http://cdn.yichenk.com/music/%E5%88%98%E6%AC%A2,%E7%8E%8B%E8%8F%B2%20-%20%E7%AC%91%E5%82%B2%E6%B1%9F%E6%B9%96.mp3',
      'http://cdn.yichenk.com/music/%E9%99%88%E5%8B%8B%E5%A5%87%20-%20%E6%8C%9A%E7%88%B1.mp3',
      'http://cdn.yichenk.com/music/%E9%99%88%E5%8B%8B%E5%A5%87%20-%20%E6%98%94%E6%83%85%E9%9A%BE%E8%BF%BD.mp3',
      'http://cdn.yichenk.com/music/%E9%AA%86%E9%9B%86%E7%9B%8A%20-%20%E5%9B%9E%E6%A2%A6%E6%B8%B8%E4%BB%99.mp3',
    ]
  },
  mutations:{
    switchMenu(state){
      state.menuShow = !state.menuShow;
    },
    hideMenu(state){
      state.menuShow = false;
    }
  },
  modules:{
    blog:blogModule,
    message:messageModule
  }
});

export default store;

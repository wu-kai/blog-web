import Vue from 'vue'
import Router from 'vue-router'
import Manage from 'views/Manage'
import CreateBlog from 'manage/CreateBlog'
import Index from 'manage/Index'
import Home from 'views/Home'
import BlogList from 'views/BlogList'
import Resume from 'views/Resume'
import MessageBoard from 'views/MessageBoard'
import BlogListBox from 'component/BlogListBox'
import BlogDetailsBox from 'component/BlogDetailsBox'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/Home', name: 'home_', component: Home},
    {path: '/manage', component: Manage,
      children:[
        {path: '', component: Index},
        {path: 'index', component: Index},
        {path: 'createBlog', component: CreateBlog},
        {path: 'createBlog/:id', component: CreateBlog},
      ]
    },
    {path: '/resume', name: 'resume', component: Resume},
    {path: '/messageBoard', name: 'messageBoard', component: MessageBoard},
    {
      path: '/blogList', component: BlogList,
      children: [
        {path: '', component: BlogListBox},
        {path: 'blogDetailsBox/:id', component: BlogDetailsBox},
      ]
    },
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
//home
import Home from 'views/Home'
//blog
import Blog from 'views/Blog'
import BlogListBox from 'components/Blog/BlogListBox'
import BlogDetailsBox from 'components/Blog/BlogDetailsBox'
//Resume
import Resume from 'views/Resume'
//MessageBoard
import MessageBoard from 'views/MessageBoard'
//admin
import Manage from 'views/Manage'
import Index from 'js/components/Manage/Index'
import CreateBlog from 'js/components/Manage/CreateBlog'


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
      path: '/blogList', component: Blog,
      children: [
        {path: '', component: BlogListBox},
        {path: 'blogDetailsBox/:id', component: BlogDetailsBox},
      ]
    },
  ]
})

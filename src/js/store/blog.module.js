import axios from 'axios'
import request from 'api/request'

const state = {
  blogList: [],
  editingBlogTitle: '',
  editingBlogLabels: '',
  editingBlogImage: '',
  editingBlogAuthor: '',
  editingBlogInfo: '',
  editingBlogContent: '',
  currentBlog: {}
};
const mutations = {
  saveTempBlogContent(state, content) {
    state.editingBlogContent = content;
  },
  updateEditingBlog(state, blog) {
    state.editingBlogTitle = blog.title || '';
    state.editingBlogLabels = blog.labels || '';
    state.editingBlogImage = blog.image || '';
    state.editingBlogAuthor = blog.author || '';
    state.editingBlogInfo = blog.info || '';
  },
  initEditingBlog(state) {
    state.editingBlogTitle = '';
    state.editingBlogLabels = '';
    state.editingBlogContent = '';
    state.editingBlogImage = '';
    state.editingBlogAuthor = '';
    state.editingBlogInfo = '';
  }
};
const actions = {
  createBlog(context) {
    const blog = {
      title: context.state.editingBlogTitle,
      author: context.state.editingBlogAuthor,
      body: context.state.editingBlogContent,
      label: context.state.editingBlogLabels,
      image: context.state.editingBlogImage,
      info: context.state.editingBlogInfo,
    };
    return axios({
      method: 'POST',
      url: '/api/blog/createBlog',
      data: blog
    })
  },
  updateBlog(context, id) {
    const blog = {
      title: context.state.editingBlogTitle,
      author: context.state.editingBlogAuthor,
      body: context.state.editingBlogContent,
      label: context.state.editingBlogLabels,
      image: context.state.editingBlogImage,
      info: context.state.editingBlogInfo,
    };
    blog.id = id;
    return axios({
      method: 'POST',
      url: '/api/blog/editBlog',
      data: blog
    })
  },
  getBlogList(context) {
    axios({
      method: 'GET',
      url: '/api',
    });
    return new Promise(function (resolve, reject) {
      request.get('/classes/article')
        .then(function ({ data }) {
          context.state.blogList = data.results;
          resolve(data.results);
        }, function (err) {
          console.log(err);
        })
    });
  },
  getBlogByID(context, id) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'GET',
        url: '/api/blog/findByID',
        params: { id: id }
      }).then(function (res) {
        if (res.status === 200) {
          resolve(res.data);
        }
      }, function (err) {
        console.log(err);
      })
    })
  },
  validate(context, value) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'GET',
        url: '/api/blog/validate',
        params: {
          validateValue: value
        }
      }).then(function (res) {
        if (res.status === 200) {
          resolve(res.data);
        }
      }, function (err) {
        console.log(err);
      })
    })
  },
  uploadFile(context, data) {
    return axios({
      method: 'post',
      url: '/api/uploadFile_to_qiniu',
      data: data
    });
  }

};
const getters = {
  editingBlog(state) {
    return {
      title: state.editingBlogTitle,
      labels: state.editingBlogLabels,
      image: state.editingBlogImage,
      author: state.editingBlogAuthor,
      content: state.editingBlogContent,
      info: state.editingBlogInfo,

    }
  }
};

export default {
  state, mutations, actions, getters
}

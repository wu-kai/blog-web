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
const mutations = {};
const actions = {
  createBlog(context, blog) {
    return new Promise((resolve, reject) => {
      request.post(`/classes/article`, {
        title: blog.title,
        author: blog.author,
        content: blog.content,
        label: blog.label.split(','),
        image: blog.image,
        introduction: blog.introduction,
        subtitle: blog.subtitle,
      })
        .then(({ data }) => {
          console.log(data);
          resolve(data.results);
        })
        .catch(err => {
          console.log(err);
        })
    });
  },
  updateBlog(context, blog) {
    return new Promise((resolve, reject) => {
      request.put(`/classes/article/${blog.objectId}`, {
        title: blog.title,
        author: blog.author,
        content: blog.content,
        label: blog.label,
        image: blog.image,
        introduction: blog.introduction,
        subtitle: blog.subtitle,
      })
        .then(({ data }) => {
          console.log(data);
          resolve(data.results);
        })
        .catch(err => {
          console.log(err);
        })
    });
  },
  getBlogList(context) {
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
      request.get(`classes/article/${id}`)
        .then(function ({ data }) {
          context.state.currentBlog = data.results;
          resolve(data);
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

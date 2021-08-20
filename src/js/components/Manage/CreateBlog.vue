<template>
  <div class="create-blog">
    <div class="form-control">
      <span>title:</span>
      <input type="text" v-model="blog.title" v-inputFocus="inputFocusBorderColor">
    </div>
    <div class="form-control">
      <span>labels:</span>
      <input type="text" v-model="blog.label" v-inputFocus="inputFocusBorderColor">
    </div>
    <div class="form-control">
      <span>author:</span>
      <input type="text" v-model="blog.author" v-inputFocus="inputFocusBorderColor">
    </div>
    <div class="form-control selectImg">
      <span>image:</span>
      <input id="uploadImage" type="file" @change="selectImg()" style="visibility: hidden">
      <i class="fa fa-plus" @click="clickSelectImg()"></i>
    </div>
    <div class="form-control">
      <span>info:</span>
      <textarea v-inputFocus="inputFocusBorderColor" v-model="blog.introduction"></textarea>
    </div>
    <div class="form-control">
      <div class="editor">
        <editor id="ueditor-demo2" height="320" :content="blog.content" @onChange="changeContent"></editor>
      </div>
    </div>
    <div class="form-control">
      <button class="common_button" @click="save">save</button>
    </div>
    <div class="showContent"></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import editor from 'js/components/Manage/editor.vue';

  const CreateBlog = {
    data: function () {
      return {
        inputFocusBorderColor: '#9fa8da',
        blog: {},
      }
    },
    computed: {
      ...mapState({
        title: state => state.blog.editingBlogTitle,
        labels: state => state.blog.editingBlogLabels,
        image: state => state.blog.editingBlogImage,
        author: state => state.blog.editingBlogAuthor,
        content: state => state.blog.editingBlogContent,
        info: state => state.blog.editingBlogInfo,
      })
    },
    components: {
      editor: editor
    },
    methods: {
      changeContent(content) {
        this.blog.content = content
      },
      save() {
        const self = this;
        const submit = this.blog.objectId ? 'updateBlog' : 'createBlog';
        console.log(this.blog);
        this.$store.dispatch(submit, self.blog).then(function (res) {
          if (res.status === 200) {
            self.$notify.success({
              content: self.objectId ? '修改成功' : '创建成功',
              duration: 3000
            });
            setTimeout(function () {
              location.reload();
            }, 3000)
          }
        }, function (err) {
          console.log(err);
        });
      },
      selectImg(d) {
        console.log(d);
      },
      clickSelectImg() {
        $(this.$el).find('#uploadImage').click();
      }
    },
    mounted() {
      let self = this;
      setTimeout(function () {
        if ($(self.$el).find('#ueditor-demo2').height() === 0) {
          window.location.reload();
        }
      }, 50)
    },
    created() {
      const self = this;
      this.id = this.$route.params.id;
      if (this.id) {
        this.id = this.$route.params.id;
        this.$store.dispatch('getBlogByID', this.id)
          .then(function (result) {
            self.blog = result;
          }, function (err) {
            console.log(err);
          })
      }
    }
  };
  export default CreateBlog;
</script>
<style scoped>
  .create-blog {
    padding-top: 50px;
    width: 90%;
    margin: 0 auto;
  }

  .form-control {
    width: 100%;
    padding-top: 10px;
  }

  .form-control:after {
    content: '';
    display: block;
    visibility: hidden;
    clear: both;
  }

  .form-control > span {
    display: inline-block;
    float: left;
    width: 60px;
    text-align: left;
    line-height: 34px;
    color: #3f51b5;

  }

  .form-control > input {
    width: calc(100% - 60px);
    float: left;
    height: 34px;
  }

  .form-control > textarea {
    width: calc(100% - 60px);
    float: left;
    height: 60px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #e8eaf6;
    box-sizing: border-box;
    font-size: 15px;
    padding: 10px;
    color: #4a4746;
  }

  .form-control > input[type=text] {
    height: 34px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #e8eaf6;
    box-sizing: border-box;
    font-size: 15px;
    padding: 0 10px 0 10px;
    color: #4a4746;
  }

  .form-control > input[type=file] {
    padding-top: 6px;
  }

  button {
    float: right;
  }

  .selectImg input {
    float: right;
    width: 1px;
  }

  .selectImg i {
    float: left;
    border: 1px solid #e8eaf6;
    font-size: 40px;
    padding: 20px 30px;
    color: #c5cae9;
    cursor: pointer;
  }

  .form-control > .editor {
    width: calc(100% - 60px);
    float: right;
  }
</style>

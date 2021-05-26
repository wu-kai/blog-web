<template>
  <div class="message_board">
    <div CLASS="addMessage">
      <p></p>
      <textarea placeholder="你想说点啥" v-model="content"></textarea>
      <input type="text" class="name" placeholder="如何称呼你" v-model="name">
      <input type="text" class="email" placeholder="Email 邮箱" v-model="email">
      <p style="clear: both"></p>
      <button class="common_button submit" @click="submit">submit</button>
      <div class="tip">
        <div>隐私提示：</div>
        <p>邮箱非必填，若你希望我回复你就请留下邮箱，但是请放心它不会被显示出来，你的ip地址将被保存，但只会显示你所在的城市</p>
      </div>
    </div>
    <div class="list">
      <MessageItem v-for="item in list" :key="item._id" :item="item"></MessageItem>
    </div>
    <div id="allmap"></div>
  </div>
</template>

<script>
  import MessageItem from 'components/Message/MessageItem.vue'
  import { getPosition } from 'js/util/common'

  export default {
    name: '',
    data: function () {
      return {
        list: [],
        content: '',
        name: '',
        email: ''
      }
    },
    methods: {
      getMessageList() {
        let self = this;
        this.$store.dispatch('getAllMessage')
          .then(function ({ data }) {
            self.list = data.results;
          }, function (err) {
            console.log(err);
          })
      },
      submit() {
        let self = this;
        const action = (address) => {
          let data = {
            content: self.content,
            name: self.name,
            email: self.email,
            city: address ? address.city + address.district : ''
          };
          self.$store.dispatch('addMessage', data)
            .then(function () {
              self.content = '';
              self.name = '';
              self.email = '';
              self.city = '';
              self.$notify.success({
                content: '发表成功',
                duration: 3000
              });
              self.getMessageList();
            }, function (err) {
              console.log(err);
            })
        };
        getPosition(action, action)
      },
    },
    created: function () {
      this.getMessageList();
    },
    components: {
      MessageItem
    }
  }
</script>

<style scoped>
  .list{
    width: 60%;
    margin: 50px auto;
  }

  .addMessage{
    width: 60%;
    margin: 50px auto;
    overflow: hidden;
    text-align: right;
  }

  .addMessage input{
    width: calc(50% - 10px);
    display: inline-block;
    box-sizing: border-box;
    float: left;
    border: 1px solid rgba(243, 237, 240, 0.8);
    outline: none;
    padding: 10px;
  }

  .addMessage .tip{
    overflow: hidden;
    color: rgba(255, 212, 218, 0.69);
    margin-top: 10px;
  }

  .addMessage .tip div{
    width: 70px;
    float: left;
    text-align: left;
  }

  .addMessage .tip p{
    width: calc(100% - 70px);
    float: left;
    text-align: left;
  }

  .addMessage input:focus{
    border: 1px solid rgba(1, 108, 199, 0.64);
  }

  .addMessage input.name{
    margin-right: 20px;
  }

  .addMessage textarea{
    resize: none;
    height: 150px;
    border: 1px solid rgba(243, 237, 240, 0.8);
    padding: 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 20px;
    outline: none;
  }

  .addMessage textarea:focus{
    border: 1px solid rgba(1, 108, 199, 0.64);

  }

  .submit{
    background: rgba(1, 108, 199, 0.64);
    line-height: 30px;
    height: 30px;
    padding: 0 30px;
    margin-top: 16px;
  }

  .submit:hover{
    background: rgba(1, 118, 217, 0.64);
  }

  @media screen and (max-width: 1000px){
    .list{
      width: 80%;
    }

    .addMessage{
      width: 80%;
    }
  }

  @media screen and (max-width: 600px){
    .list{
      width: 96%;
    }

    .addMessage{
      width: 96%;
    }
  }
</style>

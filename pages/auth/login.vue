<template>
  <div>
    <div>
      Email: <input type="email" v-model="email">
    </div>
    <div>
      Password: <input type="password" v-model="password">
    </div>
    <button type="button" @click="login">LOGIN</button>
    <a href="/auth/registerverify">Go to verify page</a>
  </div>
</template>


<script>
  let AuthModule = require('~~/modules/auth');

  export default {
    data()  {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login: function () {
        AuthModule.login(this.email, this.password);
      }
    }
  }
</script>

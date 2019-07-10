<template>
  <div>
    <div>
      Email: <input type="email" v-model="formData.email">
    </div>
    <div>
      Password: <input type="password" v-model="formData.password">
    </div>
    <button type="button" @click="register">REGISTER</button>
  </div>
</template>


<script>
let AuthModule = require('~~/modules/auth');
export default {
  data()  {
    return {
      formData: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    register: function () {
      AuthModule.register(this.formData.email, this.formData.password, '/auth/registerverify');
    }
  }
}
</script>

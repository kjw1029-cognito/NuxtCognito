<template>
  <div>
    <div>
      Enter your email address: <input type="text" v-model="email">
    </div>
    <div>
      Enter the verify code: <input type="text" v-model="code">
    </div>
    <button type="button" @click="verifyCode">VERIFY</button>
    <button type="button" @click="resendCode">RESEND CODE</button>
  </div>
</template>


<script>
let AuthModule = require('~~/modules/auth');
export default {
  mounted: function () {
    if (process.browser) {
      let QueryUtil = require('query-string');
      let parsedQuery = QueryUtil.parse(window.location.search);

      this.email = parsedQuery.email ? parsedQuery.email.replace(' ', '+') : '';
    }
  },
  data()  {
    return {
      email: '',
      code: '',
    }
  },
  methods: {
    verifyCode: function () {
      AuthModule.verify(this.email, this.code);
    },
    resendCode: function () {
      AuthModule.resendVerifyCode(this.email);
    }
  }
}
</script>

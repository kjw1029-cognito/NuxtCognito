<template>
  <div>
    <div>
      Enter the verify code: <input type="text" v-model="formData.code">
    </div>
    <button type="button" @click="verifyCode">VERIFY</button>
    <button type="button" @click="resendCode">RESEND CODE</button>
  </div>
</template>


<script>
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

var poolData = {
  UserPoolId: 'ap-northeast-1_D4umOTqkF',
  ClientId: 'qptidu7uorni4ftn7l6tp1722',
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export default {
  data()  {
    return {
      formData: {
        code: '',
      }
    }
  },
  computed: {
    email: function () {
      var QueryUtil = require('query-string');
      var parsedQuery = QueryUtil.parse(window.location.search);
      return parsedQuery.email.replace(' ', '+');
    }
  },
  methods: {
    verifyCode: function () {

      var userData = {
        Username: this.email,
        Pool: userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.confirmRegistration(this.formData.code, true, function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        if (confirm('call result: ' + result)) window.location.href = '/';
      });
    },
    resendCode: function () {

      var userData = {
        Username: this.email,
        Pool: userPool,
      };

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.resendConfirmationCode(function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log('call result: ' + result);
      });
    }
  }
}
</script>

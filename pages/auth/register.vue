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
        email: '',
        password: '',
      }
    }
  },
  methods: {
    register: function () {
      var attributeList = [];
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: this.formData.email,
      });
      attributeList.push(attributeEmail);

      userPool.signUp(this.formData.email, this.formData.password, attributeList, null, function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        var cognitoUser = result.user;
        if (confirm('user name is ' + cognitoUser.getUsername())) window.location.href = '/auth/registerverify?email='+cognitoUser.getUsername();
      })
    }
  }
}
</script>

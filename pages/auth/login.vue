<template>
  <div>
    <div>
      Email: <input type="email" v-model="formData.email">
    </div>
    <div>
      Password: <input type="password" v-model="formData.password">
    </div>
    <button type="button" @click="login">LOGIN</button>
  </div>
</template>


<script>
  var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
  var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
  var AWS = require('aws-sdk/global');

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
      login: function () {
        var authenticationData = {
          Username: this.formData.email,
          Password: this.formData.password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var userData = {
          Username: this.formData.email,
          Pool: userPool,
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            AWS.config.region = '';
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: '',
              Logins: {
                'cognito-idp.<region>.apazonaws.com/<userpoolid>': result.getIdToken().getJwtToken(),
              },
            });

            AWS.config.credentials.refresh((error) => {
              if (error) {
                console.log(error);
              } else {
                console.log('Successfully logged in!');
              }
            })
          },
          onFailure: function (err) {
            alert(err.message || JSON.stringify(err));
          }
        })
      }
    }
  }
</script>

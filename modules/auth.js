import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';


const UserPoolId = 'ap-northeast-1_D4umOTqkF';
const ClientId = 'qptidu7uorni4ftn7l6tp1722';
const Region = 'Regions.AP_NORTHEAST_1';
const IdentityPoolId = 'ap-northeast-1:eb7fe941-e9c5-462a-a8c0-f38d39239f4d';
const PoolData = {
  UserPoolId: UserPoolId,
  ClientId: ClientId,
};
const UserPool = new CognitoUserPool(PoolData);

let cognitoUser;

let getCognitoUserAttribute = function (name, value) {
  let data = {
    Name: name,
    Value: value,
  };
  let attribute = new CognitoUserAttribute(data);
  return attribute;
};

let getCognitoUser = function (email, pool) {
  let data = {
    Username : email,
    Pool : pool,
  };
  let cUser =  new CognitoUser(data);
  return cUser;
};

let getCurrentUser = function () {
  let cognitoUser = UserPool.getCurrentUser();
  return cognitoUser;
};

export function register(email, password, redirectPath) {
  let attributeList = [];
  let attributeEmail = getCognitoUserAttribute('email', email);
  attributeList.push(attributeEmail);

  UserPool.signUp(email, password, attributeList, null, function(err, result){
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    let cognitoUser = result.user;
    window.location.href = redirectPath + '?email='+cognitoUser.getUsername();
  });
};

export function verify(email, code, redirectPath = '/') {
  let cognitoUser = getCognitoUser(email, UserPool);
  cognitoUser.confirmRegistration(code, true, function(err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    alert('コード認証が成功しました');
    window.location.href = redirectPath;
  });
};

export function resendVerifyCode(email) {
  let cognitoUser = getCognitoUser(email, UserPool);
  cognitoUser.resendConfirmationCode(function(err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    alert('メールを確認してください');
  });
}


export function login(email, password, redirectPath = '/') {
  let authData = {
    Username: email,
    Password: password,
  };
  let authDetail = new AuthenticationDetails(authData);

  let cognitoUser = getCognitoUser(email, UserPool);
  cognitoUser.authenticateUser(authDetail, {
    onSuccess: function (result) {
      let accessToken = result.getAccessToken().getJwtToken();
      let logins = {};
      logins['cognito-idp.'+Region+'.amazonaws.com/'+UserPoolId] = result.getIdToken().getJwtToken();
      AWS.config.region = Region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId : IdentityPoolId,
        Logins : logins,
      });
      AWS.config.credentials.refresh((error) => {
        if (error) {
        } else {
        }
      });
      window.localStorage.setItem('connectyAccessToken', accessToken);
      alert('ログイン成功');
      window.location.href = redirectPath;
    },

    onFailure: function(err) {
      alert(err.message || JSON.stringify(err));
    },

  });
};

export function logout(redirectPath = '/') {
  let cognitoUser = getCurrentUser();
  cognitoUser.signOut();
  window.localStorage.removeItem('connectyAccessToken');
  window.location.href = redirectPath;
};

export function checkCurrentUser() {
  let cognitoUser = getCurrentUser();
  if (cognitoUser == null) {
    window.localStorage.removeItem('connectyAccessToken');
    window.location.href = '/';
  }
}

export default function () {

}

let AuthModule = require('~~/modules/auth');

export default function () {
  AuthModule.checkCurrentUser();
}

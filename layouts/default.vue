<template>
  <div class="container">
    <nav class="nav">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/contents/unregistered">Contents</router-link>
      <router-link class="nav-link" to="/contents/registered">Registered Contents</router-link>
    </nav>
    <div class="info" v-if="!accessToken">
      <a class="button--green" href="/auth/login">Login</a>
      <a class="button--grey" href="/auth/register">Register</a>
    </div>
    <div class="info" v-else>
      <button class="button--green" type="button" @click="logout">Logout</button>
    </div>
    <nuxt/>
  </div>
</template>

<script>
let AuthModule = require('~~/modules/auth');

export default {
  data() {
    return {
    }
  },
  computed: {
    accessToken: function () {
      if (process.browser) {
        return window.localStorage.getItem('connectyAccessToken');
      }
    }
  },
  methods: {
    logout: function () {
      AuthModule.logout();
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  margin: 5%;
}

.nav {
  margin-bottom: 3%;
}

.nav-link {
  text-decoration: none;
  font-size: 1.2rem;
  padding: 5px 10px;
  color: #00C48D;
  font-weight: bold;
}

.info {
  float: right;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>


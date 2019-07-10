<template>
  <div>
    <h1>This is Registered Page</h1>
  </div>
</template>

<script>
  export default {
    middleware: 'authenticated',
    data() {
      return {

      }
    }
  }
</script>

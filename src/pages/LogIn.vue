<template>
  <div class="login">
    <h2>Log In</h2>
    <form @submit.prevent>
      <div class="form-group">
        <div class="input-group">
          <label class="control-label col-sm-4" for="email">Email</label><i class="bar"></i>
          <div class="col-sm-8">
            <input type="text" id="email" required="required"/>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label class="control-label col-sm-4" for="password">Password</label><i class="bar"></i>
          <div class="col-sm-8">
            <input type="password" id="password" required="required"/>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" type="submit">Login</button>
        <router-link class='link' :to="{name: 'Sign Up'}">Create an account</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login'
  }
</script>

<style lang="scss">
  @import '../assets/sass/paper/variables';
  // @import '~bootstrap/scss/mixins/breakpoints';
  // @import "~bootstrap/scss/functions";
  // @import '~bootstrap/scss/variables';
  .login {
    // @include media-breakpoint-down(md) {
    //   width: 100%;
    //   padding-right: 2rem;
    //   padding-left: 2rem;
    //   .down-container {
    //     .link {
    //       margin-top: 2rem;
    //     }
    //   }
    // }
    h2 {
      text-align: center;
    }
    width: 21.375rem;
    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
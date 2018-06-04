<template>
  <div class="signup">
    <h2>Create new account</h2>
    <form @submit.prevent>
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" required="required"/>
          <label class="control-label" for="email">Email</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required"/>
          <label class="control-label" for="password">Password</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" type="submit">Sign Up</button>
        <router-link class='link' :to="{name: 'Log In'}">Already joined?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'signup'
  }
</script>

<style lang="scss">
  @import '../assets/sass/paper/variables';
  // @import '~bootstrap/scss/mixins/breakpoints';
  // @import "~bootstrap/scss/functions";
  // @import '~bootstrap/scss/variables';
  .signup {
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
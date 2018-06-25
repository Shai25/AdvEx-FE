<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <div class="form-group">
        <div class="input-group">
          <label class="control-label col-sm-4" for="name">Name</label><i class="bar"></i>
          <div class="col-sm-8">
            <input type="text" id="name" required="required" v-model="nickname"/>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label class="control-label col-sm-4" for="email">Email</label><i class="bar"></i>
          <div class="col-sm-8">
            <input type="text" id="email" required="required" v-model="email"/>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label class="control-label col-sm-4" for="password">Password</label><i class="bar"></i>
          <div class="col-sm-8">
            <input type="password" id="password" required="required" v-model="password"/>
          </div>
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
import axios from 'axios';
export default {
  data() {
    return {
      nickname: '',
      email: '',
      password: ''
    }
  },

  methods: {
    signup: function() {
      // TODO: get API from config
      axios.post('http://localhost:5000/users',
        {
          'nickname': this.nickname,
          'email': this.email,
          'password': this.password
        },
        {
          headers: {
            'Content-type': 'application/json',
          }
        }
      )
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          this.$router.push('/auth/login')
        }
      })
      .catch(e => {})
    }
  }
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
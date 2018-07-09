<template>
  <div class="login">
    <h2>Log In</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <div class="input-group">
          <label class="control-label col-sm-4" for="email">Email</label><i class="bar"></i>
          <div class="col-sm-8">
            <input type="email" id="email" required="required" v-model="email"/>
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
        <button class="btn btn-primary" type="submit">Login</button>
        <router-link class='link' :to="{name: 'Sign Up'}">Create an account</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login: function() {
      axios.post(API_PREFIX + '/login',
        {
          'email': this.email,
          'password': this.password
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
          withCredentials: true
        }
      )
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.$session.start();
          this.$session.set('token', response.data.token);
          this.$session.set('user_id', response.data.user_id);
          // axios.defaults.headers.common['Authorization'] = 'Basic ' + response.data.user_id + ':' + response.data.token;
          // axios.defaults.headers.common['Authorization'] = response.data.token;
          this.$router.push('/');
        }
      })
      .catch(e => {
        // console.log(e.response);
        if ('error' in e.response.data) {
          // TODO: change alert to modal
          alert(e.response.data.error);
        }
        else {
          alert('Email/Password not matched.');
        }
        location.reload();
      });
    }
  }
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

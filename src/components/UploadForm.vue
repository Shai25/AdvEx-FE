<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <card>
          <h4 class="card-title">Upload Model for Evaluation</h4><hr>
          <dropzone v-bind="{submit}"/>
        </card>
      </div>
    </div>
  </div>  
</template>

<script>
import Dropzone from '@/components/Dropzone/Dropzone';

export default {
  components: {
    Dropzone
  },

  data() {
    return {
    }
  },

  methods: {
    submit: function(model_name) {
      console.log(model_name)
      // this.$router.push('/history');
      // TODO: get API from config
      // axios.post('https://private-8bf72-advex.apiary-mock.com/users',
      //   {
      //     'email': this.email,
      //     'nickname': this.name,
      //     'password': this.password
      //   },
      //   {
      //     headers: {
      //       'Content-type': 'application/json',
      //     }
      //   }
      // )
      // .then(response => {
      //   console.log(response)
      //   if (response.status == 200) {
      //     // alert('success')
      //     this.$router.push('/submission/4')
      //   }
      // })
      // .catch(e => {})
    }
  }
}
</script>

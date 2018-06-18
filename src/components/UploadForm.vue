<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <card>
          <h4 class="card-title">Upload Model for Evaluation</h4><hr>
          <div class="row">

            <div class="col-md-6">
              <dropzone>
              </dropzone>
            </div>

            <div class="col-md-6">
              <form @submit.prevent="submit">
                <div class="form-group">
                  <div class="input-group">
                    <label class="control-label col-sm-4" for="model_name">Model Name</label><i class="bar"></i>
                    <div class="col-sm-8">
                      <input type="text" id="model_name" required="required" v-model="model_name"/>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <button class="btn btn-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>

          </div>
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
      model_name: ''
    }
  },

  methods: {
    submit: function() {
      this.$router.push('/history');
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

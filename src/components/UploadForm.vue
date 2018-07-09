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
    submit: function(model_name, model_key, index_key) {
      axios.post(API_PREFIX + '/submit',
        {
          'user_id': this.$session.get('user_id'),
          'model_name': model_name,
          's3_model_key': model_key,
          's3_index_key': index_key
        },
        {
          headers: {
            'Authorization': this.$session.get('token'),
            'Content-type': 'application/json',
          },
          withCredentials: true
        }
      )
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          this.$router.push('/submission/' + response.data.submission_id);
        }
      })
      .catch(e => {})
    }
  }
}
</script>

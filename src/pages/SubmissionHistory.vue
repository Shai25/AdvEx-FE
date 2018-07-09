<template>
  <div class="row">
    <div class="col-12">
      <card>
        <div slot="raw-content" class="table-responsive">
          <table class="table table-striped">
            <thead>
              <th v-for="column in headers" :key="column">{{column}}</th>
            </thead>
            <tbody>
            <tr v-for="(row, index) in data" :key="index">
              <td>
                <router-link :to="/submission/ + row['submission_id']">{{row['submission_id']}}</router-link>
              </td>
              <td>
                {{row['model_name']}}
              </td>
              <td>
                {{row['status']}}
              </td>
              <td>
                {{row['created_at']}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
// TODO: format timestamp
const columnNames = ["Submission ID", "Model Name", "Status", "Submitted At"];
const columnKeys = ["submission_id", "model_name", "status", "created_at"];

export default {
  data() {
    return {
      headers: [...columnNames],
      columns: [...columnKeys],
      data: []
      // data: [
      //   {
      //     "submission_id": "4",
      //     "user_id": "1",
      //     "model_name": "ResNet v1.0",
      //     "status": "Pending",
      //     "created_at": "2018-06-01 01:35:36"
      //   },
      //   {
      //     "submission_id": "3",
      //     "user_id": "1",
      //     "model_name": "VGG-16 v3.0",
      //     "status": "Running",
      //     "created_at": "2018-06-01 01:30:21"
      //   },
      //   {
      //     "submission_id": "2",
      //     "user_id": "1",
      //     "model_name": "VGG-16 v2.0",
      //     "status": "Failed",
      //     "created_at": "2018-05-14 18:20:15"
      //   },
      //   {
      //     "submission_id": "1",
      //     "user_id": "1",
      //     "model_name": "VGG-16 v1.0",
      //     "status": "Finished",
      //     "created_at": "2018-05-01 08:40:51"
      //   },
      // ]
    };
  },

  created() {
    axios.get(API_PREFIX + '/users/' + this.$session.get('user_id') + '/submissions',
      {
        'headers': {
          'Authorization': this.$session.get('token')
        },
        withCredentials: true
      })
    .then(response => {
      this.data = response.data.submissions;
    })
    .catch(e => {
      if (e.response.status == 401) {
        alert('Please log in first.');
        this.$session.destroy();
        this.$router.push('/auth/login');
      }
    });
  }
};
</script>

<style>
</style>

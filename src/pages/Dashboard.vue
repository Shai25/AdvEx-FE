<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>

      <div class="col-md-6">
        <card>
          <h4 class="card-title">Most Recent Submission (<router-link :to="/submission/ + submission_id">#{{submission_id}}</router-link>)</h4><hr>
          <p>Model Name: {{model_name}}</p>
          <p>Status: {{status}}</p>
        </card>
      </div>      
    </div>

    <!--Upload Form-->
    <upload-form>
    </upload-form>

    <!--Charts-->


  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";
import UploadForm from '@/components/UploadForm';
import Chartist from 'chartist';

export default {
  components: {
    UploadForm,
    StatsCard,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      submission_id: "",
      model_name: "",
      status: "",
      count: 0,

      data: [],
      // data: [
      //   {
      //     "submission_id": "4",
      //     "user_id": "1",
      //     "model_name": "ResNet v1.0",
      //     "status": "Submitted",
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
      // ],

      statsCards: [
        {
          type: "warning",
          icon: "ti-timer",
          title: "Models Queued",
          value: "-",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Models Running",
          value: "-",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        // {
        //   type: "success",
        //   icon: "ti-wallet",
        //   title: "Money Saved",
        //   value: "$1,345",
        //   footerText: "Last day",
        //   footerIcon: "ti-calendar"
        // },
        // {
        //   type: "info",
        //   icon: "ti-heart",
        //   title: "Model Likes",
        //   value: "+45",
        //   footerText: "Updated now",
        //   footerIcon: "ti-reload"
        // }
      ]
    };
  },

  created() {
    // this.data.sort((a, b) => { return (a.submission_id < b.submission_id) ? 1 : ((b.submission_id < a.submission_id) ? -1 : 0); });

    // this.submission_id = this.data[0].submission_id;
    // this.model_name = this.data[0].model_name;
    // this.status = this.data[0].status;

    // this.statsCards[0].value = this.data.reduce((a, b) => { return a + (b.status === 'Submitted' ? 1 : 0)}, 0);
    // this.statsCards[1].value = this.data.reduce((a, b) => { return a + (b.status === 'Running' ? 1 : 0)}, 0);

    axios.get(API_PREFIX + '/users/' + this.$session.get('user_id') + '/submissions',
      {
        'headers': {
          'Authorization': this.$session.get('token')
        },
        withCredentials: true
      })
    .then(response => {
      this.data = response.data.submissions;
      this.data.sort((a, b) => { return (a.submission_id < b.submission_id) ? 1 : ((b.submission_id < a.submission_id) ? -1 : 0); });

      this.submission_id = this.data[0].submission_id;
      this.model_name = this.data[0].model_name;
      this.status = this.data[0].status;

      this.statsCards[0].value = this.data.reduce((a, b) => { return a + (b.status === 'Submitted' ? 1 : 0)}, 0);
      this.statsCards[1].value = this.data.reduce((a, b) => { return a + (b.status === 'Running' ? 1 : 0)}, 0);
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

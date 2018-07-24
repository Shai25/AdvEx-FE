<template>
  <div>
    <div class="row">
      <a href="#/history" class="nav-link"><p>Back to Submission History</p></a>
    </div>

    <div class="row">
      <div class="col-md-6">
        <card>
          <h4 class="card-title">Submission # {{$route.params.id}}</h4><hr>
          <p>Model Name: {{model_name}}</p>
          <p>Status: {{status}}</p>
          <p>Submitted At: {{submitted_at}}</p>
          <p v-if="error">Error Message: {{error_msg}}</p>
        </card>
      </div>

      <div class="col-md-6" v-if="!error && feedback_ready">
        <card>
          <h4 class="card-title">Robustness Score <span class="ti-info-alt" v-tooltip.top-center="robustness_score_tooltip_text"></span></h4><hr>
          <h2 style="text-align:center">{{parseFloat(feedback.robustness).toFixed(2)}}</h2>
        </card>
      </div>      
    </div>

    <div v-if="!error && feedback_ready">
      <div class="row">
        <div class="col-md-12">
          <card>
            <h4 class="card-title">Details</h4><hr>
            <div slot="raw-content" class="table-responsive">
              <table class="table">
                <thead>
                  <th>Method</th>
                  <th v-for="column in tableHeaders">{{column}}</th>
                </thead>
                <tr>
                  <th>Accuracy</th>
                  <td v-for="column in tableAccuracies">{{column}}%</td>
                </tr>
                <tr>
                  <th>Confidence <span class="ti-info-alt" v-tooltip.top-center="confidence_score_tooltip_text"></span></th>
                  <td v-for="column in tableConfidences">{{column}}%</td>
                </tr>
              </table>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <chart-card title="Accuracy Plot"
                      chart-type="Bar"
                      :chart-data="chartData.data"
                      :chart-options="chartData.options">
          </chart-card>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-md-12">
          <card>
            <h4 class="card-title">Suggestion</h4><hr>
            <p style="font-size:20px">{{feedback.suggestion}}</p>
          </card>
        </div>
      </div> -->
    </div>

  </div>
</template>

<script>
import { ChartCard } from "@/components/index";
import Chartist from 'chartist';

export default {
  components: {
    ChartCard,
  },

  data() {
    return {
      robustness_score_tooltip_text: "The robustness score is the average of attack methods' accuracy degrades, and it ranges from 0 to 100. The lower the score, the better.",
      confidence_score_tooltip_text: "Using the output of the final softmax layer as a probability distribution. The highest score of the softmax layer is the model's prediction, and the score itself is treated as the confidence.",

      // model_name: "VGG-16 v1.0",
      // status: "Finished",
      // submitted_at: "2018-05-01 08:40:51",
      model_name: "",
      status: "",
      submitted_at: "",

      feedback_ready: false,
      error: false,
      error_msg: "",

      tableHeaders: [],
      tableAccuracies: [],
      tableConfidences: [],

      feedback: {},
      // feedback: {
      //   "rating": "Good", 
      //   "robustness": "9", 
      //   "details": [
      //     {
      //       "attack_method": "CLEAN", 
      //       "confidence": "95%", 
      //       "accuracy": "80.0512345678%"
      //     }, 
      //     {
      //       "attack_method": "FGSM", 
      //       "confidence": "95%", 
      //       "accuracy": "80.05%"
      //     }, 
      //     {
      //       "attack_method": "MI-FGSM", 
      //       "confidence": "91%", 
      //       "accuracy": "92.10%"
      //     }, 
      //     {
      //       "attack_method": "I-FGSM", 
      //       "confidence": "93.7%", 
      //       "accuracy": "94.10%"
      //     }
      //   ], 
      // },

      chartData: {
        data: {
          labels: [],
          series: []
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            offset: 60
          },
          axisY: {
            offset: 80,
            labelInterpolationFnc: function(value) {
              return value + '%'
            },
            scaleMinSpace: 15
          }
        }
      }
    }
  },

  created() {
    // TODO: remove debugging
    // this.feedback_ready = true;

    // var attack_methods = this.feedback.details.map(x => x.attack_method);
    // this.tableHeaders = this.tableHeaders.concat(attack_methods);

    // var accuracies = this.feedback.details.map(x => parseFloat(x.accuracy).toFixed(2));
    // this.tableAccuracies = this.tableAccuracies.concat(accuracies);

    // var confidences = this.feedback.details.map(x => parseFloat(x.confidence).toFixed(2));
    // this.tableConfidences = this.tableConfidences.concat(confidences);

    // this.chartData.data.labels = attack_methods;
    // this.chartData.data.series = [accuracies.map(x => parseFloat(x))];

    // return;

    axios.get(API_PREFIX + '/submissions/' + this.$route.params.id,
      {
        'headers': {
          'Authorization': this.$session.get('token')
        },
        withCredentials: true
      })
    .then(response => {
      // console.log(response);

      this.model_name = response.data.model_name;
      this.status = response.data.status;
      this.submitted_at = response.data.created_at;

      if (response.data.feedback === null || Object.keys(response.data.feedback).length === 0) {
        return;
      }

      if ('error' in response.data.feedback) {
        this.error = true;
        this.error_msg = response.data.feedback.error;
        return;
      }

      this.feedback_ready = true;
      this.feedback = response.data.feedback;
  
      var attack_methods = this.feedback.details.map(x => x.attack_method);
      this.tableHeaders = this.tableHeaders.concat(attack_methods);

      var accuracies = this.feedback.details.map(x => parseFloat(x.accuracy).toFixed(2));
      this.tableAccuracies = this.tableAccuracies.concat(accuracies);

      var confidences = this.feedback.details.map(x => parseFloat(x.confidence).toFixed(2));
      this.tableConfidences = this.tableConfidences.concat(confidences);

      this.chartData.data.labels = attack_methods;
      this.chartData.data.series = [accuracies.map(x => parseFloat(x))];

      // console.log(this.chartData);
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
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>

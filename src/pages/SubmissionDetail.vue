<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <card>
          <h4 class="card-title">Submission # {{$route.params.id}}</h4><hr>
          <p>Model Name: {{model_name}}</p>
          <p>Status: {{status}}</p>
          <p>Submitted At: {{submitted_at}}</p>
          <p v-if="error">Error Message: {{error_msg}}</p>
        </card>
      </div>
    </div>

    <div v-if="!error && feedback_ready">
      <div class="row">
        <div class="col-md-6">
          <card>
            <h4 class="card-title">Robustness Score</h4><hr>
            <h2 style="text-align:center">{{feedback.robustness}}</h2>
          </card>
        </div>
        
        <div class="col-md-6">
          <card>
            <h4 class="card-title">Rating</h4><hr>
            <h2 style="text-align:center">{{feedback.rating}}</h2>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <card>
            <h4 class="card-title">Details</h4><hr>
            <div slot="raw-content" class="table-responsive">
              <table class="table">
                <thead>
                  <th v-for="column in tableHeaders">{{column}}</th>
                </thead>
                <tr>
                  <td v-for="column in tableAccuracies">{{column}}</td>
                </tr>
                <tr>
                  <td v-for="column in tableConfidences">{{column}}</td>
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

      <div class="row">
        <div class="col-md-12">
          <card>
            <h4 class="card-title">Suggestion</h4><hr>
            <p style="font-size:20px">{{feedback.suggestion}}</p>
          </card>
        </div>
      </div>
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
      // model_name: "VGG-16 v1.0",
      // status: "Finished",
      // submitted_at: "2018-05-01 08:40:51",
      model_name: "",
      status: "",
      submitted_at: "",
      feedback_ready: false,
      error: false,
      error_msg: "",

      tableHeaders: ["Method"],
      tableAccuracies: ["Accuracy"],
      tableConfidences: ["Confidence"],

      feedback: {},
      // feedback: {
      //   "rating": "Good", 
      //   "robustness": "9", 
      //   "details": [
      //     {
      //       "attack_method": "CLEAN", 
      //       "confidence": "95%", 
      //       "accuracy": "80.05%"
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
      //   "suggestion": "Your model can be made more robust by training it with some of the adversarial examples."
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
    // TODO: get url from config
    axios.get('http://localhost:5000/submissions/' + this.$route.params.id,
      {
        'headers': {
          'Authorization': this.$session.get('token')
        },
        withCredentials: true
      })
    .then(response => {
      console.log(response);

      this.model_name = response.data.model_name;
      this.status = response.data.status;
      this.submitted_at = response.data.created_at;

      if (response.data.feedback === null) {
        return;
      }

      if ('error' in response.data.feedback) {
        this.error = true;
        this.error_msg = response.data.feedback.error;
        return;
      }

      this.feedback_ready = true;
      this.feedback = response.data.feedback;
  
      var attack_methods = this.feedback.details.map(x => x.attack_method)
      this.tableHeaders = this.tableHeaders.concat(attack_methods)

      var accuracies = this.feedback.details.map(x => x.accuracy)
      this.tableAccuracies = this.tableAccuracies.concat(accuracies)

      var confidences = this.feedback.details.map(x => x.confidence)
      this.tableConfidences = this.tableConfidences.concat(confidences)

      this.chartData.data.labels = attack_methods
      this.chartData.data.series = [accuracies.map(x => parseFloat(x))]

      console.log(this.chartData)
    })
    .catch(e => {})

  }

};
</script>

<style>
</style>

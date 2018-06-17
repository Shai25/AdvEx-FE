<template>
  <div>

    <div class="row">
      <div class="col-md-6">
        <card>
          <h4 class="card-title">Robustness Score</h4><hr>
          <h2 style="text-align:center">{{data.robustness}}</h2>
        </card>
      </div>
      
      <div class="col-md-6">
        <card>
          <h4 class="card-title">Rating</h4><hr>
          <h2 style="text-align:center">{{data.rating}}</h2>
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
          <p style="font-size:20px">{{data.suggestion}}</p>
        </card>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { ChartCard } from "@/components/index";
import Chartist from 'chartist';

export default {
  components: {
    ChartCard,
  },

  data() {
    return {
      tableHeaders: ["Method", "Original"],
      tableAccuracies: ["Accuracy"],
      tableConfidences: ["Confidence"],

      data: {
        "robustness": "9",
        "rating": "Good",
        "details": {
          "original_accuracy": "98.55%",
          "attack_results": [
            {
              "attack_method": "FGSM",
              "accuracy": "80.05%",
              "confidence": "95%"
            },
            {
              "attack_method": "Basic Iterative Method",
              "accuracy": "92.10%",
              "confidence": "91%"
            },
            {
              "attack_method": "Carlini Wagner",
              "accuracy": "94.10%",
              "confidence": "93%"
            },
            {
              "attack_method": "Momentum Iterative Method",
              "accuracy": "94.10%",
              "confidence": "93.7%"
            },
            {
              "attack_method": "DeepFool",
              "accuracy": "90.10%",
              "confidence": "89%"
            }
          ]
        },
        "suggestion": "Your model can be made more robust by training it with some of the adversarial examples which you can download for free from your dashboard."
      },

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
    var attack_methods = this.data.details.attack_results.map(x => x.attack_method)
    this.tableHeaders = this.tableHeaders.concat(attack_methods)

    var accuracies = this.data.details.attack_results.map(x => x.accuracy)
    this.tableAccuracies.push(this.data.details.original_accuracy)
    this.tableAccuracies = this.tableAccuracies.concat(accuracies)

    this.tableConfidences.push("/")
    this.tableConfidences = this.tableConfidences.concat(this.data.details.attack_results.map(x => x.confidence))

    this.chartData.data.labels = attack_methods
    this.chartData.data.series = [accuracies.map(x => parseFloat(x))]
  }

};
</script>

<style>
</style>

<template>
 <div class="row">
  <div class="col-md-6">
    <card>
      <p>Robustness Score  <button>View Details</button></p><hr>

      <h2 style="text-align:center">{{robustness}}</h2>
      
      
    </card>
  </div>
  <div class="col-md-6">
    <card>
      <p>Rating</p><hr>
      <h2 style="text-align:center">{{rating}}</h2>
    </card>
  </div>
  <div class="col-md-12">
    <card>
      <p>Suggestions</p><hr>
      <p style="font-size:20px;font-weight:bold">{{suggestion}}</p>
    </card>
  </div>
 </div>


 
</template>

<script>
import axios from 'axios';
import { PaperTable } from "@/components";

const columnNames = ["Attack_method", "Accuracy", "Confidence"];
const columnKeys = ["attack_method", "accuracy", "confidence"];

export default {
  components: {
    PaperTable
  },

  data() {
    return {
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
    }
  }
};
</script>

<style>
</style>

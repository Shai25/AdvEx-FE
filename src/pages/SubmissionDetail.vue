<template>
 <div class="row">
  <div class="col-md-12">
    <card>
      <h1>{{robustness}}</h1>
      <h2>{{rating}}</h2>
      <p>{{suggestion}}</p>
    </card>
  </div>
 </div>
</template>

<script>
export default {
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

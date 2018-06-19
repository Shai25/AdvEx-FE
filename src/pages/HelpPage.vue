<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h2>What You Need to Upload</h2><hr>
        <p style="line-height:20px">You need to upload 2 files:</p>
        <p style="text-indent:2em">1. Your Image Classification model (trained on Keras) to be evaluated.</p>
        <p style="text-indent:2em">2. A JSON file that has a mapping of your classes to the ImageNet classes.</p>
        <p style="text-indent:4em">＊  You will need to upload the entire model, including its weight and architecture.</p>
        <p style="text-indent:4em">＊  The best way to do it is to use model.save fucntion. Here is the <a href="https://keras.io/getting-started/faq/#how-can-i-save-a-keras-model">reference</a>.</p>
        <p style="line-height:20px">The dataset that we’ll be using for evaluating your model is the ImageNet dataset. This leads to several restrictions about the models our website can accept.</p>
        <p style="text-indent:2em">＊ We can only evaluate models that are trained using ImageNet dataset.</p>
        <p style="text-indent:2em">＊ We will need additional details about your model. Given below is a description of what you need to provide us with.</p>
        <p style="line-height:20px">Each of the classes in ImageNet have a unique class ID. For example, n01443537 is the ID of goldfish. Thus, along with your model, you need to also upload a JSON file that contains the mapping between your output index and the ImageNet unique class ID. You can find an sample JSON file <a href="https://s3.amazonaws.com/advex/index.json">here</a>.</p>
        <p>The key here should be the class index and the value should be the ImageNet unique class ID.</p>
      </card>
    </div>
      <div class="col-12">
        <card>
          <h2>Attacks Performed On Your Model</h2><hr>
          <p style="line-height:20px">After a thorough literature review of the attack methods of the Cleverhans library, the following attack methods have been chosen to check the robustness of your model.</p>
          <p style="text-indent:2em">＊ <a href="https://arxiv.org/pdf/1412.6572.pdf"> FastGradientMethod</a></p>
          <p style="text-indent:2em">＊ <a href="https://arxiv.org/pdf/1607.02533.pdf"> BasicIterativeMethod</a></p>
          <p style="text-indent:2em">＊ <a href="https://arxiv.org/pdf/1710.06081.pdf"> MomentumIterativeMethod</a></p>
          <p style="text-indent:2em">＊ <a href="https://arxiv.org/abs/1608.04644.pdf"> CarliniWagnerL2</a></p>
          <p style="text-indent:2em">＊ <a href="https://arxiv.org/pdf/1706.06083.pdf"> MadryEtAl</a></p>
          <p style="line-height:20px">A brief decription of each of the attack methods and a link to their published papers have been given below.</p>
          <p style="line-height:20px"><b>FastGradientMethod</b></p>
          <p style="line-height:20px">This is the basic algorithm for generating adversarial examples. It is also called the FastGradientSignMethod.</p>
          <p style="line-height:20px"><b>BasicIterativeMethod</b></p>
          <p style="line-height:20px">It is an extension of the FastGradientMethod in the sense that it is applied multiple times with small step size, and pixel values of intermediate results are clipped after each step to ensure that they are in an ε-neighbourhood of the original image.</p>
          <p style="line-height:20px"><b>CarliniWagnerL2</b></p>
          <p style="line-height:20px">It is an iterative attack that finds adversarial examples on many defenses that are robust to other attacks.</p>
          <p style="line-height:20px"><b>MomentumIterativeMethod</b></p>
          <p style="line-height:20px">By integrating the momentum term into the iterative process for attacks, this attack method can stabilize update directions and escape from poor local maxima during the iterations, resulting in more transferable adversarial examples.</p>
          <p style="line-height:20px"><b>MadryEtAl</b></p>
          <p style="line-height:20px">This performs the Projected Gradient Descent Algorithm to attack the model.A description of the parameters of each of these attack methods can be found here.</p>

         </p>

        </card>
      </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
};

</script>

<style>
</style>
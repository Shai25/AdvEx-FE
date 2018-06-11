<template>
    <div class="row">
      <div class="col-12">
        <card>
          <h1>What You Need to Upload</h1><hr>
          <p style="line-height:20px">You need to upload 2 files:</p>
          <p style="text-indent:2em">1. Your Image Classification model (trained on Keras) to be evaluated.</p>
          <p style="text-indent:2em">2. A JSON file that has a mapping of your classes to the ImageNet classes.</p>
          <p style="line-height:20px">The dataset that we’ll be using for evaluating your model is the ImageNet dataset. This leads to several restrictions about the models our website can accept.</p>
          <p style="text-indent:2em">＊ We can only evaluate models that are trained using ImageNet dataset.</p>
          <p style="text-indent:2em">＊ We will need additional details about your model. Given below is a description of what you need to provide us with.</p>
          <p style="line-height:20px">Each of the classes in ImageNet have a unique class ID. For example, n01443537 is the ID of goldfish. Thus, along with your model, you need to also upload a JSON file that contains the mapping between your output index and the ImageNet unique class ID. An example of this will be:</p>
          <p><font face="verdana" size="2" color="darkslateblue">
          {"0": "n01440764",</br>
              "1": "n01443537", </br>
              "2":  "n01484850", </br>
              "3":  "n01491361", </br>
              "4":  "n01494475", </br>
              "5":  "n01496331" }</font></p>
          <p>The key here should be the class index and the value should be the ImageNet unique class ID.</p>
        </card>
      </div>
      <div class="col-12">
        <card>
          <h1>Attacks Performed On Your Model</h1><hr>
          <p style="line-height:20px">After a thorough literature review of the attack methods of the Cleverhans library, the following attack methods have been chosen to check the robustness of your model.</p>
          <p style="text-indent:2em">＊ FastGradientMethod</p>
          <p style="text-indent:2em">＊ BasicIterativeMethod</p>
          <p style="text-indent:2em">＊ MomentumIterativeMethod</p>
          <p style="text-indent:2em">＊ CarliniWagnerL2</p>
          <p style="text-indent:2em">＊ MadryEtAl</p>
          <p style="line-height:20px">A brief decription of each of the attack methods and a link to their published papers have been given below.</p>
          <p style="line-height:20px"><b>FastGradientMethod</b></p>
          <p style="line-height:20px">Link: <a href="https://arxiv.org/pdf/1412.6572.pdf">https://arxiv.org/pdf/1412.6572.pdf</a> This is the basic algorithm for generating adversarial examples. It is also called the FastGradientSignMethod.</p>
          <p style="line-height:20px"><b>BasicIterativeMethod</b></p>
          <p style="line-height:20px">Link: <a href="https://arxiv.org/pdf/1607.02533.pdf">https://arxiv.org/pdf/1607.02533.pdf</a>It is an extension of the FastGradientMethod in the sense that it is applied multiple times with small step size, and pixel values of intermediate results are clipped after each step to ensure that they are in an ε-neighbourhood of the original image.</p>
          <p style="line-height:20px"><b>CarliniWagnerL2</b></p>
          <p style="line-height:20px">Link: <a href="https://arxiv.org/abs/1608.04644.pdf">https://arxiv.org/abs/1608.04644.pdf</a>It is an iterative attack that finds adversarial examples on many defenses that are robust to other attacks.</p>
          <p style="line-height:20px"><b>MomentumIterativeMethod</b></p>
          <p style="line-height:20px">Link: <a href="https://arxiv.org/pdf/1710.06081.pdf">https://arxiv.org/pdf/1710.06081.pdf</a>By integrating the momentum term into the iterative process for attacks, this attack method can stabilize update directions and escape from poor local maxima during the iterations, resulting in more transferable adversarial examples.</p>
          <p style="line-height:20px"><b>MadryEtAl</b></p>
          <p style="line-height:20px">Link: <a href="https://arxiv.org/pdf/1706.06083.pdf">https://arxiv.org/pdf/1706.06083.pdf</a>This performs the Projected Gradient Descent Algorithm to attack the model.A description of the parameters of each of these attack methods can be found here.</p>

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
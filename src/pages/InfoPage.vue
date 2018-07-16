<template>
  <div class="row">

    <div class="col-12">
      <card>
        <h3>Disclaimer</h3><hr>

        <p style="line-height:20px">We understand that machine learning models could be of significant research and business value. Therefore, we spare no effort to protect your models. The model you selected will be directly uploaded to an Amazon S3 bucket. After our worker has retrieved and evaluated your model, it will be immediately deleted. Furthermore, we will periodically purge any outdated files from S3.</p>

        <p style="line-height:20px">We implement reasonable precautions and follow industry best practices to ensure the safety of our website infrastructure, so that no personal information or valuable data are compromised. For more details, please visit our <a href="https://docs.google.com/document/d/1gCFnAqsdiykMvUm6TygHS8F5gcHtEHx58korWcN29y4/edit?usp=sharing">Privacy Policy</a></p>
      </card>
    </div>


    <div class="col-12">
      <card>
        <h3>What You Need to Upload</h3><hr>

        <p style="line-height:20px">You need to upload 2 files:</p>

        <p style="text-indent:2em">1. Your Image Classification model (trained on Keras) to be evaluated.</p>
        <p style="text-indent:4em">＊  You will need to upload the entire model, including its weights and architecture.</p>
        <p style="text-indent:4em">＊  The best way to do it is to use model.save fucntion. Here is the <a href="https://keras.io/getting-started/faq/#how-can-i-save-a-keras-model">reference</a>.</p>

        <p style="text-indent:2em">2. A JSON file that has a mapping of your classes to the ImageNet classes.</p>

        <p style="line-height:20px">The dataset that we’ll be using for evaluating your model is the ImageNet dataset. This leads to several restrictions about the models our website can accept.</p>
        <p style="text-indent:2em">＊ We can only evaluate models that are trained using ImageNet dataset.</p>
        <p style="text-indent:2em">＊ We will need additional details about your model. Given below is a description of what you need to provide us with.</p>

        <p style="line-height:20px">Each of the classes in ImageNet has a unique class ID. For example, n01443537 is the ID of goldfish. Thus, along with your model, you need to also upload a JSON file that contains the mapping between your output index and the ImageNet unique class ID. You can find an sample JSON file <a href="https://s3.amazonaws.com/advex/imagenet_class_index.json">here</a>.</p>

        <p>The key should be the class index and the value should be the ImageNet unique class ID.</p>
      </card>
    </div>

    <div class="col-12">
      <card>
        <h3>Attacks Performed On Your Model</h3><hr>

        <p style="line-height:20px">We will conduct a black-box attack on your model. In other words, all the images are pre-generated, and we use <a href="https://arxiv.org/abs/1409.1556">VGG16</a> to generate all the adversarial images. Using black-box attacks as well as minimum perturbation images mentioned below, we essentially provide you the most optimistic estimation of your model’s robustness. This means that you’re getting an upper bound on the robustness of your model.</p>

        <p style="line-height:20px">After a thorough literature review of the attack methods of the <a href="https://github.com/tensorflow/cleverhans">Cleverhans library</a>, the following attack methods have been chosen to evaluate the robustness of your model.</p>

        <p style="line-height:20px"><b><a href="https://arxiv.org/pdf/1412.6572.pdf"> FastGradientMethod (FGSM)</a></b></p>
        <p style="line-height:20px">This is the basic algorithm for generating adversarial examples. It is also called the FastGradientSignMethod.</p>

        <p style="line-height:20px"><b><a href="https://arxiv.org/pdf/1607.02533.pdf"> BasicIterativeMethod (I-FGSM)</a></b></p>
        <p style="line-height:20px">It is an extension of the FastGradientMethod in the sense that it is applied multiple times with small step size, and pixel values of intermediate results are clipped after each step to ensure that they are in an ε-neighbourhood of the original image.</p>

        <p style="line-height:20px"><b><a href="https://arxiv.org/pdf/1710.06081.pdf"> MomentumIterativeMethod (MI-FGSM)</a></b></p>
        <p style="line-height:20px">By integrating the momentum term into the iterative process for attacks, this attack method can stabilize update directions and escape from poor local maxima during the iterations, resulting in more transferable adversarial examples.</p>

        <p style="line-height:20px">A description of the parameters of each of these attack methods can be found <a href = "https://cleverhans.readthedocs.io/en/v.2.1.0/source/attacks.html#cleverhans.attacks.Attack"> here</a>.</p>
      </card>
    </div>

    <div class="col-12">
      <card>
        <h3>Inputs to Your Model</h3><hr>

        <p style="line-height:20px">It is not useful to choose the images from the clean dataset that are misclassified by the model. Therefore, we randomly choose 1000 images that belong to the 1000 categories from the <a href = "http://www.image-net.org/download-images"> ILSVRC 2012</a> validation set, which are all correctly classified by the model.</p>

        <p style="line-height:20px">One important thing to mention is that we are finding the minimum perturbation for each image, that will cause the model to misclassify it. To achieve this effect, we perform binary search on each image by first setting the noise level (perturbation) of an image to the middle of the range 0.0 to 1.0. If the image is misclassified, we shrink the upper bound, otherwise, we raise the lower bound and so on and so forth. The number of binary search iterations is set to 10 for every image.</p>

        <p style="line-height:20px">All the images are preprocessed before feeding to the network. Here we simply subtract the images by 127.5 for each pixel value, which results in pixel values in the range from -127.5 to 127.5 for every pixel in every image. It is therefore important to note that the accuracy may vary depending on how you preprocess the images when training your model.</p>
      </card>
    </div>
  </div>
</template>


<script>
</script>

<style>
</style>

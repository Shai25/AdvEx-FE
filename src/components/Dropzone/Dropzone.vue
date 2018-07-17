<style>
  .dropzone {
    /* BFC */
    overflow: hidden;
  }
  .dz-default.dz-message {
    /* hide default msg */
    display: none;
  }
  .dz-preview {
    float: left;
  }
  .upload-msg {
    height: 150px;
    line-height: 150px;
    text-align: center;
    font-size: 1.2em;
    color: #ccc;
    pointer-events: none;
  }
  .upload-form {
    margin: 0 16px;
    height: 150px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  #model_name {
    padding: 9px;
    margin-bottom: 1em;
    border-radius: 5px;
    border: 1px solid #cecece;
    cursor: text;
  }
</style>

<template>
  <form class="dropzone" @submit.prevent="initUpload">
    <div class="upload-msg" v-bind:style="{
      display: fileCnt !== 2 ? 'inline-block' : 'none',
      margin: fileCnt === 0 ? 0 : '0 32px',
      width: fileCnt === 0 ? '100%' : 'initial',
    }">
      Upload your model (.h5) and index (.json) files.
    </div>
    <div class="upload-form" v-bind:style="{
      display: fileCnt === 2 ? 'inline-flex' : 'none',
    }">
      <input type="text" id="model_name" required="required" placeholder="Model Name" v-model="model_name"/>
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
import lambda from './lambda';
import Dropzone from 'dropzone';
import '../../../node_modules/dropzone/dist/dropzone.css';
Dropzone.autoDiscover = false;

export default {
  name: 'dropzone',
  // submit is a function passed from parent
  props: ['submit'],

  data () {
    return {
      fileCnt: 0,
      model_name: '',
      model_key: '',
      index_key: ''
    }
  },

  methods: {
    // Called when submit button is pressed
    initUpload() {
      var file0 = this.dropzone.files[0].name;
      var file1 = this.dropzone.files[1].name;
      var ext0 = file0.split('.').pop();
      var ext1 = file1.split('.').pop();
      if (ext0 == 'h5' && ext1 == 'h5' || ext0 == 'json' && ext1 == 'json') {
        alert('Please make sure that exactly one model file and exactly one index file are selected.');
      }
      else {
        // alert('Files are not actually uploaded because this is a demo.');
        setTimeout(() => this.dropzone.processFile(this.dropzone.files[0]));
        setTimeout(() => this.dropzone.processFile(this.dropzone.files[1]));
      }
    },

    // Called when uploading is finished (triggered by queuecomplete event)
    submitJob() {
      this.submit(this.model_name, this.model_key, this.index_key);
    }
  },

  mounted () {
    const vm = this
    let options = {
      // The URL will be changed for each new file being processing
      url: '/',
      // Since we're going to do a `PUT` upload to S3 directly
      method: 'put',
      // Hijack the xhr.send since Dropzone always upload file by using formData
      // ref: https://github.com/danialfarid/ng-file-upload/issues/743
      sending (file, xhr) {
        let _send = xhr.send
        xhr.send = () => {
          _send.call(xhr, file);
        }
      },
      // Timeout of 30 minutes
      timeout: 1800000,
      // Upload one file at a time since we're using the S3 pre-signed URL scenario
      parallelUploads: 1,
      uploadMultiple: false,
      // Content-Type should be included, otherwise you'll get a signature
      // mismatch error from S3. We're going to update this for each file.
      header: '',
      // We're going to process each file manually (see `accept` below)
      autoProcessQueue: true,
      // Show remove buttons
      addRemoveLinks: true,
      // Limit file extension (comma-separated list as string)
      acceptedFiles: ".h5,.json",
      // Limit # of files      
      maxFiles: 2,
      // Limit size of files
      maxFilesize: 1024,
      // Make the zone unclickable after 2 files have been selected
      clickable: vm.fileCnt < 2,
      
      init () {
        // Disable multiple select to avoid bypassing checks for # of files
        this.hiddenFileInput.removeAttribute('multiple');

        // Listener for removing files
        this.on('removedfile', (file) => {
          vm.fileCnt = this.files.length;
        });

        // Wait for uploading to complete, then submit the request
        this.on('queuecomplete', () => {
          // Check whether it's the failure case
          if (!(this.files[0].status != Dropzone.SUCCESS && this.getQueuedFiles().length <= 1)) {
            vm.submitJob();
          }
        });
      },
      // Request a pre-signed uploading URL when a file is accepted
      accept (file, done) {
        vm.fileCnt = this.files.length;
        var ext = file.name.split('.').pop();
        // Rename the file to its UUID to avoid conflicts on S3
        var uploadName = file.upload.uuid + '.' + ext;
        if (ext == 'h5') {
          vm.model_key = uploadName;
        }
        else {
          vm.index_key = uploadName;
        }

        lambda.getSignedURL(uploadName, file.type)
          .then((url) => {
            file.uploadURL = url;
            // done()
            // Manually process each file
            // setTimeout(() => vm.dropzone.processFile(file))
          })
          .catch((err) => {
            done('Failed to get an S3 signed upload URL', err)
          })
      }
    }
    // Instantiate Dropzone
    this.dropzone = new Dropzone(this.$el, options)
    vm.dropzone.on('processing', (file) => {
      vm.dropzone.options.url = file.uploadURL;
    })
  }

}
</script>

<style lang="css">
form.dropzone {
  transition: all 0.2s linear;
  border: 2px dashed #ccc;
  background-color: #fafafa;
  min-height: initial;
}

form.dropzone:hover {
  border-color: #3498db;
  background-color: #fff;
}

form.dropzone:hover .dz-message .dropzone-title {
  color: #3498db;
}

form.dropzone .dz-message {
  color: #666;
}

form.dropzone .dz-message span {
  line-height: 1.8;
  font-size: 13px;
  letter-spacing: 0.4px;
}

form.dropzone .dz-message span span.dropzone-title {
  display: block;
  color: #888;
  font-size: 1.25em;
}

form.dropzone .dz-message span span.dropzone-info {
  display: block;
  color: #a8a8a8;
}

form.dz-max-files-reached {
  pointer-events: none;
  cursor: default;
}
</style>

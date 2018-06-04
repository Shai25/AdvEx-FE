<template>
    <div class="row">
      <div class="col-12">
        <card>
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="data" :columns="columns" :headers="headers">

            </paper-table>
          </div>
        </card>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import { PaperTable } from "@/components";

// TODO: link submission ID to detail page
// TODO: format status
// TODO: format timestamp
const columnNames = ["Submission ID", "Model Name", "Status", "Created At"];
const columnKeys = ["submission_id", "model_name", "status", "created_at"];

export default {
  components: {
    PaperTable
  },

  data() {
    return {
      headers: [...columnNames],
      columns: [...columnKeys],
      data: []
    };
  },

  created() {
    // TODO: get API from config
    axios.get('https://private-8bf72-advex.apiary-mock.com/user/1/submissions')
    .then(response => {
      console.log(response.data.submissions)
      this.data = response.data.submissions
    })
    .catch(e => {
    })
  }
};
</script>

<style>
</style>

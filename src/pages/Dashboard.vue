<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Dropzone-->
    <div class="row">
      <div class="col-md-12">
        <card>
          <dropzone>
          </dropzone>
        </card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-12">
        <chart-card title="Degraded Accuracy"
                    chart-type="Bar"
                    :chart-data="scoreChart.data"
                    :chart-options="scoreChart.options">
          <span slot="footer">
            <!-- <i class="ti-reload"></i> Updated 3 minutes ago -->
          </span>
          <!-- <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div> -->
        </chart-card>
      </div>

    </div>

  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";
import Dropzone from '@/components/Dropzone/Dropzone';
import Chartist from 'chartist';

export default {
  components: {
    StatsCard,
    ChartCard,
    Dropzone
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Space Used",
          value: "105GB",
          footerText: "Last hour",
          footerIcon: "ti-timer"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Models Running",
          value: "23",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Money Saved",
          value: "$1,345",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "info",
          icon: "ti-heart",
          title: "Model Likes",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ],
      scoreChart: {
        data: {
          labels: [
            "FGSM", "Basic Iterative Method", "Carlini Wagner", "Momentum Iterative Method", "DeepFool"
          ],
          series: [
            [80.05, 91.1, 94.1, 94.1, 90.1]
          ]
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
    };
  }
};
</script>
<style>
</style>

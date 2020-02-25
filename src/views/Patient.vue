<template>
  <div class="patinet">
    <div class="p-2">
      <div class="d-flex ai-center pb-1">
        <img src="../assets/images/info-icon.png" alt height="27px" />
        <div class="text-blue flex-1">确诊患者周边人口</div>
        <div
          class="fs-xs text-grey bg-blue-2 d-flex p-1 cp"
          @click="popBox = true"
        >
          <div class="mx-1">
            <img
              src="../assets/images/tip-icon.png"
              alt
              height="13.98px;width:13.98px"
            />
          </div>
          <span class="mx-1">数据说明</span>
        </div>
      </div>
      <!-- end -->
      <div class="tool-map mx-2 pt-2 pl-1 pr-3">
        <div class="fs-xs text-grey pb-1">2km人口密度</div>
        <div class="fs-xxs text-grey">
          <i></i>
          <span>0-50</span>
        </div>
        <div class="fs-xxs text-grey">
          <i></i>
          <span>50-100</span>
        </div>
        <div class="fs-xxs text-grey">
          <i></i>
          <span>100-200</span>
        </div>
        <div class="fs-xxs text-grey">
          <i></i>
          <span>200-300</span>
        </div>
        <div class="fs-xxs text-grey">
          <i></i>
          <span>300-400</span>
        </div>
        <div class="fs-xxs text-grey">
          <i></i>
          <span>400-500</span>
        </div>
        <div class="fs-xxs text-grey">
          <i></i>
          <span>500-630</span>
        </div>
      </div>
      <!-- end -->
      <div id="heatMap" class="heatMap mb-2"></div>
      <div class="d-flex ai-center pb-1 bt">
        <img src="../assets/images/info-icon.png" alt height="27px" />
        <div class="text-blue flex-1">周边人口统计</div>
      </div>
      <!-- end -->
      <div class="my-3">
        <swiper :options="swiperOption">
          <swiper-slide>
            <div class="chart-block patient-bar-01" id="patient-bar-10"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="chart-block" id="patient-bar-02"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="chart-block patient-bar-03" id="patient-bar-11"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- end -->
      <div class="pop-box d-flex jc-center ai-center" v-show="popBox">
        <div class="pop d-flex flex-column ai-center">
          <div class="content bg-white p-3">
            <div class="text-center text-blue">数据说明</div>
            <div class="text-black pt-2 fs-md">
              依据百度慧眼地图于2020年1月整理的宁波市常住人口，按照100米网格分析，本图展示的是宁波确诊病例2公里范围内的常住人口数量及热力分布图，图中蓝点为确诊病例位置。
            </div>
          </div>
          <i></i>
          <div class="close" @click="popBox = false">
            <img src="../assets/images/close-icon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.chinatmsproviders'
import * as esri from 'esri-leaflet'
import {
  getPatientBarOne,
  getPatientBarTwo,
  getPatientBarThree
} from '../util/allCharts'

export default {
  data() {
    return {
      map: null,
      popBox: false,
      map_config: {
        zoom: 9,
        center: [29.9318, 121.4551],
        minZoom: 6,
        maxZoom: 18,
        key: 'eb35dddb3aa33c7a8fb4218b39d1e424'
      },
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    initMap() {
      let map = L.map('heatMap', {
        drawControl: true,
        zoomControl: false,
        opacity: 0.1,
        attributionControl: false,
        center: this.map_config.center,
        zoom: this.map_config.zoom
      })
      L.tileLayer
        .chinaProvider('TianDiTu.Normal.Map', {
          maxZoom: this.map_config.maxZoom,
          minZoom: this.map_config.minZoom,
          key: this.map_config.key
        })
        .addTo(map)
      L.tileLayer
        .chinaProvider('TianDiTu.Normal.Annotion', {
          maxZoom: this.map_config.maxZoom,
          minZoom: this.map_config.minZoom,
          key: this.map_config.key
        })
        .addTo(map)

      esri
        .dynamicMapLayer({
          url:
            'https://rl.nbsghy.com:6443/arcgis/rest/services/RKFB_RLT_2KM_0218/MapServer',
          opacity: 0.8
        })
        .addTo(map)
    },
    async getPatientCharts() {
      const res = await this.$http.get('chartMock.json')
      var data = res.data.shift()
      var xData1 = data.pBar01.xData
      var yData1 = data.pBar01.yData

      var xData2 = data.pBar02.xData
      var yData2 = data.pBar02.yData

      var xData3 = data.pBar03.xData
      var yData3 = data.pBar03.yData

      document.querySelectorAll('.patient-bar-01').forEach(v => {
        // console.log(v)
        getPatientBarOne(xData1, yData1, v)
      })
      getPatientBarTwo(xData2, yData2)
      document.querySelectorAll('.patient-bar-03').forEach(v => {
        // console.log(v)
        getPatientBarThree(xData3, yData3, v)
      })
    }
  },
  mounted() {
    // Provider(L); // 挂载插件
    this.initMap()
    this.getPatientCharts()
  }
}
</script>

<style lang="scss">
.patinet {
  .heatMap {
    width: 100%;
    height: 20.8125rem; /* 333/16 */
  }
  .tool-map {
    position: absolute;
    z-index: 998;
    margin-top: 8rem;
    background: #fff;
    div {
      margin-bottom: -3px;
      i {
        display: inline-block;
        width: 1.25rem /* 20/16 */;
        height: 0.8125rem /* 13/16 */;
        background: #39a800;
        margin-right: 0.3125rem; /* 5/16 */
      }
    }
    div:nth-child(3) i {
      background: #6dc302;
    }
    div:nth-child(4) i {
      background: #b1e200;
    }
    div:nth-child(5) i {
      background: #fdff00;
    }
    div:nth-child(6) i {
      background: #ffaa00;
    }
    div:nth-child(7) i {
      background: #ff5500;
    }
    div:nth-child(8) i {
      background: #ff0000;
    }
  }
  .chart-block {
    width: 100%;
    height: 10.9375rem /* 175/16 */;
  }
  .pop-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(64, 64, 94, 0.6);
    z-index: 999;
  }
  .pop {
    z-index: 9999;
    width: 14.875rem /* 238/16 */;
    // height: 17.3125rem /* 261/16 */;
    line-height: 25px;
    .content {
      border-radius: 10px;
    }
    i {
      display: inline-block;
      height: 40px;
      width: 2px;
      background: white;
    }
    .close {
      img {
        height: 1.78125rem /* 28.5/16 */;
        width: 1.78125rem; /* 28.5/16 */
      }
    }
  }
}
</style>

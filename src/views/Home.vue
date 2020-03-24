<template>
  <div class="home">
    <div class="p-2">
      <div
        class="text-white fs-md"
      >数据截至{{times.split('-')[0]}}年{{times.split('-')[1]}}月{{times.split('-')[2]}}日24时</div>
      <div class="d-flex jc-between py-2" v-if="headMock[0]">
        <div class="item">
          <div class="text-red text-center fs-xl fs-weight">{{ headMock[0].rs }}</div>
          <div class="bg-primary fs-md py-1 px-3 my-2">确诊人数</div>
          <div class="text-grey fs-md text-center">
            昨日
            <span class="text-red fs-md">{{ headMock[0].zr }}</span>
          </div>
        </div>
        <div class="item">
          <div class="text-grey text-center fs-xl fs-weight">{{ headMock[1].rs }}</div>
          <div class="bg-primary fs-md py-1 px-3 my-2">死亡人数</div>
          <div class="text-grey fs-md text-center">
            昨日
            <span>{{ headMock[1].zr }}</span>
          </div>
        </div>
        <div class="item">
          <div class="text-green text-center fs-xl fs-weight">{{ headMock[2].rs }}</div>
          <div class="bg-primary fs-md py-1 px-3 my-2">治愈人数</div>
          <div class="text-grey fs-md text-center">
            昨日
            <span class="text-green fs-md">{{ headMock[2].zr }}</span>
          </div>
        </div>
        <div class="item">
          <div class="text-yellow text-center fs-xl fs-weight">{{ headMock[3].rs }}</div>
          <div class="bg-primary fs-md py-1 px-3 my-2">密切接触</div>
          <div class="text-grey fs-md text-center">
            昨日
            <span class="text-yellow fs-md">{{ headMock[3].zr }}</span>
          </div>
        </div>
      </div>
      <!-- end -->
      <div class="d-flex ai-center bt pb-1">
        <img src="../assets/images/info-icon.png" alt height="27px" />
        <div class="text-blue flex-1">疫情地图</div>
        <div class="fs-xs text-grey">信息来源：宁波市卫生健康委员会</div>
      </div>
      <!-- end-->
      <div class="charts-tab fs-sm ml-2 mt-5">
        <div
          @click="active('quezhenMap')"
          class="tabs bt"
          :class="{ active: actives == 'quezhenMap' }"
        >确诊发布</div>
        <div
          class="tabs bt"
          :class="{ active: actives == 'fiveMap' }"
          @click="active('fiveMap')"
        >风险图</div>
        <div
          class="tabs"
          :class="{ active: actives == 'returnMap' }"
          @click="active('returnMap')"
        >复工图</div>
      </div>
      <!-- end -->
      <div class="tool-map mx-2">
        <div class="quezhen" v-show="actives == 'quezhenMap'">
          <div class="fs-xxs text-grey">确诊人数</div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>≥50人</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>40-49人</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>30-39人</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>20-29人</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>10-19人</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>1-9人</span>
          </div>
        </div>
        <div class="fiveMap" v-show="actives == 'fiveMap'">
          <div class="fs-xxs text-grey">风险等级</div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>高风险</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>较高风险</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>中风险</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>较低风险</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>低风险</span>
          </div>
          <div
            class="fs-xxs text-grey mt-2"
          >数据截至{{times.split('-')[0]}}年{{times.split('-')[1]}}月{{times.split('-')[2]}}日24时</div>
        </div>
        <div class="returnMap" v-show="actives == 'returnMap'">
          <div class="fs-xxs text-grey">复工率(%)</div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>80-100</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>60-80</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>40-60</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>20-40</span>
          </div>
          <div class="fs-xxs text-grey">
            <i></i>
            <span>0-20</span>
          </div>
          <div
            class="fs-xxs text-grey mt-2"
          >数据截至{{times.split('-')[0]}}年{{times.split('-')[1]}}月{{times.split('-')[2]}}日24时</div>
        </div>
      </div>
      <!-- end -->
      <div id="riskMap" class="riskMap"></div>
      <!-- end -->
      <div class="d-flex ai-center bt pb-1">
        <img src="../assets/images/info-icon.png" alt height="27px" />
        <div class="text-blue flex-1">疫情趋势图</div>
      </div>
      <div class="my-3">
        <swiper :options="swiperOption">
          <swiper-slide>
            <div class="chart-block chart-bar-01" id="chart-bar-01"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="chart-block" id="chart-line-01"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="chart-block" id="chart-line-02"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="chart-block" id="chart-bar-02"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="chart-block chart-line-03" id="chart-line-03"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- end -->
    </div>
  </div>
</template>

<script>
import {
  drawMap,
  renderMap2,
  renderMap3,
  getChartsBarOne,
  getChartsLineOne,
  getChartsLineTwo,
  getChartsLineThree,
  getChartsBarTwo
} from '../util/allCharts'

export default {
  name: 'Home',
  data() {
    return {
      times: '',
      actives: 'quezhenMap',
      QZData: [],
      FiveData: [],
      ReturnData: [],
      headMock: [],
      chartMock: [],
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
    async initMap() {
      const res1 = await this.$http.get('mockData')
      drawMap(res1.data)
      this.FiveData = []
      this.ReturnData = []
      for (let i = 0; i < res1.data.length; i++) {
        // arr.push(res1.data[i].value)
        this.FiveData.push({
          name: res1.data[i].name,
          value: res1.data[i].riskLevel,
          num: res1.data[i].value
        })
        this.ReturnData.push({
          name: res1.data[i].name,
          value: res1.data[i].ReturnRate,
          num: res1.data[i].value
        })
      }
    },
    async fetch() {
      const headres = await this.$http.get('headMock')
      this.headMock = headres.data
      const time = await this.$http.get('timePick')
      this.times = time.data.timeArr.shift()
      const res = await this.$http.get('chartMock')
      this.chartMock = res.data
      this.getChartsInfo()
    },
    active(index) {
      this.actives = index
      if (index == 'fiveMap') {
        renderMap2(this.FiveData)
      } else if (index == 'returnMap') {
        renderMap3(this.ReturnData)
      } else {
        this.initMap()
      }
      console.log(1)
    },
    getChartsInfo() {
      const data = this.chartMock.shift()
      const xData = data.bar01.xData
      const yData = data.bar01.yData
      const yData1 = data.bar01.yData1

      const barxData2 = data.pie01.leg
      const baryData2 = data.pie01.yData

      const linexData1 = data.line01.xData
      const lineyData1 = data.line01.yData
      const lineyData12 = data.line01.yData1

      const linexData2 = data.line02.xData
      const lineyData2 = data.line02.yData

      const linexData3 = data.line03.xData
      const lineyData3 = data.line03.yData

      document.querySelectorAll('.chart-bar-01').forEach(v => {
        getChartsBarOne(xData, yData, yData1, v)
      })
      getChartsBarTwo(barxData2, baryData2)
      getChartsLineOne(linexData1, lineyData1, lineyData12)
      getChartsLineTwo(linexData2, lineyData2)

      document.querySelectorAll('.chart-line-03').forEach(v => {
        getChartsLineThree(linexData3, lineyData3, v)
      })
    }
  },
  mounted() {
    this.initMap()
    let that = this
    window.seeDeatils = (e, name) => {
      that.$router.push({
        path: `/detail/${name}` //需要这样跳转
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
.home {
  .riskMap {
    width: 100%;
    height: 25rem; /* 400/16 */
  }
  .tool-map {
    position: absolute;
    margin-top: 16rem;
    .quezhen {
      div {
        i {
          display: inline-block;
          width: 1.25rem /* 20/16 */;
          height: 0.8125rem /* 13/16 */;
          background: #ff3b07;
          margin-right: 0.3125rem; /* 5/16 */
        }
      }
      div:nth-child(3) i {
        background: #f55b38;
      }
      div:nth-child(4) i {
        background: #f1745b;
      }
      div:nth-child(5) i {
        background: #ff9f8c;
      }
      div:nth-child(6) i {
        background: #fcc3b2;
      }
      div:nth-child(7) i {
        background: #f1e4e1;
      }
    }
    .fiveMap {
      div {
        i {
          display: inline-block;
          width: 1.25rem /* 20/16 */;
          height: 0.8125rem /* 13/16 */;
          background: #ff3b07;
          margin-right: 0.3125rem; /* 5/16 */
        }
      }
      div:nth-child(3) i {
        background: #ff7f00;
      }
      div:nth-child(4) i {
        background: #ffff00;
      }
      div:nth-child(5) i {
        background: #51c5ff;
      }
      div:nth-child(6) i {
        background: #91ff8f;
      }
    }
    .returnMap {
      div {
        i {
          display: inline-block;
          width: 1.25rem /* 20/16 */;
          height: 0.8125rem /* 13/16 */;
          background: #ff3b07;
          margin-right: 0.3125rem; /* 5/16 */
        }
      }
      div:nth-child(3) i {
        background: #ff7f00;
      }
      div:nth-child(4) i {
        background: #ffff00;
      }
      div:nth-child(5) i {
        background: #51c5ff;
      }
      div:nth-child(6) i {
        background: #91ff8f;
      }
    }
  }
}

.charts-tab {
  width: 1.875rem /* 30/16 */;
  position: absolute;
  height: 12.5rem; /* 200/16 */
  border-radius: 2px;
  border: 1px solid #206cea;
  //不加z-index  点击不到  样式层级得问题  这个要注意
  z-index: 9;
}
.tabs {
  height: 33.4%;
  writing-mode: vertical-lr;
  text-align: center;
  padding: 0.3125rem; /* 5/16 */
  &.active {
    background: #206cea;
  }
}

.chart-block {
  width: 100%;
  height: 10.9375rem /* 175/16 */;
}
.swiper-container {
  padding-bottom: 1.5rem; /* 15/16 */
  .swiper-pagination-bullet {
    background: #692856;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: #ff3b07;
    }
  }
  .swiper-button-prev {
    height: 1rem;
    top: 55%;
    left: 2px;
    right: auto;
    text-align: center;
    &::after {
      font-size: 0.32rem;
      color: #dfd9f0;
    }
  }
  .swiper-button-next {
    height: 1rem;
    top: 55%;
    right: 2px;
    left: auto;

    text-align: center;
    &::after {
      font-size: 0.32rem;
      color: #dfd9f0;
    }
  }
}
</style>

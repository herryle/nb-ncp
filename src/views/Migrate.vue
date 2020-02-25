<template>
  <div class="migrate p-2 ">
    <div class="d-flex ai-center bt pb-1">
      <img src="../assets/images/info-icon.png" alt height="27px" />
      <div class="text-blue flex-1">迁入宁波来源地</div>
      <div class="select-box fs-md mr-3">
        <div class="select-div" @click="boxshow = !boxshow" v-show="boxshow">
          2020-02-18
          <span class="ml-2"
            ><img src="../assets/images/select-icon.png" alt=""
          /></span>
        </div>
        <div class="select-list bg-black-blue py-1 px-3 mt-3" v-show="boxshow">
          <ul class="">
            <li class="bt p-2 fs-sm text-pink" v-for="n in 10" :key="n">
              2020-02-20
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="moveMap" id="moveMap"></div>
    <div class="d-flex ai-center bt ">
      <img src="../assets/images/info-icon.png" alt height="27px" />
      <div class="text-blue flex-1">迁入来源地分析</div>
      <div class="fs-xs text-grey">信息来源：百度慧眼</div>
    </div>
    <!-- end -->
    <div class="mt-3">
      <!-- v-if得作用是让数据全部加载完成  然后再去渲染swiper组件 -->
      <swiper :options="swiperOption" v-if="province.length > 0">
        <swiper-slide>
          <div>
            <div class="text-grey pt-0 pb-2">省级别排名</div>
            <div class="d-flex jc-between bg-blue-3 p-2 text-pink">
              <div class="fs-md">名称</div>
              <div class="fs-md">占比</div>
              <div class="fs-md">确诊人数</div>
            </div>
            <div
              class="d-flex text-grey fs-xs  jc-between  py-2 strip"
              v-for="(item, index) in province"
              :key="index"
            >
              <div class="">
                <span class="index-icon text-white text-center mr-2 ">{{
                  index
                }}</span>
                <span>{{ item.name }}</span>
              </div>
              <div class="scale d-flex jc-between pr-2">
                <div
                  class="bar"
                  :style="'width:' + item.scale * 2 + '%;'"
                ></div>
                <span class="num">{{ item.scale }} %</span>
              </div>
              <div class="people mr-2">{{ item.value }}</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="text-grey pt-0 pb-2">市级别排名</div>
            <div class="d-flex jc-between bg-blue-3 p-2 text-pink">
              <div class="fs-md">名称</div>
              <div class="fs-md">占比</div>
              <div class="fs-md">确诊人数</div>
            </div>
            <div
              class="d-flex text-grey fs-xs  jc-between  py-2 strip"
              v-for="(item, index) in city"
              :key="index"
            >
              <div class="">
                <span class="index-icon text-white text-center mr-2 ">{{
                  index
                }}</span>
                <span>{{ item.name }}</span>
              </div>
              <div class="scale d-flex jc-between pr-2">
                <div
                  class="bar"
                  :style="'width:' + item.scale * 5 + '%;'"
                ></div>
                <span class="num">{{ item.scale }} %</span>
              </div>
              <div class="people mr-2">{{ item.value }}</div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <!-- end -->
    <div class="d-flex ai-center bt ">
      <img src="../assets/images/info-icon.png" alt height="27px" />
      <div class="text-blue flex-1">迁入宁波趋势</div>
    </div>
    <div class="chart-block" id="migrateChart"></div>
  </div>
</template>

<script>
import {
  renderMoveMap,
  chinaGeoCoordMap,
  getChartsLineMigrate
} from '../util/allCharts'
export default {
  data() {
    return {
      num: 20,
      date: '2020-02-20',
      city: [],
      boxshow: false,
      province: [],
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
    async initMoveMap(date) {
      const cityMockData = await this.$http.get('cityMock.json')
      const data = cityMockData.data
      let res = []
      if (data[date] && data[date]['province']) {
        res = data[date]['province']
      }
      const chinaDatas = []
      for (let key in chinaGeoCoordMap) {
        if (key != '宁波') {
          const index = res.findIndex(item => item.name.indexOf(key) > -1)
          if (index == -1) {
            chinaDatas.push([{ name: key, value: 0 }])
          } else {
            chinaDatas.push([{ name: key, value: res[index].scale }])
          }
        }
      }
      renderMoveMap(chinaDatas)
      this.getMigrationChart()
    },
    async getMigrationChart() {
      const res = await this.$http.get('chartMock.json')
      const data = res.data.shift()
      const xData1 = data.line05.xData
      const yData1 = data.line05.yData
      const yData2 = data.line05.yData1
      getChartsLineMigrate(xData1, yData1, yData2)
    },
    async getCityData(index) {
      const res = await this.$http.get('cityMock.json')
      console.log(res.data[index])
      this.city = res.data[index].city
      this.province = res.data[index].province
    }
  },
  created() {
    this.getCityData('2020-02-20')
  },
  mounted() {
    this.initMoveMap(this.date)
  }
}
</script>

<style lang="scss">
.migrate {
  .select-box {
    img {
      width: 0.8125rem /* 13/16 */;
      height: 0.4375rem; /* 7/16 */
    }
    .select-list {
      position: absolute;
      z-index: 999;
      height: 7.3125rem; /* 117/16 */
      overflow: auto;
    }
  }
  .moveMap {
    width: 100%;
    height: 20.875rem; /* 334/16 */
  }
  .index-icon {
    background: #ff3b07;
    height: 0.90625rem /* 14.5/16 */;
    width: 0.90625rem; /* 14/16 */
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }
  .swiper-container {
    padding-bottom: 2.3rem;
  }
  .strip {
    border-bottom: 1px solid #4b3496;
    .scale {
      width: 11.25rem /* 180/16 */;
      background: #17207c;
      .bar {
        background: #1da2ff;
        // width: 50%;
        height: 100%;
      }
      .num {
        float: right;
      }
    }
    .people {
      min-width: 2rem;
    }
  }
}
</style>

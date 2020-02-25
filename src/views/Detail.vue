<template>
  <div class="detail">
    <div class="header">
      <div class="d-flex jc-between fs-lg px-3 pt-3">
        <div class="text-red">{{ name }}病例详情</div>
        <!-- &lt; 小于号得转义 -->
        <router-link tag="div" to="/" class="text-blue cp"
          >&lt;&lt;返回</router-link
        >
      </div>
      <div class="d-flex jc-between mt-3 px-3" v-if="model.head">
        <div class="item">
          <div class="text-red text-center fs-xl fs-weight">
            {{ model.head.qzrs }}
          </div>
          <div class="bg-primary fs-md py-1 px-3 my-2">确诊人数</div>
          <div class="text-grey fs-md text-center">
            昨日
            <span class="text-red fs-md"> {{ model.head.qzrszr }} </span>
          </div>
        </div>
        <div class="item">
          <div class="text-grey text-center fs-xl fs-weight">
            {{ model.head.swrs }}
          </div>
          <div class="bg-primary fs-md py-1 px-3 my-2">死亡人数</div>
          <div class="text-grey fs-md text-center">
            昨日
            <span> {{ model.head.swrszr }}</span>
          </div>
        </div>
        <div class="item">
          <div class="text-green text-center fs-xl fs-weight">
            {{ model.head.zyrs }}
          </div>
          <div class="bg-primary fs-md py-1 px-3 my-2">治愈人数</div>
          <div class="text-grey fs-md text-center">
            昨日
            <span class="text-green fs-md">{{ model.head.zyrszr }}</span>
          </div>
        </div>
      </div>
      <!-- end -->
      <div class="d-flex ai-center bt pb-1 mt-2">
        <img src="../assets/images/info-icon.png" alt height="27px" />
        <div class="text-blue flex-1">病例信息</div>
        <div class="fs-xs text-grey mr-2">信息来源：宁波市卫生健康委员会</div>
      </div>
    </div>
    <!-- end -->
    <div class="info">
      <div
        class="text-pink pt-2 px-3 fs-md"
        v-for="(item, index) in model.info"
        :key="index"
      >
        <span class="text-blue">{{ index + 1 }} .</span>
        {{ item }}
      </div>
    </div>
    <!-- end -->
    <div class="tip text-red fs-md text-center p-3">
      <span class="p-3">下滑查看更多信息</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('detailsData.json')
      this.model = res.data.shift()[this.name]
      console.log(this.model)
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
.detail {
  .header {
    position: sticky;
    top: 0;
    background: #15005b;
  }
  .info {
    max-height: calc(100% - 5.4375rem /* 87/16 */);
  }
  .tip {
    position: sticky;
    bottom: 2.23rem /* 36/16 */;
    background: #15005b;
  }
}
</style>

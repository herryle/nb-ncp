<template>
  <div class="main">
    <div class="header">
      <div class="topbar"></div>
      <div class="nav d-flex bg-blue-1 jc-around fs-lg pt-2 pb-0">
        <div class="nav-item pb-2" :class="{ active: actives == 'home' }" @click="active('home')">
          <router-link tag="div" to="/home">疫情动态</router-link>
        </div>
        <div
          class="nav-item pb-2"
          :class="{ active: actives == 'patient' }"
          @click="active('patient')"
        >
          <router-link tag="div" to="/patient">患者周边</router-link>
        </div>
        <div
          class="nav-item pb-2"
          :class="{ active: actives == 'migrate' }"
          @click="active('migrate')"
        >
          <router-link tag="div" to="/migrate">人口迁徙</router-link>
        </div>
      </div>
    </div>
    <div>
      <keep-alive>
        <router-view :key="$route.path"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      actives: 'home'
    }
  },
  methods: {
    active(index) {
      this.actives = index
    }
  },
  created() {
    this.active(
      // 获取路由path
      String(this.$route.path)
        .split('/')
        .pop()
    )
  }
}
</script>

<style lang="scss">
.main {
  @media screen and (min-width: 1000px) {
    .topbar {
      display: none;
    }
  }
  .header {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .topbar {
    width: 100%;
    height: 5.3125rem /* 85/16 */;
    background: url(../assets/images/header.jpg) top left no-repeat;
    background-size: 100% 100%;
  }
}
</style>

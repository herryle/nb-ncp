<template>
  <div class="footer">
    <div class="text-center fs-xs bg-black-blue py-2 text-grey footer-title">
      <span class="mr-2"><img src="../assets/images/logo.png" alt=""/></span>
      <span>宁波市规划设计研究院</span>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  position: sticky;
  bottom: 0;
  z-index: 999;
  .footer-title span > img {
    width: 1.25rem /* 20/16 */;
    height: 1.25rem; /* 20/16 */
  }
}
</style>

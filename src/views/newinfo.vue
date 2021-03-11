<template>
  <div class="layout">
    <ul class="viewList" :style="{ transform: `translateY(${distance}px)` }">
      <li class="banner">
        <div class="homeInfo" :id="index + 1 == 1 ? 'blowUp' : ''">
          <h1>PERSONAL RESUNME</h1>
          <p>
            <span>个</span>|
            <span>人</span>|
            <span>简</span>|
            <span>历</span>
          </p>
        </div>
      </li>
      <li class="">
        <div class="info" :id="index + 1 == 2 ? 'blowIn' : ''">222</div>
      </li>
      <li class="">
        <div class="info" :id="index + 1 == 3 ? 'blowIn' : ''">333</div>
      </li>
      <li class="">
        <div class="info" :id="index + 1 == 4 ? 'blowIn' : ''">444</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "newinfo",
  data() {
    return {
      msg: "个人信息",
      layoutHeight: "", // 视口高度
      distance: 0, // 滚动距离
      index: 0, //页码
      maxIndex: "", //总页数
      startY: "", // touchstart初始距离
      endY: "", // touchend初始距离
    };
  },
  methods: {
    addListener() {
      //监听鼠标滚轮
      document.body.addEventListener("wheel", this.scrollBarWheel);
      //监听键盘
      document.body.addEventListener("keydown", this.scrollBarWheel);
      //监听移动端触摸
      document.body.addEventListener(
        "touchstart",
        (e) => {
          this.startY = e.touches[0].clientY;
        },
        false
      );
      document.body.addEventListener(
        "touchmove",
        (e) => {
          this.endY = e.touches[0].clientY;
        },
        false
      );
      document.body.addEventListener(
        "touchend",
        () => {
          console.log("end");
          this.removeListener();
          this.scrollBarWheel("touch");
        },
        false
      );
    },
    removeListener() {
      document.body.removeEventListener("wheel", () => {});
      document.body.removeEventListener("keydown", () => {});
      document.body.removeEventListener("touchstart", () => {});
      document.body.removeEventListener("touchmove", () => {});
      document.body.removeEventListener("touchend", () => {});
    },
    scrollBarWheel(e) {
      // 鼠标滚轮
      if (e.wheelDelta) {
        this.turnPage(e.wheelDelta > 0 ? "up" : "down");
        this.removeListener();
        // 键盘翻页
      } else if (e.keyCode) {
        this.removeListener();
        this.turnPage(
          e.keyCode == 38 || e.keyCode == 33
            ? "up"
            : e.keyCode == 40 || e.keyCode == 34
            ? "down"
            : "无效"
        );
        // 移动端touch事件
      } else if (e == "touch") {
        this.removeListener();
        if (this.startY - this.endY > 80) {
          console.log("下一页");
          this.turnPage("down");
        } else if (this.startY - this.endY < -80) {
          console.log("上一页");
          this.turnPage("up");
        }
      }
    },
    turnPage(type) {
      if (type == "up") {
        if (this.index > 0) {
          this.index--;
          this.distance = -this.layoutHeight * this.index;
          console.log("up", this.distance, this.index);
        }
      } else if (type == "down") {
        if (this.index < this.maxIndex) {
          this.index++;
          this.distance = -this.layoutHeight * this.index;
          console.log("down", this.distance, this.index);
        }
      } else {
        console.log("无效");
      }
    },
  },
  mounted() {
    // 移动端禁止上下拉动页面
    document.body.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
    this.addListener();
    this.layoutHeight = document.getElementsByClassName(
      "layout"
    )[0].clientHeight;
    this.maxIndex =
      document.getElementsByClassName("viewList")[0].getElementsByTagName("li")
        .length - 1;
  },
};
</script>
<style scoped>
p{
  margin: 0px;
  padding: 0px;
}
.layout {
  overflow: hidden;
  box-sizing: border-box;
  background-color: #000;
  animation: openwindow 4s ease-in-out 0s;
}
@keyframes openwindow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.viewList {
  width: 100%;
  margin: 0px;
  padding: 0px;
  transition: transform 2s;
}
.viewList > li {
  height: 100vh;
  font-size: 100px;
  background-color: #fff;
  overflow: hidden;
}
.banner {
  /* background: url("~@/assets/images/banner.jpg") no-repeat;
  background-size: 120% 120%;
  background-position: center; */
  margin: 0px;
  padding: 0px;
}
.homeInfo{
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/banner.jpg") no-repeat;
  background-size: 100% 100%;
  transform: scale(1.1);
  background-position: center;
  transition: transform 3s 1s ease-in-out;
  color: #fff;
}
#blowUp {
  transform: scale(1)
}
h1{
  margin: 0px;
}
.info {
  width: 90%;
  height: 80%;
  margin: 0 auto;
  transform: translateY(40%);
  border: 2px solid #ff6e5d;
  color: #000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  opacity: 0;
  transition: all 3s 1s ease-in-out;
}
#blowIn {
  opacity: 1;
  transform: translateY(10%);
}
</style>

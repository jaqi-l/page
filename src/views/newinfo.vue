<template>
  <div class="layout">
    <ul class="viewList" :style="{ transform: `translateY(${distance}px)` }">
      <li style="background: pink">1</li>
      <li style="background: blue">2</li>
      <li style="background: pink">3</li>
      <li style="background: blue">4</li>
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
      startY: "",// touchstart初始距离
      endY: "",// touchend初始距离
    };
  },
  methods: {
    addListener() {
      document.body.addEventListener("wheel", this.scrollBarWheel);
      document.body.addEventListener("keydown", this.scrollBarWheel);
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
        if (this.startY - this.endY > 100) {
          console.log("下一页");
          this.turnPage("down");
        } else if (this.startY - this.endY < -100) {
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
        } else {
          clearTimeout(timer);
        }
      } else if (type == "down") {
        if (this.index < this.maxIndex) {
          this.index++;
          this.distance = -this.layoutHeight * this.index;
          console.log("down", this.distance, this.index);
        } else {
          clearTimeout(timer);
        }
      } else {
        console.log("无效");
      }
      var timer = setTimeout(() => {
        // this.addListener();
      }, 500);
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
.layout {
  overflow: hidden;
  box-sizing: border-box;
}
.viewList {
  width: 100%;
  margin: 0px;
  padding: 0px;
  transition: transform 1s;
}
.viewList > li {
  height: 100vh;
  font-size: 100px;
  color: aliceblue;
}
</style>

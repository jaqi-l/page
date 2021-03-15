<template>
  <div class="layout">
    <ul class="viewList" :style="{ transform: `translateY(${distance}px)` }">
      <li class="banner">
        <div class="home" :id="index + 1 == 1 ? 'blowUp' : ''">
          <div
            @mouseover="showQrcode = true"
            @mouseout="showQrcode = false"
            class="weiChat"
          ></div>
          <transition name="qrcodetransit">
            <img
              class="qrcode"
              v-if="showQrcode"
              src="../assets/images/qrcode.gif"
            />
          </transition>
          <div class="homeInfo">
            <div class="titile">
              <h1>PERSONAL<br />RESUNME</h1>
              <h4>
                <span>个</span>| <span>人</span>| <span>简</span>|
                <span>历</span>
              </h4>
            </div>
            <div class="nickname">
              <h3>WEB前端</h3>
              <h2>Jaqi<span style="color: #ff6e5d">.</span>L</h2>
            </div>
          </div>
        </div>
      </li>
      <li class="">
        <div class="info" :id="index + 1 == 2 ? 'blowIn' : ''">基本信息</div>
      </li>
      <li class="skillsexp">
        <div class="info" :id="index + 1 == 3 ? 'blowIn' : ''">
          <tagcloud class="tagcloud"> </tagcloud>
        </div>
      </li>
      <li class="">
        <div class="info" :id="index + 1 == 4 ? 'blowIn' : ''">工作经历</div>
      </li>
        <li class="">
        <div class="info" :id="index + 1 == 5 ? 'blowIn' : ''">项目经验</div>
      </li>
    </ul>
  </div>
</template>
<script>
import tagcloud from "@/components/tagcloud";
export default {
  name: "newinfo",
    components: {
    tagcloud
  },
  data() {
    return {
      msg: "个人信息",
      layoutHeight: "", // 视口高度
      distance: 0, // 滚动距离
      index: 0, //页码
      maxIndex: "", //总页数
      startY: "", // touchstart初始距离
      endY: "", // touchend初始距离
      showQrcode: false,
    };
  },
  methods: {
    // 监听事件
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
    // 移除监听事件
    removeListener() {
      document.body.removeEventListener("wheel", () => {});
      document.body.removeEventListener("keydown", () => {});
      document.body.removeEventListener("touchstart", () => {});
      document.body.removeEventListener("touchmove", () => {});
      document.body.removeEventListener("touchend", () => {});
    },
    // 判断上下翻页
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
    // 翻页动作
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
<style scoped lang="scss">
// 视口
.layout {
  overflow: hidden;
  box-sizing: border-box;
  background-color: #000;
  animation: openwindow 3s ease-in-out 0s;
  .viewList {
    width: 100%;
    margin: 0px;
    padding: 0px;
    transition: transform 2s;
    background-color: #fff;
    li {
      height: 100vh;
      font-size: 100px;
      background-color: #fff;
      overflow: hidden;
    }
  }
  @keyframes openwindow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
// 第一屏 banner
.banner {
  margin: 0px;
  padding: 0px;
  .home {
    width: 100%;
    height: 100%;
    background: url("~@/assets/images/banner.jpg") no-repeat;
    background-size: cover;
    transform: scale(1.1);
    background-position: center;
    transition: transform 3s 1s ease-in-out;
    color: #fff;
    @media screen and (min-width: 1024px) {
      .weiChat {
        background: url(~@/assets/images/weichat-w.png) no-repeat;
        display: block;
        background-size: cover;
        width: 3rem;
        height: 3rem;
        position: absolute;
        right: 5%;
        top: 5%;
      }
      .weiChat:hover,
      .weiChat:active {
        display: block;
        background: url(~@/assets/images/weichat.png) no-repeat;
        background-size: cover;
        cursor: pointer;
      }
      .qrcode {
        position: absolute;
        right: 6%;
        top: 10%;
        width: 400px;
        border-radius: 0.5rem;
      }
      .qrcodetransit-enter-active,
      .qrcodetransit-leave-active {
        transition: opacity 0.5s ease-in-out;
      }
      .qrcodetransit-enter-from,
      .qrcodetransit-leave-to {
        opacity: 0;
      }
    }

    .homeInfo {
      width: 80%;
      height: 90%;
      transform: translateY(10%);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .titile {
        flex: 2;
        h1 {
          // margin-top: 6rem;
        }
        h4 {
          margin-left: -3rem;
          span {
            display: inline-block;
            margin: 0 3rem;
          }
        }
      }
      .nickname {
        flex: 1;
        h2 {
          margin-top: 2rem;
        }
        h3 {
          margin-top: 5rem;
        }
      }
    }
  }
}
#blowUp {
  transform: scale(1);
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
  transition: all 2s 1s ease-in-out;
}
#blowIn {
  opacity: 1;
  transform: translateY(10%);
}
.skillsexp{
  .tagcloud{
    margin: 0 auto;
    flex-direction:row;
    justify-content:center;
  }
}
@media screen and (max-width: 1024px) {
  .skillsexp{
    .info{
      width: 100%;
      height: 100vh;
      border: none;
      transform: translateY(0);
    }
    #blowIn{
      transform: translateY(0);
    }
  }
}
</style>

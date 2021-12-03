<template>
  <div id="nav" @click.stop="showSearcherList = false">
    <div class="main">
      <!-- slogan start -->
      <div class="slogan">字典，是惟一把成功放在工作之前的地方！</div>
      <div class="weather">
        <span>{{ weatherdata.city }}</span>
        温度:
        <span>{{ weatherdata.temperature }}</span>
        风向:
        <span>{{ weatherdata.winddirection }}</span>
        风力:
        <span>{{ weatherdata.windpower }}</span>
      </div>
      <!-- slogan end -->
      <!-- 搜索框 start -->
      <div class="searchBox">
        <input
          type="text"
          :class="showSearcherList ? 'selectSearcher' : 'searchInput'"
          v-model="searchValue"
          @keyup.enter="search"
          placeholder="请输入内容"
        />
        <img
          class="searchIcon"
          :src="searcher.img"
          alt=""
          @click.stop="showSearcherList = true"
        />
        <ul class="searcherList" v-show="showSearcherList">
          <li
            v-for="(item, index) in searcherList"
            :key="index"
            @click="selectSearcher(item)"
          >
            <img :src="item.img" alt="" />
          </li>
        </ul>
      </div>
      <!-- 搜索框 end -->
      <!-- 导航地址 start -->
      <div class="category">
        <template v-if="$route.name == 'byxNav'">
          <template v-for="(data, index) in commonNav.byx" :key="index"
            ><ul class="list">
              <li v-for="(child, index) in data" :key="index">
                <a :href="child.link" target="_blank">
                  <img :src="getFavicons(child.link)" />
                  <span> {{ child.title }}</span>
                </a>
              </li>
            </ul></template
          >
        </template>
        <template v-else>
          <template v-for="(data, index) in commonNav.jaqi" :key="index"
            ><ul class="list">
              <li v-for="(child, index) in data" :key="index">
                <a :href="child.link" target="_blank">
                  <img :src="getFavicons(child.link)" />
                  <span> {{ child.title }}</span>
                </a>
              </li>
            </ul></template
          >
        </template>
        <template v-for="(data, index) in baseNav" :key="index"
          ><div class="category">
            <div class="category-title">
              &bullet; {{ data.category }}
              <span><span class="decorate">-</span>{{ data.description }}</span>
            </div>
            <ul class="list">
              <li v-for="(child, index) in data.child" :key="index">
                <a :href="child.link" target="_blank">
                  <img :src="getFavicons(child.link)" />
                  <span> {{ child.title }}</span>
                </a>
              </li>
            </ul>
          </div></template
        >
      </div>
      <!-- 导航地址 end -->
    </div>
  </div>
</template>
<script>
import "../assets/css/base.css";
import baidu from "@/assets/images/baidu.png";
import google from "@/assets/images/google.png";
import so from "@/assets/images/360so.png";
import sogou from "@/assets/images/sogou.png";
import baseNav from "@/assets/data/base.json";
import commonNav from "@/assets/data/common.json";
import axios from "axios";
export default {
  name: "jaqi.nav",
  data() {
    return {
      msg: "个人导航",
      weatherdata: [],
      showSearcherList: false,
      searcherList: [
        {
          name: "百度",
          key: "baidu",
          url: "https://www.baidu.com/s?wd=",
          img: baidu,
        },
        {
          name: "谷歌",
          key: "google",
          url: "https://www.google.com/search?q=",
          img: google,
        },
        {
          name: "360搜索",
          key: "360so",
          url: "https://www.so.com/s?q=",
          img: so,
        },
        {
          name: "搜狗",
          key: "google",
          url: "https://www.sogou.com/web?query=",
          img: sogou,
        },
      ],
      searcher: "",
      searchValue: "",
      baseNav,
      commonNav
    };
  },
  components: {},
  methods: {
    selectSearcher(item) {
      this.searcher = item;
    },
    search() {
      window.open(this.searcher.url + this.searchValue);
    },
    weather() {
      var that = this;
      axios
        .get(
          "https://restapi.amap.com/v3/weather/weatherInfo?city=210100&key=f70cf051d7ec8ec511ea2175955d1436"
        )
        .then(function (response) {
          console.log("天气信息调取成功");
          that.weatherdata = response.data.lives[0];
        })
        .catch(function (error) {
          console.log("天气信息调取失败", error);
        });
    },
    getFavicons(link) {
      return `https://www.google.cn/s2/favicons?domain_url=${link.replace(
        /http(s?):\/\//i,
        ""
      )}`;
    },
  },
  mounted() {
    this.weather();
    this.searcher = this.searcherList[0];
  },
};
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}
img {
  border-style: none;
  display: inline;
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
  outline: 0;
}

/* ================ reset 样式 end  ================ */

.main {
  padding: 5% 2%;
  min-width: 900px;
  max-width: 1400px;
  margin: 0 auto; /* slogan start  */
  .slogan {
    overflow: hidden;
    align-items: center;
    font-size: 2.4em;
    color: #333;
    font-family: "Noto Sans SC", sans-serif;
    text-align: center;
    font-weight: bold;
    padding-bottom: 3em;
  }

  /* slogan end  */

  /* 搜索框 start */
  .searchBox {
    display: flex;
    width: 70%;
    margin: 2em auto;
    position: relative;
    .searchInput {
      width: 100%;
      height: 3em;
      line-height: 3em;
      font-size: 1em;
      padding-left: 3em;
      box-sizing: border-box;
      border-radius: 0.5em;
      border: 1px solid #dcdfe6;
      color: #606266;
      &:focus {
        outline: none;
        border-color: #409eff;
      }
    }
    .searchIcon {
      position: absolute;
      top: 0.75em;
      left: 0.75em;
      width: 1.5em;
      height: 1.5em;
    }
    .selectSearcher {
      width: 100%;
      height: 3em;
      line-height: 3em;
      font-size: 1em;
      padding-left: 3em;
      box-sizing: border-box;
      border-radius: 4px 4px 4px 0px;
      border: 1px solid #dcdfe6;
      color: #606266;
    }
    .searcherList {
      position: absolute;
      top: 3em;
      border-radius: 0px 0px 4px 4px;
      border: 1px solid #dcdfe6;
      border-top: none;
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
      background-color: #fff;
      li {
        width: 100%;
        display: block;
        text-align: center;
        img {
          display: block;
          text-align: center;
          padding: 0.75em;
          width: 1.5em;
          height: 1.5em;
        }
      }
    }
  }
  /* 搜索框 end */

  /*  导航内容 start  */

  .category {
    width: 100%;
    margin-top: 2.5em;
    padding-right: 1em;
    .category-title {
      box-sizing: border-box;
      font-size: 1em;
      line-height: 1.25em;
      color: rgba(49, 70, 89, 1);
      font-weight: bold;
      width: 100%;
      margin: 0 0 0.75em 2em;
      span {
        font-weight: normal;
      }
      .decorate {
        padding: 0 0.3em;
      }
    }
  }

  .list {
    margin: 0.85em auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      flex-basis: calc(100% / 6 - 0.6em);
      margin: 0.3em;
      overflow: hidden;
      a {
        overflow: hidden;
        display: block;
        background: rgba(230, 247, 255, 0.96);
        color: rgba(49, 70, 89, 1);
        font-size: 0.9em;
        text-align: left;
        padding-left: 0.5em;
        line-height: 2.5em;
        transition: all 0.2s;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        border-radius: 0.3em;
        img {
          height: 0.8em;
          margin-right: 0.5em;
        }
        &:hover {
          background: #1890ff 100%;
          font-size: 1em;
          font-weight: bold;
          color: #fff;
          img {
            height: 1em;
            margin-right: 0.6em;
          }
        }
      }
    }
  }
  /*  导航内容 end  */
}

/*-----------------------------手机自适应---------------------------------------------------*/
@media screen and (max-device-width: 768px) {
  .main {
    width: 100%;
    min-width: 320px;
    max-width: 100%;
    padding: 5% 0px;
    margin: 0px;
    font-size: 16px;
    .slogan {
      width: calc(100% - 4em);
      font-size: 2em;
      padding: 0px;
      margin: 2em;
    }
    .weather {
      padding-left: 1em;
    }
    /* slogan end  */

    /* 搜索框 start */
    .searchBox {
      width: 90%;
      .searchInput {
        font-size: 1em;
      }
      .selectSearcher {
        font-size: 1em;
      }
    }
    /* 搜索框 end */

    /*  导航内容 start  */

    .category {
      margin-top: 2.5em;
      width: calc(100% - 16px);
      padding: 0 8px;
      .category-title {
        margin: 0 0 0.75em 0em;
        span {
          font-weight: normal;
        }
        .decorate {
          padding: 0 0.3em;
        }
      }
      .list {
        padding: 0px;
        li {
          flex-basis: calc(100% / 3 - 0.6em);
        }
      }
    }

    /*  导航内容 end  */
  }
}
</style>
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
      <div class="nav-content">
        <template v-if="$route.name == 'byxNav'">
          <template v-for="(data, index) in commonNav.byx" :key="index"
            ><ul class="list">
              <li v-for="(child, index) in data" :key="index">
                <a :href="child.link" target="_blank">
                  <img :src="getFavicons(child.link)" />
                  {{ child.title }}
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
                  {{ child.title }}
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
                  {{ child.title }}
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
      commonNav,
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
<style scoped>
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
  margin: 0 auto;
}

/* logo start  */
.slogan {
  overflow: hidden;
  align-items: center;
  font-size: 36px;
  color: #333;
  font-family: "Noto Sans SC", sans-serif;
  text-align: center;
  font-weight: bold;
  padding-bottom: 31px;
}

/* logo end  */
/* 搜索框 start */
.searchBox {
  display: flex;
  width: 70%;
  margin: 20px auto;
  position: relative;
}
.searchInput {
  width: 100%;
  height: 40px;
  padding-left: 40px;
  font-size: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
}
.selectSearcher {
  width: 100%;
  height: 40px;
  padding-left: 40px;
  font-size: 15px;
  box-sizing: border-box;
  border-radius: 4px 4px 4px 0px;
  border: 1px solid #dcdfe6;
  color: #606266;
}
.searchInput:focus {
  outline: none;
  border-color: #409eff;
}
.searchIcon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
}

.searcherList {
  position: absolute;
  top: 40px;
  border-radius: 0px 0px 4px 4px;
  border: 1px solid #dcdfe6;
  border-top: none;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  background-color: #fff;
}
.searcherList li {
  width: 100%;
  display: block;
  text-align: center;
}
.searcherList li img {
  display: block;
  text-align: center;
  padding: 10px;
  width: 20px;
  height: 20px;
}
/* 搜索框 end */
/*  导航内容 start  */

.category {
  width: 100%;
  float: left;
  margin-top: 30px;
  padding-right: 16px;
}

.category-title {
  box-sizing: border-box;
  /*以IE盒子模型的width为标准*/
  font-size: 16px;
  line-height: 25px;
  color: rgba(49, 70, 89, 1);
  font-weight: bold;
  width: 100%;
  /*div等分*/
  margin: 0 0 10px 31px;
}

.category-title span {
  font-weight: normal;
}
.category-title .decorate {
  padding: 0 4px;
}

.list {
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
}

.list li {
  flex-basis: calc(100% / 6);
  margin: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list li a {
  display: block;
  background: rgba(230, 247, 255, 0.96);
  color: rgba(49, 70, 89, 1);
  font-size: 0.9rem;
  text-align: left;
  padding-left: 1.7em;
  line-height: 44px;
  transition: all 0.2s;
  border-radius: 4px;
}

.list li a img {
  height: 0.8rem;
  margin-right: 0.5rem;
}

.list li a:hover {
  background: #1890ff 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
}

.list li a:hover img {
  height: 1rem;
  margin-right: 8px;
}

/*-----------------------------手机自适应---------------------------------------------------*/
@media screen and (max-device-width: 768px) {
  .main {
    padding: 5% 0;
    width: 100%;
    margin: 0 auto;
  }
}
/*  导航内容 end  */
</style>
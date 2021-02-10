<template>
  <div class="contentheader layout">
    <div class="left-box">
      <slot name='header1'></slot>
      <slot name='header2'></slot>
    </div>
    <div class="right-box">
      <span class="box-bg">
        <slot name='header3'></slot>
      </span>
      <small><slot name='header5' ></slot></small>
    </div>
  </div>
</template>

<script>
export default {
  name: "contentheader",
  data() {
    return {
      msg: "页眉"
    };
  }
};
</script>

<style>
.contentheader {
  position: relative;
  height: 5rem;
}
.left-box {
  position: absolute;
  height: 4rem;
  border-left: 4px solid #ff6e5d;
  left: 4rem;
  padding-left: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.left-box > p {
  display: block;
  line-height: 2.5rem;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
}
.left-box > p:last-child {
  font-size: 0.9rem;
  font-weight: lighter;
}
.right-box {
width: 6rem;
    position: absolute;
    height: 4rem;
    right: 2rem;
  padding-left: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.right-box > p {
  display: block;
  line-height: 2.5rem;
}
.right-box > .box-bg {
  font-size: 4rem;
  line-height: 4rem;
  color: #ececec;
}
.right-box  p{
    margin:  0;
    padding:  0;
    display: block;
    position: absolute;
}
.right-box > small {
  width: 5rem;
  position: absolute;
  left: 0.2rem;
  top: 1.6rem;
}
</style>

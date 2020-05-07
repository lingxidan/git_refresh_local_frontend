<template>
  <div id="app">
    <div class="top">自动更新&nbsp;github&nbsp;项目</div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.top {
  line-height: 6vh;
  text-align: left;
  font-size: 1.8vh;
  padding-left: 2vw;
  background-color: #141b41;
  color: #98b9f2;
}
// 导航
.nav-content {
  width: 10%;
  background-color: #393d49;
}
.nav-pills > li > a {
  border-radius: 0;
  font-size: 1.5vh;
  color: #fff;
  transition: 0.3s;
  &:hover {
    background-color: rgba(152, 185, 242, 0.4);
  }
}
.nav-stacked > li + li {
  margin-top: 0;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:focus {
  background-color: rgba(152, 185, 242, 0.8);
}
// 表格样式
.table > thead > tr {
  border: 0.1vh solid #eee;
  th {
    font-size: 1.4vh;
    background-color: #eee;
    border-width: 0vh;
    font-weight: 600;
    text-align: center;
  }
}
.table > tbody > tr {
  border: 0.1vh solid #eee;
  td {
    font-size: 1.4vh;
    line-height: 3vh;
    border-width: 0vh;
    font-weight: 500;
    max-width: 12vw;
    height: 6vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
// 表单样式
.form-horizontal .form-group {
  margin-right: 0px;
  margin-left: 0px;
  width: 50%;
  margin-bottom: 1.4vh;
  height: 5vh;
  label {
    width: 10%;
    font-size: 1.4vh;
    padding: 0;
    margin: 0;
    line-height: 5vh;
    height: 100%;
    display: inline-block;
    text-align: right;
    font-weight: 500;
    color: #666;
  }
  div.col-sm-10 {
    // width: 60%;
    padding-right: 0;
    padding-left: 1vw;
    display: flex;
    .error_label{
      color: red;
      text-align: left;
      margin-left: 1vw;
    }
  }
  .form-control {
    display: block;
    width: 70%;
    height: 5vh;
    line-height: 5vh;
    padding: 0.2vh 2vh;
    font-size: 1.6vh;
    background-color: #fff;
    border: 0.1vh solid #eee;
    border-radius: 0;
    box-shadow: none;
    &:disabled{
      background-color:#F5F5F5;
      color:#ACA899;
    }
  }
  .form-error{
    border-color: red;
  }
}
.form-group.form-btn {
  margin-top: 2vh;
  width: 19%;
}
.form-control {
  display: block;
  width: 70%;
  height: 5vh;
  line-height: 5vh;
  padding: 0.2vh 2vh;
  font-size: 1.6vh;
  background-color: #fff;
  border: 0.1vh solid #eee;
  border-radius: 0;
  box-shadow: none;
  &:disabled{
    background-color:#F5F5F5;
    color:#ACA899;
  }
}
.form-commit{
  width: 100%;
  height: 3vh;
  line-height: 3vh;
  font-size: 1.4vh;
  padding-left: 1.5vh;
}
</style>

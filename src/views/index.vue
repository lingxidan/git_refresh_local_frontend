<template>
  <div class="mainApp">
    <div class="nav-content">
      <ul class="nav nav-pills nav-stacked">
        <li
          :class="current == 'githubList' ? 'active' : ''"
          @click="menuChange('githubList')"
        >
          <a href="#">本地&nbsp;github&nbsp;列表</a>
        </li>
        <li
          :class="current == 'githubAdd' ? 'active' : ''"
          @click="menuChange('githubAdd')"
        >
          <a href="#">添加本地&nbsp;github&nbsp;</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="table-content" v-if="current == 'githubList'">
        <div class="content-all-btn">
          <button
            @click="pushData()"
            type="button"
            class="btn btn-all"
          >
            一键 push
          </button>
          <button
            @click="pullData()"
            type="button"
            class="btn btn-all"
          >
            一键 pull
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>项目名称</th>
              <th>(分支)git地址</th>
              <th>本地地址</th>
              <th>状态</th>
              <th style="width:15vw">描述</th>
              <th style="width:20vw">操作</th>
            </tr>
          </thead>
          <tbody v-if="githubProList.length > 0">
            <tr v-for="(item, idx) in githubProList">
              <td>{{ item.name }}</td>
              <td style="text-align:left" :title="item.github">({{item.branch}}){{ item.github }}</td>
              <td style="text-align:left" :title="item.local">{{ item.local }}</td>
              <td :style="getColor(item.status)">{{ getStatusName(item.status) }}</td>
              <td>
                <input
                  v-model="item.comment"
                  type="text"
                  class="form-control form-commit"
                  placeholder="提交描述"
                />
              </td>
              <td>
                <button
                  @click="pushItem(item)"
                  type="button"
                  class="btn btn-cloud"
                  :disabled="item.status == 2"
                >
                  push
                </button>
                <button
                  @click="pullItem(item)"
                  type="button"
                  class="btn btn-cloud"
                  :disabled="item.status == 2"
                >
                  pull
                </button>
                <button
                  @click="showResult(item)"
                  type="button"
                  class="btn btn-info"
                  :disabled="item.status == 2"
                  v-if="item.out"
                >
                  查看结果
                </button>
                <button
                  @click="editData(item)"
                  type="button"
                  class="btn btn-link link-edit"
                  :disabled="item.status == 2"
                >
                  <span class="glyphicon glyphicon-edit"></span>
                </button>
                <button
                  @click="deleteData(item)"
                  type="button"
                  class="btn btn-link link-delete"
                  :disabled="item.status == 2"
                >
                  <span class="glyphicon glyphicon-trash"></span>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <form v-else class="form-horizontal" role="form">
        <div class="form-group">
          <label class="col-sm-2">本地地址</label>
          <div class="col-sm-10">
            <input
              v-model="formData.local"
              type="text"
              class="form-control"
              :class="error.local?'form-error':''"
              id="lastname"
              placeholder="D:/code/XXX"
              @change="getGit"
            />
            <label class="error_label" v-if="error.local">
              <i class="glyphicon glyphicon-remove-circle"></i>
              {{errorLabel.local}}
            </label>
            <!-- <input ref="file" type="file" style="display:none" />
            <button
              v-if="!formData.local"
              class="btn btn-file"
              @click="getPath"
            >
              选择README.md
            </button>
            <label v-else class="file-label">
              {{ formData.local }}
            </label> -->
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2">
            项目名称
          </label>
          <div class="col-sm-10">
            <input
              v-model="formData.name"
              type="text"
              class="form-control"
              :class="error.name?'form-error':''"
              id="firstname"
              placeholder="项目中文名"
              :disabled="type == 'edit'"
              @change="checkName"
            />
            <label class="error_label" v-if="error.name">
              <i class="glyphicon glyphicon-remove-circle"></i>
              {{errorLabel.name}}
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2">
            git 地址
          </label>
          <div class="col-sm-10">
            <input
              v-model="formData.github"
              type="text"
              class="form-control"
              :class="error.github?'form-error':''"
              id="lastname"
              placeholder="https://github.com/XXX/xxx.git"
            />
            <label class="error_label" v-if="error.github">
              <i class="glyphicon glyphicon-remove-circle"></i>
              {{errorLabel.github}}
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2">
            分支
          </label>
          <div class="col-sm-10">
            <input
              v-model="formData.branch"
              type="text"
              class="form-control"
              id="lastname"
              placeholder="master"
            />
          </div>
        </div>
        <div class="form-group form-btn">
          <button type="submit" class="btn btn-add" @click="submit">
            提交
          </button>
        </div>
      </form>
    </div>
    <div class="shell-result" v-if="resultShow">
      <div class="result-content">
        <button @click="resultShow = false" type="button" class="close btn-result-top" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <!-- <i @click="resultShow = false" class="glyphicon glyphicon-remove-circle btn-result-top"></i> -->
        <div class="result-show">
          <span v-if="currentItem.shell">shell:<span v-highlightjs><code class="bash">{{currentItem.shell}}</code></span></span>
          <span>输出:<span v-highlightjs><code class="shell">{{currentItem.out}}</code></span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../request/api";
export default {
  name: "mainAppApp",
  data() {
    return {
      // 导航
      current: "githubList",
      type: "add",
      // 执行结果
      currentItem: {},
      resultShow: false,
      // 表单验证
      error: {
        name: false,
        github: false,
        local: false
      },
      errorLabel: {
        name: "必填",
        github: "必填",
        local: "必填"
      },
      formData: {
        name:"",
        github:"",
        local:"",
        branch: "master"
      },
      // 数据列表
      githubProList: [],
    };
  },
  props: {},
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.current = "githubList"
      this.githubProList = [];
      request.getData().then((res) => {
        this.githubProList = res.map(item=>{
          item.status = 0
          return item
        });
      });
    },
    menuChange(val){
      this.type = "add"
      this.current = val
      this.formData = {
        name:"",
        github:"",
        local:"",
        branch: "master"
      }
      this.error = {
        name: false,
        github: false,
        local: false
      }
    },
    submit(){
      this.formData.name = this.formData.name.trim()
      this.formData.github = this.formData.github.trim()
      this.formData.local = this.formData.local.trim()
      if(this.formData.name && this.formData.github && this.formData.local 
      && !this.error.name  && !this.error.github  && !this.error.local ){
        switch(this.type){
          case "add":
              request.addData(this.formData).then((res) => {
                this.getList()
              });
            break;
          case "edit":
            request.editData(this.formData).then((res) => {
              this.getList()
            });
            break;
        }
      }else{
        if(!this.formData.name){
          this.error.name = true
          this.errorLabel.name = "必填"
        }
        if(!this.formData.github){
          this.error.github = true
        }
        if(!this.formData.local){
          this.error.local = true
        }
      }
    },
    // 修改数据
    editData(item) {
      this.current = "githubAdd"
      this.type = "edit"
      this.formData = item
    },
    // 删除数据
    deleteData(item) {
      item.status = 2
      request.deleteData(item).then((res) => {
        this.getList()
        item.status = 0
      });
    },
    checkName(){
      request.checkData({name:this.formData.name}).then(res => {
        this.error.name = res.exist
        this.errorLabel.name = "已存在"
      })
    },
    getGit(){
      request.getGit({local:this.formData.local}).then(res=>{
        if(res.err){
          alert("此路径没有可用的git地址")
        }else{
          let out = res.out.split("\n")
          let fetchOut = out[0]
          let pushOut = out[1]
          let pushUrl = pushOut.split(" ")[0].split("\t")[1]
          let tmpList = pushUrl.split(".git")[0].split("/")
          this.formData.github = pushUrl
          this.formData.name = tmpList[tmpList.length-1]
          this.checkName()
        }
      })
      request.getBranch({local:this.formData.local}).then(res=>{
        if(res.err){
        }else{
          let out = res.out.split("\n")[0].split(" ")[1]
          this.formData.branch = out
        }
      })
    },
    showResult(item){
      this.resultShow = true
      this.currentItem = item
    },
    // push-one
    pushItem(item){
      item.status = 2
      if(!item.comment){
        item.comment = "提交"
      }
      request.push(item).then(res=>{
        if(res.err){
          item.status = -1
          item.shell = res.err.cmd
        }else{
          item.status = 1
        }
        item.out = res.out+"\n"+res.stderr
      })
    },
    pushData(){
      this.githubProList.forEach(item=>{
        item.status = 2
        if(!item.comment){
          item.comment = "提交"
        }
        request.push(item).then(res=>{
          if(res.err){
            item.status = -1
            item.shell = res.err.cmd
          }else{
            item.status = 1
          }
          item.out = res.out+"\n"+res.stderr
        })
      })
    },
    pullItem(item){
      item.status = 2
      request.pull(item).then(res=>{
        if(res.err){
          item.status = -1
          item.shell = res.err.cmd
        }else{
          item.status = 1
        }
        item.out = res.out+"\n"+res.stderr
      })
    },
    pullData(){
      this.githubProList.forEach(item=>{
        item.status = 2
        request.pull(item).then(res=>{
          if(res.err){
            item.status = -1
            item.shell = res.err.cmd
          }else{
            item.status = 1
          }
          item.out = res.out+"\n"+res.stderr
        })
      })
    },
    // 获取文件路径
    getPath(event) {
      this.$refs.file.click();
      this.$refs.file.onchange = () => {
        console.log(this.$refs.file.value, this.$refs.file.files,this.$refs.file.files[0]);
        this.formData.local = this.$refs.file.value;
        let file = this.$refs.file.value;
        let formData = new FormData();
        formData.append("file", this.$refs.file.files[0]);
        request.getPath(formData).then();
        // TODO: 上传文件到node并获取到绝对路径
      };
    },
    getStatusName(status){
      switch(status){
        case 0:
          return "正常"
        case 1:
          return "成功"
        case -1:
          return "失败"
        case 2:
          return "进行中......"
      }
    },
    getColor(status){
      switch(status){
        case 0:
          return "color: #333"
        case 1:
          return "color: #7ae582"
        case -1:
          return "color: #ff6b6b"
        case 2:
          return "color: #918ef4"
      }
    },
  },
  watch: {},
  computed: {
  },
};
</script>

<style lang="less" scoped>
.mainApp {
  display: flex;
  min-height: 94.1vh;
  position: relative;
  // 主要内容
  .content {
    flex: 1;
    margin: 1vh;
    .content-all-btn{
      margin-bottom: 1vh;
      text-align: right;
      padding-right: 6.9vw;
    }
    .btn {
      min-width: 1vw;
      padding: 0.2vh 1vw;
      font-size: 1.4vh;
      line-height: 3vh;
      color: #fff;
      letter-spacing: 0.1vh;
      transition: 0.5s;
      border-radius: 0.3vh;
      border: none;
      &:hover {
        opacity: 0.5;
      }
    }
    .btn + .btn {
      margin-left: 1vh;
    }
    .link-edit{
      color: #918ef4;
      min-width: 0vw;
      padding: 0;
    }
    .link-delete {
      color: #ff6b6b;
      min-width: 0vw;
      padding: 0.2vh;
    }
    .btn-cloud{
      background-color: #918ef4;
    }
    .btn-info{
      background-color: #00a6fb;
    }
    .btn-all{
      background-color: #7371fc;
    }
    .btn-add {
      font-size: 1.6vh;
      width: 6vw;
      line-height: 3.6vh;
      background-color: #918ef4;
    }
    .btn-file {
      width: 100%;
      height: 5vh;
      line-height: 5vh;
      border-radius: 0;
      background-color: #98b9f2;
      background-color: rgba(152, 185, 242, 0.5);
    }
    .file-label {
      display: inline-block;
      width: 100%;
      text-align: left;
    }
  }
  .shell-result{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, .4);
    width: 100%;
    height: 100%;
    .result-content{
      position: relative;
      margin-top: 10vh;
      left: 50%;
      transform: translateX(-50%);
      width: 60vw;
      height: 70vh;
      background-color: #eee;
      border: 0.1vh rgba(152, 185, 242, 0.1) solid;
      .btn-result-top{
        cursor: pointer;
        position: absolute;
        color: red;
        top: 2vh;
        right: 1.2vw;
      }
      .result-show{
        margin: 6vh 4vh;
        text-align: left;
        span{
          display: block;
          font-size: 1.8vh;
          margin-bottom: 2vh;
          code{
            margin-left: 1vw;
            font-size: 1.6vh;
          }
        }
      }
    }
  }
}
</style>

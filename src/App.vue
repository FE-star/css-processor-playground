<script setup>
import { ref, toRaw } from "vue";
import compileScss from "./compile";
import Code from "./components/code.vue";
import Menu from "./layout/menu.vue";
import Directory from "./layout/directory.vue";
import Filetabs from "./layout/filetabs.vue";
// import postcss from "postcss-js";
// import autoprefixer from "autoprefixer";
// import hwb2rgb from "postcss-color-hwb";
// const autoprefixerCompile = postcss.sync([autoprefixer, hwb2rgb]);
// const hwb2rgbCompile = postcss.sync([hwb2rgb]);
// const postcssPlugins = ref([]);
// function postcssPluginChange(value) {
//   postcssPlugin.value = value;
// }
const loading = ref(false);

const initCode = `@import "test"`;
const currentCode = ref({
  path: "/main.scss",
  code: initCode,
});
const dist = ref("");

// 已打开的页面页签
const openfiles = ref([
  {
    label: "main.scss",
    path: "/main",
    isLeaf: true,
    current: true,
  },
]);
// 存储所有代码，内容和
const sassCodes = ref({
  "/main": initCode,
  "/test": `$bodyColor: #fff;
.breadcrumb {
  padding: 0;
  margin-bottom: 0;
  border-radius: 0;
  background-color: transparent;
  .page-header > &{
    min-width: -webkit-calc(20% - 30px);
    min-width: calc(20% - 30px);
    margin-left: 10px;
    line-height: 25px;
  }
  > li {
    color: rgba($bodyColor,0.4);
  }
  > .active{
    color: $bodyColor;
  }
}`,
});

// 开始编译
async function compile() {
  loading.value = true;
  dist.value = await compileScss(toRaw(sassCodes.value));
  sassCodes.value["/dist"] = dist.value;
  loading.value = false;
}

// 代码变更
function codeChange(value) {
  sassCodes.value[currentCode.value.path] = value;
}

// 文件/目录变更 ,type: add/remove
function treeDataChange(node, type) {
  sassCodes.value[node.path] = "";
}

// 关闭打开的文件页签
function filetabsRemove(index) {
  openfiles.splice(index, 1);
}

// 选择文件
function currentFileChange(file) {
  let repeat = false;
  openfiles.value.forEach((item) => {
    item.current = false;
    if (item.path === file.path) {
      item.current = true;
      repeat = true;
    }
  });
  if (!repeat) openfiles.value.push(file);
  currentCode.value = {
    path: file.path,
    code: sassCodes.value[file.path],
  };
}
</script>

<template>
  <div
    class="container"
    v-loading="loading"
  >
    <Menu
      class="menu"
      @compile="compile"
      @postcssPluginChange="postcssPluginChange"
    />
    <Directory
      class="directory"
      :dist="dist"
      @currentFileChange="currentFileChange"
      @treeDataChange="treeDataChange"
    />
    <div class="code-container">
      <Filetabs
        :tabs="openfiles"
        @remove="filetabsRemove"
        @currentChange="currentFileChange"
      />
      <Code
        :value="currentCode.code"
        @change="codeChange"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.container:after {
  content: "";
  display: block;
  clear: both;
}
.code-container {
  width: 100%;
  float: left;
}
menu {
  height: 5vh;
}
:deep(.el-loading-mask) {
  background-color: rgb(25 25 25 / 90%);
}
</style>

<script setup>
import { ref } from "vue";

// const plugins = ref([]);

// const optionalPlugins = [
//   { value: "autoprefixer", label: "autoprefixer" },
//   { value: "hwb2rgb", label: "postcss-color-hwb" },
// ];

const emit = defineEmits(["compile", "postcssPluginChange"]);

// 开始编译
function compile(e) {
  emit("compile");
}

// // postcss插件变化
// function postcssPluginChange(command) {
//   emit("postcssPluginChange");
// }
</script>

<template>
  <div class="menu">
    <el-button
      class="button directory"
      link
      @click="compile"
    >
      <el-icon>
        <CopyDocument />
      </el-icon>
    </el-button>
    <el-button
      class="button search"
      link
      @click="compile"
    >
      <el-icon>
        <Search />
      </el-icon>
    </el-button>
    <el-button
      class="button compile"
      link
      @click="compile"
    >
      <el-icon>
        <VideoPlay />
      </el-icon>
    </el-button>
  </div>
</template>

<style scoped>
.menu {
  width: 50px;
  background: rgba(127, 127, 127, 0.2);
}
.menu .button {
  color: #959595;
  font-size: 26px;
  height: 6vh;
  margin-left: 5px;
}
.menu .button:focus,
.menu .button:hover {
  color: #fff;
}
</style>

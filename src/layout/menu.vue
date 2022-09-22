<script setup>
import { ref } from "vue";

const active = ref("directory");
const emit = defineEmits(["compile"]);

// 开始编译
function compile(e) {
  emit("compile");
  active.value = "compile";
}
</script>

<template>
  <div class="menu">
    <el-button
      class="button directory"
      :class="{active: active === 'directory'}"
      link
      @click="() => active = 'directory'"
    >
      <el-icon>
        <CopyDocument />
      </el-icon>
    </el-button>
    <el-button
      class="button search"
      :class="{active: active === 'search'}"
      link
      @click="() => active = 'search'"
    >
      <el-icon>
        <Search />
      </el-icon>
    </el-button>
    <el-button
      class="button compile"
      :class="{active: active === 'compile'}"
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
.menu .button.active {
  color: #f2f2f2;
}
.menu .button:focus,
.menu .button:hover {
  color: #fff;
}
</style>

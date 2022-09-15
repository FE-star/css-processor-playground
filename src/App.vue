<script setup>
import Code from "./components/code.vue";
import { ref, watch } from "vue";
import snippet from "./snippet.mjs";
import { sasscompile } from "./api";
let type = "variable";
const language = ref("scss");
const from = ref(snippet[type][language.value]);
const to = ref("");
const grass = {
  load_paths: [],
  style: "expanded",
  quiet: true,
};

watch(
  from,
  (value) => {
    if (language.value === "scss") {
      to.value = sasscompile(value, grass);
    } else {
      console.log("less change");
      window.less.render(value).then((v) => {
        to.value = v.css;
      });
    }
  },
  { immediate: true }
);

function ontypeselect(e) {
  type = e.target.value;
  from.value = snippet[type][language.value];
}

function onlangselect(e) {
  language.value = e.target.value;
  from.value = snippet[type][language.value];
}

function onchange(value) {
  console.log(value);
  from.value = value;
}
</script>

<template>
  <div class="container">
    <header>
      <select
        value="variable"
        @change="ontypeselect"
      >
        <option
          v-for="key in Object.keys(snippet)"
          :value="key"
        >{{key}}</option>
        <!-- <option value="variable">variable</option>
        <option value="hahaha">haahah</option> -->
      </select>
      <select
        value="scss"
        @change="onlangselect"
      >
        <option value="scss">scss</option>
        <option value="less">less</option>
      </select>
    </header>
    <div class="code-container"><Code
        :value="from"
        :lang="language"
        @change="onchange"
      /></div>
    <div class="code-container"><Code :value="to" /></div>
  </div>
</template>

<style scoped>
.container:after {
  content: "";
  display: block;
  clear: both;
}
.code-container {
  width: 50%;
  float: left;
}
header {
  height: 5vh;
}
</style>

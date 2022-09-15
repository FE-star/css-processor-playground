import { createApp } from "vue";
import App from "./App.vue";
import init, { jscompile_scss } from "./assets/pkg/rsass.js";
// import init, { greet } from "./assets/hello-wasm/hello_wasm.js";

window.WasmObserver = function (css) {
  console.log(css);
};

// }`);
init().then((wasm) => {
  jscompile_scss(`section {
  margin: 10px;
  nav {
    height: 25px;
    a {
      color: #0982C1;
      &:hover {
        text-decoration: underline;
      }
    }
  }`);
});

import "./assets/main.css";
createApp(App).mount("#app");

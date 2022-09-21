import { sasscompile } from "./api";

// grass配置
const grassConfig = {
  load_paths: [],
  style: "expanded",
  quiet: true,
};

let newFiles = {};
// 解析相对路径
const parsePath = (currentFilePath, importStatement) => {
  const arr = importStatement.match(/@import\s+['"]{1}([\w-.]+)['"]{1}$/);
  if (!arr) return "";
  // 路径是带后缀名的，但是import语句不带
  let path = arr[1];

  // if (!/.scss$/.test(path)) {
  //   path = path + ".scss";
  // }
  // if (!/^(_|\/_)/.test(path)) {
  //   path = "/_" + path;
  // }
  const pathArray = path.split("/");
  const end = pathArray.length - 1;
  pathArray[end] = "_" + pathArray[end] + ".scss";
  return "/" + pathArray.join("/");
  // // / 开头 ，绝对路径
  // if (!pathArray[0]) {
  //   return pathArray.join("/");
  // }
  // // 相对路径解析
  // const currentArray = currentFilePath.split("/");
  // // 路径拼接，不需要原路径的最后一段
  // currentArray.pop();
  // for (let i = 0; i < pathArray.length; i++) {
  //   const item = pathArray[i];
  //   if (item === "..") {
  //     currentArray.pop();
  //   }
  //   if (item !== ".") {
  //     currentArray.push(item);
  //   }
  // }
  // return currentArray.join("/");
};

// 递归组合文件内容
const combinationContent = (currentFilePath, currentFilecontent) => {
  return currentFilecontent.replace(
    /@import\s+['"]{1}([\w-.]+)['"]{1}$/g,
    ($0) => {
      const path = parsePath(currentFilePath, $0);
      const content = newFiles[path] || "";
      delete newFiles[path];
      const transformContent = combinationContent(path, content);
      return "\n" + transformContent + "\n";
    }
  );
};

export default (files) => {
  return new Promise((resolve, reject) => {
    newFiles = { ...files };
    const content = combinationContent("/main.scss", newFiles["/main.scss"]);
    resolve(sasscompile(content, grassConfig));
  });
};

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
  const arr = importStatement.match(/@import\s+['"]([\w-.\/]+)['"];?/);
  if (!arr) return "";

  let path = arr[1];
  // 文件名带了文件后缀名的删除
  path = path.replace(/.scss$/, "");
  // 文件名带了前下划线的删除
  path = path.replace(/\/_([^/]+)$/, "/$1");
  // / 开头 ，代表绝对路径,直接返回
  if (/^\//.test(path)) {
    return path;
  }
  const pathArray = path.split("/");
  // 相对路径解析
  const currentArray = currentFilePath.split("/");
  // 路径拼接，不需要原路径的最后一段
  currentArray.pop();
  for (let i = 0; i < pathArray.length; i++) {
    const item = pathArray[i];
    if (item === "..") {
      currentArray.pop();
    }
    if (item !== ".") {
      currentArray.push(item);
    }
  }
  return currentArray.join("/");
};

// 递归组合文件内容
const combinationContent = (currentFilePath, currentFilecontent) => {
  return currentFilecontent.replace(
    /@import\s+['"]([\w-.\/]+)['"];?/g,
    ($0) => {
      const path = parsePath(currentFilePath, $0);
      const content = newFiles[path] || "";
      // 已加载的不重复加载
      delete newFiles[path];
      const transformContent = combinationContent(path, content);
      return "\n" + transformContent + "\n";
    }
  );
};

export default (files) => {
  return new Promise((resolve, reject) => {
    newFiles = { ...files };
    const content = combinationContent("/main", newFiles["/main"]);
    resolve(sasscompile(content, grassConfig));
  });
};

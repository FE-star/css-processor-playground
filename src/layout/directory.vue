<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";

const instance = getCurrentInstance();
const filetype = {
  file: "文件",
  dir: "文件夹",
};
const defaultProps = {
  children: "children",
  label: "label",
  isLeaf: "isLeaf",
};

const treeData = ref([
  {
    label: "main.scss",
    path: "/main.scss",
    isLeaf: true,
  },
]);
// 输入的文件\文件夹名
const filename = ref("");
const addtype = ref("");
const dialogVisible = ref(false);

// 新增文件/文件夹
function addFile(e) {
  const { tree } = instance.refs;
  const currentNode = tree.getCurrentNode();
  const newNode = {
    isLeaf: addtype.value === "file",
    label: `${filename.value}${addtype.value === "file" ? ".scss" : ""}`,
    parent: currentNode.path.replace(/\/[\w.-_]+$/, ""),
    path: currentNode.path.replace(
      /\/[\w.-_]+.scss$/,
      `/${filename.value}${addtype.value === "file" ? ".scss" : ""}`
    ),
  };
  // 如果是文件，就在下面新增一个文件
  if (currentNode.isLeaf) {
    tree.insertAfter(newNode, currentNode);
  } else {
    tree.append(newNode, currentNode);
  }
  treeData.value.push(newNode);
  dialogVisible.value = false;
  filename.value = "";
}

// 打开弹框
const showDialog = (type) => {
  addtype.value = type;
  dialogVisible.value = true;
};

// 树节点加载函数
const load = (node, resolve) => {
  resolve(
    !node.parent
      ? treeData.value
      : treeData.value.filter((treenode) => {
          return (treenode.parent = node.path);
        })
  );
};

onMounted(() => {
  const { tree } = instance.refs;
  tree.setCurrentKey("/main.scss");
});
// 折叠文件夹
function foldDir(value) {}
</script>

<template>
  <div class="wrap">
    <div class="operate">
      <el-button
        link
        class="button addFile"
        @click="() => showDialog('file')"
      >
        <el-icon>
          <DocumentAdd />
        </el-icon>
      </el-button>
      <el-button
        link
        class="button addDir"
        @click="() => showDialog('dir')"
      >
        <el-icon>
          <FolderAdd />
        </el-icon>
      </el-button>
      <el-button
        link
        class="button folderRemove"
        style="margin-right: 20px;"
      >
        <el-icon>
          <FolderRemove />
        </el-icon>
      </el-button>
    </div>
    <div class="files">
      <el-tree
        ref="tree"
        :data="treeData"
        :load="load"
        :lazy="true"
        node-key="path"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="`请输入${filetype[addtype]}名称`"
      width="30%"
    >
      <el-input v-model="filename" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="addFile"
          >Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.directory {
  background: rgb(37, 37, 38);
  width: 280px;
}
.operate {
  display: flex;
  justify-content: end;
  height: 30px;
  border-bottom: 1px #383838 solid;
}
.files {
  margin: 20px 0;
}
.operate .button {
  font-size: 16px;
  margin-left: 5px;
}
.operate .button:focus,
.operate .button:hover {
  color: #fff;
}
:deep(.is-current) {
  background-color: #ffffff24;
}
:deep(.el-tree) {
  background: #ffffff00;
  color: #b9b9b9;
}
:deep(.el-tree-node__content:hover) {
  background-color: #ffffff14;
}
:deep(.el-tree-node:focus > .el-tree-node__content) {
  background-color: #37373d;
}
:deep(.el-tree-node__expand-icon) {
  color: #b9b9b9;
}
</style>

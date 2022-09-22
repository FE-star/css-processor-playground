<script setup>
import { ref, getCurrentInstance, onMounted, watch } from "vue";

const props = defineProps({
  dist: String,
});
const filetype = {
  file: "文件",
  dir: "文件夹",
};
const defaultProps = {
  children: "children",
  label: "label",
  isLeaf: "isLeaf",
  children: "children",
};
const emit = defineEmits(["treeDatasChange", "currentFileChange"]);
const instance = getCurrentInstance();
const treeDatas = ref([
  {
    label: "main.scss",
    path: "/main",
    isLeaf: true,
  },
  {
    label: "_test.scss",
    path: "/test",
    isLeaf: true,
  },
]);
// 输入的文件\文件夹名
const filename = ref("");
const addtype = ref("");
const dialogVisible = ref(false);

watch(
  () => props.dist || "",
  (value) => {
    if (value.trim()) {
      const { tree } = instance.refs;
      tree.insertBefore(
        {
          label: "dist.css",
          isLeaf: true,
          path: "/dist",
        },
        "/main"
      );
    }
  }
);

// 修改目录树
function updateTree(data) {
  const { tree } = instance.refs;
  const currentNode = tree.getCurrentNode();
  if (currentNode.isLeaf) {
    // 去掉文件名就是文件路径
    data.parentPath = currentNode.path.replace(/\/[\w]+$/, "");
    tree.insertAfter(data, currentNode);
  } else {
    data.parentPath = currentNode.path;
    tree.append(data, currentNode);
  }
}

// 获取文件夹对象  name=test ->  path= /test/test/
function addDir(dirname, parentPath) {
  const name = dirname.replace(/^\/+/, "");
  const dir = {
    isLeaf: false,
    label: name,
    parent: parentPath,
    path: parentPath + "/" + name,
    current: true,
  };
  updateTree(dir);
}

// 获取文件对象 name=_test.scss ->  path= /test/test
function addFile(filename, parentPath) {
  const { tree } = instance.refs;
  let name = filename.replace(/^(\/|\/_)+/, "");
  const file = {
    isLeaf: true,
    label: `_${name}.scss`,
    parent: parentPath,
    path: parentPath + "/" + name,
    current: true,
  };
  updateTree(file);
}

// 新增文件/文件夹
function add() {
  const { tree } = instance.refs;
  const name = filename.value;
  const currentNode = tree.getCurrentNode();
  let parentPath = "";
  if (currentNode.isLeaf) {
    // 去掉文件名就是文件路径
    parentPath = currentNode.path.replace(/\/[\w]+$/, "");
  } else {
    parentPath = currentNode.path;
  }
  if (addtype.value === "file") {
    addFile(name, parentPath);
  } else {
    addDir(name, parentPath);
  }
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
      ? treeDatas.value
      : treeDatas.value.filter((treenode) => {
          return (treenode.parent = node.path);
        })
  );
};

// 点击树节点，如果是文件，就在右侧打开
function handleNodeClick(node) {
  if (node.isLeaf) {
    emit("currentFileChange", node);
  }
}

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
        :data="treeDatas"
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
            @click="add"
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

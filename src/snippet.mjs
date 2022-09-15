function t(arr) {
  const [s] = arr;
  return s.trim();
}

const variable_s = t`
$mainColor: #0982c1;
$siteWidth: 1024px;
$borderStyle: dotted;
body {
  color: $mainColor;
  border: 1px $borderStyle $mainColor;
  max-width: $siteWidth;
}
`;
const variable_l = t`
@mainColor: #0982c1;
@siteWidth: 1024px;
@borderStyle: dotted;
body {
  color: @mainColor;
  border: 1px @borderStyle @mainColor;
  max-width: @siteWidth;
}
`;
const nesting = t`
section {
  margin: 10px;
  nav {
    height: 25px;
    a {
      color: #0982C1;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
`;

const mixins_s = t`
/* Sass定义了一个名叫error的mixin，这个error设置了一个参数“$borderWidth”,在没特别定义外，这个参数的值是默认值2px*/
@mixin error($borderWidth: 2px) {
  border: $borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  @include error(); /* 调用error mixins */
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  @include error(5px); /* 调用error mixins，并将参数$borderWidth的值指定为5px*/
}
`;

const mixins_l = t`
/* LESS 定义了一个名叫error的mixin，这个error设置了一个参数“$borderWidth”,在没特别定义外，这个参数的值是默认值2px */
.error(@borderWidth: 2px) {
  border: @borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  .error(); /* 调用error mixins */
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  .error(5px); /* 调用error mixins，并将参数$borderWidth的值指定为5px */
}
`;

const inheritance_s = t`
.block {
  margin: 10px 5px;
  padding: 2px;
}
p {
  @extend .block; /* 继承.block所有样式 */
  border: 1px solid #EEE;
}
ul, ol {
  @extend .block; /* 继承.block所有样式 */
  color: #333;
  text-transform: uppercase;
}
`;

const inheritance_l = t`
.block {
  margin: 10px 5px;
  padding: 2px;
}
p {
  .block; /* 继承 '.block' 中的样式 */
  border: 1px solid #EEE;
}
ul, ol {
  .block; /*继承 '.block' 中的样式*/
  color: #333;
  text-transform: uppercase;
}
`;

const prefix_s = t`
@mixin border-radius($values) {
  -webkit-border-radius: $values;
     -moz-border-radius: $values;
          border-radius: $values;
}
div {
  @include border-radius(10px);
}
`;

const prefix_l = t`
.border-radius(@values) {
  -webkit-border-radius: @values;
     -moz-border-radius: @values;
          border-radius: @values;
}
div {
  .border-radius(10px);
}
`;

const text3d_s = t`
@mixin text3d($color) {
  color: $color;
  text-shadow: 1px 1px 0px darken($color, 5%),
               2px 2px 0px darken($color, 10%),
               3px 3px 0px darken($color, 15%),
               4px 4px 0px darken($color, 20%),
               4px 4px 2px #000;
}
h1 {
  font-size: 32pt;
  @include text3d(#0982c1);
}
`;

const text3d_l = t`
.text3d(@color) {
  color: @color;
  text-shadow: 1px 1px 0px darken(@color, 5%),
               2px 2px 0px darken(@color, 10%),
               3px 3px 0px darken(@color, 15%),
               4px 4px 0px darken(@color, 20%),
               4px 4px 2px #000;
}
span {
  font-size: 32pt;
  .text3d(#0982c1);
}
`;

const columns_s = t`
$siteWidth: 1024px;
$gutterWidth: 20px;
$sidebarWidth: 300px;
body {
  margin: 0 auto;
  width: $siteWidth;
}
.content {
  float: left;
  width: $siteWidth - ($sidebarWidth + $gutterWidth);
}
.sidebar {
  float: left;
  margin-left: $gutterWidth;
  width: $sidebarWidth;
}
`;

const columns_l = t`
@siteWidth: 1024px;
@gutterWidth: 20px;
@sidebarWidth: 300px;
body {
  margin: 0 auto;
  width: @siteWidth;
}
.content {
  float: left;
  width: @siteWidth - (@sidebarWidth + @gutterWidth);
}
.sidebar {
  float: left;
  margin-left: @gutterWidth;
  width: @sidebarWidth;
}
`;

const dv_s = t`
$color: black;
.scoped {
  $bg: blue;
  $color: white;
  color: $color;
  background-color: $bg;
}
.unscoped {
  color: $color;
  // Would be an error
  // background: $bg;
} 
`;

const dv_l = t`
@color: black;
.scoped {
  @bg: blue;
  @color: white;
  color: @color;
  background-color: @bg;
 }
.unscoped {
  color: @color;
  // Would be an error
  // background: @bg;
}
`;

const ifelse_s = t`
@mixin bw($color) {
  @if lightness($color) > 30% {
    background-color: black;
  }
  @else {
    background-color: white;
  }
}

.bg {
  @include bw(blue);
}
`;

const ifelse_l = t`
.bw (@color) when (lightness(@color) > 30%) {
  background-color: black;
}
.bw (@color) when (lightness(@color) =< 30%) {
  background-color: white;
}

.bg {
  .bw(blue);
}
`;

export default {
  variable: {
    scss: variable_s,
    less: variable_l,
  },
  nesting: {
    scss: nesting,
    less: nesting,
  },
  mixins: {
    scss: mixins_s,
    less: mixins_l,
  },
  inheritance: {
    scss: inheritance_s,
    less: inheritance_l,
  },
  prefix: {
    scss: prefix_s,
    less: prefix_l,
  },
  text3d: {
    scss: text3d_s,
    less: text3d_l,
  },
  columns: {
    scss: columns_s,
    less: columns_l,
  },
  dv: {
    scss: dv_s,
    less: dv_l,
  },
  ifelse: {
    scss: ifelse_s,
    less: ifelse_l,
  },
};

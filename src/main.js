const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); // 字符串变成对象，因为localStorage只能保存字符串

//如果xObject存在，就使用已经存在的值，不存在就用初始值
const hashMap = xObject || [
  { logo: "A", url: "https://www.amazon.co.jp/" },
  { logo: "R", url: "https://www.rakuten.co.jp/" },
];

//优化URL
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除 / 开头的内容
};

//渲染部分.渲染hashmap
const render = () => {
  $siteList.find("li:not(.last)").remove(); //渲染之前，找到siteList里的所有li，唯独最后一个.last，然后remove
  //↓解释：遍历haspmap的每个节点，创造一个li
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
         x
        </div>
      </div>
    </li>`).insertBefore($lastLi); //insertBefore：放到最后一个li的前面
    //Li 点击事件
    $li.on("click", () => {
      window.open(node.url);
    });
    //Li 点击关闭事件
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
//点击添加按钮
//思路：给hashmap数组增加一项后，重新渲染一次，然后保存
$(".addButton").on("click", () => {
  let url = window.prompt("追加したいサイトのURLを入力してください？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  //↓给hashmap添加新数组
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(), //解释：添加一个logo，logo的内容是simplifyUr的第一个字母，并且大写
    url: url,
  });
  render();
});

//onbeforeunload用户关闭页面之前触发
window.onbeforeunload = () => {
  //window.onbeforeunload = () => {}解释：onbeforeunload等于一个函数
  const string = JSON.stringify(hashMap); //将hashMap转换为字符串，关闭页面的时候存入localStorage
  localStorage.setItem("x", string); //名字是X，值是string
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

// //遍历
// hashMap.forEach((node) => {
//   const $li = $();
// });

// // $=juqery
// // 监听class .addbutton事件；
// // on "click" 点击 ，并赋予一个函数

// $(".addButton").on("click", () => {
//   let url = window.prompt("追加したいサイトのURLを入力してください");
//   //   console.log(url);
//   if (url.indexOf("http") !== 0) {
//     // alert("HTTPS://の最初にサイトを入力してください");
//     url = "https://" + url;
//   }
//   const $siteList = $(".siteList");
//   const $lastLi = $siteList.find("li.last"); //找到最后一个li
//   //插入多行字符串时候用 ` `
//   //将新的网页插入进last li前面
//   const $li = $(`<li>
//   <a href="${url}">
//   <div class="site">
//     <div class="logo">${url[8]}</div>
//     <div class="link">${url}</div>
//   </div>
// </a>
//   </li>`).insertBefore($lastLi);
// });

//点击搜索框变模糊
function inputFocus() {
  let bg = document.body;
  document.body.style.backdropFilter = "blur(14px)";
}

function inputFocusout() {
  document.body.style.backdropFilter = "blur(0px)";
}

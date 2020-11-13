const hashMap = [
  {
    logo: "./img/rakuten-logo-A75F21521D-seeklogo.com.png",
    url: "https://www.rakuten.co.jp/",
  },
  {
    logo: "./img/14_TH_1712.png",
    url: "https://www.hal.ac.jp/tokyo",
  },
  {
    logo: "./img/18e180218bdac1685b79197c9023259b.png",
    url: "https://www.amazon.co.jp/-/zh/ref=nav_logo",
  },
];

//遍历
hashMap.forEach((node) => {
  const $li = $();
});

// $=juqery
// 监听class .addbutton事件；
// on "click" 点击 ，并赋予一个函数

$(".addButton").on("click", () => {
  let url = window.prompt("追加したいサイトのURLを入力してください");
  //   console.log(url);
  if (url.indexOf("http") !== 0) {
    // alert("HTTPS://の最初にサイトを入力してください");
    url = "https://" + url;
  }
  const $siteList = $(".siteList");
  const $lastLi = $siteList.find("li.last"); //找到最后一个li
  //插入多行字符串时候用 ` `
  //将新的网页插入进last li前面
  const $li = $(`<li>
  <a href="${url}">
  <div class="site">
    <div class="logo">${url[8]}</div>
    <div class="link">${url}</div>
  </div>
</a>
  </li>`).insertBefore($lastLi);
});

function inputFocus() {
  let bg = document.body;
  document.body.style.backdropFilter = "blur(14px)";
}

function inputFocusout() {
  document.body.style.backdropFilter = "blur(0px)";
}

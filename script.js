// script.js

// Loading
let progress = 0;
const bar = document.getElementById("progress");

let loading = setInterval(() => {
  progress += Math.random() * 20;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loading);

    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 500);
  }

  bar.style.width = progress + "%";
}, 300);

// 玩家身份
let playerRole = "";

// 信件資料
// ========================================
// ✨ 信件內容填在這裡 ✨
// 要改名字或信件文字，直接改下面的 title / content。
// content 的反引號 ` ` 裡面可以換行。
// 目前有 6 封，對應 letter1 ~ letter6。
// ========================================
let letters = [
  {
    title: "珊的信",
    content: `岛岛啊 生日大快乐🎉🎉🎉我们缘份的开始实在是很奇妙，不知不觉就如此熟悉了，这半个月的时间真的很快乐，无论发生了什么，我们都是陪伴着彼此的谢谢妳每晚都跟我们一起玩乐，谢谢妳偶尔当个大姐姐开导着我们，谢谢妳一直都做自己，祝妳天天开心 日日是好日。`
  },
  {
    title: "寧的信",
    content: `感谢那个睡不着而开直播玩游戏的夜晚，让我们刚好走进，也因此有了后来的熟识与「岛岛的秘密基地」。喜欢你的真诚、你的歌声，还有你的笑声。愿你往后的日子都能顺心、开心。岛岛，生日快乐。`
  },
  {
    title: "Louis 的信",
    content: `岛岛，很开心能遇到妳，感谢当初的勇气去你直播间找你，陪我们大家渡过愉快的每个夜晚，生日快乐！ ！`
  },
  {
    title: "Heng 的信",
    content: `㊗️岛岛生日快乐，天天快乐平安。`
  },
  {
    title: "小月的信",
    content: `這裡填入第五封信的內容。`
  }
];
// 其他人現場輸入的信件會暫存在這裡。
// 注意：純前端網頁不會自動存到檔案，重新整理後會消失。
let submittedLetters = {};

// 切換畫面
function switchScreen(id) {
  const target = document.getElementById(id);

  if (!target) {
    console.warn(`找不到畫面：${id}`);
    return;
  }

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  setTimeout(() => {
    target.classList.add("active");
  }, 200);
}

// 海浪過場
function waveTransition(nextPage) {
  const wave = document.getElementById("wave-transition");

  // 重新觸發動畫，避免快速連點時動畫不播放
  wave.classList.remove("wave-animate");
  void wave.offsetWidth;
  wave.classList.add("wave-animate");

  setTimeout(() => {
    switchScreen(nextPage);
  }, 850);

  setTimeout(() => {
    wave.classList.remove("wave-animate");
  }, 1900);
}

// 選角色
function selectRole(role) {
  playerRole = role;

  if (role === "島島") {
    waveTransition("question1");
  }
  else {
    waveTransition("write-letter");
  }
}

// 第一題
function checkBirthday(answer) {
  if (answer === "527") {
    waveTransition("question2");
  }
  else {
    alert("答錯了 ✨");
  }
}

// 第二題
function checkHeartColor() {
  const answer = document.getElementById("heartColorAnswer").value.trim();

  if (answer === "") {
    alert("請先輸入答案喔 ✨");
    return;
  }

  if (answer === "白色") {
    waveTransition("song-intro");
  }
  else {
    alert("答錯了 ✨");
  }
}

// 前往影片
function goToVideo(videoId) {
  waveTransition(videoId);
}

setTimeout(() => {
  const page = document.getElementById(videoId);
  const video = page.querySelector("video");

  video.play();
}, 5000);

function stopAllMedia() {
  document.querySelectorAll("video, audio").forEach(media => {
    media.pause();
    media.currentTime = 0;
  });

  if (typeof autoPlayTimer !== "undefined" && autoPlayTimer) {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = null;
  }
}

// 最後影片播放完
const lastVideo = document.getElementById("lastVideo");

if (lastVideo) {
  lastVideo.addEventListener("ended", () => {
    // 保持背景月亮為純月亮，不再把人影塞進月亮裡。
    const moon = document.getElementById("mainMoon");
    if (moon) {
      moon.innerHTML = "";
    }
  });
}

// 前往信件
function goToLetters() {
  waveTransition("letter1");
}

// 下一封信 / 最後一頁
function goToLetterPage(next) {
  if (next === "end") {
    waveTransition("final-page");
    return;
  }

  waveTransition(next);
}

// 打開信件
function openLetter(num) {
  const paper = document.getElementById("paper" + num);
  if (!paper) return;

  paper.style.display = "block";

  const envelope = document.querySelectorAll(".envelope")[num - 1];
  if (envelope) {
    envelope.style.display = "none";
  }

  const letter = letters[num - 1];

  if (!letter) {
    paper.innerHTML = "目前沒有這封信";
    return;
  }

  paper.innerHTML = `
    <h2>${letter.title}</h2>
    <p>${letter.content.replace(/\n/g, "<br>")}</p>
  `;
}

// 其他人提交信件
function submitLetter() {
  const content = document.getElementById("userLetter").value.trim();

  if (content === "") {
    alert("請先輸入信件內容喔 ✨");
    return;
  }

  submittedLetters[playerRole] = content;

  // 這裡只是在同一次開啟網頁時暫存，方便現場測試。
  // 正式要放進島島看到的信件，請把內容複製到上方 letters 陣列裡。
  console.log("收到信件：", playerRole, content);

  waveTransition("thanks-page");
}

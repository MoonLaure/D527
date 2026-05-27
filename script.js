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
const roleImages = {
  "島島": "images/島島.jpg",
  "珊": "images/珊.jpg",
  "寧": "images/寧.png",
  "松": "images/Louis.png",
  "Heng": "images/Heng.jpg",
  "小周": "images/小周.png"
};

// 每個人的第二題設定
// question 是畫面顯示的問題
// answers 裡面可以放多個可接受答案
const secondQuestions = {
  "島島": {
    question: "請問代表島主的愛心顏色是甚麼?",
    answers: ["白色", "白", "🤍"]
  },
  "珊": {
    question: "請問珊的喜歡的動漫是?",
    answers: ["排球少年","排少"]
  },
  "寧": {
    question: "請問寧喜歡的歌手是誰?",
    answers: ["少女時代", "太妍"]
  },
  "松": {
    question: "請問 松 的貓貓叫甚麼?",
    answers: ["松松"]
  },
  "Heng": {
    question: "請問 Heng 的IG開頭是甚麼?",
    answers: ["N","n" ]
  },
  "小周": {
    question: "請問小周的IG數字是多少?",
    answers: ["0113"]
  }
};

function setupQuestion2() {
  const title = document.getElementById("question2Text");
  const textarea = document.getElementById("heartColorAnswer");
  const setting = secondQuestions[playerRole] || secondQuestions["島島"];

  if (title) {
    title.textContent = setting.question;
  }

  if (textarea) {
    textarea.value = "";
  }
}

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
    title: "松的信",
    content: `岛岛，很开心能遇到妳，感谢当初的勇气去你直播间找你，陪我们大家渡过愉快的每个夜晚，生日快乐！ ！`
  },
  {
    title: "Heng 的信",
    content: `㊗️岛岛生日快乐，天天快乐平安。`
  },
  {
    title: "小周的信",
    content: `亲爱的岛岛生日快乐🎂🎂我们的缘分开始于开爵位，而我们真正的开始也是开爵位（偷偷说前一个我后悔了🥲🥲）。只能说命运就爱跟我们开玩笑，但我还是很感谢命运的安排，让我们能够有开始的机会，让我有幸的可以看到UME•岛，也可以看到blove那一面，能听到妳充满故事的歌声、开怀大笑的笑声和逃避我们作弄的撒娇声，和我们像朋友一样相处、一起玩，真的让我很高兴也让我觉得好幸运。虽然我们认识不久，但我真的觉得，小岛妳是一个很好很好的人，特别的仗义又真诚，有时候却幼稚得可爱，是个心思细腻又有趣的人。愿妳未来的路上能少点荆棘，人生路途上遇到的人都是好人，不管是过去还是现在或是未来都要快乐，希望我的存在能带给妳快乐，我也会尽我所能的让妳开心幸福，最后再说一次，芜松岛、blove生日快乐！！！爱妳🤍🤍🤍`
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
  
  stopAllMedia();
}

// 選角色
function selectRole(role) {
  playerRole = role;

  updateRoleDisplay();
  waveTransition("question1");
}

function updateRoleDisplay() {
  const birthdayQuestion = document.getElementById("birthdayQuestion");
  const avatarBox = document.getElementById("currentRoleAvatar");
  const avatarImg = document.getElementById("currentRoleImg");

  if (birthdayQuestion) {
    birthdayQuestion.textContent = `妳好${playerRole}，請問我們的島主生日幾號?`;
  }

  if (avatarBox && avatarImg && roleImages[playerRole]) {
    avatarImg.src = roleImages[playerRole];
    avatarImg.alt = playerRole;
    avatarBox.style.display = "flex";
  }
}

// 第一題
function checkBirthday(answer) {
  if (answer === "527") {
    setupQuestion2();
    waveTransition("question2");
  }
  else {
    alert("答錯了 ✨");
  }
}

// 第二題
function checkHeartColor() {
  const textarea = document.getElementById("heartColorAnswer");
  const answer = textarea ? textarea.value.trim() : "";
  const setting = secondQuestions[playerRole] || secondQuestions["島島"];

  if (answer === "") {
    alert("請先輸入答案喔 ✨");
    return;
  }

  if (setting.answers.includes(answer)) {
    waveTransition("song-intro");
  }
    else {
      if (playerRole === "島島") {
        alert("答錯了 ✨");
      }
      else {
        alert("妳是不是島主想換身分阿??不可以喔~~請換回去~~");
        goHome();
      }
    }
}

function goHome() {
  // 停止所有正在播放的影片或音訊
  if (typeof stopAllMedia === "function") {
    stopAllMedia();
  }

  // 清空目前角色
  playerRole = "";

  // 清空第二題輸入
  const heartAnswer = document.getElementById("heartColorAnswer");
  if (heartAnswer) {
    heartAnswer.value = "";
  }

  // 清空寫信內容
  const userLetter = document.getElementById("userLetter");
  if (userLetter) {
    userLetter.value = "";
  }

  // 隱藏月亮旁邊的角色頭像
  const avatarBox = document.getElementById("currentRoleAvatar");
  const avatarImg = document.getElementById("currentRoleImg");

  if (avatarBox) {
    avatarBox.style.display = "none";
  }

  if (avatarImg) {
    avatarImg.src = "";
    avatarImg.alt = "目前角色";
  }

  // 回到最一開始的身分選擇頁
  switchScreen("choose-role");
}

// 前往影片
let autoPlayTimer = null;

function goToVideo(videoId) {
  waveTransition(videoId);


  if (videoId === "video5") {
    const goLettersBtn = document.getElementById("goLettersBtn");
    if (goLettersBtn) {
      goLettersBtn.disabled = true;
    }
  }

  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
  }

  autoPlayTimer = setTimeout(() => {
    const page = document.getElementById(videoId);
    if (!page) return;

    const video = page.querySelector("video");
    if (!video) return;

    video.play().catch(() => {
      alert("瀏覽器阻擋自動播放，請手動按播放鍵喔 ✨");
    });
  }, 2000);
}

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
    const moon = document.getElementById("mainMoon");
    if (moon) {
      moon.innerHTML = "";
    }

    const goLettersBtn = document.getElementById("goLettersBtn");
    if (goLettersBtn) {
      goLettersBtn.disabled = false;
    }
  });
}

let openedLetters = {};

// 前往信件
function goToLetters() {
  waveTransition("letter1");
}

// 下一封信 / 最後一頁
function goToLetterPage(next) {
  const currentLetterPage = document.querySelector(".letter-page.active");

  if (currentLetterPage) {
    const currentNum = currentLetterPage.id.replace("letter", "");

    if (!openedLetters[currentNum]) {
      alert("要先打開這封信才能前往下一頁喔 ✨");
      return;
    }
  }

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

  openedLetters[num] = true;

  const nextBtn = document.getElementById("letterNext" + num);
  if (nextBtn) {
    nextBtn.disabled = false;
  }
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

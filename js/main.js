const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const getResult = document.querySelector("#getResult");
const progress = document.querySelector(".progress-bar");

const resultLists = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const LEN = 12;
let FinalIdx;

let qIdx = 0;

init();

function init() {
  qna.style.display = "none";
  result.style.display = "none";
  getResult.style.display = "none";
}

function begin() {
  main.classList.add("fadeOut");
  setTimeout(() => {
    main.classList.add("fadeIn");
    main.style.display = "none";
    setTimeout(() => {
      qna.style.display = "flex";
    }, 500);
    let qIdx = 0;
    goNext(qIdx);
  }, 900);
}

function goNext(qIdx) {
  progress.style.width = `${Math.round(((qIdx + 1) / LEN) * 100)}%`;
  progress.innerText = `${Math.round(((qIdx + 1) / LEN) * 100)}%`;
  let q = document.querySelector(".qBox");
  let answerBox = document.querySelector(".answerBox");

  q.innerHTML = qnaList[qIdx].q;
  answerBox.innerHTML = qnaList[qIdx].a
    .map(
      (ans, index) =>
        `<button type="button" class="answerList mt-3" onclick="nextQ(${index})">${ans.answer}</button>`
    )
    .join("");
}

function nextQ(index) {
  //index = 선택한 값
  //console.log(qIdx, index);
  if (qIdx === LEN - 1) {
    qna.innerHTML = `<div id="loading"></div><h1>결과 집계중...</h1>
    `;
    setTimeout(() => {
      qna.innerHTML = `<button type="button" class="answerList mt-3" onclick="goResult()">결과보기</button>`;
    }, Math.round(Math.random() * 500 + 1500));
    return;
  }
  calResult(index);
  goNext(++qIdx);
}

function goResult() {
  qna.classList.add("fadeOut");
  setTimeout(() => {
    getResult.classList.add("fadeIn");
    qna.style.display = "none";
    setTimeout(() => {
      result.style.display = "flex";
    }, 500);
    setResult();
  }, 900);

  FinalIdx = resultLists.indexOf(Math.max(...resultLists));
}

function calResult(index) {
  qnaList[qIdx].a[index].type.forEach((value) => {
    resultLists[value] += 1;
  });
}

function setResult() {
  const name = result.querySelector(".resultName");
  const img = result.querySelector(".resultImg");
  const desc = result.querySelector(".resultDesc");

  name.innerText = infoList[FinalIdx].name;
  img.src = `./img/image-${FinalIdx}.png`;
  img.alt = FinalIdx;
  desc.innerText = infoList[FinalIdx].desc;
}

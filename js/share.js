const url = "https://lovetype.netlify.app/";

function kakao() {
  let resultImg = document.querySelector(".resultImg");
  let resultAlt = resultImg.alt;
  const shareTitle = "십이간지 연애유형 결과";
  const shareDesc = infoList[resultAlt].name;
  const shareImg = `${url}img/image-${resultAlt}.png`;
  const shareUrl = `${url}page/result-${resultAlt}.html`;

  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: shareTitle,
      description: shareDesc,
      imageUrl: shareImg,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "결과 확인하기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
}

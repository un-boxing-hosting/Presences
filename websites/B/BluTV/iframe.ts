const iframe = new iFrame();
let videoMessage;

iframe.on("UpdateData", async () => {
  const title = document.querySelector("div.vjs-title-control > div"),
   season = document.querySelector(
    "div.episode-selector.episode-selector-container > h3"
  ),
   video: HTMLVideoElement = document.querySelector("video");

  if (video) {
    videoMessage = {
      paused: video.paused,
      duration: video.duration,
      currentTime: video.currentTime
    };
  }

  if (!title || !title.textContent) return;

  // Series

  if (title.textContent.includes("Bölüm")) {
    const titleArr = title.textContent.split("."),
      epTitle = `${titleArr[0].charAt(titleArr[0].length - 1)}.${titleArr[1]}`,

     rx = new RegExp(epTitle, "g"),
     seriesName: string =
      title.textContent.charAt(0) != epTitle.split(".")[0]
        ? title.textContent.replace(rx, "")
        : null;

    iframe.send({
      video: {
        ...videoMessage
      },
      series: {
        name: seriesName,
        ep: epTitle,
        season:
          season && season.textContent && season.textContent.includes("Sezon")
            ? season.textContent
            : "1. Sezon"
      }
    });
  }

  //Movies
  else {
    iframe.send({
      video: {
        ...videoMessage
      },
      movie: {
        name: title.textContent
      }
    });
  }
});

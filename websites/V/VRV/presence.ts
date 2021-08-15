const presence = new Presence({
    clientId: "640150336547454976"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let browsingStamp = Math.floor(Date.now() / 1000),
 iFrameVideo: boolean, currentTime: any, duration: any, paused: any,

 lastPlaybackState = null,
 playback;

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
   endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }

  if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }
});

presence.on("UpdateData", async () => {
  const timestamps = getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "vrv"
    };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/watch/")) {
    if (iFrameVideo == true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (
        document.querySelector(
          ".content > div > div > .episode-info > .season"
        ) !== null
      ) {
        presenceData.details =
          `${document.querySelector(
            ".content > div > div > .episode-info > .series"
          ).textContent 
          } - S${ 
          document
            .querySelector(".content > div > div > .episode-info > .season")
            .textContent.toLowerCase()
            .replace("season", "")
            .trim() 
          }${document
            .querySelector(".content > div > div > .title")
            .textContent.split(" - ")[0]}`;
        presenceData.state = document
          .querySelector(".content > div > div > .title")
          .textContent.split(" - ")[1];
      } else {
        presenceData.details = document.querySelector(
          ".content > div > div > .episode-info > .series"
        ).textContent;
        presenceData.state = document.querySelector(
          ".content > div > div > .title"
        ).textContent;
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo == null && isNaN(duration)) {
      presenceData.details = "Looking at: ";

      if (
        document.querySelector(
          ".content > div > div > .episode-info > .season"
        ) !== null
      ) {
        presenceData.state =
          `${document.querySelector(
            ".content > div > div > .episode-info > .series"
          ).textContent 
          } - S${ 
          document
            .querySelector(".content > div > div > .episode-info > .season")
            .textContent.toLowerCase()
            .replace("season", "")
            .trim() 
          }${document
            .querySelector(".content > div > div > .title")
            .textContent.split(" - ")[0] 
          } ${ 
          document
            .querySelector(".content > div > div > .title")
            .textContent.split(" - ")[1]}`;
      } else {
        presenceData.state =
          `${document.querySelector(
            ".content > div > div > .episode-info > .series"
          ).textContent 
          } - ${ 
          document.querySelector(".content > div > div > .title").textContent}`;
      }
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname.includes("/serie")) {
    presenceData.details = "Viewing series:";
    presenceData.state = document.querySelector(
      "#content > div > div.app-body-wrapper > div > div.content > div.series-metadata > div.text-wrapper > div.erc-series-info > div.series-title"
    ).textContent;
  } else if (
    document.querySelector(".item-type") !== null &&
    document.querySelector(".item-type").textContent == "Channel"
  ) {
    presenceData.details = "Viewing channel:";
    presenceData.state = document.querySelector(".item-title").textContent;
  } else if (document.location.pathname.includes("/watchlist")) {
    presenceData.details = "Viewing their watchlist";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/") {
    presenceData.details = "Viewing the homepage";
    presenceData.smallImageKey = "reading";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

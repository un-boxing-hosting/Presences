const presence = new Presence({
    clientId: "641432995764633612"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

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

let browsingStamp = Math.floor(Date.now() / 1000),

 user: any,
 title: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "al"
  };

  if (document.location.hostname == "www.animelab.com") {
    if (
      document.location.pathname == "/" ||
      document.location.pathname == "/home"
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/player/")) {
      let currentTime: any,
        duration: any,
        paused: any,
        timestamps: any,
        video: HTMLVideoElement;
      video = document.querySelector("#video-component");
      title = document.querySelector(".primary-title").textContent;
      user = document.querySelector(".secondary-title").textContent;

      currentTime = video.currentTime;
      duration = video.duration;
      paused = video.paused;
      timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.details = title;
        presenceData.state = user;

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looing at:";
        presenceData.state = `${title} | ${user}`;
      }
    } else if (document.location.pathname.includes("/shows/")) {
      if (document.querySelector(".show-title") !== null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing show:";
        presenceData.state = document.querySelector(".show-title").textContent;
      } else if (document.location.pathname.includes("/search")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
        presenceData.details = "Searching for:";
        presenceData.state = document
          .querySelector(".shelf-header-title")
          .textContent.replace("Search Results for ", "")
          .replace("'", "");
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing for shows...";
      }
    } else if (document.location.pathname.includes("/genres/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing genre:";
      presenceData.state = document.querySelector(
        ".shelf-header-title"
      ).textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/genres")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing genres...";
    } else if (document.location.pathname.includes("/simulcasts")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing simulcasts...";
    } else if (document.location.pathname.includes("/movies")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing movies...";
    } else if (document.location.pathname.includes("/watchlist")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their watchlist...";
    } else if (document.location.pathname.includes("/profile")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their profile...";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

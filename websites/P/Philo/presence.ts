const presence = new Presence({
    clientId: "770395849041248306"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
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

let elapsed: number = undefined,
  oldUrl: string = undefined;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "philo"
    },
    {href} = window.location,
    path = window.location.pathname;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  const video: HTMLVideoElement = document.querySelector("#player video");

  if (video) {
    const title = document.querySelector(".player-controls-title")?.textContent,
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      seriesEp = document.querySelector(".season-episode-format"),
      subtitle = document.querySelector(".player-controls-subtitle-text"),
      live = document.querySelector(".flag.flag-live"),
      state = seriesEp
        ? `${seriesEp.textContent} ${subtitle.textContent}`
        : live
        ? "Watching Live"
        : "Watching",
      channel: HTMLImageElement = document.querySelector(
        ".player-controls-subtitle img"
      );

    (data.details = title), (data.state = state);
    (data.smallImageKey = live ? "live" : video.paused ? "pause" : "play"),
      (data.smallImageText = live
        ? (await strings).live
        : video.paused
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = live ? elapsed : timestamps[0]),
      (data.endTimestamp = live ? undefined : timestamps[1]);

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (!data.endTimestamp) 
      delete data.endTimestamp;
    

    if (data.details && data.state.trim()) {
      if (channel && channel.getAttribute("alt")) 
        data.state += ` on ${channel.getAttribute("alt")}`;
      
      presence.setActivity(data, !video.paused);
    }
  } else {
    data.details = "Browsing...";
    if (path.includes("/guide")) 
      data.details = "Browsing Guide";
    
    if (path.includes("/saved")) 
      data.details = "Browsing Saved";
    
    if (path.includes("/search")) 
      data.details = "Searching...";
    
    data.startTimestamp = elapsed;
    presence.setActivity(data);
  }
});

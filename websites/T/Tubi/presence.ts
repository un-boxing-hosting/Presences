const presence = new Presence({
    clientId: "621835880474345473"
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

let subtitle;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "tubi-logo"
  },

   video: HTMLVideoElement = document.querySelector(
    "video#videoPlayerComponent"
  );
  if (video && !isNaN(video.duration)) {
    const title = document.querySelector("h1._1PDoZ._1nW6s").textContent,
     timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    ),
     subtitleCheck = document.querySelector("h2._29XQF._24NNJ")
      ? false
      : true;

    if (subtitleCheck) 
      subtitle = "Movie";
     else 
      subtitle = document.querySelector("h2._29XQF._24NNJ").textContent;
    

    (data.details = title), (data.state = subtitle);
    (data.smallImageKey = video.paused ? "pause" : "play"),
      (data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = timestamps[0]),
      (data.endTimestamp = timestamps[1]);

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && subtitle !== null) 
      presence.setActivity(data, !video.paused);
    
  } else {
    data.details = "Browsing...";
    presence.setActivity(data);
  }
});

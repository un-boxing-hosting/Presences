const presence: Presence = new Presence({
    clientId: "615652705565933581"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  }),
  presenceData: PresenceData = {
    largeImageKey: "listen_moe_lg"
  },
  audio: HTMLAudioElement = document.querySelector("audio");
let path: string,
  startTimestamp: number,
  playback: boolean,
  elemt,
  artists = [],
  user: string,
  track: string,
  artist: string;

function resetTimestamp(): any {
  startTimestamp = Math.floor(Date.now() / 1000);
}

function getArtists(): string {
  artists = [];
  elemt = document.querySelector("span.ja.player-song-artist-container")
    ? document.querySelector("span.ja.player-song-artist-container").childNodes
    : undefined;
  if (elemt != undefined) {
    for (let i = 0; i < elemt.length; i++) 
      artists.push(elemt[i].textContent.replace(/\s+/g, " ").trim());
    
    artist = artists.join(" ");
  }
  return artist;
}

function getTrack(): string {
  track = document.querySelector("span.ja.player-song-title")
    ? document
        .querySelector("span.ja.player-song-title")
        .textContent.replace(/\s+/g, " ")
        .trim()
        .split("[")[0]
        .trim()
    : "Loading...";
  return track;
}

audio.onplay = function (): void {
  resetTimestamp();
};
audio.onpause = function (): void {
  resetTimestamp();
};

presence.on("UpdateData", async () => {
  path = window.location.pathname;
  playback = !audio.paused;

  if (playback) {
    presenceData.details = getTrack();
    presenceData.state = getArtists();
    presenceData.smallImageKey = "live";
    presenceData.smallImageText = (await strings).live;
    presenceData.startTimestamp = startTimestamp;
  } else if (path.includes("music")) {
    track = (document.querySelectorAll("input.search")[1] as HTMLInputElement)
      .value;
    track = track == "" ? undefined : track;
    presenceData.details = "Searching for a music";
    presenceData.state = track;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Searching";
    presenceData.startTimestamp = startTimestamp;
  } else if (path.includes("u")) {
    user = document.querySelector("div.profileName > span").textContent;
    presenceData.details = `Viewing ${user}'s profile`;
    if (path.includes("favorites")) 
      presenceData.state = "Favorites";
     else if (path.includes("uploads")) 
      presenceData.state = "Uploads";
     else 
      delete presenceData.state;
    
    presenceData.startTimestamp;
  } else {
    presenceData.details = "Not playing";
    presenceData.state = "Home";
  }
  presence.setActivity(presenceData, true);
});

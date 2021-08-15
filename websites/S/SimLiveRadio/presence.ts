const presence = new Presence({
  clientId: "699961797041455174"
}),

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "simlive"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.host == "laut.fm") {
    if (
      document.querySelector(
        ".player-display--meta.player-display__meta--station-name"
      ) !== null &&
      document.querySelector(
        ".player-display--meta.player-display__meta--station-name"
      ).textContent == "SimLiveRadio"
    ) {
      presenceData.details = document
        .querySelector(".player-display__meta.player-display__meta--artist")
        .textContent.trim();
      presenceData.state = document
        .querySelector(".player-display__meta.player-display__meta--title")
        .textContent.trim()
        .replace('"', "")
        .replace('"', "");
      presenceData.smallImageKey = "play";

      presence.setActivity(presenceData);
    }
  } else if (document.location.host == "simliveradio.net") {
    if (document.location.pathname == "/") 
      presenceData.details = "Browsing...";
     else if (document.querySelector(".entry-title") !== null) {
      presenceData.details = "Reading article:";
      presenceData.state = document.querySelector(".entry-title").textContent;
    } else if (document.location.pathname.includes("/hoeren")) 
      presenceData.details = "Reading how to listen to SimLiveRadio";
     else if (document.location.pathname.includes("/historie")) 
      presenceData.details = "Viewing the song history";
     else if (document.location.pathname.includes("/mediathek")) 
      presenceData.details = "Viewing the mediathek";
     else if (document.location.pathname.includes("/sendeplan")) 
      presenceData.details = "Viewing the upcoming DJs";
     else if (document.location.pathname.includes("/wunschbox")) 
      presenceData.details = "Viewing the wish box";
     else if (document.location.pathname.includes("/news")) 
      presenceData.details = "Viewing the latest articles";
     else if (document.location.pathname.includes("/team")) 
      presenceData.details = "Viewing the team";
     else if (document.location.pathname.includes("/jobs")) 
      presenceData.details = "Viewing the jobs";
     else if (document.location.pathname.includes("/kontakt")) {
      presenceData.details = "Writing to SimLiveRadio";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/studiohotline")) 
      presenceData.details = "Viewing the Studio Hot Line";
     else if (document.location.pathname.includes("/teamspeak")) 
      presenceData.details = "Viewing TeamSpeak";
     else if (document.location.pathname.includes("/projektanfrage")) {
      presenceData.details = "Reading about the interviews";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/unterstuetzen")) 
      presenceData.details = "Viewing the support page";
     else if (document.location.pathname.includes("/downloads")) 
      presenceData.details = "Viewing the downloads page";
     else if (
      document.location.pathname.includes("/lets-player-und-streamer")
    ) 
      presenceData.details = "Viewing the streamer page";
     else if (document.location.pathname.includes("/partner")) 
      presenceData.details = "Viewing the partner page";
     else if (document.location.pathname.includes("/ueber-uns")) {
      presenceData.details = "Reading about SimLiveRadio";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/faq")) {
      presenceData.details = "Reading the FAQs";
      presenceData.smallImageKey = "reading";
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else 
      presence.setActivity(presenceData);
    
  }
});

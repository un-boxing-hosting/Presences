const presence = new Presence({
  clientId: "691669470057594940"
}),

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.host.split(".")[0] !== "forum") {
    if (document.location.pathname === "/") 
      presenceData.details = "Home";
     else if (document.location.pathname.includes("/web/")) {
      const profile = JSON.parse(localStorage.getItem("senpaio:profiles"));
      presenceData.details = `Playing on server : ${localStorage.getItem(
        "senpaio:region"
      )} ${localStorage.getItem("senpaio:server")} | ${
        document.querySelector("#room-stats-hud").textContent
      }`;
      presenceData.state =
        `Player : ${profile.tag == "" ? "" : `[${profile.tag}]`} ${
          profile.list[profile.selected].nick == ""
            ? "no nick"
            : profile.list[profile.selected].nick
        }` + ` | ${document.querySelector("#stats-hud").textContent}`;
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = document
        .querySelector("title")
        .textContent.split("-")[1];
      presenceData.smallImageKey = "reading";
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      if (presenceData.state == null) presenceData.state = "Navigating...";
      presence.setActivity(presenceData);
    }
  }
});

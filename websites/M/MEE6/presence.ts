let presence = new Presence({
  clientId: "632002763483512843"
}),

 browsingStamp = Math.floor(Date.now() / 1000),
 title: any,
 search: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "mee6.xyz") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/leaderboard/")) {
      title = document.querySelector(
        "#app-mount > div > div > div > div.leaderboardHeader > div.leaderboardHeaderGuildInfo > div.leaderboardGuildName"
      );
      presenceData.details = "Viewing leaderboard of server:";
      presenceData.state = title.innerText;
    } else if (document.querySelector(".pluginTitle") != null) {
      title = document.querySelector(".pluginTitle");
      presenceData.details = "Dashboard - Editing plugin:";
      presenceData.state = title.innerText;
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/dashboard/")) {
      title = document.querySelector(".subHeaderMenuListItem.selected");
      presenceData.details = "Dashboard - Viewing tab:";
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Reading about premium";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname == "/") 
      presenceData.details = "Viewing the homepage";
    
  } else if (document.location.hostname == "help.mee6.xyz") {
    title = document.querySelector("head > title");
    search = document.querySelector(
      "body > header > div.csh-wrapper > form > span > input"
    );
    presenceData.startTimestamp = browsingStamp;
    if (search.value != "") {
      presenceData.details = "Helpdesk searching for:";
      presenceData.state = search.value;
      presenceData.smallImageKey = "searching";
    } else if (title.innerText == "MEE6 Helpdesk") 
      presenceData.details = "Browsing the helpdesk";
     else {
      presenceData.details = "Helpdesk viewing:";
      presenceData.state = title.innerText.replace(" | MEE6 Helpdesk", "");
      presenceData.smallImageKey = "reading";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

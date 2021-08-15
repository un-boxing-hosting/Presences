let presence = new Presence({
  clientId: "634032819915456552"
}),

 browsingStamp = Math.floor(Date.now() / 1000),

 user: any,
 title: any,
 search: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "hltv"
  };

  if (document.location.hostname == "www.hltv.org") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/news/")) {
      presenceData.details = "Reading news post:";
      title = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > article > h1"
      );
      presenceData.state = title.innerText;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/profile/")) {
      title = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > div > div.top-info > div > div.info.col > div.headline"
      );
      presenceData.details = "Viewing profile:";
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/forums/")) {
      if (document.location.pathname.includes("/threads/")) {
        title = document.querySelector(
          "body > div.bgPadding > div > div.colCon > div.contentCol > div.forumthread > div.standard-box > div.forum-topbar > div.topic"
        );
        presenceData.details = "Reading forum thread:";
        presenceData.state = title.innerText;
        presenceData.smallImageKey = "reading";
      } else {
        title = document.querySelector(
          "body > div.bgPadding > div > div.colCon > div.contentCol > div > span:nth-child(2)"
        );
        presenceData.details = "Viewing forums category:";
        presenceData.state = title.innerText;
      }
    } else if (document.location.pathname.includes("/forums")) 
      presenceData.details = "Browsing the forums";
     else if (document.location.pathname.includes("/matches/")) {
      presenceData.details = "Viewing match:";
      title = document.querySelector("head > title");
      presenceData.state = title.innerText.replace(" | HLTV.org", "");
    } else if (document.location.pathname.includes("/matches")) 
      presenceData.details = "Viewing the recent matches";
     else if (document.location.pathname.includes("/results")) 
      presenceData.details = "Viewing the results";
     else if (document.location.pathname.includes("/events/")) {
      presenceData.details = "Viewing event:";
      title = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > div > div.event-header-component.event-holder.header > a > div > div"
      );
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/events")) 
      presenceData.details = "Viewing list of events";
     else if (document.location.pathname.includes("/player/")) {
      title = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > div > div.standard-box.profileTopBox.clearfix.flex > div.profile-info-container > div.profile-player-info-container > div.profile-player-info > h1"
      );
      presenceData.details = "Viewing player:";
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/team/")) {
      title = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > div > div.standard-box.profileTopBox.clearfix > div.flex > div.profile-team-container.text-ellipsis > div.profile-team-info > div.profile-team-name.text-ellipsis"
      );
      presenceData.details = "Viewing team:";
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/stats/")) {
      presenceData.details = "Viewing stats of:";
      title = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > div > div.playerSummaryStatBox > div.summaryBreakdownContainer > div.summaryShortInfo > h1"
      );
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/stats")) 
      presenceData.details = "Viewing the stats";
     else if (document.location.pathname.includes("/gallery/")) {
      presenceData.details = "Viewing gallery:";
      title = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > div > div.event-header-component.event-holder.header > a > div > div"
      );
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/galleries")) 
      presenceData.details = "Browsing galleries";
     else if (document.location.pathname.includes("/betting")) 
      presenceData.details = "Viewing betting";
     else if (document.location.pathname.includes("/live")) {
      title = document.querySelector(
        "#LiveApplication > div > div.stats-container.gtSmartphone-only > div > div.team1-stats > div.team.text-ellipsis > span"
      );
      user = document.querySelector(
        "#LiveApplication > div > div.stats-container.gtSmartphone-only > div > div.team2-stats > div.team.text-ellipsis > span"
      );
      presenceData.details = "Watching live match:";
      presenceData.state = `${title.innerText} vs. ${user.innerText}`;
      presenceData.smallImageKey = "live";
    } else if (document.location.pathname.includes("/fantasy/")) {
      presenceData.details = "Viewing fantasy of:";
      title = document.querySelector(
        "#fantasy > div > div.fantasy-content > div > div.eventBarFragment > div.countdownContainer > div > div.textBox > h1"
      );
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/fantasy")) 
      presenceData.details = "Browsing fantasy";
     else if (document.location.pathname.includes("/search")) {
      search = document.querySelector(
        "body > div.bgPadding > div > div.colCon > div.contentCol > div > div:nth-child(2) > div > form > input.searchInput"
      );
      presenceData.details = "Searching for:";
      presenceData.state = search.value;
      presenceData.smallImageKey = "search";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

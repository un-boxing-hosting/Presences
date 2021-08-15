let presence = new Presence({
  clientId: "626481021843669044" // CLIENT ID FOR YOUR PRESENCE
}),

 user: any, search: any, title: any,

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bukkit"
  };

  presenceData.startTimestamp = browsingStamp;
  if (
    document.location.hostname == "bukkit.org" ||
    document.location.hostname == "dl.bukkit.org"
  ) {
    if (document.location.pathname.includes("/threads/")) {
      title = document.querySelector(
        "#content > div.pageWidth > div.pageContent > div.titleBar > h1"
      );

      presenceData.details = "Forums, viewing thread:";
      if (title.innerText.length > 128) 
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
       else 
        presenceData.state = title.innerText;
      
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/forums/")) {
      title = document.querySelector(
        "#content > div.pageWidth > div.pageContent > div.titleBar > h1"
      );
      if (title != null) {
        presenceData.details = "Forums, viewing category:";
        presenceData.state = title.innerText;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Browsing...";

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#content > div.pageWidth > div.pageContent > div.mainContainer > div > div.titleBar > h1 > a > em"
      );
      if (search !== null) {
        presenceData.details = "Forums, Searching for:";
        presenceData.state = search.innerText;

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Going to search";
        presenceData.state = "something up";

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/members/")) {
      if (document.URL.includes("type=iwd_staff-members")) {
        presenceData.details = "Forums, Viewing the list";
        presenceData.state = "of staff members";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("type=points")) {
        presenceData.details = "Forums, Viewing list of";
        presenceData.state = "members with the most points";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("type=staff")) {
        presenceData.details = "Forums, Viewing list of";
        presenceData.state = "staff members";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("type=positive_ratings")) {
        presenceData.details = "Forums, Viewing list of";
        presenceData.state = "members with the most reactions";

        presence.setActivity(presenceData);
      } else if (
        document.querySelector(
          "#content > div.pageWidth > div.pageContent > div.profilePage > div.mainProfileColumn > div > div > h1"
        ) !== null
      ) {
        user = document.querySelector(
          "#content > div.pageWidth > div.pageContent > div.profilePage > div.mainProfileColumn > div > div > h1"
        );
        presenceData.details = "Forums, Viewing user:";
        presenceData.state = user.innerText;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Viewing list of";
        presenceData.state = "members with the most messages";

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/XenStaff/")) {
      presenceData.details = "Forums, viewing staff list";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/account/")) {
      presenceData.details = "Forums, account settings";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/help/")) {
      title = document.querySelector(
        "#content > div.pageWidth > div.pageContent > div.titleBar > h1"
      );
      presenceData.details = "Help Center, reading:";
      presenceData.state = title.innerText;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/pages/")) {
      title = document.querySelector(
        "#content > div.pageWidth > div.pageContent > div.titleBar > h1"
      );
      presenceData.details = "Forums, reading:";
      presenceData.state = title.innerText;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "bukkit.gamepedia.com") {
    title = document.querySelector("#firstHeading");
    if (title != null) {
      presenceData.details = "Docs, reading:";
      presenceData.state = title.innerText;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Docs, Browsing...";

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "dev.bukkit.org") {
    if (document.location.pathname.includes("/dashboard")) {
      presenceData.details = "Devs, viewing:";
      presenceData.state = "Dashboard";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/paste")) {
      presenceData.details = "Devs, viewing:";
      presenceData.state = "Paste";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/bukkit-plugins/")) {
      title = document.querySelector(
        "#content > section > section.level-categories.categories-tier > div > div > ul > li.tier-holder > ul > li.level-categories-nav.highlight > a > span"
      );
      presenceData.details = "Devs, viewing plugins in";
      presenceData.state = `category: ${title.innerText}`;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/bukkit-plugins")) {
      presenceData.details = "Devs, viewing:";
      presenceData.state = "bukkit plugins";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search")) {
      search = document.querySelector("#field-search");
      presenceData.details = "Devs, searching for:";
      presenceData.state = search.value;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/members/")) {
      title = document.querySelector(
        "#content > section > section > div.p-user-info > ul.p-user-details > li.username"
      );
      presenceData.details = "Devs, viewing user:";
      presenceData.state = title.innerText;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/members")) {
      presenceData.details = "Devs, viewing all users";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/projects/")) {
      title = document.querySelector(
        "#site-main > section.atf > div > div > div.project-details-container > div > h1 > a > span"
      );
      presenceData.details = "Devs, viewing project:";
      if (title.innerText.length > 128) 
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
       else 
        presenceData.state = title.innerText;
      

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});

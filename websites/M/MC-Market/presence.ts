let presence = new Presence({
  clientId: "626148940927991829" // CLIENT ID FOR YOUR PRESENCE
}),

 user: any, search: any, title: any,

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mc-market"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "www.mc-market.org") {
    if (document.location.pathname.includes("/chat/")) {
      presenceData.details = "Reading the";
      presenceData.state = "global chat";

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/private-accounts/")) {
      presence.setActivity();
      presence.setTrayTitle();
    } else if (document.location.pathname.includes("/advertising/")) {
      presenceData.details = "Viewing the";
      presenceData.state = "advertising page";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#content > div > div > div.mainContainer > div > div.titleBar > h1 > a > em"
      );
      if (search !== null) {
        presenceData.details = "Searching for:";
        presenceData.state = search.innerText;

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Going to search";
        presenceData.state = "something up";

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/resources/")) {
      title = document.querySelector(
        "#content > div > div > div.mainContainer > div > div.resourceInfo > h1"
      );
      if (title !== null) {
        presenceData.details = "Resources, viewing:";
        if (title.innerText.length > 128) 
          presenceData.state = `${title.innerText.substring(0, 125)}...`;
         else 
          presenceData.state = title.innerText;
        
        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/categories/")) {
        title = document.querySelector(
          "#content > div > div > div.titleBar > h1"
        );
        presenceData.details = "Resources, viewing";
        presenceData.state =
          `category: ${ 
          title.innerText
            .replace("Add Resource", "")
            .replace("Sell your OG", "")
            .replace("Sell your Semi-OG", "")
            .replace("Sell your cape account", "")
            .replace("Sell your Rank Account", "")
            .replace("Post New Thread", "")}`;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/reviews")) {
        presenceData.details = "Resources, viewing";
        presenceData.state = "the latest reviews";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/watched-categories")) {
        presenceData.details = "Resources, viewing";
        presenceData.state = "their watched categories";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/purchases")) {
        presenceData.details = "Resources, viewing";
        presenceData.state = "their purchases";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/licenses")) {
        presenceData.details = "Resources, viewing";
        presenceData.state = "their licenses";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/watched")) {
        presenceData.details = "Resources, viewing";
        presenceData.state = "their watched resources";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/authors")) {
        user = document.querySelector(
          "#content > div > div > div.mainContainer > div > div.titleBar > h1"
        );
        if (user !== null) {
          presenceData.details = "Resources, viewing author:";
          presenceData.state = user.innerText.replace("Resources from ", "");

          delete presenceData.smallImageKey;

          presence.setActivity(presenceData);
        } else {
          presenceData.details = "Resources, viewing:";
          presenceData.state = "most active authors";

          delete presenceData.smallImageKey;

          presence.setActivity(presenceData);
        }
      } else {
        presenceData.details = "Resources, browsing...";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (
      document.location.pathname.includes("/support/") ||
      document.location.pathname.includes("/help/")
    ) {
      presenceData.details = "Viewing the";
      presenceData.state = "support center";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/wiki/")) {
      title = document.querySelector(
        "#content > div > div > div.mainContainer > div > div.titleBar > h1"
      );
      if (title == null) {
        title = document.querySelector(
          "#content > div > div > div.titleBar > h1"
        );
      }
      presenceData.details = "Wiki, viewing:";
      presenceData.state = title.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/account/")) {
      presenceData.details = "Viewing their";
      presenceData.state = "account settings";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/threads/")) {
      title = document.querySelector(
        "#content > div > div > div.titleBar > h1"
      );
      if (title.innerText.includes("Private OG")) {
        presence.setActivity();
        presence.setTrayTitle();
      } else {
        presenceData.details = "Reading thread:";
        if (title.innerText.length > 128) 
          presenceData.state = `${title.innerText.substring(0, 125)}...`;
         else 
          presenceData.state = title.innerText;
        
        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/forums/")) {
      title = document.querySelector(
        "#content > div > div > div.titleBar > h1"
      );
      presenceData.details = "Viewing category:";
      presenceData.state = title.innerText
        .replace("Post New Thread", "")
        .replace("Sell your OG", "")
        .replace("Sell your Semi-OG", "")
        .replace("Sell your cape account", "")
        .replace("Sell your Rank Account", "");

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/products/")) {
      presenceData.details = "Viewing category:";
      presenceData.state = "Products";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/announcements/")) {
      presenceData.details = "Viewing category:";
      presenceData.state = "Announcements";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/suggestions/")) {
      presenceData.details = "Viewing category:";
      presenceData.state = "Suggestions";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/discussion/")) {
      presenceData.details = "Viewing category:";
      presenceData.state = "Discussion";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/services/")) {
      presenceData.details = "Viewing category:";
      presenceData.state = "Services";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/categories/")) {
      title = document.querySelector(
        "#content > div > div > div.titleBar > h1"
      );
      presenceData.details = "Viewing category:";
      presenceData.state = title.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/online/")) {
      presenceData.details = "Viewing the list";
      presenceData.state = "of current visitors";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/members/")) {
      if (document.URL.includes("type=iwd_staff-members")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of staff members";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.URL.includes("type=resources")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most resources";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.URL.includes("type=points")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most points";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/banned")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of banned users";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/list")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of all users";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.URL.includes("type=positive_ratings")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most reactions";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (
        document.querySelector(
          "#content > div > div > div.profilePage > div.mainProfileColumn > div > div > h1"
        ) !== null
      ) {
        user = document.querySelector(
          "#content > div > div > div.profilePage > div.mainProfileColumn > div > div > h1"
        );
        presenceData.details = "Viewing user:";
        presenceData.state = user.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most messages";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (
      document.location.pathname.includes("/find-new/") &&
      document.location.pathname.includes("/profile-posts")
    ) {
      presenceData.details = "Viewing the list of";
      presenceData.state = "latest profile posts";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/find-new/") &&
      document.location.pathname.includes("/posts")
    ) {
      presenceData.details = "Viewing the list of";
      presenceData.state = "latest posts";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/watched/")) {
      if (document.location.pathname.includes("/threads")) {
        presenceData.details = "Viewing their";
        presenceData.state = "watched threads";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing their";
        presenceData.state = "watched forums";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/recent-activity/")) {
      presenceData.details = "Viewing the list";
      presenceData.state = "of recent activity";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/conversations/")) {
      title = document.querySelector(
        "#content > div > div > div.mainContainer > div > div.titleBar > h1"
      );
      if (title == null) {
        presenceData.details = "Viewing their";
        presenceData.state = "conversations";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Reading conversation:";
        presenceData.state = title.innerText;

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "status.mc-market.org") {
    presenceData.details = "Viewing MC-Market Status";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});

let presence = new Presence({
  clientId: "623657389706444820" // CLIENT ID FOR YOUR PRESENCE
}),

 item: any, user: any, search: any, item2: any,

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "imgur"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "imgur.com") {
    user = document.querySelector(
      "#root > div > div.desktop-app.App > div > div.App-cover.NewCover.ProfileCover > div.ProfileCover-header > div.ProfileMeta > div > div.ProfileMeta-user"
    );
    if (document.location.pathname.includes("/posts")) {
      presenceData.details = "Viewing posts by user:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/user/") &&
      document.location.pathname.includes("/favorites")
    ) {
      presenceData.details = "Viewing favorites of user:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/user/") &&
      document.location.pathname.includes("/comments")
    ) {
      presenceData.details = "Viewing comments by:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/user/") &&
      document.location.pathname.includes("/about")
    ) {
      presenceData.details = "Viewing about user:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/user/")) {
      presenceData.details = "Viewing user:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/leaderboard")) {
      presenceData.details = "Viewing the leaderboard";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/account/") &&
      document.location.pathname.includes("/messages")
    ) {
      item = document.querySelector(
        "body > div.message-container > div > div.message-conversation > div.message-conversation-heading > strong > a"
      );
      if (item !== null) {
        presenceData.details = "Imgur DMs, messaging:";
        presenceData.state = item.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Imgur DMs";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/account/")) {
      presenceData.details = "Viewing account settings";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/upload")) {
      presenceData.details = "Uploading a new post";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/memegen")) {
      presenceData.details = "Viewing the memegen";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/rules")) {
      presenceData.details = "Viewing the rules";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/vidgif")) {
      presenceData.details = "Transferring a Video to GIF";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/t/")) {
      item = document.querySelector(
        "#root > div > div.desktop-app.App > div > div.App-cover.NewCover.TagsCover > div.Cover-metadata > h1"
      );
      presenceData.details = "Exploring the tag:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search")) {
      search = document.querySelector(
        "#content > div.sentence-sorting.search-sentence > span.search-term-text.sorting-text-align"
      );
      item = document.querySelector("#sort > div.selection");
      item2 = document.querySelector("#window > div.selection");
      presenceData.details = "Searching for:";
      if (item2 !== null) {
        presenceData.state =
          `${search.innerText 
          }, sorted by ${ 
          item.innerText 
          } of ${ 
          item2.innerText}`;
      } else 
        presenceData.state = `${search.innerText}, sorted by ${item.innerText}`;
      

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/a/")) {
      item = document.querySelector(
        "#inside > div.left.post-pad > div.post-container > div.post-header > div > div.post-title-container > h1"
      );
      if (item !== null) {
        presenceData.details = "Viewing a hidden post:";
        if (item.innerText.length > 128) 
          presenceData.state = `${item.innerText.substring(0, 125)}...`;
         else 
          presenceData.state = item.innerText;
        

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing a hidden post";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/gallery/")) {
      item = document.querySelector(
        "#inside > div.left.post-pad > div.post-container > div.post-header > div > div.post-title-container > h1"
      );
      if (document.location.pathname.includes("/comment/")) {
        presenceData.details = "Viewing comment at post:";
        if (item.innerText.length > 128) 
          presenceData.state = `${item.innerText.substring(0, 125)}...`;
         else 
          presenceData.state = item.innerText;
        

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing post:";
        if (item.innerText.length > 128) 
          presenceData.state = `${item.innerText.substring(0, 125)}...`;
         else 
          presenceData.state = item.innerText;
        

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "imgurinc.com") {
    if (document.location.pathname.includes("/press")) {
      presenceData.details = "Viewing the press info";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/mobileapps")) {
      presenceData.details = "Viewing the mobile apps";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/advertise")) {
      presenceData.details = "Viewing the advertise page";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/careers")) {
      presenceData.details = "Viewing the careers page";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/contact")) {
      presenceData.details = "Viewing the contact form";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Reading about Imgur";
      delete presenceData.state;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "blog.imgur.com") {
    item = document.querySelector("#main-content > h1");
    if (document.location.pathname.includes("/category/")) {
      presenceData.details = "Blog, viewing category:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.querySelector(
        "#main-content > article > header > div.clearfix > h1"
      ) !== null
    ) {
      item = document.querySelector(
        "#main-content > article > header > div.clearfix > h1"
      );
      presenceData.details = "Blog, reading article:";
      if (item.innerText.length > 128) 
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
       else 
        presenceData.state = item.innerText;
      

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (item !== null) {
      presenceData.details = "Blog, searching for:";
      presenceData.state = item.innerText.split("SEARCH RESULTS FOR ")[1];

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Blog, Browsing...";
      delete presenceData.state;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "help.imgur.com") {
    presenceData.details = "Viewing Customer Support";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname == "imgurstore.com") {
    if (
      document.querySelector(
        "#body-wrapper > div > div > div.container-fluid.container > div.row > div.col-md-5 > div.row.desktop-product-title.hidden-xs.hidden-sm > div > h1"
      ) !== null
    ) {
      item = document.querySelector(
        "#body-wrapper > div > div > div.container-fluid.container > div.row > div.col-md-5 > div.row.desktop-product-title.hidden-xs.hidden-sm > div > h1"
      );
      presenceData.details = "Store, viewing product:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/cart")) {
      presenceData.details = "Store, viewing cart";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/_/")) {
      presenceData.details = "Store, viewing support";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Store, Browsing...";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "community.imgur.com") {
    if (document.location.pathname.includes("/t/")) {
      item = document.querySelector("#topic-title > div > div > h1 > a");
      presenceData.details = "Community, reading:";
      if (item.innerText.length > 128) 
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
       else 
        presenceData.state = item.innerText;
      

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/categories")) {
      presenceData.details = "Community, Browsing categories";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/top")) {
      presenceData.details = "Community, Browsing top";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/latest")) {
      presenceData.details = "Community, Browsing latest";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/guidelines")) {
      presenceData.details = "Community, Reading rules";
      delete presenceData.state;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/c/")) {
      item = document.querySelector(
        "#main-outlet > div.list-controls > div > section > div.category-navigation > ol > li > div > span > span > span.badge-category.clear-badge > span"
      );
      presenceData.details = "Community, Browsing";
      presenceData.state = `category: ${item.innerText}`;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/u/")) {
      item = document.querySelector(
        "#main-outlet > div:nth-child(3) > section > section > div.details > div.primary > div.primary-textual > div.user-profile-names > h2"
      );
      presenceData.details = "Community, viewing";
      presenceData.state = `user: ${item.innerText}`;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "apidocs.imgur.com") {
    presenceData.details = "Reading the API Docs";
    delete presenceData.state;

    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});

const presence = new Presence({
    clientId: "650492842615242765"
  }),
  pages = {
    "/trending": "Trending ",
    "/lol": "Lol ",
    "/win": "Win ",
    "/quizzes": "Quiz ",
    "/giftguide": "Gift Guide ",
    "/shopping": "Shopping ",
    "/tvandmovies": "Tv & Movies ",
    "/celebrity": "Celebrity ",
    "/newsletters": "Newsletter "
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    posttitle = document.querySelector(
      "#mod-buzz-header-1 > div.buzz-header__hgroup.xs-my2.md-mt0 > h1"
    ),
    user = document.querySelector(
      "body > main > div > div > div > div.user-info.xs-px2.sm-p0.xs-mb3.md-mb4 > div > div.xs-ml2.xs-flex.xs-flex-column > div > h1"
    ),
   presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  if (posttitle && posttitle.textContent != "") {
    presenceData.details = "Reads a Post:";
    presenceData.state = `${posttitle.textContent}`;
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presenceData.details = "Viewing Page:";
    presenceData.state = pages[page] || pages[page.slice(0, -1)];
  } else if (page.includes("/search")) {
    presenceData.details = "Searching:";
    presenceData.state = document.title;
    presenceData.smallImageKey = "logo";
  } else if (user && user.textContent != "") {
    presenceData.details = "Viewing User Profile:";
    presenceData.state = user.textContent;
  } else {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Homepage";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

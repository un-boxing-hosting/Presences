let presence = new Presence({
  clientId: "647973934603567130"
}),

 browsingStamp = Math.floor(Date.now() / 1000),
 title: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bahamut"
  };

  if (document.location.hostname == "forum.gamer.com.tw") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.querySelector(".BH-menu") !== null) {
      if (document.location.pathname.includes("A.php")) {
        title = document
          .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
          .getAttribute("title");
        presenceData.details = title;
        presenceData.state = "首頁";
        presence.setActivity(presenceData);
        presenceData.smallImageKey = "reading";
      }
      if (document.location.pathname.includes("B.php")) {
        title = document
          .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
          .getAttribute("title");
        presenceData.details = title;
        presenceData.state = "列表";
        presence.setActivity(presenceData);
        presenceData.smallImageKey = "reading";
      }
      if (document.location.pathname.includes("C.php")) {
        title = document
          .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
          .getAttribute("title");
        const header_title = document.getElementsByClassName(
          "c-post__header__title"
        )[0].innerHTML;
        presenceData.details = title;
        presenceData.state = header_title;
        presence.setActivity(presenceData);
        presenceData.smallImageKey = "reading";
      }
    }
  }
  if (presenceData.details == null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing site:";
    presenceData.state = "巴哈姆特";
    presence.setActivity(presenceData);
  } else 
    presence.setActivity(presenceData);
  
});

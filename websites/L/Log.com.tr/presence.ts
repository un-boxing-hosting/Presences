const presence = new Presence({
  clientId: "657615662537244673"
}),

 browsingStamp = Math.floor(Date.now() / 1000),

 presenceData: PresenceData = {
  largeImageKey: "log-logo",
  startTimestamp: browsingStamp
};

function makeCategoryRPC(title: string): void {
  presenceData.details = "Bir kategoriye göz atıyor:";
  presenceData.state = title;
}

presence.on("UpdateData", () => {
  const page = document.location.pathname;

  if (page.length == 1) {
    presenceData.details = "Ana Sayfa";
    presenceData.state = "Haberlere göz atıyor...";
  }

  if (document.getElementsByClassName("entry-title").length > 0) {
    // Reading an article
    const title = document.getElementsByClassName("entry-title")[0];
    presenceData.details = "Bir haber okuyor...";
    presenceData.state = title
      ? title.textContent.replace("[İzle]", "")
      : "Bilinmeyen";
  }

  if (page.startsWith("/author")) {
    presenceData.details = "Bir yazara göz atıyor...";
    presenceData.state = document.querySelector(
      "body > div.container > div.grid12.first.breadcrumbs.borderTop.borderBottom.marginBottom.padding > h1"
    )?.textContent;
  }

  if (page.includes("/page")) {
    const pagenum = parseInt(document.location.pathname.split("/")[2]);
    presenceData.details = "Ana Sayfa";
    presenceData.state = `Sayfa: ${pagenum}`;
  }
  if (page.includes("/asfalt")) makeCategoryRPC("Asfalt");
  if (page.includes("/teknoloji-haberleri")) makeCategoryRPC("Teknoloji");
  if (page.includes("/radar")) makeCategoryRPC("Radar");
  if (page.includes("/play")) makeCategoryRPC("Play");
  if (page.includes("/dosya-konusu")) makeCategoryRPC("Dosya");
  if (page.includes("/uygulama-rehberi")) makeCategoryRPC("Uygulama Rehberi");
  if (page.includes("/nasil-yapilir")) makeCategoryRPC("Nasıl yapılır?");
  if (page.includes("/test")) makeCategoryRPC("Test");
  if (page.includes("/etiket")) {
    const tag = document.querySelector(
      "body > div.container > div.grid12.first.breadcrumbs.borderTop.borderBottom.marginBottom.padding > h1"
    );
    presenceData.details = "Bir etiket görüntülüyor:";
    presenceData.state = tag ? tag.textContent : "Bilinmeyen";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

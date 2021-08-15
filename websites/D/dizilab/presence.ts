const presence = new Presence({
    clientId: "635199664290922512"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages = {
    "/": "Ana Sayfa",
    "/uyeler": "Üyeler",
    "/yabanci-dizi-takvimi": "Dizi Takvimi",
    "/forum": "Forum",
    "/basvuru": "Çevirmenlik",
    "/iletisim": "İletişim",
    "/sifre_sifirla": "Şifre Sıfırla",
    "/mesajlar": "Özel Mesajlar",
    "/oyuncular": "Oyuncular",
    "/pano": "Pano",
    "/pano/sosyal-akis": "Sosyal Akış",
    "/pano/takip-ettiklerim": "Takip Ettiklerim",
    "/pano/izleme-listesi": "İzleme Listesi",
    "/pano/son-izlediklerim": "Son İzlediklerim"
  };

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
   endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const video: { [k: string]: any } = {};

presence.on("iFrameData", (data) => {
  if (!data.error) {
    video.dataAvailable = true;
    video.currentTime = data.currentTime;
    video.duration = data.duration;
    video.paused = data.paused;
  }
});

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    _video = document.querySelector("video") as HTMLVideoElement,
    isVideoData = Object.keys(video).length > 0 ? true : false,
    showTitle = document.querySelector(
      "#container > div.content > div.right > div.right-inner > div.tv-series-profile-head > div.tv-series-right-content > h1"
    ),
    actorName = document.querySelector(
      "#container > div.content > div.right > div.artist-right > div.artist-name > h1"
    );

  if (!isVideoData && page.includes("/arsiv")) {
    const url = new URL(document.location.href),
      genre = url.searchParams.get("tur"),
      showName = url.searchParams.get("dizi_adi");

    if (
      !document.location.search ||
      document.location.search == "" ||
      (document.location.search != "" && !genre && !showName) ||
      (document.location.search != "" && genre == "" && showName == "")
    ) {
      presence.setActivity({
        largeImageKey: "dl-logo",
        details: "Bir sayfaya göz atıyor:",
        state: "Arşiv",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (
      (genre && genre != "" && !showName) ||
      (genre && genre != "" && showName == "")
    ) {
      presence.setActivity({
        largeImageKey: "dl-logo",
        details: "Bir kategoriye göz atıyor:",
        state: genre,
        smallImageKey: "search",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (genre && genre != "" && showName && showName != "") {
      presence.setActivity({
        largeImageKey: "dl-logo",
        details: "Bir dizi arıyor:",
        state: `${showName} (${genre})`,
        smallImageKey: "search",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (
      (!genre && showName) ||
      (genre == "" && showName && showName != "")
    ) {
      presence.setActivity({
        largeImageKey: "dl-logo",
        details: "Bir dizi arıyor:",
        state: showName,
        smallImageKey: "search",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    }
  } else if (!isVideoData && page.includes("/uye/")) {
    const user = document.querySelector(
      "#container > div.content > div.right > div.dashboard-head > h1 > span"
    );

    presence.setActivity({
      largeImageKey: "dl-logo",
      details: "Bir üyenin profiline bakıyor:",
      state: user && user.textContent ? user.textContent.trim() : "Belirsiz",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (!isVideoData && showTitle && showTitle.textContent != "") {
    presence.setActivity({
      largeImageKey: "dl-logo",
      details: "Bir diziyi inceliyor:",
      state: showTitle.textContent,
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (!isVideoData && actorName && actorName.textContent != "") {
    presence.setActivity({
      largeImageKey: "dl-logo",
      details: "Bir aktörü inceliyor:",
      state: actorName.textContent,
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (!isVideoData && page.includes("/forum")) {
    const postTitle = document.querySelector(
        "#container > div.content > div.right > div.right-inner > h2 > span"
      ),
      forumTitle = document.querySelector(
        "#container > div.content > div.right > div.forum-head > h1"
      );

    if (page.slice(page.indexOf("/forum") + 6).length <= 0) {
      presence.setActivity({
        largeImageKey: "dl-logo",
        details: `${
          forumTitle && forumTitle.textContent != ""
            ? forumTitle.textContent.replace(" tartışma forumu", "")
            : "Bilinmeyen"
        } dizisinin forumlarına bakıyor:`,
        state: "Ana Sayfa",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else {
      presence.setActivity({
        largeImageKey: "dl-logo",
        details: `${
          forumTitle && forumTitle.textContent != ""
            ? forumTitle.textContent.replace(" tartışma forumu", "")
            : "Bilinmeyen"
        } dizisinin forumlarına bakıyor:`,
        state:
          postTitle && postTitle.textContent != ""
            ? postTitle.textContent
            : "Bilinmeyen",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    }
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presence.setActivity({
      largeImageKey: "dl-logo",
      details: "Bir sayfaya göz atıyor:",
      state: pages[page] || pages[page.slice(0, -1)],
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (_video && _video.currentTime) {
    const title =
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
        ) ||
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
        ),
      episodeX =
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
        ) &&
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
        ).textContent
          ? document.querySelector(
              "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
            ).textContent
          : null ||
            (document.querySelector(
              "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
            ) &&
              document.querySelector(
                "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
              ))
          ? `${document
              .querySelector(
                "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
              )
              .textContent.trim()}. Sezon ${
              document.querySelector(
                "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
              ).textContent
            }. Bölüm`
          : "none found",

     fixedEpisodeName = episodeX
        .replace(/\n/g, "")
        .replace(/-/g, "")
        .replace(title.textContent, "")
        .replace(" ", "")
        .trim(),
      timestamps = getTimestamps(
        Math.floor(_video.currentTime),
        Math.floor(_video.duration)
      ),

     data: { [k: string]: any } = {
      largeImageKey: "dl-logo",
      details: title.textContent,
      state: fixedEpisodeName,
      smallImageKey: video.paused ? "pause" : "play",
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play
    };

    if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    }
    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setTrayTitle(
      video.paused ? "" : `${title.textContent} - ${fixedEpisodeName}`
    );
    presence.setActivity(data);
  } else if (isVideoData) {
    const title =
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
        ) ||
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
        ),
      episodeX =
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
        ) &&
        document.querySelector(
          "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
        ).textContent
          ? document.querySelector(
              "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
            ).textContent
          : null ||
            (document.querySelector(
              "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
            ) &&
              document.querySelector(
                "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
              ))
          ? `${document
              .querySelector(
                "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
              )
              .textContent.trim()}. Sezon ${
              document.querySelector(
                "#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
              ).textContent
            }. Bölüm`
          : null;

    if (title && title.textContent != "" && episodeX) {
      const fixedEpisodeName = episodeX
          .replace(/\n/g, "")
          .replace(/-/g, "")
          .replace(title.textContent, "")
          .replace(" ", "")
          .trim(),
        timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),

       data: { [k: string]: any } = {
        largeImageKey: "dl-logo",
        details: title.textContent,
        state: fixedEpisodeName,
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play
      };

      if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];
      }
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      presence.setTrayTitle(
        video.paused ? "" : `${title.textContent} - ${fixedEpisodeName}`
      );
      presence.setActivity(data);
    } else {
      presence.setActivity({
        largeImageKey: "dl-logo",
        details: "Bir sayfaya göz atıyor:",
        state: "Bilinmeyen Sayfa",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    }
  }
});

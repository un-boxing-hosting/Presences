const presence = new Presence({
  clientId: "691534544301457449"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  /**
   * Get search query from HTML form input.
   */
  function searchQuery(): HTMLInputElement {
    return document.getElementById("search_form_input") as HTMLInputElement;
  }

  /**
   * Sets the timestamp.
   */
  function setTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * Get's the setting specified and replaces %search% with the search input or %content% when indicated.
   * @param {String} settingName Name of the setting
   * @param {String} content Optional - Replaces %content% with this input
   */
  async function handleFormatting(
    settingName: string,
    content?: string
  ): Promise<string> {
    const setting = await presence.getSetting(settingName);
    if (!content) return setting.replace("%search%", searchQuery().value);
    return setting.replace("%content%", content);
  }

  if (
    document.URL === "https://duckduckgo.com/" ||
    document.URL === "https://duckduckgo.com" ||
    document.location.href.includes("/&t=h_")
  ) {
    presenceData.details = await presence.getSetting("homepageMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/settings")) {
    presenceData.details = await presence.getSetting("settingsMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("?q=")) {
    presenceData.startTimestamp = setTimestamp();
    presenceData.smallImageKey = "search";

    if (document.location.href.includes("iaxm=maps")) 
      presenceData.details = await handleFormatting("mapSearch");
     else if (document.location.href.includes("iax=images")) 
      presenceData.details = await handleFormatting("imageSearch");
     else if (document.location.href.includes("iax=videos")) 
      presenceData.details = await handleFormatting("videoSearch");
     else if (document.location.href.includes("iar=news")) 
      presenceData.details = await handleFormatting("newsSearch");
     else if (document.location.href.includes("ia=meanings")) 
      presenceData.details = await handleFormatting("meaningsSearch");
     else if (document.location.href.includes("ia=definition")) 
      presenceData.details = await handleFormatting("definitonSearch");
     else if (document.location.href.includes("ia=shopping")) 
      presenceData.details = await handleFormatting("shoppingSearch");
     else if (document.location.href.includes("ia=recipes")) 
      presenceData.details = await handleFormatting("recipeSearch");
     else if (document.location.href.includes("&ia=stock")) {
      presenceData.details = await handleFormatting(
        "stockSearch",
        document
          .getElementsByClassName("stocks__header")[0]
          .getElementsByTagName("a")[0].innerText
      );
    } else 
      presenceData.details = await handleFormatting("standardSearch");
    
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

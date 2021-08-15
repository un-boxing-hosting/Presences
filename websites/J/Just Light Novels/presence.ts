const presence = new Presence({
  clientId: "631595418085490689"
});

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const elapsed = Math.floor(Date.now() / 1000);
let stext;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  presenceData.startTimestamp = elapsed;

  if (document.location.pathname == "/") {
    presenceData.details = "Browsing novels";
    presenceData.state = "at Homepage";
  } else if (document.location.pathname == "//") {
    stext = document.location.search.split("=");
    presenceData.details = "Searching novels";
    presenceData.state = `Keyword: ${stext[1]
      .split("+")
      .join(" ")
      .capitalize()}`;
  } else if (document.location.pathname.startsWith("/category/")) {
    stext = document.location.pathname.split("/");
    presenceData.details = `Searching novels `;
    presenceData.state = `${stext[1].capitalize()}: ${stext[2]
      .split("-")
      .join(" ")
      .capitalize()}`;
  } else if (
    ["/reviews/", "/ln-fest-series/"].includes(document.location.pathname)
  ) {
    presenceData.details = `Browsing site`;
    presenceData.state = `looking at ${capitalize(
      document.location.pathname.split("/").join("").split("-").join(" ")
    )}`;
  } else {
    const d = document.location.pathname.split("/");
    if (d.length === 5) {
      presenceData.details = `Reading ${capitalize(
        d[3].split("-").join(" ")
      )}(${d[1]})`;
      presenceData.state = `Looking at ${
        document.location.hash.length == 0
          ? "Novel"
          : capitalize(document.location.hash.replace("#", ""))
      }`;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

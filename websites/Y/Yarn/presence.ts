const presence = new Presence({
  clientId: "690635264124518493"
});

function parseQueryString(queryString?: string): any {
  if (!queryString) 
    queryString = window.location.search.substring(1);
  
  const params = {},
   queries = queryString.split("&");
  queries.forEach((indexQuery: string) => {
    const indexPair = indexQuery.split("="),
     queryKey = decodeURIComponent(indexPair[0]),
     queryValue = decodeURIComponent(
      indexPair.length > 1 ? indexPair[1] : ""
    );
    params[queryKey] = queryValue;
  });
  return params;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  },

   route = document.location.pathname.split("/");

  if (document.location.pathname == "/") {
    presenceData.details = "Home";
    presenceData.state = parseQueryString(document.location.hash).q
      ? `Searching ${parseQueryString(document.location.hash).q} (page ${
          parseQueryString(document.location.hash).p
            ? parseQueryString(document.location.hash).p
            : "0"
        })`
      : `Navigate...`;
    presenceData.smallImageKey = parseQueryString(document.location.hash).q
      ? "search"
      : null;
    presenceData.smallImageText = "Searching...";
  } else if (document.location.pathname.includes("/package/")) {
    presenceData.details = "Watching package";
    presenceData.state = !parseQueryString(document.location.hash).files
      ? `${document.querySelector("section h2").textContent}`
      : document.querySelector("header h2").textContent;
  } else if (document.location.pathname.includes("/getting-started")) {
    presenceData.details = "Getting Started";
    if (route[2] === "install") 
      presenceData.state = "Installation";
     else if (route[2] === "usage") 
      presenceData.state = "Usage";
     else 
      presenceData.state = "Introduction";
    
  } else if (document.location.pathname.includes("/configuration/")) {
    presenceData.details = "Configuration";
    if (route[2] === "manifest") 
      presenceData.state = "Manifests";
     else if (route[2] === "yarnrc") 
      presenceData.state = "Yarnrc files";
    
  } else if (document.location.pathname.includes("/features/")) {
    presenceData.details = "Features";
    presenceData.state = document.querySelector("article h1").textContent;
  } else if (document.location.pathname.includes("/cli/")) {
    presenceData.details = "Cli";
    presenceData.state = document.querySelector("article h1 code").textContent;
  } else if (document.location.pathname.includes("/advanced/")) {
    presenceData.details = "Advanced";
    presenceData.state = document.querySelector("article h1").textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

const presence = new Presence({ clientId: "653156362548805652" }),
 pages = {
  "/docs": "Documention",
  "/login": "Login Page"
};

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
   head = document.querySelector(
    "#page-wrapper > div > div > div > div > div.panel-heading"
  ),

   presenceData: PresenceData = {
    largeImageKey: "ap-logo_new",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  if (pages[page] || pages[page.slice(0, -1)]) 
    presenceData.details = pages[page] || pages[page.slice(0, -1)];
   else if (head && head.textContent == "Configuration Editor") 
    presenceData.details = "Configuration Page";
   else if (head && head.textContent == "Infractions") 
    presenceData.details = "Infraction List";
   else if (head && head.textContent == "Guild Weekly Message Throughput") 
    presenceData.details = "Guild Stats";
   else if (head && head.textContent == " Guild Banner") 
    presenceData.details = "Guild Info Page";
   else 
    presenceData.details = "Read to Documentation";
  

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});

const presence = new Presence({
  clientId: "676411728925294605"
}),

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "orbazzo"
  };

  presenceData.details = "Guarda";
  presenceData.state = "ORBAZZO FIERO";
  presenceData.startTimestamp = browsingStamp;

  presence.setActivity(presenceData);
});

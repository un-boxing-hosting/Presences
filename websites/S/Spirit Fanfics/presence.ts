const presence = new Presence({
  clientId: "628786533587091490"
}),
 { pathname } = window.location,
  strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    searching: "presence.activity.searching",
    reading: "presence.activity.reading"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "spirit_lg",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: (await strings).browsing
    },
    nav = document.querySelector("#secaoNav").lastChild.textContent;
  if (pathname.startsWith("/historia")) {
    if (pathname.startsWith(`/historia/gerenciar`)) {
      if (pathname === `/historia/gerenciar`) 
        presenceData.details = "Vendo Minhas Histórias";
       else if (nav === `Gerenciar Capítulos`) {
        presenceData.details = `Gerenciando capítulos`;
        presenceData.state = document
          .querySelector(".tituloPrincipal")
          .textContent.replace("História ", "")
          .split(" - ")[0];
      }
    } else if (
      pathname.startsWith(`/historia/adicionar`) ||
      pathname.startsWith(`/historia/termos`)
    ) {
      if (nav === `Adicionar História` || nav === `Termos`) 
        presenceData.details = `Criando uma nova história`;
       else if (nav === `Adicionar Capítulo`) {
        presenceData.details = `Escrevendo um novo capítulo`;
        presenceData.state = document
          .querySelector(".tituloPrincipal")
          .textContent.replace("História ", "")
          .split(" - ")[0];
        presenceData.smallImageKey = `writing`;
        presenceData.smallImageText = `Escrevendo`;
      }
    } else if (pathname.startsWith(`/historia/editar`)) {
      presenceData.details = `Editando uma história`;
      presenceData.state = document
        .querySelector(".tituloPrincipal")
        .textContent.replace("Editar História ", "");
    } else if (pathname.startsWith(`/historia/apagar`)) {
      presenceData.details = `Apagando uma história`;
      presenceData.state = document
        .querySelector(".tituloPrincipal")
        .textContent.replace("Apagar História ", "");
    } else {
      const title = document
        .querySelector(".tituloPrincipal")
        .textContent.replace("História ", "")
        .split(" - ");
      if (pathname.match(/\/historia\/(\w+-)+\d+\/\w+/)) {
        presenceData.details = title[0];
        presenceData.state = `${title[1]} - ${nav}`;
        presenceData.smallImageKey = `reading`;
        presenceData.smallImageText = (await strings).reading;
      } else {
        presenceData.details = `Vendo uma história`;
        presenceData.state = title[0];
      }
    }
  } else if (pathname.startsWith("/perfil")) {
    presenceData.details = "Vendo um perfil";
    presenceData.state = nav;
  } else if (pathname.startsWith("/home")) 
    presenceData.state = "Home";
   else if (pathname.startsWith("/aulas")) {
    presenceData.details = "Vendo aulas";
    presenceData.state = nav != "Aulas" ? nav : undefined;
  } else if (pathname.startsWith("/generos")) {
    presenceData.details = "Navegando por gênero";
    presenceData.state = nav != "Gêneros" ? nav : undefined;
  } else if (pathname.startsWith("/categorias")) {
    presenceData.details = "Navegando por categorias";
    presenceData.state = nav != "Categorias" ? nav : undefined;
  } else if (pathname.startsWith("/tags")) {
    presenceData.details = "Navegando por tags";
    presenceData.state = nav != "Tags populares" ? nav : undefined;
  } else if (pathname.startsWith("/historico")) 
    presenceData.details = `Vendo o histórico`;
   else if (pathname.startsWith("/grupos")) 
    presenceData.state = `Vendo grupos`;
   else if (pathname.startsWith(`/busca`)) {
    presenceData.details = `${(await strings).searching}...`;
    presenceData.smallImageKey = `search`;
    presenceData.smallImageText = (await strings).searching;
  } else 
    presenceData.state = nav;
  
  presence.setActivity(presenceData, true);
});

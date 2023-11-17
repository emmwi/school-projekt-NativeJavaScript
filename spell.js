//inspiration till uppbyggnad av kod taget från livekodning med drinkar.
//funktion för att skapa struktur för mina spell som aka läggas i DOM:en
function createSpells(name, description, id) {
  let div = document.createElement("div");
  div.setAttribute("id", id);
  div.classList.add("spell");
  let h2 = document.createElement("h2");
  h2.setAttribute("id", id);
  h2.classList.add("spellName");
  let p = document.createElement("p");
  p.classList.add("InformationSpell");
  let namn = document.createTextNode(name);
  let information = document.createTextNode(description);
  // let characterInfo = document.createTextNode(characterInformation);
  h2.appendChild(namn);
  div.appendChild(h2);
  p.appendChild(information);
  div.appendChild(p); //ska fyllas med info och läggas i p.
  return div;
}
// Funktionen för att visa/dölja information när man klickar på divarna
function showOnWeb() {
  let spell = document.querySelectorAll(".spell");
  let spellinformation = document.querySelectorAll(".InformationSpell");

  addEventListener("click", (event) => {
    if (!event.target.id.includes("spell")) {
      for (let n = 0; n < spellinformation.length; n++) {
        spellinformation[n].style.display = "none";
      }
    }
  });
  for (let i = 0; i < spell.length; i++) {
    spell[i].addEventListener("click", () => {
      for (let n = 0; n < spellinformation.length; n++) {
        spellinformation[n].style.display = "none";
      }

      if (spellinformation[i].style.display === "none") {
        spellinformation[i].style.display = "block";
      }
    });
  }
} //här tar showOnWeb funktionen slut

//sökfunktion, kolla att det man skriver matchar någon h2:a
function search(spell) {
  let searchName = document.querySelector("#name").value.toLowerCase(); //
  for (let i = 0; i < spell.length; i++) {
    let spellName = spell[i]
      .querySelector(".spellName")
      .textContent.toLowerCase();
    if (spellName.includes(searchName)) {
      spell[i].style.display = "block";
    } else {
      spell[i].style.display = "none";
    }
  }
} //Här tar sökfunktionen slut

//klickfunktion för att starta sökfunktionen antingen genom att klicka enter eller genom att trycka på sökknappen
function clickAndSearch(spell) {
  let searchButton = document.querySelector("#searchButton");
  searchButton.addEventListener("click", () => {
    search(spell);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); //prevent defualt på keydown event, sidan laddas om automatiskt ifall jag inte har med denna.
      search(spell);
    }
  });
}

// Funktionen för att hämta spells
function getSpell() {
  let spellContainer = document.querySelector("#spell-container");
  //if kollar att spellCointainer inte är tom, om den inte är t
  if (spellContainer) {
    let spell = [];
    fetch("https://hp-api.onrender.com/api/spells")
      .then((response) => response.json())
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          let spellElement = createSpells(
            result[i].name,
            result[i].description,
            "spell-" + result[i].id
          );

          spell.push(spellElement);
        }
        for (let n = 0; n < spell.length; n++) {
          spellContainer.appendChild(spell[n]);
        }
        //kallar på showOnWeb
        showOnWeb(result);
        //kallar på search för character
        search(spell);
        //kallar på clickAndSearch för character
        clickAndSearch(spell);
      });
  } //hämtar spell-container från html, hämtar och loopar igenom alla spells
}
getSpell();

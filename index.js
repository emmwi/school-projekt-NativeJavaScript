//några källor för inspo till koden
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
// https://www.w3schools.com/howto/howto_js_filter_lists.asp
//inspiration till uppbyggnad av kod taget från livekodning med drinkar.

// Funktionen för att skapa formen på mina divar som sedan läggs till i DOM:en
function createCharacters(
  imglink,
  name,
  house,
  ancestry,
  eyeColour,
  hairColour,
  id
) {
  const div = document.createElement("div"); //skapar div och lägger till i DOM
  div.setAttribute("id", id); //sätter id från apiet
  div.classList.add("character"); //lägger till class på den första diven som skapats
  const frontDIv = document.createElement("div");
  frontDIv.classList.add("card-front");
  frontDIv.classList.add("card");
  const h2 = document.createElement("h2"); //skapar en h2
  h2.setAttribute("id", id); //sätter id från apit
  h2.classList.add("character-heading"); //lägger till klass på h2
  const namn = document.createTextNode(name); //lägger till en varaibel som innehåller textnoden name från JSONobjektet tex "harry potter"
  const img = document.createElement("img"); //skapar en img
  img.setAttribute("id", id); //sätter id från apit
  img.classList.add("img"); //lägger till en klass på img
  const backDiv = document.createElement("div");
  backDiv.classList.add("card-back");
  backDiv.classList.add("card");
  const h3 = document.createElement("h3"); //skapar en h3 att ha på baksidan av korten över infon
  const smallHeading = document.createTextNode(name);
  const p = document.createElement("p"); //skapar ett p
  p.classList.add("characterInformation"); //lägger till class för att jag ska kunna hantera p-element med informationen
  const characterInfo = document.createTextNode(
    `House: ${house}, Ancestry: ${ancestry}, Eyecolour: ${eyeColour}, Haircolour: ${hairColour}` //templete string som lägger till information som hämtas från om karaktären
  );

  if (!imglink) {
    imglink = "bilder/harrypotterhouses1.jpg";
  } //om det inte finns en bild för karaktären visas denna bilden

  h2.appendChild(namn);
  div.appendChild(frontDIv);
  frontDIv.appendChild(h2);
  img.setAttribute("src", imglink);
  frontDIv.appendChild(img);
  div.appendChild(backDiv);
  h3.appendChild(smallHeading); //h3 på baksidan med namn
  p.appendChild(characterInfo);
  backDiv.appendChild(h3);
  backDiv.appendChild(p); //ska fyllas med info och läggas i p.
  return div;
}

//inspo för showonweb https://www.codepel.com/vanilla-javascript/javascript-flip-animation/
function showOnWeb() {
  let character = document.querySelectorAll(".character");
  for (let i = 0; i < character.length; i++) {
    character[i].addEventListener("click", () => {
      character[i].classList.toggle("is-flipped");
    });
  }
}

//sökfunktion som lyssnar efter alla mina divar med class character som lagts i en array
//källa för inspo med funktion nedan
// https://code-boxx.com/filter-search-list-in-javascript/?fbclid=IwAR1zHKWJSyE0_ks_9LbuRSKRWGCzWhBUBscqw5J_PD9PqXCwzJD6C2TkN4I
function search(charactersElements) {
  const search = document.querySelector("#name");
  charactersElements = document.querySelectorAll(".character");

  search.addEventListener("keyup", () => {
    let searchName = search.value.toLowerCase();
    for (let i of charactersElements) {
      let character = i
        .querySelector(".character-heading")
        .textContent.toLowerCase();
      if (character.indexOf(searchName) == -1) {
        i.classList.add("hide"); //lägger till en class som stylas i index.css
      } else {
        i.classList.remove("hide"); //tar bort den klass som tidigare lagts till
      }
    }
  });
}

// Funktionen för att hämta karaktärer
function getCharacters() {
  let charactersContainer = document.querySelector("#characters-container");

  if (charactersContainer) {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((response) => response.json())
      .then((result) => {
        // Här kan du använda resultatet från fetch för att skapa karaktärer
        // skapar här en tom array som jag sedan lägger in alla mina  character divar i
        let character = []; //en array att spara alla mina divar med info om karaktörerna
        //loop för att gå igneom allt från fetchen som ska läggas till i min chreateCharacters
        for (let i = 0; i < result.length; i++) {
          let characterElement = createCharacters(
            result[i].image,
            result[i].name,
            result[i].house,
            result[i].ancestry,
            result[i].eyeColour,
            result[i].hairColour,
            "char-" + result[i].id
          );
          //sätter id på varje sak samt lägger till strängen "char-" detta gör att allt som har id har samma sträng i början och det används sedan för att kolla om man klickar på diven characters/infon i diven
          character.push(characterElement); //sparar varje karaktärsdiv i array som heter character
        }
        for (let n = 0; n < character.length; n++) {
          charactersContainer.appendChild(character[n]);
        } //loopar igenom min array med character och lägger in dom i DOM:en i min stora div character-container med hjälp av appendChild.
        //kallar på showOnWeb
        showOnWeb(result);
        //kallar på search för character
        search(character);
      });
  }
}
// Kalla på getCharacters för att starta processen
getCharacters();

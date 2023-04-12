document.querySelector(".btn-search").addEventListener("click", function () {
  const inputDeparture = document.querySelector("#departure").value;
  const inputArrival = document.querySelector("#arrival").value;
  const inputDate = document.querySelector("#date").value;
  const falseDiv = document.querySelector(".false");
  const empty = document.querySelector(".empty");
  const rootSearch = document.querySelector("#root-search");

  if (inputDeparture === "" || inputArrival === "" || inputDate === "") {
    falseDiv.style.display = "flex";
    empty.style.display = "none";
  } else {
    empty.style.display = "none";
    falseDiv.style.display = "none";
    fetch(
      `http://localhost:3000/trips?departure=${inputDeparture}&arrival=${inputArrival}&date=${inputDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.trajet) {
          // Efface le contenu précédent
          for (let i = 0; i < data.trajet.length; i++) {
            const hour = String(
              new Date(data.trajet[i].date).getHours()
            ).padStart(2, "0");
            const minute = String(
              new Date(data.trajet[i].date).getMinutes()
            ).padStart(2, "0");
            const searchContent = document.createElement("div");
            searchContent.classList.add("root-search_content");
            searchContent.innerHTML += `
                        <p>${data.trajet[i].departure} > ${data.trajet[i].arrival}</p>
                        <p>${hour}:${minute}</p>
                        <p>${data.trajet[i].price}€</p>
                        <button class="root-search_content-button" value= ${data.trajet[i]._id}>Book</button>
                    `;
            // ajout de l'élément
            rootSearch.appendChild(searchContent);
          }
          //recupération des boutons pour le panier
          let btnBook = document.querySelectorAll(".root-search_content-button");
          console.log(btnBook);
          //ajout du trajet en bdd dans cart
          for (let i = 0; i < btnBook.length; i++) {
            btnBook[i].addEventListener("click", function () {
              fetch(`http://localhost:3000/cart`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({id: btnBook[i].value})
              })
              .then((response) => response.json())
              .then(document.location.href='cart.html')
            });
          }
        } else {
          empty.style.display = "none";
          falseDiv.style.display = "flex";
        }
      });
  }
  rootSearch.innerHTML = "";
});

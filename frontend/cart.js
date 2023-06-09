
function Carts() {
  const containerBody = document.querySelector(
    ".container__bookings-trips-content"
  );
  fetch("http://localhost:3000/cart")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.carts);
      containerBody.innerHTML='';
      if (data.carts) {
        let total = 0;

        for (let i = 0; i < data.carts.length; i++) {
          const bookingsTrips = document.createElement("div");
          bookingsTrips.classList.add("container__bookings-trips");
          const hour = String(new Date(data.carts[i].date).getHours()).padStart(
            2,
            "0"
          );
          const minute = String(
            new Date(data.carts[i].date).getMinutes()
          ).padStart(2, "0");
          bookingsTrips.innerHTML += `
                      <p>${data.carts[i].departure} > ${data.carts[i].arrival}</p>
                      <p>${hour}:${minute}</p>
                      <p><span class="price">${data.carts[i].price}</span>€</p>
                      <button class="root-search_content-button" value= ${data.carts[i]._id}>X</button>
                  `;
          containerBody.appendChild(bookingsTrips);

          total += data.carts[i].price;
        }
        const containerBooking = document.querySelector("#container__bookings");
        const footerBooking = document.createElement("div");
        footerBooking.classList.add("container__bookings-footer");
        footerBooking.innerHTML = `<p>Total : ${total}€</p>
      <button id="purchase">Purchase</button>`;
        containerBooking.appendChild(footerBooking);
        // suppression du panier

        const btnDel = document.querySelectorAll(".root-search_content-button");
        console.log(btnDel);

        for (let i = 0; i < btnDel.length; i++) {
          btnDel[i].addEventListener("click", function () {
            fetch(`http://localhost:3000/cart/${btnDel[i].value}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            })
              .then((response) => response.json())
              .then(() => {
                footerBooking.remove();
                Carts();
              });
          });
        }
        const btnPurchase = document.querySelector('#purchase')
        btnPurchase.addEventListener('click', function(){
          console.log('dfg')
            fetch('http://localhost:3000/booking', {
            method: 'POST',
		        headers: { 'Content-Type': 'application/json' },
          })
            .then(response => response.json())
            .then((data) => {
              console.log(data)
              fetch('http://localhost:3000/cart', {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            })
            .then(response => response.json())
            .then(() => {
              document.location.href='Bookings.html'
            })
            })
            })
      } else {
        const removeBooking = document.querySelector(
          ".container__bookings-remove"
        );
        removeBooking.style.display = "none";
        const noTrips = document.querySelector(".container__bookings-notrips");
        noTrips.style.display = "flex";
      }
    });
}

Carts();



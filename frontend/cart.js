fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.carts)
    if (data.carts) {
      let total = 0;
      const containerBody = document.querySelector(".container__bookings-trips-content");
      for (let i = 0; i < data.carts.length; i++) {
        const bookingsTrips= document.createElement("div");
        bookingsTrips.classList.add("container__bookings-trips")
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
                      <p>${data.carts[i].price}€</p>
                      <button class="root-search_content-button" value= ${data.carts[i]._id}>Book</button>
                  `;
                  containerBody.appendChild(bookingsTrips);

                  total+=data.carts[i].price;
      }
      const containerBooking = document.querySelector(".container__bookings")
      const footerBooking = document.createElement("div");
      footerBooking.classList.add("container__bookings-footer")
      containerBooking.innerHTML = `<p>Total : 127€</p>
      <button>Purchase</button>`;
      containerBooking.appendChild(footerBooking);
    }else{

    }
  });

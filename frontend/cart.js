function Carts(){
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
                        <p><span class="price">${data.carts[i].price}</span>€</p>
                        <button class="root-search_content-button" value= ${data.carts[i]._id}>X</button>
                    `;
                    containerBody.appendChild(bookingsTrips);
  
                    total+=data.carts[i].price;
        }
        const containerBooking = document.querySelector("#container__bookings")
        const footerBooking = document.createElement("div");
        footerBooking.classList.add("container__bookings-footer")
        footerBooking.innerHTML = `<p>Total : ${total}€</p>
        <button>Purchase</button>`;
        containerBooking.appendChild(footerBooking);
        // suppression du panier
  
        const btnDel = document.querySelectorAll(".root-search_content-button");
        console.log(btnDel)
        
        for (let i = 0; i < btnDel.length; i++) {
          btnDel[i].addEventListener('click', function(){
              fetch(`http://localhost:3000/cart/${btnDel[i].value}`,{
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
          })
          .then(response=>response.json)
          .then( ()=>{
             const calcul = document.querySelectorAll('.price')
             let newTotal = 0;
              for (let i = 0; i < calcul.length; i++) {
                  newTotal += Number(calcul[i].textContent) 
              }
              total = newTotal;
          })
          })
          
        }
      }else{
         const removeBooking = document.querySelector('.container__bookings-remove');
         removeBooking.style.display = "none";
         const noTrips = document.querySelector(".container__bookings-notrips");
         noTrips.style.display = "flex";
      }
    })};
  
      Carts()
  
const contentBookings = document.querySelector(".container__bookings-trips-content")

fetch("http://localhost:3000/booking")
.then((response) => response.json())
.then((data) => {
    if(data.bookings) {
        const timestamp = Date.now()
        for(let i=0; i < data.bookings.length; i++) {
            const date = new Date(data.bookings[i].date).getTime()
            let dateOk = Math.round((date - timestamp) / (1000 * 60 * 60))
            const hour = String(new Date(data.bookings[i].date).getHours()).padStart(
                2,
                "0"
              );
              const minute = String(
                new Date(data.bookings[i].date).getMinutes()
              ).padStart(2, "0");
            if (dateOk > 0) {
            const bookingOk = document.createElement('div');
            bookingOk.classList.add('container__bookings-trips');
            bookingOk.innerHTML += `
            <p>${data.bookings[i].departure}>${data.bookings[i].arrival}</p>
            <p>${hour}:${minute}</p>
            <p>${data.bookings[i].price}€</p>
            <p>Departure in ${dateOk} hours</p>
            `
            contentBookings.appendChild(bookingOk)
            }   else {
                const bookingOk = document.createElement('div');
                bookingOk.classList.add('container__bookings-trips');
                bookingOk.innerHTML = `<p>Late</p>`
            }        
        }          
        }
    })

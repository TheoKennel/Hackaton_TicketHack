const request = require('supertest')
const app = require('./app')

// Test pour première route Trips qui permet de récupérer tous les trajets celon les paramètres

it('GET /trips', async () => {
   const res = await request(app).get('/trips')
    .send({departure: 'Bruxelles', arrival: 'Marseille', date: '2023-04-11T08:22:24.283Z'})


    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual({
        result: true,
        trajet: [
          {
            _id: "6435162f0c81b1e5cbb90fe0",
            departure: "Bruxelles",
            arrival: "Marseille",
            date: "2023-04-11T08:22:24.283Z",
            price: 114
          }
        ]
      });
})
# Airbnb-Reviews

# CRUD API
  * C - POST    'api/reviews/:location_id'
    ```
      reviews {
        name: 'Devon',
        user_id:'34'
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/xamorep/128.jpg',
        review: 'Qui ad voluptatum dolorem quasi voluptatum molestiae est. Voluptatem tempore dolorem consequatur unde eaque aliquid ratione consequatur. Amet reprehenderit velit.',
        owners_id: 1,
        owners_response: null,
        owners_response_date: null
      }
    ```
  * R - GET     'api/reviews/:location_id'
    ```
    {
      location:{
          id: 1,
          title: 'doloribus accusamus nihil',
          avg_rating: 4.89,
          communication: 4.6,
          check_in: 4.1,
          accuracy: 4.6,
          value: 3.8,
          cleanliness: 4.7,
          hospitality: 23,
          stylish: 44,
          location: 4,
          sparkling_clean: 38,
          quick_responses: 48,
          amazing_amenities: 44,
          counts: 376,
          owners_id: 1 },
        reviews: [{
          {
            name: 'Devon',
            image:'https://s3.amazonaws.com/uifaces/faces/twitter/xamorep/128.jpg',
            date: '2019-10-18 15:29:49.740',
            review:'Qui ad voluptatum dolorem quasi voluptatum molestiae est. Voluptatem tempore dolorem consequatur unde eaque aliquid ratione consequatur. Amet reprehenderit velit.',
            owners_id: 1,
            owners_response: null,
            owners_response_date: null}, 
        }]
    }
    ```
  * U - PUT 'api/reviews/:user_id'
  * D - DELETE  'api/reviews/:user_id'
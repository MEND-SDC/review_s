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
          location_id: 1,
          title: 'doloribus accusamus nihil',
          address: '1967 loafsugar mtn way'
           },
        reviews: [{
          {
            name: 'Devon',
            image:'https://s3.amazonaws.com/uifaces/faces/twitter/xamorep/128.jpg',
            date: '2019-10-18 15:29:49.740',
            review:'Qui ad voluptatum dolorem quasi voluptatum molestiae est. Voluptatem tempore dolorem consequatur unde eaque aliquid ratione consequatur. Amet reprehenderit velit.',
            user_id: 1,
            owners_id: 1,
            owners_response: null,
            owners_response_date: null}, 
        }],
        rating: {
          rating_avg: '4.5',
          checkin_avg: '4.5',
          accuarcy_avg: '4.5',
          value_avg: '4.5',
          communcation_avg: '4.5',
          loaction_avg: '4.5',
          cleaniness_avg: '4.5',
        }
    }
    ```
  * U - PUT 'api/reviews/:user_id/:reviews_id'
  * D - DELETE  'api/reviews/:user_id/:reviews_id'

  # Schema
  ![Schema](https://hrsf124-fec.s3-us-west-1.amazonaws.com/SDC/schemaSDC.png)
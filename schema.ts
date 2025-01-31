export const schema =`#graphql   
    
    type restaurant {
        id:ID!,
        nombre: String!,
        direccion: String!,
        telefono: String!,
        temperatura: String,
        hora: String

    }
    
    type Query{
       getRestaurant(id:ID!): restaurant
       getRestaurants(ciudad: String!): restaurant
    }

    type Mutation {
        addRestaurant(nombre: String!, direccion:String!, ciudad:String!, telefono:String!): restaurant!
        deleteRestaurant(id:ID!) : Boolean!
    }
`
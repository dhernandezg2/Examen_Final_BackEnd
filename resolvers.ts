import { Collection, ObjectId } from "mongodb";
import { restaurantModel } from "./types.ts";
import { GraphQLError } from "graphql";
import {validarTelefono} from "./apiFunctions.ts"

 type context = {
    restaurantCollection: Collection<restaurantModel>
}



export const resolvers = {
    Query: {
        getRestaurant: async(_:unknown, args: {id: string},context:context):Promise<restaurantModel | null> => {
            const restaurante = await context.restaurantCollection.findOne({_id: new ObjectId(args.id)})
            if(!restaurante) return null
            return restaurante
        },

        getRestaurants: async (_:unknown, args: {ciudad:string},context:context):Promise<restaurantModel[]> => {
            const restaurante = await context.restaurantCollection.find({ciudad: args.ciudad}).toArray()
            return restaurante
        }
    },

    Mutation: {
        addRestaurant: async(_:unknown, args: {nombre:string, direccion:string, ciudad:string, telefono:string},context: context):Promise<restaurantModel> => {
        
        const telefono = await context.restaurantCollection.findOne({telefono: args.telefono})

        if(telefono) throw new GraphQLError("telefono encontrado")

        const datosPais = await validarTelefono(args.telefono)

        const {insertedId} = await context.restaurantCollection.insertOne({
            nombre: args.nombre,
            direccion: args.direccion,
            ciudad: args.ciudad,
            telefono: args.telefono,
            pais: datosPais.pais,
            timezone: datosPais.timezone
        })

        return {
            _id: insertedId,
            nombre: args.nombre,
            direccion: args.direccion,
            ciudad: args.ciudad,
            telefono: args.telefono,
            pais: datosPais.pais,
            timezone: datosPais.timezone
        }
        
        },

 deleteRestaurant: async (_:unknown, args: {id:string},context:context):Promise<boolean> => {
    const {deletedCount} = await context.restaurantCollection.deleteOne({_id: new ObjectId(args.id)})

    if(deletedCount) {return true

    }else {
        return false
    }
 }
}

}
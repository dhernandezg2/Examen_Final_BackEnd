import { ObjectId } from "mongodb";

export type restaurantModel = {
    _id?: ObjectId,
    nombre: string,
    direccion: string,
    ciudad:string,
    pais:string
    telefono: string,
    timezone: string
}

export type ApiTelefono = {
    is_valid: boolean,
    pais: string,
    timezone: string
}
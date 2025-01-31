import {ApiTelefono} from "./types.ts"


export const Clima = async (ciudad: string) =>  {
     const API_KEY = Deno.env.get("API_KEY")
     if(!API_KEY) throw new Error("API no encontrada")
    
    const url = "https://api.api-ninjas.com/v1/weather?city=" + ciudad

    const data = await fetch(url, {
        headers: {
            'X-Api-Key': 'API_KEY'
          },
    })

    if(data.status !==200) throw new Error("datos no validos")
        const response = await data.json()
        return response.temp 
}

export async function validarTelefono(telefono:string):Promise<ApiTelefono>  {
    const API_KEY = Deno.env.get("API_KEY")
     if(!API_KEY) throw new Error("API no encontrada")

    const url = "https://api.api-ninjas.com/v1/validatephone?number=" + telefono

    const data = await fetch(url, {
            headers: {
                'X-Api-Key': 'API_KEY'
            },
    })
    
    if(data.status !==200) throw new Error("datos no validos")
    const response = await data.json()
    return{
        is_valid:response.is_valid,
        pais: response.pais,
        timezone: response.timezone[0]
    }
    
}

export const getHora = async (ciudad:string) => {
    const API_KEY = Deno.env.get("API_KEY")
     if(!API_KEY) throw new Error("API no encontrada")

    const url = "https://api.api-ninjas.com/v1/worldtime?city=" + ciudad

    const data = await fetch(url, {
            headers: {
                'X-Api-Key': 'API_KEY'
            },
    })


   
    if(data.status !==200) throw new Error("datos no validos")
    const response = await data.json()
    return response.hour + ":" + response.minute
} 


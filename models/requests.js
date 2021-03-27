const fs = require('fs');
const axios = require("axios");


class Requests {

    histPares = ['ONTBTC'];

    constructor() {
    }

    async buscarPares( crypto = '') {
        try {
            crypto = crypto.toLocaleUpperCase();    // Transformar el input en UPPERCASE para poder hacer todo el proceso más fácil

            const instance = axios.create({
                baseURL: `https://api.binance.com/api/v3/ticker/price`,
            })


            const expresion = new RegExp(crypto);  // Transformar el input en texto plano

            const resp = await instance.get();
            // Filtro para buscar el par por las primeras 3 letras
            if (crypto.length <= 5){
                return resp.data.filter( o => o.symbol.substring(0,3) === crypto.substring(0,3));
            }
            // Intento de reutilización de la función que habrá que cambiar.
            return resp.data.filter( o => o.symbol.search(expresion) != -1);
        } catch (error) {
            return[];
        }
    }

    agregarHistorial( par = '' ) {
        //TODO: prevenir duplicados

        // if( this.historial.includes(par.toLocaleUpperCase() )){
        //     return;
        // }
        this.histPares.unshift( par.toLocaleUpperCase() );

        //Grabar en DB
        // this.guardarDB();
    }

}


module.exports = Requests;
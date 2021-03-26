const { leerInput, 
        pausa,
        inquirerMenu,
        listarPares } = require("./scripts/inquirer");
const Requests = require('./models/requests');

require('colors');

const main = async() => {

    const requests = new Requests();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const crypto = await leerInput('Crypto: '); // Introducir crypto a buscar
                let cryptos = await requests.buscarPares(crypto); // GET al API
                if(! (cryptos instanceof Array)) { // Verificar si devuelve un objeto y pasarlo a array
                    cryptos = [cryptos];
                } 
                const symbol = await listarPares(cryptos); // Listar los pares con funciones de inquirer
                if ( symbol === '0') continue;
                const parSel = cryptos.find( p => p.symbol === symbol); // Verificación doble por si acaso xd
                requests.agregarHistorial(parSel.symbol); // Agrega al Historial(por los momentos)
                

                break;
            case 2:
                requests.histPares.forEach((par, i) =>{
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${par}`)
                })
                break;
            case 0:
                break;
        }
        if (opt !== 0) await pausa();
        
    } while (opt !== 0);
}

main();
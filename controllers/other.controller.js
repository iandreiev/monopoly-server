
exports.btc = () => {
const fetch = require('node-fetch');

    let URL = "http://blockchain.info/ticker"

    let settings = {method:"Get"}

    fetch(URL, settings)
    .then(res=>res.json())
    .then(res=>{

        let BTC = "BTC"

        res.forEach(item=>console.log(item))
    })

  
}
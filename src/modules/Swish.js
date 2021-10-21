import fs from 'fs'
import https from 'https'

const testConfig = {
    payeeAlias: "1231181189",
    key: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.key', { encoding: 'utf8' }),
    cert: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.pem', { encoding: 'utf8' }),
    ca: fs.readFileSync('./configurations/ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
    passphrase: 'swish'
}
const config = testConfig

const createPaymentRequest = async (request, response) => {

    const instructionUUID = '9F9C2F35D92340348F130D702E6C4CCC' //create function that returns new uuid


    const data = new TextEncoder().encode(
        JSON.stringify({
            payeeAlias: config.payeeAlias,
            currency: 'SEK',
            callbackUrl: 'https://example.com/swishcallback', //replace with actual callbackUrl
            payerAlias: request.body.payerAlias,
            amount: request.body.amount, //should be calculated with calculateTotalPrice (functions.js)
            message: request.body.message
        })
    )

    const url = `https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/${instructionUUID}`
    const options = {
        port: 443,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        },
        key: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.key', { encoding: 'utf8' }),
        cert: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.pem', { encoding: 'utf8' }),
        ca: fs.readFileSync('./configurations/ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
        passphrase: config.passphrase
    }

    options.agent = new https.Agent(options);

    const req = https.request(url, options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()

    /* if (!res) {
        response.status(500).send(error)
        return
    } */

    response.send('hello')
    
}

    export default {
        createPaymentRequest
    }
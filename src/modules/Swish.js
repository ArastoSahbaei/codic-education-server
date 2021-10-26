import fs from 'fs'
import https from 'https'
import crypto from 'crypto'

const testConfig = {
    payeeAlias: "1231181189",
    baseURL: 'https://mss.cpc.getswish.net/swish-cpcapi',
    key: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.key', { encoding: 'utf8' }),
    cert: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.pem', { encoding: 'utf8' }),
    ca: fs.readFileSync('./configurations/ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
    passphrase: 'swish'
}
const config = testConfig

const createPaymentRequest = async (request, response) => {

    const instructionUUID = crypto.randomBytes(16).toString("hex")
    console.log(instructionUUID)

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

    function requestOptions(method) {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            },
            key: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.key', { encoding: 'utf8' }),
            cert: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.pem', { encoding: 'utf8' }),
            ca: fs.readFileSync('./configurations/ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
            passphrase: config.passphrase
        }
    }

    const options = requestOptions('PUT')

    options.agent = new https.Agent(options)

    const req = https.request(`${config.baseURL}/api/v2/paymentrequests/${instructionUUID.toUpperCase()}`, options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        if (!res) {
            response.status(500).send(error)
        }

        response.status(res.statusCode)
        if (res.statusCode == 201) {
            const opt = requestOptions('GET')
            options.agent = new https.Agent(opt);

            const requ = https.request(`${config.baseURL}/api/v1/paymentrequests/${instructionUUID.toUpperCase()}`, opt, (resp) => {
                console.log('statusCode:', resp.statusCode)
                console.log('headers:', resp.headers)
                let responseBody = ''
                if(!resp){
                        response.status(500).send(error)
                }

                resp.on('data', (chunk) => {
                    process.stdout.write(chunk)
                    responseBody += chunk
                })
                
                resp.on('end', () => {
                    response.send(JSON.parse(responseBody))
                })

            })

            requ.on('error', (e) => {
                console.error(e)
            })

            requ.end()
        }

        res.on('data', d => {
            process.stdout.write(d)
        })

    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()


}



export default {
    createPaymentRequest
}
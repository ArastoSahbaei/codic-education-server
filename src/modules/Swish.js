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

const createPaymentRequest = (order, payerAlias) => {

    const instructionUUID = crypto.randomBytes(16).toString('hex')


    const data = new TextEncoder().encode(
        JSON.stringify({
            payeeAlias: config.payeeAlias,
            currency: 'SEK',
            callbackUrl: 'https://webhook.site/6721e832-c7d2-4026-918a-706f6246f163', //replace with actual callbackUrl
            payerAlias: payerAlias,
            amount: order.price,
            //message: 'BE18',
            payeePaymentReference: order.id || null
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

    return new Promise((resolve, reject) => {
        const req = https.request(`${config.baseURL}/api/v2/paymentrequests/${instructionUUID.toUpperCase()}`, options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            if (!res || res.statusCode !== 201) {
                reject(new Error(`http status: ${res.statusCode}`))
            }

            if (res.statusCode == 201) {

                const location = res.headers['location']
                const opt = requestOptions('GET')
                options.agent = new https.Agent(opt);

                const requ = https.request(location, opt, (resp) => {
                    console.log('statusCode:', resp.statusCode)
                    console.log('headers:', resp.headers)
                    let responseBody = ''
                    if (!resp || resp.statusCode !== 200) {
                        reject(new Error(`HTTP status code ${resp.statusCode}`))
                    }

                    resp.on('data', (chunk) => {
                        process.stdout.write(chunk)
                        responseBody += chunk
                    })

                    resp.on('end', () => {
                        resolve(JSON.parse(responseBody))
                    })

                })

                requ.on('error', (e) => {
                    console.error(e)
                    reject(e)
                })

                requ.end()
            }

            res.on('data', d => {
                process.stdout.write(d)
            })

        })

        req.on('error', error => {
            console.error(error + 'errormessage')
            reject(error)
        })

        req.write(data)
        req.end()
    })
}

const getPaymentRequest = async (id) => {

    function requestOptions(method) {
        return {
            method: method,
            key: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.key', { encoding: 'utf8' }),
            cert: fs.readFileSync('./configurations/ssl/Swish_Merchant_TestCertificate_1234679304.pem', { encoding: 'utf8' }),
            ca: fs.readFileSync('./configurations/ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
            passphrase: config.passphrase
        }
    }

    const options = requestOptions('GET')
    options.agent = new https.Agent(options);

    return new Promise((resolve, reject) => {
        const req = https.request(`${config.baseURL}/api/v1/paymentrequests/${id}`, options, (res) => {
            console.log('statusCode:', res.statusCode)
            console.log('headers:', res.headers)
            let responseBody = ''
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP status code ${res.statusCode}`))
            }

            res.on('data', (chunk) => {
                process.stdout.write(chunk)
                responseBody += chunk
            })

            res.on('end', () => {
                resolve(JSON.parse(responseBody))
            })

        })

        req.on('error', (e) => {
            console.error(e)
            reject(e)
        })

        req.end()
    })
}


export default {
    createPaymentRequest,
    getPaymentRequest
}
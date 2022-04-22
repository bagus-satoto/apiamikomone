import Cheerio from 'cheerio'
import got from 'got/dist/source'
import Jimp from 'jimp'
import FormData from 'form-data'
import fileType from 'file-type'

const QrCode = require('qrcode-reader')
const { getSync } = require('@andreekeberg/imagedata')
const jsQR = require('jsqr')

const QrCodeInvalid = 'QRCode tidak dikenali'

export const scanWithApi = async (data: Buffer): Promise<string> => {
  const filetype = await fileType.fromBuffer(data)
  if (!filetype) throw new Error('File tidak dikenali')

  const responseRecognize: {
    success: boolean
    recognizeResultToken: string
  } = await got
    .post(
      'https://api.products.aspose.app/barcode/recognize/apiRequestRecognize',
      {
        form: {
          type: 'qr',
          quality: 3,
          fileBase64: `data:${filetype.mime};base64,${Buffer.from(
            data
          ).toString('base64')}`
        }
      }
    )
    .json()
  const getReady = async (
    recognizeResultToken: string
  ): Promise<{
    ready: boolean
    html: string
  }> => {
    return got
      .get(
        'https://api.products.aspose.app/barcode/id/recognize/recognizeresult/' +
          recognizeResultToken,
        {
          searchParams: {
            timestamp: new Date().getTime()
          }
        }
      )
      .json()
  }
  let next = true
  setTimeout(() => {
    next = false
  }, 5_000)
  let html = ''
  while (next) {
    let ready = await getReady(responseRecognize.recognizeResultToken)
    if (ready.ready) {
      html = ready.html
      break
    }
  }
  const $ = Cheerio.load(html)
  const result = $('textarea').val()
  if (!result || result == '') throw new Error(QrCodeInvalid)
  return result
}

const scanWithImgonline = async (data: Buffer) => {
  const form = new FormData()

  form.append('uploadfile', data, 'qrcode' + Date.now())
  form.append('codetype', 2)
  form.append('rotset', 0)
  form.append('croptype', 1)
  form.append('cropleft', 0)
  form.append('cropright', 0)
  form.append('croptop', 0)
  form.append('cropbottom', 0)

  const response = await got
    .post('https://www.imgonline.com.ua/eng/scan-qr-bar-code-result.php', {
      headers: form.getHeaders(),
      body: form
    })
    .text()
  const $ = Cheerio.load(response)
  const result = $('#content div').text().trim()
  if (!result || result == '') throw new Error(QrCodeInvalid)
  return result
}

const scanWithJimpQrcode = (data: Buffer): Promise<string | null> =>
  new Promise((resolve, reject) => {
    Jimp.read(data, function (err, image) {
      if (err) {
        reject(new Error(QrCodeInvalid))
      }
      let qrcode = new QrCode()
      qrcode.callback = function (err2: any, value: any) {
        if (err2) {
          reject(new Error(QrCodeInvalid))
        }
        if (value == undefined || value?.result == null || value?.result == '')
          return reject(new Error(QrCodeInvalid))
        resolve(value.result)
      }
      qrcode.decode(image.bitmap)
    })
  })

const scanWithJsQr = (data: Buffer) =>
  new Promise((resolve, reject) => {
    const imagedata = getSync(data)
    const code = jsQR(imagedata.data, imagedata.width, imagedata.height)
    if (!code) return reject(new Error(QrCodeInvalid))

    resolve(code.data)
  })

export default async function (data: Buffer): Promise<string> {
  let result: string | null = null
  // @ts-ignore
  result = await Promise.any([
    scanWithJsQr(data),
    scanWithImgonline(data),
    scanWithJimpQrcode(data),
    scanWithApi(data)
  ])
  if (!result) throw new Error(QrCodeInvalid)

  return result
}

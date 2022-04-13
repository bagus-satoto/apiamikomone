import Cheerio from 'cheerio'
import fileType from 'file-type'
import got from 'got/dist/source'
import Jimp from 'jimp'
import FormData from 'form-data'
const QrCode = require('qrcode-reader')
const { getSync } = require('@andreekeberg/imagedata')
const jsQR = require('jsqr')

const scanWithJimpQrcode = (data: Buffer): Promise<string | null> =>
  new Promise((resolve) => {
    Jimp.read(data, function (err, image) {
      if (err) {
        resolve(null)
      }
      let qrcode = new QrCode()
      qrcode.callback = function (err2: any, value: any) {
        if (err2) {
          resolve(null)
        }
        if (value == undefined || value?.result == null || value?.result == '')
          return resolve(null)
        resolve(value.result)
      }
      qrcode.decode(image.bitmap)
    })
  })

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
          quality: 2,
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
  }, 20_000)
  let html = ''
  while (next) {
    let ready = await getReady(responseRecognize.recognizeResultToken)
    if (ready.ready) {
      html = ready.html
      break
    }
  }
  const $ = Cheerio.load(html)

  return $('textarea').val()
}

const scanWithJsQr = (data: Buffer) => {
  const imageData = getSync(data)
  const code = jsQR(imageData.data, imageData.width, imageData.height)
  if (!code) {
    return null
  }
  return code.data
}
const scanWithImgonline = async (data: Buffer) => {
  const form = new FormData()

  form.append('uploadfile', data, 'qrcode')
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
  return $('#content div').text().trim()
}

export default async function (data: Buffer): Promise<string> {
  let result: string | null = null
  result = scanWithJsQr(data)
  if (!result) result = await scanWithImgonline(data)
  if (!result) result = await scanWithJimpQrcode(data)
  if (!result) result = await scanWithApi(data)
  if (!result) throw new Error('QR Code tidak dikenali')

  return result
}

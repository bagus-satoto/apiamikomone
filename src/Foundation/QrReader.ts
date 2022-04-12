import Cheerio from 'cheerio'
import fileType from 'file-type'
import got from 'got/dist/source'
import Jimp from 'jimp'
import moment from 'moment'

moment.locale('id')
const QrCode = require('qrcode-reader')

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

export default async function (data: Buffer): Promise<string> {
  let result: string | null = null
  result = await scanWithJimpQrcode(data)
  if (!result) result = await scanWithApi(data)
  if (!result) throw new Error('QR Code tidak dikenali')

  return result
}

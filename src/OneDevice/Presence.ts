import { PresenceMessage, PresenceStatus } from '../typings/Enum/Presence'
import moment from 'moment'
import Tokenizer from '../Supports/Tokenizer'
import {
  IPresence,
  IPresenceDetail,
  ResponsePresence
} from '../typings/Response'
import { ContentType } from '../typings/Headers'
import Encryption from '../Supports/Encryption'
import request from '../Supports/request'

const makeRawSignature = function (nim: string, kode: string) {
  moment.locale('id')
  let format = `${nim.charAt(0)}${nim.charAt(4)}${nim.charAt(6)}${nim.charAt(
    8
  )}`
  let format2 = moment().format('DD')
  let str = parseInt(format2) * parseInt(format)
  let str2 = str + format

  let i2 = 0
  let length = str2.length
  if (length > 0) {
    let i3 = 0
    while (true) {
      let i4 = i2 + 1
      i3 += parseInt(str2.charAt(i2))
      if (i4 >= length) {
        break
      }
      i2 = i4
    }
    i2 = i3
  }

  return `${kode};${nim};${str}-${i2}`
}

export default {
  /**
   * Presensi qrcode
   * Untuk gambar silakan diolah sendiri untuk mendapatkn result qrcodenya
   */
  Qrcode: async (
    bearerToken: string,
    data: string,
    location: string
  ): Promise<ResponsePresence> => {
    try {
      await request
        .post(
          'https://ds.amikom.ac.id/api/amikomone/presensi_mobile/validate_qr_code',
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              'content-type': ContentType.Json
            },
            json: {
              data: `${data};${Tokenizer(bearerToken).npm}`,
              location
            }
          }
        )
        .json()
      return {
        status: PresenceStatus.Success,
        message: PresenceMessage.Success
      }
    } catch (e: any) {
      const statusCode = Number((e as any).response!.statusCode)
      if (!statusCode.toString().startsWith('4')) throw new Error(e)
      return statusCode == 422
        ? {
            status: PresenceStatus.ResourceAlreadyExists,
            message: PresenceMessage.ResourceAlreadyExists
          }
        : {
            status: PresenceStatus.Failed,
            message: PresenceMessage.Failed
          }
    }
  },
  /**
   * Presensi kode 5 digit
   */
  Code: async (
    bearerToken: string,
    code: string,
    location: string
  ): Promise<ResponsePresence> => {
    try {
      await request
        .post(
          'https://ds.amikom.ac.id/api/amikomone/presensi_mobile/validate_ticket',
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              'content-type': ContentType.Json
            },
            json: {
              data: Encryption.encrypt(
                makeRawSignature(Tokenizer(bearerToken).npm || '', code)
              ),
              location
            }
          }
        )
        .json()
      return {
        status: PresenceStatus.Success,
        message: PresenceMessage.Success
      }
    } catch (e: any) {
      const statusCode = Number((e as any).response!.statusCode)
      if (!statusCode.toString().startsWith('4')) throw new Error(e)
      return statusCode == 422
        ? {
            status: PresenceStatus.ResourceAlreadyExists,
            message: PresenceMessage.ResourceAlreadyExists
          }
        : {
            status: PresenceStatus.Failed,
            message: PresenceMessage.Failed
          }
    }
  },
  /**
   * Rekap Presensi
   */
  All: (
    bearerToken: string,
    xApiKey: string,
    semester: number,
    tahunAkademik: string
  ): Promise<IPresence[]> =>
    request
      .post('https://ds.amikom.ac.id/api/amikomone/academic/presensi/rekap', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'X-Api-Key': xApiKey,
          'content-type': ContentType.FormEncoded
        },
        form: {
          semester,
          tahun_akademik: tahunAkademik
        }
      })
      .json(),
  /**
   * Detail Presensi (keterangan waktu presensi berdasarkan krs/matkul)
   */
  Detail: (
    bearerToken: string,
    xApiKey: string,
    krsId: number
  ): Promise<IPresenceDetail[]> =>
    request
      .post('https://ds.amikom.ac.id/api/amikomone/academic/presensi/kuliah', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'X-Api-Key': xApiKey,
          'content-type': ContentType.FormEncoded
        },
        form: {
          krs_id: krsId
        }
      })
      .json()
}

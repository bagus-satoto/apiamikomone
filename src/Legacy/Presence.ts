import got from 'got/dist/source'

import { PresenceMessage, PresenceStatus } from '../typings/Enum/Presence'
import { ContentType, UserAgent } from '../typings/Headers'
import { IPresence, ResponsePresence } from '../typings/Response'

export default {
  QrCode: async (npm: string, data: string): Promise<ResponsePresence> => {
    try {
      await got
        .post('http://202.91.9.14:6000/api/presensi_mobile/validate_qr_code', {
          headers: {
            'user-agent': UserAgent,
            'content-type': ContentType.Json
          },
          body: JSON.stringify({
            data: `${data};${npm}`
          })
        })
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
  All: (
    bearerToken: string,
    semester: number,
    tahunAkademik: string
  ): Promise<IPresence[]> =>
    got
      .post('http://mhsmobile.amikom.ac.id/api/presensi/list_mk', {
        headers: {
          Authorization: bearerToken,
          'user-agent': UserAgent,
          'content-type': ContentType.FormEncoded
        },
        form: {
          semester,
          tahun_akademik: tahunAkademik
        }
      })
      .json()
}

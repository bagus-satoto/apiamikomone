import got from 'got/dist/source'
import { ContentType, UserAgent } from '../typings/Headers'
import { IBio, IJadwalKuliah } from '../typings/Response'

export default {
  JadwalKuliah: (
    bearerToken: string,
    semester: number,
    tahunAkademik: string
  ): Promise<IJadwalKuliah[]> =>
    got
      .post('http://mhsmobile.amikom.ac.id/api/personal/jadwal_kuliah', {
        headers: {
          'user-agent': UserAgent,
          'content-type': ContentType.FormEncoded,
          Authorization: bearerToken
        },
        form: {
          semester,
          tahun_akademik: tahunAkademik
        }
      })
      .json(),
  Bio: async (bearerToken: string): Promise<IBio> => {
    const response: IBio = await got
      .post('http://mhsmobile.amikom.ac.id/api/personal/init_data_mhs', {
        headers: {
          'user-agent': UserAgent,
          'content-type': ContentType.FormEncoded,
          Authorization: bearerToken
        }
      })
      .json()
    // @ts-ignore
    delete response.Mhs['PassEmail']
    return response
  }
}

import got from 'got/dist/source'
import Tokenizer from '../Foundation/Tokenizer'
import { IBio, IJadwalKuliah, IMataKuliah } from '../typings/Response'
const JadwalKuliah = async (
  bearerToken: string,
  xApiKey: string,
  idHari?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | number
): Promise<IJadwalKuliah[]> => {
  const response: IJadwalKuliah[] = await got
    .post('https://ds.amikom.ac.id/api/amikomone/academic/personal/jaku', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'X-Api-Key': xApiKey
      }
    })
    .json()
  if ((idHari || idHari == 0) && !response.some((x) => x.IdHari === idHari))
    return []
  return response.filter((val) => {
    if (idHari) {
      return val.IdHari === idHari
    }
    return true
  })
}
const MataKuliah = async (bearerToken: string, xApiKey: string) => {
  const jadwal = await JadwalKuliah(bearerToken, xApiKey)

  const seens: string[] = []
  const matkul: IMataKuliah[] = []
  for (const m of jadwal) {
    let seen = m.Kode.toString() + m.IdKuliah.toString()
    if (!seens.includes(seen)) {
      seens.push(seen)
      matkul.push({
        IdKuliah: m.IdKuliah,
        Kode: m.Kode,
        MataKuliah: m.MataKuliah,
        JenisKuliah: m.JenisKuliah,
        Nik: m.Nik,
        NamaDosen: m.NamaDosen,
        Kelas: m.Kelas,
        EmailDosen: m.EmailDosen,
        Jenjang: m.Jenjang,
        ZoomURL: m.ZoomURL,
        IsZoomURL: m.IsZoomURL
      })
    }
  }
  return matkul
}
const Bio = async (bearerToken: string, xApiKey: string): Promise<IBio> => {
  const response: IBio = await got
    .post('https://ds.amikom.ac.id/api/amikomone/academic/personal/bio', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'X-Api-Key': xApiKey
      }
    })
    .json()
  // @ts-ignore
  delete response.Mhs['PassEmail']
  return response
}
const KtmDigital = (bearerToken: string, xApiKey: string) =>
  got
    .get(
      `https://ds.amikom.ac.id/api/amikomone/mahasiswa/${
        Tokenizer(bearerToken).npm
      }/ktm_digital`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'X-Api-Key': xApiKey
        }
      }
    )
    .json()
export default {
  JadwalKuliah,
  MataKuliah,
  Bio,
  KtmDigital
}

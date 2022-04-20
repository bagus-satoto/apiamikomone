import got from 'got/dist/source'
import { ContentType, UserAgent } from '../typings/Headers'
import { IBio, IJadwalKuliah, IMataKuliah, InitKHS } from '../typings/Response'

const JadwalKuliah = async (
  bearerToken: string,
  semester: number,
  tahunAkademik: string,
  idHari?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | number
): Promise<IJadwalKuliah[]> => {
  const response: IJadwalKuliah[] = await got
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

const MataKuliah = async (
  bearerToken: string,
  semester: number,
  tahunAkademik: string
) => {
  const jadwal = await JadwalKuliah(bearerToken, semester, tahunAkademik)

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

const initKhs = async (token: string, npm: string): Promise<InitKHS> =>
  got
    .post('http://mhsmobile.amikom.ac.id/api/krs/init_khs', {
      headers: {
        'user-agent': UserAgent,
        'content-type': ContentType.FormEncoded,
        Authorization: token
      },
      form: { npm }
    })
    .json()

const Bio = async (bearerToken: string): Promise<IBio> => {
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
  const initkhs = await initKhs(bearerToken, response.Mhs.Npm)
  const findSemester = initkhs.Semester.find(
    (v) => v.Kode == response.PeriodeAkademik.Semester
  )
  response.PeriodeAkademik.SemesterFormat = findSemester?.Nama || ''
  return response
}

export default {
  JadwalKuliah,
  MataKuliah,
  Bio
}

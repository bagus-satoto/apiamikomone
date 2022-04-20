import { MikomLegacy as Legacy } from '../src'
import dotenv from 'dotenv'
dotenv.config()

const npm = process.env.NPM || ''
const password = process.env.PASSWORD || ''
const qrcodeResult =
  'av7pBw6QKk5bKFl6sXND7O1Z56R3HOzQcMJsBu81cE1Qp8oRFpZLfm0YK6bLp+LJ"'

Legacy.Auth(npm, password).then(async (resp) => {
  console.log(resp, 'resp')
  const bio = await Legacy.Mahasiswa.Bio(resp.access_token)
  console.log(bio, 'bio')
  const jadwal = await Legacy.Mahasiswa.JadwalKuliah(
    resp.access_token,
    bio.PeriodeAkademik.Semester,
    bio.PeriodeAkademik.TahunAkademik
  )
  console.log(jadwal, 'jadwal')
  const matkul = await Legacy.Mahasiswa.MataKuliah(
    resp.access_token,
    bio.PeriodeAkademik.Semester,
    bio.PeriodeAkademik.TahunAkademik
  )
  console.log(matkul, 'matkul')

  console.log(await Legacy.Presence.QrCode(npm, qrcodeResult))
  console.log(
    await Legacy.Presence.All(
      resp.access_token,
      bio.PeriodeAkademik.Semester,
      bio.PeriodeAkademik.TahunAkademik
    )
  )
})

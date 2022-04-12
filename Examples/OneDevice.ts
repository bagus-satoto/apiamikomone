import OneDevice from '../src'
import dotenv from 'dotenv'

dotenv.config()

const npm = process.env.NPM || ''
const password = process.env.PASSWORD || ''
const devceiId = process.env.DEVICEID || ''

const qrcode =
  'av7pBw6QKk5bKFl6sXND7O1Z56R3HOzQcMJsBu81cE1Qp8oRFpZLfm0YK6bLp+LJ'
const code = '12345'

OneDevice.Auth(npm, password, devceiId).then(async (resp) => {
  console.log(resp, 'resp')

  const jadwalKuliah = await OneDevice.Mahasiswa.JadwalKuliah(
    resp.access_token,
    resp.api_key
  )
  console.log(jadwalKuliah, 'jadwalKuliah')
  const matkul = await OneDevice.Mahasiswa.MataKuliah(
    resp.access_token,
    resp.api_key
  )
  console.log(matkul, 'matkul')

  const bio = await OneDevice.Mahasiswa.Bio(resp.access_token, resp.api_key)
  console.log(bio, 'bio')

  const ktmDigital = await OneDevice.Mahasiswa.KtmDigital(
    resp.access_token,
    resp.api_key
  )
  console.log(ktmDigital, 'ktmDigital')

  const presenceByQrcode = await OneDevice.Presence.Qrcode(
    resp.access_token,
    qrcode
  )
  console.log(presenceByQrcode, 'presenceByQrcode')

  const presenceByCode = await OneDevice.Presence.Code(resp.access_token, code)
  console.log(presenceByCode, 'presenceByCode')

  const presenceRekap = await OneDevice.Presence.All(
    resp.access_token,
    resp.api_key,
    bio.PeriodeAkademik.Semester,
    bio.PeriodeAkademik.TahunAkademik
  )
  console.log(presenceRekap, 'presenceRekap')
  if (presenceRekap.length) {
    const presenceDetail = await OneDevice.Presence.Detail(
      resp.access_token,
      resp.api_key,
      presenceRekap[0].KrsId
    )
    console.log(presenceDetail, 'presenceDetail')
  }

  // Payument
  console.log(await OneDevice.Payment.Payment(resp.access_token), 'Payment')
  console.log(await OneDevice.Payment.Bank(resp.access_token), 'Bank')
  console.log(
    await OneDevice.Payment.TicketCost(resp.access_token, resp.api_key),
    'Ticket Cost'
  )
  console.log(
    await OneDevice.Payment.TicketHistory(resp.access_token, resp.api_key),
    'Ticket History'
  )
  console.log(
    await OneDevice.Payment.Bill(resp.access_token, resp.api_key),
    'Bill'
  )
  console.log(
    await OneDevice.Payment.History(resp.access_token, resp.api_key),
    'History'
  )
})

import {PresenceMessage, PresenceStatus} from "./Enum"

export interface ResponseResult {
  result: 0 | 1
}
export interface ResponseAuth {
  access_token: string
  api_key: string
  expires_in: number
}

export type ResponsePresence = {
  status: PresenceStatus.Success,
  message: PresenceMessage.Success
} | {
  status: PresenceStatus.ResourceAlreadyExists,
  message: PresenceMessage.ResourceAlreadyExists
} | {
  status: PresenceStatus.Failed,
  message: PresenceMessage.Failed
}
export interface IBio {
  Mhs: {
    Npm: string
    Nama: string
    Angkatan: string
    EmailAmikom: string
    //    PassEmail?: string
    Prodi: string
    IsBelumLulus: boolean
    IsAktif: boolean
    NpmImg: string
  }
  PeriodeAkademik: {
    TahunAkademik: string
    Semester: number
    SemesterFormat: string
  }
}
export type IJenisKuliah = "Teori" | "Praktikum"

export interface IJadwalKuliah {
  IdHari: number
  IdJam: number
  IdKuliah: number
  Keterangan: string
  Hari: string
  Ruang: string
  Waktu: string
  ZoomURL: string
  IsZoomURL: 1 | 0
  Kode: string
  MataKuliah: string
  JenisKuliah: IJenisKuliah
  Kelas: string
  Nik: string,
  NamaDosen: string
  EmailDosen: string
  Jenjang: string
  IsBolehPresensi: 0 | 1
  KodePresensi: string
}

export interface ITicketCost {
  va: string
  jenis_kwj: string
  nama_kwj: string
  nominal: number
  tipe: "open" | string
  alias_nominal: string
  is_active: boolean
  status: string
  warna: string
}
export interface IHistory {
  tha: string
  semester: string
  tgl_bayar: string
  nominal: number
  bank: string
  nama_kwj: string
}
export type ResponsePage<T> = {
  status: {
    code: number
    description: "OK" | string
    pages_count: number
  }
  results: T
}
export interface IPresence {
  KrsId: number
  Kode: string
  NamaMk: string
  NamaMkEn: string
  JmlSks: number
  JmlPresensiKuliah: number
  IsHadirMID: boolean
  IsHadirUAS: boolean
}
export interface IPresenceDetail {
  Tanggal: string
  Jam: string
  Kelas: string
  JenisKuliah: IJenisKuliah
}

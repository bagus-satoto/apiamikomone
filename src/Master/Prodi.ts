import got from 'got/dist/source'

export default (): Promise<{ Kode: string; Nama: string }[]> =>
  got.get('https://mhs.amikom.ac.id/api/support/master_prodi').json()

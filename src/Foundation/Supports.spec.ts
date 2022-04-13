import Supports from './Supports'

test('Ambil nim dari body', () => {
  const body = `
Nama: Binsar Dwi Jasuma
nim: 21.11.4002

Nama: Asepudin
Nim: 21.11.4003
`
  const nims = Supports.getNims(body)
  expect(nims).toEqual(['21.11.4002', '21.11.4003'])
})

describe('Ambil foto mahasiswa pakai nim', () => {
  test('Sukses ngambil', () => {
    const link = Supports.toPhoto('21.11.4002')
    expect(link).toEqual('https://fotomhs.amikom.ac.id/2021/21_11_4002.jpg')
  })
  test('gagal ngambil', () => {
    const link = Supports.toPhoto('')
    expect(link).toEqual('https://fotomhs.amikom.ac.id/20/.jpg')
  })
})

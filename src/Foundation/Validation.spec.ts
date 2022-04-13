import Validations from './Validations'

describe('Validasi', () => {
  test('nim benar', () => {
    expect(Validations.isNim('21.11.4002')).toBe(true)
  })
  test('nim salah', () => {
    expect(Validations.isNim('asdasd')).toBe(false)
  })
  test('kode kelas benar', () => {
    expect(Validations.isClassCode('21S1IF03-Lingkun(ST013)')).toBe(true)
  })
  test('kode kelas salah', () => {
    expect(Validations.isClassCode('21S1IF03')).toBe(false)
  })
})

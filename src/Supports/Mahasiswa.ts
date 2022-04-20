export default {
  /**
   * Mendapatkan link foto mahasiswa berdasarkan nim
   */
  toPhoto: (nim: string) =>
    `https://fotomhs.amikom.ac.id/20${nim.substring(0, 2)}/${nim.replace(
      /\./g,
      '_'
    )}.jpg`,
  /**
   * Ambil semua nim yang ada di body
   */
  getNims: (body: string) => body.match(/\d{2}\.\d{2}\.\d{4}/gs) || []
}

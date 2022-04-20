export default {
  isNim: (str: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(str),
  isClassCode: (str: string) => /^(\S{0,}-\S{0,}\(\S{1,}\))$/.test(str)
}

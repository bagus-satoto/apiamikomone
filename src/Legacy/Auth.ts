import got from 'got/dist/source'
import { ResponseAuthLegacy } from '../typings/Response'
import { ContentType, UserAgent } from './../typings/Headers'

export default (npm: string, password: string): Promise<ResponseAuthLegacy> =>
  got
    .post('http://mhsmobile.amikom.ac.id/login', {
      headers: {
        'user-agent': UserAgent,
        'content-type': ContentType.FormEncoded
      },
      form: {
        username: npm,
        keyword: password
      }
    })
    .json()

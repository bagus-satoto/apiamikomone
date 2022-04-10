import got from "got/dist/source";
import Tokenizer from "../Foundation/Tokenizer";
import {IBio, IJadwalKuliah} from "../typings/Response";

export default {
  JadwalKuliah: (bearerToken: string, xApiKey: string): Promise<IJadwalKuliah[]> => got.post("https://ds.amikom.ac.id/api/amikomone/academic/personal/jaku", {
    headers: {
      "Authorization": `Bearer ${bearerToken}`,
      "X-Api-Key": xApiKey
    }
  }).json(),
  Bio: async (bearerToken: string, xApiKey: string): Promise<IBio> => {
    const response: IBio = await got.post("https://ds.amikom.ac.id/api/amikomone/academic/personal/bio", {
      headers: {
        "Authorization": `Bearer ${bearerToken}`,
        "X-Api-Key": xApiKey
      }
    }).json()
    // @ts-ignore
    delete response.Mhs['PassEmail']
    return response
  },
  KtmDigital: (bearerToken: string, xApiKey: string) => got.get(`https://ds.amikom.ac.id/api/amikomone/mahasiswa/${Tokenizer(bearerToken).npm}/ktm_digital`, {
    headers: {
      "Authorization": `Bearer ${bearerToken}`,
      "X-Api-Key": xApiKey
    }
  }).json(),

}

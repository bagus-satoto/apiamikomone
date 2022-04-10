import got from "got/dist/source";
import {ContentType} from "../typings/Headers";
import {ResponseAuth} from "../typings/Response";

/**
 * Authenticate OneDevice hanya bisa satu deviceId
 * Pastikan device id sudah terdaftar
 * Flow: `Device.Otp => Device.Verify => Auth`
 * Gunakan: `Device.Reset``
 * Untuk meng whapus deviceId
 */
export default (npm: string, password: string, deviceId: string): Promise<ResponseAuth> => got.post("https://ds.amikom.ac.id/api/amikomone/auth", {
  headers: {
    "content-type": ContentType.FormEncoded
  },
  form: {user_id: npm, password, device_id: deviceId}
}).json()

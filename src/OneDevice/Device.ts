import request from "../Supports/request";
import { ContentType, UserAgent } from "../typings/Headers";
import { ResponseResult } from "../typings/Response";

/**
 * OneDevice hanya bisa satu deviceId
 * Flow: `Device.Otp => Device.Verify => Auth`
 * Gunakan: `Device.Reset``
 * Untuk meng whapus deviceId
 */
export default {
  /**
   * Meminta OTP untuk dilanjutkan ke verify(Mendaftarkan deviceId)
   */
  Otp: (npm: string, tglLahir: string): Promise<ResponseResult> => request.post("https://ds.amikom.ac.id/api/amikomone/device/otp", {
    headers: {
      "content-type": ContentType.FormEncoded,

    },
    form: {
      npm, tgl_lahir: tglLahir
    }
  }).json(),
  /**
   * Memverifikasi OTP dan mendaftar deviceId digunakan untuk request Autentikasi
   */
  Verify: (npm: string, otp: string, deviceId: string): Promise<ResponseResult> => request.post("https://ds.amikom.ac.id/api/amikomone/device/register", {
    headers: {
      "content-type": ContentType.FormEncoded,

    },
    form: {
      npm, otp, device_id: deviceId
    }
  }).json(),
  /**
   * Menghapus deviceId yang sudah diverifikasi/daftarkan
   */
  Reset: (npm: string, deviceId: string): Promise<ResponseResult> => request.post("https://ds.amikom.ac.id/api/amikomone/device/reset", {
    searchParams: {
      npm, device_id: deviceId
    }
  }).json()
}

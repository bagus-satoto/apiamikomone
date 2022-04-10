import { ResponseResult } from "../typings/Response";
declare const _default: {
    /**
     * Meminta OTP untuk dilanjutkan ke verify(Mendaftarkan deviceId)
     */
    Otp: (npm: string, tglLahir: string) => Promise<ResponseResult>;
    /**
     * Memverifikasi OTP dan mendaftar deviceId digunakan untuk request Autentikasi
     */
    Verify: (npm: string, otp: string, deviceId: string) => Promise<ResponseResult>;
    /**
     * Menghapus deviceId yang sudah diverifikasi/daftarkan
     */
    Reset: (npm: string, deviceId: string) => Promise<ResponseResult>;
};
/**
 * OneDevice hanya bisa satu deviceId
 * Flow: `Device.Otp => Device.Verify => Auth`
 * Gunakan: `Device.Reset``
 * Untuk meng whapus deviceId
 */
export default _default;
//# sourceMappingURL=Device.d.ts.map
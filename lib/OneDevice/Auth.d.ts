import { ResponseAuth } from "../typings/Response";
declare const _default: (npm: string, password: string, deviceId: string) => Promise<ResponseAuth>;
/**
 * Authenticate OneDevice hanya bisa satu deviceId
 * Pastikan device id sudah terdaftar
 * Flow: `Device.Otp => Device.Verify => Auth`
 * Gunakan: `Device.Reset``
 * Untuk meng whapus deviceId
 */
export default _default;
//# sourceMappingURL=Auth.d.ts.map
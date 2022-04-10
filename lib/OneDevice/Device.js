"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Headers_1 = require("../typings/Headers");
/**
 * OneDevice hanya bisa satu deviceId
 * Flow: `Device.Otp => Device.Verify => Auth`
 * Gunakan: `Device.Reset``
 * Untuk meng whapus deviceId
 */
exports.default = {
    /**
     * Meminta OTP untuk dilanjutkan ke verify(Mendaftarkan deviceId)
     */
    Otp: (npm, tglLahir) => source_1.default.post("https://ds.amikom.ac.id/api/amikomone/device/otp", {
        headers: {
            "content-type": Headers_1.ContentType.FormEncoded
        },
        form: {
            npm, tgl_lahir: tglLahir
        }
    }).json(),
    /**
     * Memverifikasi OTP dan mendaftar deviceId digunakan untuk request Autentikasi
     */
    Verify: (npm, otp, deviceId) => source_1.default.post("https://ds.amikom.ac.id/api/amikomone/device/register", {
        headers: {
            "content-type": Headers_1.ContentType.FormEncoded
        },
        form: {
            npm, otp, device_id: deviceId
        }
    }).json(),
    /**
     * Menghapus deviceId yang sudah diverifikasi/daftarkan
     */
    Reset: (npm, deviceId) => source_1.default.post("https://ds.amikom.ac.id/api/amikomone/device/reset", {
        searchParams: {
            npm, device_id: deviceId
        }
    }).json()
};

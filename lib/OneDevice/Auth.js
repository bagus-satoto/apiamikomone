"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Headers_1 = require("../typings/Headers");
/**
 * Authenticate OneDevice hanya bisa satu deviceId
 * Pastikan device id sudah terdaftar
 * Flow: `Device.Otp => Device.Verify => Auth`
 * Gunakan: `Device.Reset``
 * Untuk meng whapus deviceId
 */
exports.default = (npm, password, deviceId) => source_1.default.post("https://ds.amikom.ac.id/api/amikomone/auth", {
    headers: {
        "content-type": Headers_1.ContentType.FormEncoded
    },
    form: { user_id: npm, password, device_id: deviceId }
}).json();

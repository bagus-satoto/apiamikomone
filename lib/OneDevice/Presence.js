"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Presence_1 = require("../typings/Enum/Presence");
const moment_1 = __importDefault(require("moment"));
const Tokenizer_1 = __importDefault(require("../Foundation/Tokenizer"));
const Headers_1 = require("../typings/Headers");
const Encryption_1 = __importDefault(require("../Foundation/Encryption"));
const makeRawSignature = function (nim, kode) {
    moment_1.default.locale('id');
    let format = `${nim.charAt(0)}${nim.charAt(4)}${nim.charAt(6)}${nim.charAt(8)}`;
    let format2 = (0, moment_1.default)().format('DD');
    let str = parseInt(format2) * parseInt(format);
    let str2 = str + format;
    let i2 = 0;
    let length = str2.length;
    if (length > 0) {
        let i3 = 0;
        while (true) {
            let i4 = i2 + 1;
            i3 += parseInt(str2.charAt(i2));
            if (i4 >= length) {
                break;
            }
            i2 = i4;
        }
        i2 = i3;
    }
    return `${kode};${nim};${str}-${i2}`;
};
exports.default = {
    /**
     * Presensi qrcode
     * Untuk gambar silakan diolah sendiri untuk mendapatkn result qrcodenya
     */
    Qrcode: async (bearerToken, data) => {
        try {
            await source_1.default
                .post('https://ds.amikom.ac.id/api/amikomone/presensi_mobile/validate_qr_code', {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    'content-type': Headers_1.ContentType.Json
                },
                json: {
                    data: `${data};${(0, Tokenizer_1.default)(bearerToken).npm}`
                }
            })
                .json();
            return {
                status: Presence_1.PresenceStatus.Success,
                message: Presence_1.PresenceMessage.Success
            };
        }
        catch (e) {
            const statusCode = Number(e.response.statusCode);
            if (!statusCode.toString().startsWith('4'))
                throw new Error(e);
            return statusCode == 422
                ? {
                    status: Presence_1.PresenceStatus.ResourceAlreadyExists,
                    message: Presence_1.PresenceMessage.ResourceAlreadyExists
                }
                : {
                    status: Presence_1.PresenceStatus.Failed,
                    message: Presence_1.PresenceMessage.Failed
                };
        }
    },
    /**
     * Presensi kode 5 digit
     */
    Code: async (bearerToken, code) => {
        try {
            await source_1.default
                .post('https://ds.amikom.ac.id/api/amikomone/presensi_mobile/validate_ticket', {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    'content-type': Headers_1.ContentType.Json
                },
                json: {
                    data: Encryption_1.default.encrypt(makeRawSignature((0, Tokenizer_1.default)(bearerToken).npm || '', code))
                }
            })
                .json();
            return {
                status: Presence_1.PresenceStatus.Success,
                message: Presence_1.PresenceMessage.Success
            };
        }
        catch (e) {
            const statusCode = Number(e.response.statusCode);
            if (!statusCode.toString().startsWith('4'))
                throw new Error(e);
            return statusCode == 422
                ? {
                    status: Presence_1.PresenceStatus.ResourceAlreadyExists,
                    message: Presence_1.PresenceMessage.ResourceAlreadyExists
                }
                : {
                    status: Presence_1.PresenceStatus.Failed,
                    message: Presence_1.PresenceMessage.Failed
                };
        }
    },
    /**
     * Rekap Presensi
     */
    All: (bearerToken, xApiKey, semester, tahunAkademik) => source_1.default
        .post('https://ds.amikom.ac.id/api/amikomone/academic/presensi/rekap', {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'X-Api-Key': xApiKey,
            'content-type': Headers_1.ContentType.FormEncoded
        },
        form: {
            semester,
            tahun_akademik: tahunAkademik
        }
    })
        .json(),
    /**
     * Detail Presensi (keterangan waktu presensi berdasarkan krs/matkul)
     */
    Detail: (bearerToken, xApiKey, krsId) => source_1.default
        .post('https://ds.amikom.ac.id/api/amikomone/academic/presensi/kuliah', {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'X-Api-Key': xApiKey,
            'content-type': Headers_1.ContentType.FormEncoded
        },
        form: {
            krs_id: krsId
        }
    })
        .json()
};

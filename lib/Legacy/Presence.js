"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Presence_1 = require("../typings/Enum/Presence");
const Headers_1 = require("../typings/Headers");
exports.default = {
    QrCode: async (npm, data) => {
        try {
            await source_1.default
                .post('http://202.91.9.14:6000/api/presensi_mobile/validate_qr_code', {
                headers: {
                    'user-agent': Headers_1.UserAgent,
                    'content-type': Headers_1.ContentType.Json
                },
                body: JSON.stringify({
                    data: `${data};${npm}`
                })
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
    All: (bearerToken, semester, tahunAkademik) => source_1.default
        .post('http://mhsmobile.amikom.ac.id/api/presensi/list_mk', {
        headers: {
            Authorization: bearerToken,
            'user-agent': Headers_1.UserAgent,
            'content-type': Headers_1.ContentType.FormEncoded
        },
        form: {
            semester,
            tahun_akademik: tahunAkademik
        }
    })
        .json()
};

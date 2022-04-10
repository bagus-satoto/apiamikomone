"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Headers_1 = require("../typings/Headers");
exports.default = {
    JadwalKuliah: (bearerToken, semester, tahunAkademik) => source_1.default
        .post('http://mhsmobile.amikom.ac.id/api/personal/jadwal_kuliah', {
        headers: {
            'user-agent': Headers_1.UserAgent,
            'content-type': Headers_1.ContentType.FormEncoded,
            Authorization: bearerToken
        },
        form: {
            semester,
            tahun_akademik: tahunAkademik
        }
    })
        .json(),
    Bio: async (bearerToken) => {
        const response = await source_1.default
            .post('http://mhsmobile.amikom.ac.id/api/personal/init_data_mhs', {
            headers: {
                'user-agent': Headers_1.UserAgent,
                'content-type': Headers_1.ContentType.FormEncoded,
                Authorization: bearerToken
            }
        })
            .json();
        // @ts-ignore
        delete response.Mhs['PassEmail'];
        return response;
    }
};

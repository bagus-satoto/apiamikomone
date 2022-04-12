"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Tokenizer_1 = __importDefault(require("../Foundation/Tokenizer"));
const JadwalKuliah = async (bearerToken, xApiKey, idHari) => {
    const response = await source_1.default
        .post('https://ds.amikom.ac.id/api/amikomone/academic/personal/jaku', {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'X-Api-Key': xApiKey
        }
    })
        .json();
    if ((idHari || idHari == 0) && !response.some((x) => x.IdHari === idHari))
        return [];
    return response.filter((val) => {
        if (idHari) {
            return val.IdHari === idHari;
        }
        return true;
    });
};
const MataKuliah = async (bearerToken, xApiKey) => {
    const jadwal = await JadwalKuliah(bearerToken, xApiKey);
    const seens = [];
    const matkul = [];
    for (const m of jadwal) {
        let seen = m.Kode.toString() + m.IdKuliah.toString();
        if (!seens.includes(seen)) {
            seens.push(seen);
            matkul.push({
                IdKuliah: m.IdKuliah,
                Kode: m.Kode,
                MataKuliah: m.MataKuliah,
                JenisKuliah: m.JenisKuliah,
                Nik: m.Nik,
                NamaDosen: m.NamaDosen,
                Kelas: m.Kelas,
                EmailDosen: m.EmailDosen,
                Jenjang: m.Jenjang,
                ZoomURL: m.ZoomURL,
                IsZoomURL: m.IsZoomURL
            });
        }
    }
    return matkul;
};
const Bio = async (bearerToken, xApiKey) => {
    const response = await source_1.default
        .post('https://ds.amikom.ac.id/api/amikomone/academic/personal/bio', {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'X-Api-Key': xApiKey
        }
    })
        .json();
    // @ts-ignore
    delete response.Mhs['PassEmail'];
    return response;
};
const KtmDigital = (bearerToken, xApiKey) => source_1.default
    .get(`https://ds.amikom.ac.id/api/amikomone/mahasiswa/${(0, Tokenizer_1.default)(bearerToken).npm}/ktm_digital`, {
    headers: {
        Authorization: `Bearer ${bearerToken}`,
        'X-Api-Key': xApiKey
    }
})
    .json();
exports.default = {
    JadwalKuliah,
    MataKuliah,
    Bio,
    KtmDigital
};

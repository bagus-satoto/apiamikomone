"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Headers_1 = require("../typings/Headers");
const JadwalKuliah = async (bearerToken, semester, tahunAkademik, idHari) => {
    const response = await source_1.default
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
const MataKuliah = async (bearerToken, semester, tahunAkademik) => {
    const jadwal = await JadwalKuliah(bearerToken, semester, tahunAkademik);
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
const initKhs = async (token, npm) => source_1.default
    .post('http://mhsmobile.amikom.ac.id/api/krs/init_khs', {
    headers: {
        'user-agent': Headers_1.UserAgent,
        'content-type': Headers_1.ContentType.FormEncoded,
        Authorization: token
    },
    form: { npm }
})
    .json();
const Bio = async (bearerToken) => {
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
    const initkhs = await initKhs(bearerToken, response.Mhs.Npm);
    const findSemester = initkhs.Semester.find((v) => v.Kode == response.PeriodeAkademik.Semester);
    response.PeriodeAkademik.SemesterFormat = findSemester?.Nama || '';
    return response;
};
exports.default = {
    JadwalKuliah,
    MataKuliah,
    Bio
};

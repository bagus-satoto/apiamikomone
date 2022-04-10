"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Tokenizer_1 = __importDefault(require("../Foundation/Tokenizer"));
exports.default = {
    JadwalKuliah: (bearerToken, xApiKey) => source_1.default.post("https://ds.amikom.ac.id/api/amikomone/academic/personal/jaku", {
        headers: {
            "Authorization": `Bearer ${bearerToken}`,
            "X-Api-Key": xApiKey
        }
    }).json(),
    Bio: async (bearerToken, xApiKey) => {
        const response = await source_1.default.post("https://ds.amikom.ac.id/api/amikomone/academic/personal/bio", {
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "X-Api-Key": xApiKey
            }
        }).json();
        // @ts-ignore
        delete response.Mhs['PassEmail'];
        return response;
    },
    KtmDigital: (bearerToken, xApiKey) => source_1.default.get(`https://ds.amikom.ac.id/api/amikomone/mahasiswa/${(0, Tokenizer_1.default)(bearerToken).npm}/ktm_digital`, {
        headers: {
            "Authorization": `Bearer ${bearerToken}`,
            "X-Api-Key": xApiKey
        }
    }).json(),
};

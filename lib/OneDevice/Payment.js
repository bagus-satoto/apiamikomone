"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Tokenizer_1 = __importDefault(require("../Supports/Tokenizer"));
exports.default = {
    TicketCost: async (bearerToken, xApiKey) => {
        const response = await source_1.default
            .get(`https://ds.amikom.ac.id/api/amikomone/payment/${(0, Tokenizer_1.default)(bearerToken).npm}/biaya_tiket`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                'X-Api-Key': xApiKey
            }
        })
            .json();
        return response.results;
    },
    TicketHistory: (bearerToken, xApiKey) => source_1.default
        .get(`https://ds.amikom.ac.id/api/amikomone/payment/${(0, Tokenizer_1.default)(bearerToken).npm}/histori_tiket`, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'X-Api-Key': xApiKey
        }
    })
        .json(),
    /**
     * Histori Pembayaran semasa Kuliah
     */
    History: async (bearerToken, xApiKey) => {
        const response = await source_1.default
            .get(`https://ds.amikom.ac.id/api/amikomone/payment/${(0, Tokenizer_1.default)(bearerToken).npm}/histori`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                'X-Api-Key': xApiKey
            }
        })
            .json();
        return response.results;
    },
    Bill: (bearerToken, xApiKey) => source_1.default
        .get(`https://ds.amikom.ac.id/api/amikomone/payment/${(0, Tokenizer_1.default)(bearerToken).npm}/tagihan`, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'X-Api-Key': xApiKey
        }
    })
        .json(),
    Payment: (bearerToken) => source_1.default
        .get('https://ds.amikom.ac.id/api/amikomone/payment', {
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    })
        .json(),
    /**
     * Daftar bank AMIKOM
     */
    Bank: async (bearerToken) => {
        const response = await source_1.default
            .get('https://ds.amikom.ac.id/api/amikomone/bank', {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        })
            .json();
        return response.results;
    }
};

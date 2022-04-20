"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
exports.default = () => source_1.default.get('https://mhs.amikom.ac.id/api/support/master_prodi').json();

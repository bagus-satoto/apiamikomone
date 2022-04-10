"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("./Auth"));
const Mahasiswa_1 = __importDefault(require("./Mahasiswa"));
const Presence_1 = __importDefault(require("./Presence"));
exports.default = {
    Auth: Auth_1.default,
    Mahasiswa: Mahasiswa_1.default,
    Presence: Presence_1.default
};

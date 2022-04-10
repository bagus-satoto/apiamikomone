"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("./Auth"));
const Device_1 = __importDefault(require("./Device"));
const Mahasiswa_1 = __importDefault(require("./Mahasiswa"));
const Payment_1 = __importDefault(require("./Payment"));
const Presence_1 = __importDefault(require("./Presence"));
exports.default = {
    Auth: Auth_1.default, Device: Device_1.default,
    Mahasiswa: Mahasiswa_1.default, Presence: Presence_1.default,
    Payment: Payment_1.default
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("got/dist/source"));
const Headers_1 = require("./../typings/Headers");
exports.default = (npm, password) => source_1.default
    .post('http://mhsmobile.amikom.ac.id/login', {
    headers: {
        'user-agent': Headers_1.UserAgent,
        'content-type': Headers_1.ContentType.FormEncoded
    },
    form: {
        username: npm,
        keyword: password
    }
})
    .json();

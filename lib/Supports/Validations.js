"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isNim: (str) => /^\d{2}\.\d{2}\.\d{4}$/.test(str),
    isClassCode: (str) => /^(\S{0,}-\S{0,}\(\S{1,}\))$/.test(str)
};

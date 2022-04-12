"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikomReader = exports.MikomValidation = exports.MikomSupports = exports.Legacy = void 0;
const Legacy_1 = __importDefault(require("./Legacy"));
exports.Legacy = Legacy_1.default;
const OneDevice_1 = __importDefault(require("./OneDevice"));
const Supports_1 = __importDefault(require("./Foundation/Supports"));
exports.MikomSupports = Supports_1.default;
const Validations_1 = __importDefault(require("./Foundation/Validations"));
exports.MikomValidation = Validations_1.default;
const QrReader_1 = __importDefault(require("./Foundation/QrReader"));
exports.MikomReader = QrReader_1.default;
exports.default = OneDevice_1.default;

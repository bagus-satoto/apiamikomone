"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY = void 0;
const node_forge_1 = __importDefault(require("node-forge"));
exports.KEY = Buffer.from('knsHASZkE6wQtSAZNJgI3pJ7BwEmZBOs', 'base64');
exports.default = {
    hexToString: function (hex) {
        hex = hex.toString();
        let str = '';
        for (let n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    },
    encrypt: function (plain_text, key) {
        if (!key)
            key = exports.KEY;
        let cipher = node_forge_1.default.cipher.createCipher('3DES-ECB', key);
        cipher.start({
            iv: ''
        });
        // @ts-ignore
        cipher.update(node_forge_1.default.util.createBuffer(plain_text, 'utf-8'));
        cipher.finish();
        let encrypted = cipher.output;
        return node_forge_1.default.util.encode64(encrypted.getBytes());
    },
    decrypt: function (encrypted_text, key) {
        if (!key)
            key = exports.KEY;
        let decipher = node_forge_1.default.cipher.createDecipher('3DES-ECB', key);
        encrypted_text = node_forge_1.default.util.decode64(encrypted_text);
        decipher.start({
            iv: ''
        });
        // @ts-ignore
        decipher.update(node_forge_1.default.util.createBuffer(encrypted_text, 'utf-8'));
        decipher.finish();
        let decrypted = decipher.output;
        return this.hexToString(decrypted.toHex());
    }
};

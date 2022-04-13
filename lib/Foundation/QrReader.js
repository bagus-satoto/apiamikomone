"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const source_1 = __importDefault(require("got/dist/source"));
const jimp_1 = __importDefault(require("jimp"));
const form_data_1 = __importDefault(require("form-data"));
const QrCode = require('qrcode-reader');
const { getSync } = require('@andreekeberg/imagedata');
const jsQR = require('jsqr');
const QrCodeInvalid = 'QRCode tidak dikenali';
const scanWithImgonline = async (data) => {
    const form = new form_data_1.default();
    form.append('uploadfile', data, 'qrcode' + Date.now());
    form.append('codetype', 2);
    form.append('rotset', 0);
    form.append('croptype', 1);
    form.append('cropleft', 0);
    form.append('cropright', 0);
    form.append('croptop', 0);
    form.append('cropbottom', 0);
    const response = await source_1.default
        .post('https://www.imgonline.com.ua/eng/scan-qr-bar-code-result.php', {
        headers: form.getHeaders(),
        body: form
    })
        .text();
    const $ = cheerio_1.default.load(response);
    const result = $('#content div').text().trim();
    if (!result)
        throw new Error(QrCodeInvalid);
    return result;
};
const scanWithJimpQrcode = (data) => new Promise((resolve, reject) => {
    jimp_1.default.read(data, function (err, image) {
        if (err) {
            reject(new Error(QrCodeInvalid));
        }
        let qrcode = new QrCode();
        qrcode.callback = function (err2, value) {
            if (err2) {
                reject(new Error(QrCodeInvalid));
            }
            if (value == undefined || value?.result == null || value?.result == '')
                return reject(new Error(QrCodeInvalid));
            resolve(value.result);
        };
        qrcode.decode(image.bitmap);
    });
});
const scanWithJsQr = (data) => new Promise((resolve, reject) => {
    const imagedata = getSync(data);
    const code = jsQR(imagedata.data, imagedata.width, imagedata.height);
    if (!code)
        return reject(new Error(QrCodeInvalid));
    resolve(code.data);
});
async function default_1(data) {
    let result = null;
    // @ts-ignore
    result = await Promise.any([
        scanWithJsQr(data),
        scanWithImgonline(data),
        scanWithJimpQrcode(data)
    ]);
    if (!result)
        throw new Error(QrCodeInvalid);
    return result;
}
exports.default = default_1;

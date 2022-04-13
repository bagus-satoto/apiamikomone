"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanWithApi = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const file_type_1 = __importDefault(require("file-type"));
const source_1 = __importDefault(require("got/dist/source"));
const jimp_1 = __importDefault(require("jimp"));
const form_data_1 = __importDefault(require("form-data"));
const QrCode = require('qrcode-reader');
const { getSync } = require('@andreekeberg/imagedata');
const jsQR = require('jsqr');
const scanWithJimpQrcode = (data) => new Promise((resolve) => {
    jimp_1.default.read(data, function (err, image) {
        if (err) {
            resolve(null);
        }
        let qrcode = new QrCode();
        qrcode.callback = function (err2, value) {
            if (err2) {
                resolve(null);
            }
            if (value == undefined || value?.result == null || value?.result == '')
                return resolve(null);
            resolve(value.result);
        };
        qrcode.decode(image.bitmap);
    });
});
const scanWithApi = async (data) => {
    const filetype = await file_type_1.default.fromBuffer(data);
    if (!filetype)
        throw new Error('File tidak dikenali');
    const responseRecognize = await source_1.default
        .post('https://api.products.aspose.app/barcode/recognize/apiRequestRecognize', {
        form: {
            type: 'qr',
            quality: 2,
            fileBase64: `data:${filetype.mime};base64,${Buffer.from(data).toString('base64')}`
        }
    })
        .json();
    const getReady = async (recognizeResultToken) => {
        return source_1.default
            .get('https://api.products.aspose.app/barcode/id/recognize/recognizeresult/' +
            recognizeResultToken, {
            searchParams: {
                timestamp: new Date().getTime()
            }
        })
            .json();
    };
    let next = true;
    setTimeout(() => {
        next = false;
    }, 20_000);
    let html = '';
    while (next) {
        let ready = await getReady(responseRecognize.recognizeResultToken);
        if (ready.ready) {
            html = ready.html;
            break;
        }
    }
    const $ = cheerio_1.default.load(html);
    return $('textarea').val();
};
exports.scanWithApi = scanWithApi;
const scanWithJsQr = (data) => {
    const imageData = getSync(data);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (!code) {
        return null;
    }
    return code.data;
};
const scanWithImgonline = async (data) => {
    const form = new form_data_1.default();
    form.append('uploadfile', data, 'qrcode');
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
    return $('#content div').text().trim();
};
async function default_1(data) {
    let result = null;
    result = scanWithJsQr(data);
    if (!result)
        result = await scanWithImgonline(data);
    if (!result)
        result = await scanWithJimpQrcode(data);
    if (!result)
        result = await (0, exports.scanWithApi)(data);
    if (!result)
        throw new Error('QR Code tidak dikenali');
    return result;
}
exports.default = default_1;

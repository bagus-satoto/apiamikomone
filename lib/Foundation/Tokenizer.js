"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(bearerToken) {
    if (bearerToken.split('.').length !== 3)
        throw new Error("Token is not valid");
    const buffer = Buffer.from(bearerToken.split('.')[1], 'base64');
    const stringify = buffer.toString();
    let json = JSON.parse(stringify);
    const findNim = /\d{2}\.\d{2}\.\d{4}/.exec(stringify);
    json.npm = Boolean(findNim?.length) ? (findNim ? findNim[0] : null) : null;
    return json;
}
exports.default = default_1;

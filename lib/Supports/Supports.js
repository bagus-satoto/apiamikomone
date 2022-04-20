"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * Mendapatkan link foto mahasiswa berdasarkan nim
     */
    toPhoto: (nim) => `https://fotomhs.amikom.ac.id/20${nim.substring(0, 2)}/${nim.replace(/\./g, '_')}.jpg`,
    /**
     * Ambil semua nim yang ada di body
     */
    getNims: (body) => body.match(/\d{2}\.\d{2}\.\d{4}/gs) || []
};

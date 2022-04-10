import { IPresence, IPresenceDetail, ResponsePresence } from '../typings/Response';
declare const _default: {
    /**
     * Presensi qrcode
     * Untuk gambar silakan diolah sendiri untuk mendapatkn result qrcodenya
     */
    Qrcode: (bearerToken: string, data: string) => Promise<ResponsePresence>;
    /**
     * Presensi kode 5 digit
     */
    Code: (bearerToken: string, code: string) => Promise<ResponsePresence>;
    /**
     * Rekap Presensi
     */
    All: (bearerToken: string, xApiKey: string, semester: number, tahunAkademik: string) => Promise<IPresence[]>;
    /**
     * Detail Presensi (keterangan waktu presensi berdasarkan krs/matkul)
     */
    Detail: (bearerToken: string, xApiKey: string, krsId: number) => Promise<IPresenceDetail[]>;
};
export default _default;
//# sourceMappingURL=Presence.d.ts.map
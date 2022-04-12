declare const _default: {
    Auth: (npm: string, password: string) => Promise<import("../typings/Response").ResponseAuthLegacy>;
    Mahasiswa: {
        JadwalKuliah: (bearerToken: string, semester: number, tahunAkademik: string, idHari?: number | undefined) => Promise<import("../typings/Response").IJadwalKuliah[]>;
        MataKuliah: (bearerToken: string, semester: number, tahunAkademik: string) => Promise<import("../typings/Response").IMataKuliah[]>;
        Bio: (bearerToken: string) => Promise<import("../typings/Response").IBio>;
    };
    Presence: {
        QrCode: (npm: string, data: string) => Promise<import("../typings/Response").ResponsePresence>;
        All: (bearerToken: string, semester: number, tahunAkademik: string) => Promise<import("../typings/Response").IPresence[]>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map
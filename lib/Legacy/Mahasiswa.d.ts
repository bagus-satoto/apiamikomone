import { IBio, IJadwalKuliah, IMataKuliah } from '../typings/Response';
declare const _default: {
    JadwalKuliah: (bearerToken: string, semester: number, tahunAkademik: string, idHari?: number | undefined) => Promise<IJadwalKuliah[]>;
    MataKuliah: (bearerToken: string, semester: number, tahunAkademik: string) => Promise<IMataKuliah[]>;
    Bio: (bearerToken: string) => Promise<IBio>;
};
export default _default;
//# sourceMappingURL=Mahasiswa.d.ts.map
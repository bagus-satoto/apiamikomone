import { IBio, IJadwalKuliah, IMataKuliah } from '../typings/Response';
declare const _default: {
    JadwalKuliah: (bearerToken: string, xApiKey: string, idHari?: number | undefined) => Promise<IJadwalKuliah[]>;
    MataKuliah: (bearerToken: string, xApiKey: string) => Promise<IMataKuliah[]>;
    Bio: (bearerToken: string, xApiKey: string) => Promise<IBio>;
    KtmDigital: (bearerToken: string, xApiKey: string) => import("got/dist/source").CancelableRequest<unknown>;
};
export default _default;
//# sourceMappingURL=Mahasiswa.d.ts.map
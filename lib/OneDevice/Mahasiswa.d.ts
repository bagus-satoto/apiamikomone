import { IBio, IJadwalKuliah } from "../typings/Response";
declare const _default: {
    JadwalKuliah: (bearerToken: string, xApiKey: string) => Promise<IJadwalKuliah[]>;
    Bio: (bearerToken: string, xApiKey: string) => Promise<IBio>;
    KtmDigital: (bearerToken: string, xApiKey: string) => import("got/dist/source").CancelableRequest<unknown>;
};
export default _default;
//# sourceMappingURL=Mahasiswa.d.ts.map
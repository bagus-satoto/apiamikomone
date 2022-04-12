declare const _default: {
    Auth: (npm: string, password: string, deviceId: string) => Promise<import("../typings/Response").ResponseAuth>;
    Device: {
        Otp: (npm: string, tglLahir: string) => Promise<import("../typings/Response").ResponseResult>;
        Verify: (npm: string, otp: string, deviceId: string) => Promise<import("../typings/Response").ResponseResult>;
        Reset: (npm: string, deviceId: string) => Promise<import("../typings/Response").ResponseResult>;
    };
    Mahasiswa: {
        JadwalKuliah: (bearerToken: string, xApiKey: string, idHari?: number | undefined) => Promise<import("../typings/Response").IJadwalKuliah[]>;
        MataKuliah: (bearerToken: string, xApiKey: string) => Promise<import("../typings/Response").IMataKuliah[]>;
        Bio: (bearerToken: string, xApiKey: string) => Promise<import("../typings/Response").IBio>;
        KtmDigital: (bearerToken: string, xApiKey: string) => import("got/dist/source").CancelableRequest<unknown>;
    };
    Presence: {
        Qrcode: (bearerToken: string, data: string) => Promise<import("../typings/Response").ResponsePresence>;
        Code: (bearerToken: string, code: string) => Promise<import("../typings/Response").ResponsePresence>;
        All: (bearerToken: string, xApiKey: string, semester: number, tahunAkademik: string) => Promise<import("../typings/Response").IPresence[]>;
        Detail: (bearerToken: string, xApiKey: string, krsId: number) => Promise<import("../typings/Response").IPresenceDetail[]>;
    };
    Payment: {
        TicketCost: (bearerToken: string, xApiKey: string) => Promise<import("../typings/Response").ITicketCost[]>;
        TicketHistory: (bearerToken: string, xApiKey: string) => import("got/dist/source").CancelableRequest<unknown>;
        History: (bearerToken: string, xApiKey: string) => Promise<import("../typings/Response").IHistory[]>;
        Bill: (bearerToken: string, xApiKey: string) => import("got/dist/source").CancelableRequest<unknown>;
        Payment: (bearerToken: string) => import("got/dist/source").CancelableRequest<unknown>;
        Bank: (bearerToken: string) => Promise<string[]>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map
import { IHistory, ITicketCost } from "../typings/Response";
declare const _default: {
    TicketCost: (bearerToken: string, xApiKey: string) => Promise<ITicketCost[]>;
    TicketHistory: (bearerToken: string, xApiKey: string) => import("got/dist/source").CancelableRequest<unknown>;
    /**
    * Histori Pembayaran semasa Kuliah
    */
    History: (bearerToken: string, xApiKey: string) => Promise<IHistory[]>;
    Bill: (bearerToken: string, xApiKey: string) => import("got/dist/source").CancelableRequest<unknown>;
    Payment: (bearerToken: string) => import("got/dist/source").CancelableRequest<unknown>;
    /**
    * Daftar bank AMIKOM
    */
    Bank: (bearerToken: string) => Promise<string[]>;
};
export default _default;
//# sourceMappingURL=Payment.d.ts.map
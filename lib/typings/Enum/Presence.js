"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceStatus = exports.PresenceMessage = void 0;
var PresenceMessage;
(function (PresenceMessage) {
    PresenceMessage["Success"] = "Presensi berhasil!";
    PresenceMessage["ResourceAlreadyExists"] = "Anda sudah melakukan presensi!";
    PresenceMessage["Failed"] = "Presensi gagal.";
})(PresenceMessage = exports.PresenceMessage || (exports.PresenceMessage = {}));
var PresenceStatus;
(function (PresenceStatus) {
    PresenceStatus["Success"] = "success";
    PresenceStatus["ResourceAlreadyExists"] = "resourceAlreadyExists";
    PresenceStatus["Failed"] = "failed";
})(PresenceStatus = exports.PresenceStatus || (exports.PresenceStatus = {}));

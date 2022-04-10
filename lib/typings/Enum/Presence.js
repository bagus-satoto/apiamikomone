"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceStatus = exports.PresenceMessage = void 0;
var PresenceMessage;
(function (PresenceMessage) {
    PresenceMessage["Success"] = "Anda sudah melakukan presensi!";
    PresenceMessage["ResourceAlreadyExists"] = "Presensi berhasil!";
    PresenceMessage["Failed"] = "Presensi gagal.";
})(PresenceMessage = exports.PresenceMessage || (exports.PresenceMessage = {}));
var PresenceStatus;
(function (PresenceStatus) {
    PresenceStatus["Success"] = "success";
    PresenceStatus["ResourceAlreadyExists"] = "resourceAlreadyExists";
    PresenceStatus["Failed"] = "failed";
})(PresenceStatus = exports.PresenceStatus || (exports.PresenceStatus = {}));

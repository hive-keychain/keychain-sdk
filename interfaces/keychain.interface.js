"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeychainKeyTypesLC = exports.KeychainKeyTypes = exports.KeychainRequestTypes = void 0;
var KeychainRequestTypes;
(function (KeychainRequestTypes) {
    KeychainRequestTypes["decode"] = "decode";
    KeychainRequestTypes["encode"] = "encode";
    KeychainRequestTypes["signBuffer"] = "signBuffer";
    KeychainRequestTypes["broadcast"] = "broadcast";
    KeychainRequestTypes["addAccountAuthority"] = "addAccountAuthority";
    KeychainRequestTypes["removeAccountAuthority"] = "removeAccountAuthority";
    KeychainRequestTypes["removeKeyAuthority"] = "removeKeyAuthority";
    KeychainRequestTypes["addKeyAuthority"] = "addKeyAuthority";
    KeychainRequestTypes["signTx"] = "signTx";
    KeychainRequestTypes["post"] = "post";
    KeychainRequestTypes["vote"] = "vote";
    KeychainRequestTypes["custom"] = "custom";
    KeychainRequestTypes["signedCall"] = "signedCall";
    KeychainRequestTypes["transfer"] = "transfer";
    KeychainRequestTypes["sendToken"] = "sendToken";
    KeychainRequestTypes["delegation"] = "delegation";
    KeychainRequestTypes["witnessVote"] = "witnessVote";
    KeychainRequestTypes["proxy"] = "proxy";
    KeychainRequestTypes["powerUp"] = "powerUp";
    KeychainRequestTypes["powerDown"] = "powerDown";
    KeychainRequestTypes["createClaimedAccount"] = "createClaimedAccount";
    KeychainRequestTypes["createProposal"] = "createProposal";
    KeychainRequestTypes["removeProposal"] = "removeProposal";
    KeychainRequestTypes["updateProposalVote"] = "updateProposalVote";
    KeychainRequestTypes["addAccount"] = "addAccount";
    KeychainRequestTypes["convert"] = "convert";
    KeychainRequestTypes["recurrentTransfer"] = "recurrentTransfer";
})(KeychainRequestTypes = exports.KeychainRequestTypes || (exports.KeychainRequestTypes = {}));
var KeychainKeyTypes;
(function (KeychainKeyTypes) {
    KeychainKeyTypes["posting"] = "Posting";
    KeychainKeyTypes["active"] = "Active";
    KeychainKeyTypes["memo"] = "Memo";
})(KeychainKeyTypes = exports.KeychainKeyTypes || (exports.KeychainKeyTypes = {}));
var KeychainKeyTypesLC;
(function (KeychainKeyTypesLC) {
    KeychainKeyTypesLC["posting"] = "posting";
    KeychainKeyTypesLC["active"] = "active";
    KeychainKeyTypesLC["memo"] = "memo";
})(KeychainKeyTypesLC = exports.KeychainKeyTypesLC || (exports.KeychainKeyTypesLC = {}));

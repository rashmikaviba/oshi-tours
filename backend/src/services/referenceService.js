"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReferenceNumber = void 0;
const generateReferenceNumber = () => {
    // Generate a random number between 100000 and 999999
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateReferenceNumber = generateReferenceNumber;
//# sourceMappingURL=referenceService.js.map
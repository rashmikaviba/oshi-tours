"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWords = countWords;
exports.validateMagicBytes = validateMagicBytes;
function countWords(text) {
    if (!text || typeof text !== 'string')
        return 0;
    const trimmed = text.trim();
    if (!trimmed)
        return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
}
function validateMagicBytes(buffer) {
    if (!buffer || buffer.length < 8) {
        return { isValid: false };
    }
    // Check JPEG magic bytes: FF D8 FF
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        return { isValid: true, mimeType: 'image/jpeg' };
    }
    // Check PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
    if (buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47 &&
        buffer[4] === 0x0d &&
        buffer[5] === 0x0a &&
        buffer[6] === 0x1a &&
        buffer[7] === 0x0a) {
        return { isValid: true, mimeType: 'image/png' };
    }
    return { isValid: false };
}
//# sourceMappingURL=fileValidation.js.map
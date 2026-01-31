/**
 * Paytm Checksum Utility
 * Official algorithm for generating and verifying checksums
 * Used server-side only - NEVER expose Merchant Key to frontend
 */

const crypto = require('crypto');

const iv = '@@@@&&&&####$$$$';

function encrypt(input, key) {
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(input, 'binary', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decrypt(encrypted, key) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'binary');
    decrypted += decipher.final('binary');
    return decrypted;
}

function generateSignature(params, key) {
    if (typeof params !== 'object' && typeof params !== 'string') {
        throw new Error('params must be of type object or string');
    }
    
    const data = typeof params === 'object' 
        ? getStringByParams(params) 
        : params;
    
    return generateSignatureByString(data, key);
}

function verifySignature(params, key, checksum) {
    if (typeof params !== 'object' && typeof params !== 'string') {
        throw new Error('params must be of type object or string');
    }
    
    const data = typeof params === 'object' 
        ? getStringByParams(params) 
        : params;
    
    return verifySignatureByString(data, key, checksum);
}

function generateSignatureByString(params, key) {
    const salt = generateRandomString(4);
    return calculateChecksum(params, key, salt);
}

function verifySignatureByString(params, key, checksum) {
    const paytmHash = decrypt(checksum, key);
    const salt = paytmHash.substr(paytmHash.length - 4);
    return paytmHash === calculateHash(params, salt);
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getStringByParams(params) {
    const sortedKeys = Object.keys(params).sort();
    let result = '';
    
    for (const key of sortedKeys) {
        let value = params[key] !== null && params[key] !== undefined 
            ? params[key].toString() 
            : '';
        if (value.includes('REFUND')) {
            value = '';
        }
        result += (result.length > 0 ? '|' : '') + value;
    }
    
    return result;
}

function calculateHash(params, salt) {
    const data = params + '|' + salt;
    return crypto.createHash('sha256').update(data).digest('hex') + salt;
}

function calculateChecksum(params, key, salt) {
    const hash = calculateHash(params, salt);
    return encrypt(hash, key);
}

module.exports = {
    generateSignature,
    verifySignature,
    generateSignatureByString,
    verifySignatureByString
};

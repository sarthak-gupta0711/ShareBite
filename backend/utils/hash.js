const crypto = require('crypto');

function checkPasswordHash(pwhash, password) {
  if (pwhash.startsWith('pbkdf2:sha256')) {
    let iters, salt, hash;
    if (pwhash.includes('$')) {
      let splitted = pwhash.split('$');
      iters = parseInt(splitted[0].split(':')[2], 10) || 600000;
      salt = splitted[1];
      hash = splitted[2];
    }
    const derived = crypto.pbkdf2Sync(password, salt, iters, 32, 'sha256').toString('hex');
    return derived === hash;
  }
  return false;
}

function generatePasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const iters = 600000;
  const hash = crypto.pbkdf2Sync(password, salt, iters, 32, 'sha256').toString('hex');
  return `pbkdf2:sha256:${iters}$${salt}$${hash}`;
}

module.exports = {
  checkPasswordHash,
  generatePasswordHash
};

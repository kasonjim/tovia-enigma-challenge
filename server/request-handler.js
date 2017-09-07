let crypto = require('crypto')

let delimiter = '<>'

exports.encrypt = (req, res) => {
  let { name, message, date } = req.body;

  let cipher = crypto.createCipher('aes-256-cbc', req.params.id);
  let encrypted = cipher.update(`${name}${delimiter}${message}${delimiter}${date}`, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  res.status(201).json(encrypted);
}

exports.decrypt = (req, res) => {
  let { encryptedString } = req.body;

  let decipher = crypto.createDecipher('aes-256-cbc', req.params.id);
  let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  let data = decrypted.split(delimiter);

  res.status(201).json({
    name: data[0],
    message: data[1],
    date: data[2]
  });
}
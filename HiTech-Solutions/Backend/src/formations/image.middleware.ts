const MIME_TYPES = {
  'image/png': 'png',
  'image/svg+xml': 'svg',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
    return callback(new Error('Allowing image file only'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(' ').join('_');
  const extension = MIME_TYPES[file.mimetype];
  callback(null, `${name}${Date.now()}.${extension}`);
};

import multer from 'multer'

const createStorage = (uploadDir) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, uniqueSuffix + '.' + file.mimetype.split('/')[1])
    },
  })

  return multer({ storage: storage })
}

export default createStorage

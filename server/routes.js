const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const junk = require('./tools/junk')
// const mime = require('mime')
const config = require('./config/config.json')
const folderBase = path.resolve(config.basedir) // path.resolve(__dirname, '..', 'app')
/* Serve the Tree */
router.get('/folder/*', function(req, res, next) {
  const folderName = req.path.substr(8)
  const _p = path.resolve(folderBase, folderName)
  if (_p.substr(0,folderBase.length) === folderBase) {
    processFolder(_p)
      .then(v => res.json(v))
      .catch(e => next(e))
  } else {
    res.json([])
  }
})

/* Serve a Resource */
// router.get('/file/:name', function(req, res) {
//   res.send(fs.readFileSync(req.query.resource, 'UTF-8'))
// })

router.get('/file/*', function (req, res, next) {
  let options = {
    root: folderBase,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  let fileName = decodeURI(req.path.substr(6))
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  })
})

function processFolder(folderName) {
  return new Promise((resolve, reject) => {
    let resp = []
    let folder = decodeURI(folderName)
    fs.readdir(folder, function(err, arFile) {
      if (err) {
        reject(err);
      } else {
        arFile.filter(junk.not).forEach(fileName => {
          const f = path.join(folder, fileName)
          let s = fs.statSync(f)
          if(s.isFile() || s.isDirectory()) {
            resp.push({
              id: fileName,
              isfile: s.isFile(),
              size: s.size,
              mtime: s.mtime,
              birthtime: s.atime
            })
          }
        })
        console.log('Folder:', folder);
      }
      resolve(resp)
    })
  })
}
module.exports = router;
const router = require('express').Router()
const fs = require('fs')
const path = require('path')
// const mime = require('mime')

const folderBase = path.resolve(__dirname, '..', 'app')
/* Serve the Tree */
router.get('/folder/*', function(req, res) {
  const folderName = req.path.substr(8)
  const _p = path.resolve(folderBase, folderName)
  if (_p.substr(0,folderBase.length) === folderBase) {
    processFolder(_p, res)
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
  let fileName = req.path.substr(6)
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  })
})

function processFolder(folderName, res) {
  let resp = []
  fs.readdir(folderName, function(err, arFile) {
    arFile.forEach(fileName => {
      const f = path.join(folderName, fileName)
      let s = fs.statSync(f)
      if(s.isFile() || s.isDirectory()) {
        resp.push({
          id: fileName,
          isfile: s.isFile(),
          size: s.size,
          mtime: s.mtime,
          birthtime: s.birthtime
        })
      }
    })
    res.json(resp)
  })
}

module.exports = router;
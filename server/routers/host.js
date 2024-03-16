const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")

// middleware
router.use(express.static("public"))
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }))


router.post("/save-user-name", function (req, res) {
  // todo: 
  
  let name = JSON.parse(Object.keys(JSON.parse(JSON.stringify(req.body))))
  User.findOneAndUpdate({_id: req.session.user._id}, { name: name }, {useFindAndModify: false}, function (err) {
    if (err) throw err
    req.session.user.name = name
    res.status(201).send()
  })
})

module.exports = router
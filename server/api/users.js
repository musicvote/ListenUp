const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

//double check the data type findOrCreate is expecting when I can test this

router.post('/', async (req, res, next) => {
  try {
    console.log('HIT USER FIND OR CREATE')
    if (req.user) {
      const id = req.user.id
      const username = req.user.username
      const displayName = req.user.displayName
      const user = User.findOrCreate(
        {where: {id, username, displayName}},
        {plain: true}
      )
      res.status(201).json(user)
      console.log('HIT USER FIND OR CREATE')
    } else {
      res.send('Please log in with Spotify')
    }
  } catch (error) {
    next(error)
  }
})

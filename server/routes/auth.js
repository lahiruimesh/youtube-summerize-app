const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

router.get('/user', (req, res) => {
  console.log('Current user:', req.user);
  res.send(req.user || null);
});

module.exports = router;

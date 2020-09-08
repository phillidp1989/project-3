module.exports = {
  // Check if user is authenticated
  authCheck: (req, res, next) => {
    if (req.user) {
      console.log('auth check' + req.user);
      return next();
    }
    res.redirect('/login');
  },
  // Check if user is not authenticated
  guestCheck: (req, res, next) => {
    if (!req.user) {
      return next();
    }
    res.redirect('/search');
  },
};

module.exports = (err, req, res, next) => {
  if (err.message === 'abc') return res.status(403).send('auth failed')
  res.status(500).send(err.message)
}

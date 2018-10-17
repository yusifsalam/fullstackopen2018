const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  const error = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7)
    }
    next()
  }

  module.exports = {
    logger,
    error,
    tokenExtractor
  }
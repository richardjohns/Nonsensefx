const routes = require('next-routes')()

routes.add('Blog', '/blog')
routes.add('/blog/:slug', '/Blog/Post')

module.exports = routes
export default defineEventHandler((event) => {
  const res = event.node.res
  // Set CORS headers for all API requests
  res.setHeader('Access-Control-Allow-Origin', '*') // Allow all origins (for development, use a specific domain in production)
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With',
  )
  setHeader(event, 'Content-Type', 'application/json; charset=utf-8')
  // Handle preflight OPTIONS request
  if (event.node.req.method === 'OPTIONS') {
    res.statusCode = 204 // No content
    res.end()
  }
})

export default async function handler(req: any, res: any) {
  return res.json({
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    xForwardedUri: req.headers['x-forwarded-uri'],
    xMatchedPath: req.headers['x-matched-path'],
    xVercelForwardedFor: req.headers['x-vercel-forwarded-for'],
  });
}

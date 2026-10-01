const {
  MICROSOFT_CLIENT_ID,
  MICROSOFT_AUTHORIZE_URL,
  GRAPH_SCOPES,
  ALLOWED_ORIGINS,
  signState,
  getUserFromToken,
  requireBearer,
  redirectUriFor,
} = require('../_lib/outlook');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = requireBearer(req);
  const user = await getUserFromToken(token);
  if (!user) return res.status(401).json({ error: 'Não autenticado.' });

  const origin = req.headers.origin || `https://${req.headers.host}`;
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return res.status(400).json({ error: 'Origem não permitida.' });
  }

  const state = signState({ uid: user.id, origin, exp: Date.now() + 10 * 60 * 1000 });

  const params = new URLSearchParams({
    client_id: MICROSOFT_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUriFor(origin),
    response_mode: 'query',
    scope: GRAPH_SCOPES,
    state,
    prompt: 'select_account',
  });

  res.status(200).json({ url: `${MICROSOFT_AUTHORIZE_URL}?${params.toString()}` });
};

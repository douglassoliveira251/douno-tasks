const { getUserFromToken, requireBearer, getStoredTokens } = require('../_lib/outlook');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = requireBearer(req);
  const user = await getUserFromToken(token);
  if (!user) return res.status(401).json({ error: 'Não autenticado.' });

  try {
    const row = await getStoredTokens(user.id);
    if (!row) return res.status(200).json({ connected: false });
    return res.status(200).json({ connected: true, account: row.ms_account || null });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erro ao checar status.' });
  }
};

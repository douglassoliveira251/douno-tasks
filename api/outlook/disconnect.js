const { getUserFromToken, requireBearer, deleteTokens } = require('../_lib/outlook');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = requireBearer(req);
  const user = await getUserFromToken(token);
  if (!user) return res.status(401).json({ error: 'Não autenticado.' });

  try {
    await deleteTokens(user.id);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erro ao desconectar.' });
  }
};

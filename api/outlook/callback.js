const { verifyState, exchangeCodeForTokens, upsertTokens, redirectUriFor } = require('../_lib/outlook');

module.exports = async (req, res) => {
  const { code, state, error, error_description } = req.query;

  const payload = verifyState(state);
  const fallbackOrigin = payload && payload.origin ? payload.origin : 'https://tasks.douno.com.br';

  if (error) {
    return res.redirect(302, `${fallbackOrigin}/?outlook=error&reason=${encodeURIComponent(error_description || error)}`);
  }
  if (!payload) {
    return res.redirect(302, `${fallbackOrigin}/?outlook=error&reason=estado_invalido`);
  }

  try {
    const tokens = await exchangeCodeForTokens(code, redirectUriFor(payload.origin));
    let msAccount = null;
    try {
      const meResp = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      if (meResp.ok) {
        const me = await meResp.json();
        msAccount = me.mail || me.userPrincipalName || null;
      }
    } catch (e) { /* não bloqueia a conexão se isso falhar */ }

    await upsertTokens(payload.uid, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
      ms_account: msAccount,
    });

    return res.redirect(302, `${payload.origin}/?outlook=connected`);
  } catch (e) {
    console.error(e);
    return res.redirect(302, `${payload.origin}/?outlook=error&reason=falha_ao_conectar`);
  }
};

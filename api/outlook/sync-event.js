const { getUserFromToken, requireBearer, getValidAccessToken } = require('../_lib/outlook');

function addDaysStr(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function eventToGraphPayload(ev) {
  const tz = 'America/Sao_Paulo';
  const payload = {
    subject: ev.title || 'Sem título',
    body: { contentType: 'text', content: ev.description || '' },
    categories: ev.categoryName ? [ev.categoryName] : [],
  };
  if (ev.allDay || !ev.startTime) {
    payload.isAllDay = true;
    payload.start = { dateTime: `${ev.date}T00:00:00`, timeZone: tz };
    payload.end = { dateTime: `${addDaysStr(ev.endDate || ev.date, 1)}T00:00:00`, timeZone: tz };
  } else {
    payload.isAllDay = false;
    payload.start = { dateTime: `${ev.date}T${ev.startTime}:00`, timeZone: tz };
    payload.end = { dateTime: `${ev.endDate || ev.date}T${ev.endTime || ev.startTime}:00`, timeZone: tz };
  }
  return payload;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = requireBearer(req);
  const user = await getUserFromToken(token);
  if (!user) return res.status(401).json({ error: 'Não autenticado.' });

  const { action, event, outlookEventId } = req.body || {};
  if (!action) return res.status(400).json({ error: 'action é obrigatório.' });

  let accessToken;
  try {
    accessToken = await getValidAccessToken(user.id);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erro ao obter token do Outlook.' });
  }
  if (!accessToken) return res.status(409).json({ error: 'Outlook não conectado.' });

  try {
    if (action === 'delete') {
      if (!outlookEventId) return res.status(200).json({ ok: true });
      await fetch(`https://graph.microsoft.com/v1.0/me/events/${outlookEventId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.status(200).json({ ok: true });
    }

    if (!event) return res.status(400).json({ error: 'event é obrigatório.' });
    const payload = eventToGraphPayload(event);

    if (outlookEventId) {
      const resp = await fetch(`https://graph.microsoft.com/v1.0/me/events/${outlookEventId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (resp.status === 404) {
        const createResp = await fetch('https://graph.microsoft.com/v1.0/me/events', {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await createResp.json();
        if (!createResp.ok) return res.status(502).json({ error: 'Erro ao criar evento no Outlook.', details: data });
        return res.status(200).json({ outlookEventId: data.id });
      }
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        return res.status(502).json({ error: 'Erro ao atualizar evento no Outlook.', details: data });
      }
      return res.status(200).json({ outlookEventId });
    }

    const resp = await fetch('https://graph.microsoft.com/v1.0/me/events', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await resp.json();
    if (!resp.ok) return res.status(502).json({ error: 'Erro ao criar evento no Outlook.', details: data });
    return res.status(200).json({ outlookEventId: data.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erro inesperado ao sincronizar com o Outlook.' });
  }
};

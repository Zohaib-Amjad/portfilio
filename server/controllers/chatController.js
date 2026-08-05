const { answerChat } = require('../services/chatService');

const createChatReply = async (req, res, next) => {
  try {
    const message = String(req.body?.message || '').trim();
    const history = Array.isArray(req.body?.history) ? req.body.history : [];

    if (!message) {
      return res.status(422).json({
        success: false,
        message: 'Please type a question.',
      });
    }

    if (message.length > 500) {
      return res.status(422).json({
        success: false,
        message: 'Please keep questions under 500 characters.',
      });
    }

    const { reply, mode } = await answerChat({ message, history });

    return res.status(200).json({
      success: true,
      reply,
      mode,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createChatReply,
};

const router = require('express').Router();
const moment = require('moment');
const { Conversation, Message } = require('../../db/models');
const onlineUsers = require('../../onlineUsers');

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.post('/confirm-read', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const requestCallerId = req.user.id;
    const { messageIds, messageSenderId, conversationId } = req.body;

    if (!messageIds?.length || !messageSenderId) {
      return res
        .status(400)
        .send('Please include messageIds and MessageSenderId');
    }

    // NOTE cross check whether the request caller really the one in the conversation
    const targetConversation = await Conversation.findConversation(
      requestCallerId,
      messageSenderId
    );

    if (!targetConversation || targetConversation?.id !== conversationId) {
      return res.status(400).send('Conversation not found');
    }

    const newRecipientReadAt = Date.now();

    const updatedResults = await Message.update(
      { recipientReadAt: newRecipientReadAt },
      {
        where: {
          id: messageIds,
          senderId: messageSenderId,
          conversationId,
          recipientReadAt: null,
        },
        returning: true,
      }
    );

    // NOTE: check whether message exist and they has been confirmed read
    if (!updatedResults[0]) {
      return res
        .status(400)
        .send('messages not found / all messages have been read');
    }
    const updatedTargetMessages = updatedResults[1];

    return res.json({
      updatedMessageIds: updatedTargetMessages.map(({ id }) => id),
      newRecipientReadAt: moment(newRecipientReadAt),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

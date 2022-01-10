const Conversation = require('./conversation');
const User = require('./user');
const Message = require('./message');
const UserConversation = require('./userConversation');

// associations

UserConversation.belongsTo(User);
UserConversation.belongsTo(Conversation);

Conversation.belongsToMany(User, {
  through: UserConversation,
  foreignKey: 'conversationId',
});
User.belongsToMany(Conversation, {
  through: UserConversation,
  foreignKey: 'userId',
});

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
};

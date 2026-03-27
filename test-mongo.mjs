import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const conversationSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastMessage: { type: String, default: "" },
  unreadCount: { type: Number, default: 0 },
});
const Conversation = mongoose.model("TestConversation", conversationSchema);

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "TestConversation", required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isAdmin: { type: Boolean, default: false },
  text: { type: String, required: true },
});
const Message = mongoose.model("TestMessage", messageSchema);

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongoose");

    const customerId = "1a2b3c4d5e6f7a8b9c0d1e2f";
    
    console.log("Finding or creating conversation...");
    let conv = await Conversation.findOne({ customerId });
    if (!conv) {
      conv = await Conversation.create({ customerId, lastMessage: "Hello", unreadCount: 1 });
    }
    console.log("Conversation created:", conv._id);

    console.log("Creating message...");
    const msg = await Message.create({
      conversationId: conv._id,
      senderId: customerId,
      text: "Hello",
      isAdmin: false
    });
    console.log("Message created successfully:", msg._id);
    
    await mongoose.disconnect();
  } catch (err) {
    console.error("Mongoose Test Error:", err);
  }
}

test();

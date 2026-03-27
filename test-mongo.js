require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

async function run() {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    
    const conversationSchema = new mongoose.Schema({
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      lastMessage: { type: String, default: "" },
      unreadCount: { type: Number, default: 0 },
    });
    const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);
    
    const messageSchema = new mongoose.Schema({
      conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      isAdmin: { type: Boolean, default: false },
      text: { type: String, required: true },
    });
    const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

    const customerId = "609c1234567890abcd123456"; // sample hex
    console.log("Simulating Conversation creation...");
    const conv = await Conversation.create({ customerId, lastMessage: "Hello", unreadCount: 1 });
    console.log("Conversation created:", conv._id);

    console.log("Simulating Message creation...");
    const msg = await Message.create({ conversationId: conv._id, senderId: customerId, text: "hello", isAdmin: false });
    console.log("Message created:", msg._id);

    console.log("SUCCESS");
  } catch(e) {
    console.error("ERROR:", e.message);
  } finally {
    process.exit(0);
  }
}

run();

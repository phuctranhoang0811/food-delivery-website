const URI = "mongodb+srv://phuc:081104@cluster0.uojrizp.mongodb.net/food_delivery?appName=Cluster0";
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({}, { strict: false });
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema, "messages"); // Ép vào collection "messages"

async function run() {
  try {
    await mongoose.connect(URI);
    const msgs = await Message.find().lean();
    console.log("=== DB DIAGNOSTIC ===");
    console.log("Total messages in 'messages' collection:", msgs.length);
    if (msgs.length > 0) {
      console.log("Sample message:", msgs[msgs.length - 1]);
    } else {
      console.log("Collection is truly empty.");
    }
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
run();

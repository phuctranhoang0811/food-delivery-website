const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // Khởi tạo Socket.IO đính kèm vào HTTP Server của Next.js
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Khi khách/Admin chọn 1 cuộc trò chuyện, họ Join vào Room đó
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined conversation: ${conversationId}`);
    });

    // Admin Join phòng chung để hóng tin báo có Khách lạ nhắn tin
    socket.on("join_admin_dashboard", () => {
      socket.join("admin_dashboard");
      console.log(`Admin ${socket.id} joined Dashboard`);
    });

    // Nhận tin nhắn từ Client truyền lên và phát (Broadcast) cho người còn lại
    socket.on("send_message", (data) => {
      // 1. Gửi tin nhắn mới vào phòng chat riêng của 2 người
      io.to(data.conversationId).emit("receive_message", data);
      
      // 2. Gửi tín hiệu thông báo cho Admin Dashboard biết để nhảy thông báo/cập nhật danh sách
      io.to("admin_dashboard").emit("conversation_updated", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  server.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port} (With Socket.IO)`);
  });
});

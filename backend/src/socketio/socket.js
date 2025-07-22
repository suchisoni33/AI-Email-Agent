// import { Server } from "socket.io";
// import userModel from "../models/user.model.js";
// import getResponse from "../service/ai.service.js";
// import { appendMessage, getMessages } from "../service/cache.service.js";


// const initializeSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: "http://localhost:5173",
//             methods: [ "GET", "POST" ],
//             credentials: true,
//         },
//     });

//     io.use(async (socket, next) => {
//         const cookie = socket.handshake.headers.cookie;

//         if (!cookie) {
//             return next(new Error("Authentication error"));
//         }

//         const token = cookie.split(";")[ 1 ].split("=")[ 1 ];
//         if (!token) {
//             return next(new Error("Authentication error"));
//         }

//         const user = await userModel.authToken(token);
//         if (!user) {
//             return next(new Error("Authentication error"));
//         }
//         socket.user = user;

//         next();
//     });

//     io.on("connection", async (socket) => {

//         const messages = await getMessages(`conversation:${socket.user._id}`);
//         socket.emit('chat-history', messages);

//         socket.on("message", async (data) => {
//             const { message } = data;

//             appendMessage(`conversation:${socket.user._id}`, {
//                 role: "user",
//                 content: message,
//             })

//             const messages = await getMessages(`conversation:${socket.user._id}`);




//             const response = await getResponse(messages, socket.user);

//             appendMessage(`conversation:${socket.user._id}`, {
//                 role: "model",
//                 content: response,
//             })

//             console.log("Response from AI:", response);

//             socket.emit("message", response);
//         });

//         socket.on("disconnect", () => {
//             console.log("Client disconnected");
//         });
//     });

//     return io;
// };

// export default initializeSocket;


// import { Server } from "socket.io";
// import userModel from "../models/user.model.js";
// import getResponse from "../service/ai.service.js";
// import { appendMessage, getMessages } from "../service/cache.service.js";

// const initializeSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: "http://localhost:5173",
//             methods: ["GET", "POST"],
//             credentials: true,
//         },
//     });

//     io.use(async (socket, next) => {
//         const cookie = socket.handshake.headers.cookie;

//         if (!cookie) {
//             console.log("❌ No cookie found in handshake");
//             return next(new Error("Authentication error"));
//         }

//         const cookieParts = cookie.split(";");
//         let token;

//         for (const part of cookieParts) {
//             if (!part) continue;

//             const trimmed = part.trim();
//             if (!trimmed.includes("=")) continue;

//             const [key, value] = trimmed.split("=");

//             if (key === "token") {
//                 token = value;
//                 break;
//             }
//         }

//         if (!token) {
//             console.log("❌ Token not found in cookies:", cookieParts);
//             return next(new Error("Authentication error"));
//         }

//         try {
//             const user = await userModel.authToken(token);
//             if (!user) {
//                 console.log("❌ Invalid token");
//                 return next(new Error("Authentication error"));
//             }

//             socket.user = user;
//             next();
//         } catch (error) {
//             console.log("❌ Error while authenticating:", error.message);
//             return next(new Error("Authentication error"));
//         }
//     });

//     io.on("connection", async (socket) => {
//         console.log(`✅ User connected: ${socket.user.email}`);

//         const messages = await getMessages(`conversation:${socket.user._id}`);
//         socket.emit("chat-history", messages);

//         socket.on("message", async (data) => {
//             const { message } = data;

//             appendMessage(`conversation:${socket.user._id}`, {
//                 role: "user",
//                 content: message,
//             });

//             const messages = await getMessages(`conversation:${socket.user._id}`);
//             const response = await getResponse(messages, socket.user);

//             appendMessage(`conversation:${socket.user._id}`, {
//                 role: "model",
//                 content: response,
//             });

//             console.log("📩 Response from AI:", response);
//             socket.emit("message", response);
//         });

//         socket.on("disconnect", () => {
//             console.log("🔌 Client disconnected");
//         });
//     });

//     return io;
// };


// export default initializeSocket;



// import { Server } from "socket.io";
// import userModel from "../models/user.model.js";
// import getResponse from "../service/ai.service.js";
// import { appendMessage, getMessages } from "../service/cache.service.js";

// const initializeSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: "http://localhost:5173",
//             methods: ["GET", "POST"],
//             credentials: true,
//         },
//     });

//     io.use(async (socket, next) => {
//         try {
//             const cookieHeader = socket.handshake.headers?.cookie;

//             if (!cookieHeader) {
//                 console.log("❌ No cookie found in handshake");
//                 return next(new Error("Authentication error"));
//             }

//             const cookieParts = cookieHeader.split(";");
//             let token;

//             for (const part of cookieParts) {
//                 const trimmed = part.trim();
//                 if (!trimmed.includes("=")) continue;

//                 const [key, value] = trimmed.split("=");

//                 if (key === "token") {
//                     token = value;
//                     break;
//                 }
//             }

//             if (!token) {
//                 console.log("❌ Token not found in cookies:", cookieParts);
//                 return next(new Error("Authentication error"));
//             }

//             const user = await userModel.authToken(token);
//             if (!user) {
//                 console.log("❌ Invalid token");
//                 return next(new Error("Authentication error"));
//             }

//             socket.user = user;
//             next();
//         } catch (error) {
//             console.log("❌ Error during socket auth:", error.message);
//             next(new Error("Internal server error"));
//         }
//     });

//     io.on("connection", async (socket) => {
//         console.log(`✅ User connected: ${socket.user?.email}`);

//         const key = `conversation:${socket.user._id}`;
//         const messages = await getMessages(key);
//         socket.emit("chat-history", messages);

//         socket.on("message", async ({ message }) => {
//             appendMessage(key, {
//                 role: "user",
//                 content: message,
//             });

//             const updatedMessages = await getMessages(key);
//             const response = await getResponse(updatedMessages, socket.user);

//             appendMessage(key, {
//                 role: "model",
//                 content: response,
//             });

//             console.log("📩 AI Response:", response);
//             socket.emit("message", response);
//         });

//         socket.on("disconnect", () => {
//             console.log("🔌 User disconnected");
//         });
//     });

//     return io;
// };

// export default initializeSocket;


import { Server } from "socket.io";
import userModel from "../models/user.model.js";
import getResponse from "../service/ai.service.js";
import { appendMessage, getMessages } from "../service/cache.service.js";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.use(async (socket, next) => {
        try {
            const cookieHeader = socket.handshake.headers?.cookie;

            if (!cookieHeader) {
                console.log("❌ No cookie found in handshake");
                return next(new Error("Authentication error"));
            }

            const cookieParts = cookieHeader.split(";");
            let token;

            for (const part of cookieParts) {
                const trimmed = part.trim();
                if (!trimmed.includes("=")) continue;

                const [key, value] = trimmed.split("=");

                if (key === "token") {
                    token = value;
                    break;
                }
            }

            if (!token) {
                console.log("❌ Token not found in cookies:", cookieParts);
                return next(new Error("Authentication error"));
            }

            const user = await userModel.authToken(token);
            if (!user) {
                console.log("❌ Invalid token");
                return next(new Error("Authentication error"));
            }

            socket.user = user;
            next();
        } catch (error) {
            console.log("❌ Error during socket auth:", error.message);
            next(new Error("Internal server error"));
        }
    });

    io.on("connection", async (socket) => {
        console.log(`✅ User connected: ${socket.user?.email}`);

        const key = `conversation:${socket.user._id}`;
        const messages = await getMessages(key);
        socket.emit("chat-history", messages);

        socket.on("message", async ({ message }) => {
            appendMessage(key, {
                role: "user",
                content: message,
            });

            const updatedMessages = await getMessages(key);
            const response = await getResponse(updatedMessages, socket.user);

            appendMessage(key, {
                role: "model",
                content: response,
            });

            console.log("📩 AI Response:", response);
            socket.emit("message", response);
        });

        socket.on("disconnect", () => {
            console.log("🔌 User disconnected");
        });
    });

    return io;
};

export default initializeSocket;



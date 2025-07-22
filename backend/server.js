// // // // import app from './src/app.js';


// // // // import config from "./src/config/config.js";
// // // // import connectDB from './src/db/db.js'; 



// // // // connectDB();

// // // // app.listen(config.port, () => {
// // // //     console.log(`Server is running on port ${config.port}`);
// // // // });
// // // import app from './src/App.js';
// // // import config from "./src/config/config.js";
// // // import connectDB from './src/db/db.js';
// // // import {Server} from "socket.io";
// // // import http from 'http';
// // // import userModel from './src/models/user.model.js';
// // // import cookieParser from 'cookie-parser';

// // // connectDB();
// // // const server = http.createServer(app);
// // // const io = new Server(server, {
// // //     cors: {
// // //         origin: "http://localhost:5173",
// // //         methods: ["GET", "POST"],
// // //         credentials: true
// // //     }
// // // });

// // // io.use((socket, next) => {
// // //     const cookie =socket.handshake.headers.cookie;
// // //     console.log("👉 Received cookie:", cookie); 
// // // const cookie = socket.handshake.headers.cookie;
// // // console.log("👉 Received cookie:", cookie); 

// // // if (!cookie.includes('token=')) {
// // //     return next(new Error('Authentication error'));
// // // }

// // // const token = cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];



// // //     if(!cookie) {
// // //         return next(new Error('Authentication error'));
// // //     }
// // //     // const token=cookie.split(';')[1].split('=')[1];
// // //     const token = cookie.split(';')[1].split('=')[1];
// // //     if (!token) {
// // //         return next(new Error('Authentication error'));
// // //     }
    

// // //     const user = userModel.authToken(token);
// // //     if (!user) {
// // //         return next(new Error('Authentication error'));
// // //     }
// // //     socket.user = user;
 
// // //     next();
// // // });
    
// // // io.on('connection', (socket) => {
// // //     console.log('A user connected:', socket.id);

// // //     socket.on('disconnect', () => {
// // //         console.log('User disconnected:', socket.id);
// // //     });
// // // }

// // // );

// // // server.listen(config.port, () => {
// // //     console.log(`Server is running on port ${config.port}`);
// // // });
// // // import app from './src/app.js';
// // // import config from "./src/config/config.js";
// // // import connectDB from './src/db/db.js'; 

// // // connectDB();

// // // app.listen(config.port, () => {
// // //     console.log(`Server is running on port ${config.port}`);
// // // });

// // import app from './src/App.js';
// // import config from "./src/config/config.js";
// // import connectDB from './src/db/db.js';
// // import { Server } from "socket.io";
// // import http from 'http';
// // import userModel from './src/models/user.model.js';
// // import cookieParser from 'cookie-parser';
// // import getResponse from './src/service/ai.service.js';

// // connectDB();
// // const server = http.createServer(app);
// // const io = new Server(server, {
// //     cors: {
// //         origin: "http://localhost:5173",
// //         methods: ["GET", "POST"],
// //         credentials: true
// //     }
// // });

// // io.use(async(socket, next) => {
// //     const cookie = socket.handshake.headers.cookie;
// //     console.log("👉 Received cookie:", cookie); 

// //     if (!cookie || !cookie.includes('token=')) {
// //         return next(new Error('Authentication error'));
// //     }

// //     // ✅ Safe way to extract token
// //     const token = cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];

// //     if (!token) {
// //         return next(new Error('Authentication error'));
// //     }

// //     const user = await userModel.authToken(token);
// //     if (!user) {
// //         return next(new Error('Authentication error'));
// //     }

// //     socket.user = user;
// //     next();
// // });

// // io.on('connection', (socket) => {
// //     console.log('A user connected:', socket.id);

// // socket.on("message",async (data) => {
// //     const {message} = data;

// //     const response = await getResponse(message);

// //     socket.emit("message", { 
// //         message: response,
// //         user: socket.user.name,
// // });


// //     socket.on('disconnect', () => {
// //         console.log('User disconnected:', socket.id);
// //     });
// // });

// // server.listen(config.port, () => {
// //     console.log(`Server is running on port ${config.port}`);
// // });
// import app from './src/App.js';
// import config from "./src/config/config.js";
// import connectDB from './src/db/db.js';
// import { Server } from "socket.io";
// import http from 'http';
// import userModel from './src/models/user.model.js';
// import cookieParser from 'cookie-parser';
// import getResponse from './src/service/ai.service.js';

// connectDB();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });

// io.use(async (socket, next) => {
//     const cookie = socket.handshake.headers.cookie;
//     console.log("👉 Received cookie:", cookie);

//     if (!cookie || !cookie.includes('token=')) {
//         return next(new Error('Authentication error'));
//     }

//     const token = cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];

//     if (!token) {
//         return next(new Error('Authentication error'));
//     }

//     const user = await userModel.authToken(token);
//     if (!user) {
//         return next(new Error('Authentication error'));
//     }

//     socket.user = user;
//     next();
// });

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     socket.on("message", async (data) => {
//         const { message } = data;

//         const response = await getResponse(message);

//         console.log("AI Response:", response);
//      socket.emit("message", {
//   sender: "ai",
//   message: response,
// });

            
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// server.listen(config.port, () => {
//     console.log(`Server is running on port ${config.port}`);
// });


import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";
import http from "http";
import initializeSocket from "./src/socketio/socket.js";

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the server
initializeSocket(server);

// Connect to the database
connectDB();

// Start the server
server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
// ✅ Correct way
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL, // Yeh hona chahiye
});

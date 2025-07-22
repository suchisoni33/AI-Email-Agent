// // import { Redis } from 'ioredis';



// // const redis = new Redis({
// //     host: '127.0.0.1',   // ya 'localhost'
// //   port: 6379,
// // })



// // redis.on('connect', () => {
// //     console.log('Redis connected');
// // });

// // redis.on("ready", () => {
// //     console.log("Redis is ready");
// // });

// // redis.on('error', (err) => {
// //     console.error('Redis error:', err);
// // });


// // export const appendMessage = async (key, messageData) => {
// //     await redis.rpush(key, JSON.stringify(messageData))
// // }

// // export const getMessages = async (key) => {
// //     const messages = await redis.lrange(key, 0, -1);
// //     return messages.map((message) => {
// //         const tempMessage = JSON.parse(message)
// //         return {
// //             role: tempMessage.role,
// //             parts: [ {
// //                 text: tempMessage.content,
// //             } ]
// //         }
// //     });
// // }

// // export default redis;


// import { Redis } from 'ioredis';

// const redis = new Redis({
//     host: '127.0.0.1',  // Or 'localhost'
//     port: 6379,
//     retryStrategy(times) {
//         const delay = Math.min(times * 50, 2000);
//         return delay;
//     }
// });

// redis.on('connect', () => {
//     console.log('✅ Redis connected');
// });

// redis.on('ready', () => {
//     console.log('🚀 Redis is ready to use');
// });

// redis.on('error', (err) => {
//     console.error('❌ Redis error:', err.message);
// });

// redis.on('close', () => {
//     console.warn('⚠️ Redis connection closed');
// });

// redis.on('reconnecting', () => {
//     console.log('🔁 Redis reconnecting...');
// });

// /**
//  * Append a message object to a Redis list.
//  * @param {string} key - Redis key.
//  * @param {Object} messageData - Message with { role, content }.
//  */
// export const appendMessage = async (key, messageData) => {
//     try {
//         await redis.rpush(key, JSON.stringify(messageData));
//     } catch (err) {
//         console.error("❌ Error appending message:", err.message);
//     }
// };

// /**
//  * Get and format messages from Redis for the AI API.
//  * @param {string} key - Redis key.
//  * @returns {Array} - Array of messages formatted for AI.
//  */
// export const getMessages = async (key) => {
//     try {
//         const messages = await redis.lrange(key, 0, -1);
//         return messages.map((message) => {
//             const tempMessage = JSON.parse(message);
//             return {
//                 role: tempMessage.role,
//                 parts: [
//                     {
//                         text: tempMessage.content,
//                     },
//                 ],
//             };
//         });
//     } catch (err) {
//         console.error("❌ Error fetching messages:", err.message);
//         return [];
//     }
// };

// export default redis;
// import { Redis } from 'ioredis';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
//   tls: {}, // Required for Redis Cloud (it uses SSL)
//   retryStrategy(times) {
//     const delay = Math.min(times * 50, 2000);
//     return delay;
//   }
// });

// redis.on('connect', () => {
//   console.log('✅ Redis connected');
// });

// redis.on('ready', () => {
//   console.log('🚀 Redis is ready to use');
// });

// redis.on('error', (err) => {
//   console.error('❌ Redis error:', err.message);
// });

// redis.on('close', () => {
//   console.warn('⚠️ Redis connection closed');
// });

// redis.on('reconnecting', () => {
//   console.log('🔁 Redis reconnecting...');
// });

// export const appendMessage = async (key, messageData) => {
//   try {
//     await redis.rpush(key, JSON.stringify(messageData));
//   } catch (err) {
//     console.error("❌ Error appending message:", err.message);
//   }
// };

// export const getMessages = async (key) => {
//   try {
//     const messages = await redis.lrange(key, 0, -1);
//     return messages.map((message) => {
//       const tempMessage = JSON.parse(message);
//       return {
//         role: tempMessage.role,
//         parts: [
//           {
//             text: tempMessage.content,
//           },
//         ],
//       };
//     });
//   } catch (err) {
//     console.error("❌ Error fetching messages:", err.message);
//     return [];
//   }
// };

// export default redis;


import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('ready', () => {
  console.log('🚀 Redis is ready to use');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err.message);
});

redis.on('close', () => {
  console.warn('⚠️ Redis connection closed');
});

redis.on('reconnecting', () => {
  console.log('🔁 Redis reconnecting...');
});
console.log("REDIS_URL:", process.env.REDIS_URL);


export const appendMessage = async (key, messageData) => {
  try {
    await redis.rpush(key, JSON.stringify(messageData));
  } catch (err) {
    console.error("❌ Error appending message:", err.message);
  }
};

export const getMessages = async (key) => {
  try {
    const messages = await redis.lrange(key, 0, -1);
    return messages.map((message) => {
      const tempMessage = JSON.parse(message);
      return {
        role: tempMessage.role,
        parts: [
          {
            text: tempMessage.content,
          },
        ],
      };
    });
  } catch (err) {
    console.error("❌ Error fetching messages:", err.message);
    return [];
  }
};

export default redis;

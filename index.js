// ESM
import Fastify from "fastify";
import websocketPlugin from "@fastify/websocket";

const fastify = Fastify({
  logger: true,
});
await fastify.register(websocketPlugin, {
  options: { maxPayload: 1048576 },
});

//   fastify.addHook('preValidation', async (request, reply) => {
//     // check if the request is authenticated
//     if (!request.isAuthenticated()) {
//       await reply.code(401).send("not authenticated");
//     }
//   })

fastify.get("/websocket", { websocket: true }, async (connection, request) => {
  //   const sessionPromise = request.getSession();
  connection.socket.on("message", async (message) => {
    const rec = message.toJSON();
    // const session = await sessionPromise();
    // message.toString() === 'hi from client'
    console.log("getting message", message);
    connection.socket.send("hi from server");
  });
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "192.168.1.7" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

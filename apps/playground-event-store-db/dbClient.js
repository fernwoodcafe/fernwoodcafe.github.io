const {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} = require("@eventstore/db-client");

const client = new EventStoreDBClient(
    { endpoint: "localhost:2113" }, 
    { insecure: true }
);

const streamName = "es_supported_clients";

const post = () => { 
  console.log('post');
  const event = jsonEvent({
    type: "grpc-client",
    data: {
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
    },
  });

  return client.appendToStream(streamName, [event]);
}

const get = async () => { 
  console.log('get');
  await post();

  const events = client.readStream(streamName, {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 10,
  });

  const eventBuffer = [];
  for await (const event of events) {
    eventBuffer.push(event);
  }

  return eventBuffer;
}

module.exports = { post, get };

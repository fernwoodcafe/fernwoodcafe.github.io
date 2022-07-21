
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

const doSomethingProductive = (event) => {
    console.log(event);
}

async function simpleTest() {
  const streamName = "es_supported_clients";

  const event = jsonEvent({
    type: "grpc-client",
    data: {
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
    },
  });

  const appendResult = await client.appendToStream(streamName, [event]);

  const events = client.readStream(streamName, {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 10,
  });

  for await (const event of events) {
     doSomethingProductive(event);
  }
}

simpleTest();

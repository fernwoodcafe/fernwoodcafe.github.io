import type {
  DomainEvent,
  DomainEventsRepository
} from "@packages/cqrs-es-types";
import {
  $create,
  $deleteDB,
  $migrateDB,
  $onChange,
  $readMany
} from "@packages/data/indexedDB/client";
import statusPublisher from '../excelDB/services/statusPublisher';
import migrations from "./migrations";

const resetPrototype = false;
if (resetPrototype) {
  $deleteDB("restaurantDB");
}

const db = await $migrateDB("restaurantDB", migrations);

$onChange(
  db,
  "domainEvents",
  () => statusPublisher.publishArrivedEvent()
);

export default (): Promise<DomainEventsRepository> =>
  Promise.resolve({
    async insert(event: DomainEvent): Promise<DomainEvent> {
      await $create(db, "domainEvents", [event]);
      return event;
    },
    select: (): Promise<DomainEvent[]> =>
      $readMany(db, "domainEvents").then((events: DomainEvent[]) =>
        events.sort((a, b) => a.eventIndex - b.eventIndex)
      ),
    addListener: (name, handler) => {
      // not supported
      return handler;
    },
  });

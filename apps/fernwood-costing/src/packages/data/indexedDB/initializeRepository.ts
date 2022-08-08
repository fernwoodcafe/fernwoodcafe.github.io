import type {
  DomainEvent,
  DomainEventsRepository,
} from "@packages/cqrs-es-types";
import {
  $create,
  $deleteDB,
  $migrateDB,
  $readMany,
} from "@packages/data/indexedDB/client";
import migrations from "./migrations";

const resetPrototype = false;
if (resetPrototype) {
  $deleteDB("restaurantDB");
}

const db = await $migrateDB("restaurantDB", migrations);

export default (): DomainEventsRepository => ({
  async insert(event: DomainEvent): Promise<DomainEvent> {
    await $create(db, "domainEvents", [event]);
    return event;
  },
  select: (): Promise<DomainEvent[]> =>
    $readMany(db, "domainEvents").then((events: DomainEvent[]) =>
      events.sort((a, b) => a.eventIndex - b.eventIndex)
    ),
});

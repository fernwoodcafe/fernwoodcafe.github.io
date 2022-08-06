import {
  $create,
  $deleteDB,
  $migrateDB,
  $readMany,
} from "@/data/indexedDB/client";
import type { DomainEvent, DomainEventsRepository } from "@/domain/types";
import migrations from "./migrations";

const resetPrototype = false;
if (resetPrototype) {
  $deleteDB("restaurantDB");
}

const db = await $migrateDB("restaurantDB", migrations);

export default (): DomainEventsRepository => ({
  async insert(event: DomainEvent): Promise<DomainEvent> {
    await $create(db, "domainEvents", [event]);
    console.log("insert", event);
    return event;
  },
  select: (): Promise<DomainEvent[]> =>
    $readMany(db, "domainEvents").then((events: DomainEvent[]) =>
      events.sort((a, b) => a.eventIndex - b.eventIndex)
    ),
});

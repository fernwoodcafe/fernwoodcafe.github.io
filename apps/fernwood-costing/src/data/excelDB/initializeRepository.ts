import type { DomainEvent, DomainEventsRepository } from "@/types/CafeDomain";
import { $readMany } from "./graphClient";

export default (): DomainEventsRepository => ({
  insert: (event: DomainEvent): Promise<DomainEvent> => {
    throw new Error("Not implemented");
  },
  select: (): Promise<DomainEvent[]> =>
    $readMany().then((events: DomainEvent[]) =>
      events.sort((a, b) => a.eventIndex - b.eventIndex)
    ),
});

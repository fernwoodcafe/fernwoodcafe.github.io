import type { DomainEvent, DomainEventsRepository } from "@/types/CafeDomain";

export default (): DomainEventsRepository => ({
  insert: (event): Promise<DomainEvent> => {
    throw new Error("Not implemented");
  },
  select: (): Promise<DomainEvent[]> => {
    throw new Error("Not implemented");
  },
});

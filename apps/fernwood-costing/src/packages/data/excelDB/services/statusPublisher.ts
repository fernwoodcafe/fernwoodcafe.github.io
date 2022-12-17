import {
  emits,
  type Emits
} from "@packages/cqrs-es-types/DomainEventsRepository";
import type { StatusPublisher } from "./intervalRunner";

export default ((): StatusPublisher => {
  const eventListeners = new Map<Emits, EventListener[]>(
    emits.map((name) => [name, []])
  );

  return {
    addListener: (name: Emits, listener: EventListener) => {
      eventListeners.get(name).push(listener);
      return listener;
    },
    publishSavedEvent: () =>
      eventListeners
        .get("onClientDomainEventSaved")
        .forEach((handler) => handler(new Event("saved"))),
    publishQueuedEvent: () =>
      eventListeners
        .get("onClientDomainEventQueued")
        .forEach((handler) => handler(new Event("queued"))),
  };
})();

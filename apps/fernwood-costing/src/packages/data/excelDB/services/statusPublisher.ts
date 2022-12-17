import {
  emits,
  type RepositoryEmits
} from "@packages/cqrs-es-types/DomainEventsRepository";
import type { StatusPublisher } from "./intervalRunner";

export default ((): StatusPublisher => {
  const eventListeners = new Map<RepositoryEmits, EventListener[]>(
    emits.map((name) => [name, []])
  );

  return {
    addListener: (name: RepositoryEmits, listener: EventListener) => {
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
    publishArrivedEvent: () =>
      eventListeners
        .get('onServerDomainEventArrived')
        .forEach((handler) => handler(new Event("arrived")))
  };
})();

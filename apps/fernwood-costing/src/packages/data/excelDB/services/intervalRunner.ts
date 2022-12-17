// TODO [must-have] Warn the user before navigating away if we have unsaved changes.

type Routine<T> = (args: T[]) => Promise<void>;

export type StatusPublisher = {
  addListener: (
    name: "onClientDomainEventSaved" | "onClientDomainEventQueued",
    listener: EventListener
  ) => EventListener;
  publishSavedEvent: () => void;
  publishQueuedEvent: () => void;
};

export default <T>(
  routine: Routine<T>,
  intervalMs: number,
  publisher: StatusPublisher
) => {
  let queue: T[] = [];

  const runRoutine = async () => {
    if (queue.length === 0) {
      return;
    }

    await routine(queue);

    queue = [];

    publisher.publishSavedEvent();
  };

  window.setInterval(runRoutine, intervalMs);

  return {
    enqueue: (item: T) => {
      publisher.publishQueuedEvent();
      queue.push(item);
    },
  };
};

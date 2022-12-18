// TODO [must-have] Warn the user before navigating away if we have unsaved changes.

import type { RepositoryEmits } from '@packages/cqrs-es-types/DomainEventsRepository';

type Routine<T> = (args: T[]) => Promise<void>;

export type StatusPublisher = {
  addListener: (
    name: RepositoryEmits,
    listener: EventListener
  ) => EventListener;
  publishSavedEvent: () => void;
  publishQueuedEvent: () => void;
  publishArrivedEvent: () => void;
};

// Perform `routine` every `intervalMs` on any item received via `enqeue`.
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

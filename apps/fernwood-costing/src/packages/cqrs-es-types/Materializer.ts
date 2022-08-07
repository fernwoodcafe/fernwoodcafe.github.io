import type { DomainEvent } from "@packages/cqrs-es-types";

export type Materializer<T> = (x: T, ...events: DomainEvent[]) => T;

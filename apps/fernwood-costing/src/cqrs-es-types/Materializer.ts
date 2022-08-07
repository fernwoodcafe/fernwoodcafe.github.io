import type { DomainEvent } from "@/cqrs-es-types";

export type Materializer<T> = (x: T, ...events: DomainEvent[]) => T;

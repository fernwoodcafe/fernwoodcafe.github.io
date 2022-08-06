import type { DomainEvent } from "@/domain";

export type Materializer<T> = (x: T, ...events: DomainEvent[]) => T;

import type { DomainEvent } from "@/types/CafeDomain";

export type Materializer<T> = (x: T, ...events: DomainEvent[]) => T;

import type { DomainEvent } from "@/domain/types";

export type Materializer<T> = (x: T, ...events: DomainEvent[]) => T;

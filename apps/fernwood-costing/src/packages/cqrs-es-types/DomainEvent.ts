export type DomainEvent<TName = string, TPayload = unknown> = {
  eventIndex?: number; // autoincremented
  type: TName;
  payload: TPayload;
  meta?: Record<string, unknown>;
};

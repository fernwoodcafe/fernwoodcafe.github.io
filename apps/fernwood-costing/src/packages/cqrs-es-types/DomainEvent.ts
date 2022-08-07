export type DomainEvent<TName = string, TPayload = object> = {
  eventIndex?: number; // autoincremented
  type: TName;
  payload: TPayload;
  meta?: Record<string, unknown>;
};

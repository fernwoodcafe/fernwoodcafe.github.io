export type DomainCommand<TName = string, TPayload = object> = {
  type: TName;
  payload: TPayload;
  meta?: Record<string, unknown>;
};

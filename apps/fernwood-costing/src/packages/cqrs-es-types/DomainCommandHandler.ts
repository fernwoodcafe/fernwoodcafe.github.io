import type { DomainCommand } from "./DomainCommand";

export type DomainCommandHandler = (command: DomainCommand) => Promise<void>;

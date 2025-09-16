// simple unique id generator (no external deps)
export const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

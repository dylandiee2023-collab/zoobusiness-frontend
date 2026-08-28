export class MenuError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "MenuError";
  }
}

export class MenuItemNotFoundError extends MenuError {
  constructor(id: string) {
    super(`Menu item "${id}" was not found.`);
  }
}

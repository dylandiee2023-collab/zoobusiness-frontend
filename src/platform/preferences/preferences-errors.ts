export class PreferencesError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "PreferencesError";
  }
}

export class PreferenceNotFoundError extends PreferencesError {
  constructor(key: string) {
    super(
      `Preference "${key}" was not found.`,
    );
  }
}
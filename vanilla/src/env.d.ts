//  <reference types="vite/client" />

interface ImportMetaEnv {

  /** * An encrypted string used when calling certain APIs that don't need to access private user data.*/
  readonly VITE_APP_KEY: string;

  /** * Auth domain for the project ID.*/
  readonly VITE_AUTH_DOMAIN: string;

  /** * EThe unique identifier for the project across all of Firebase and Google Cloud.*/
  readonly VITE_PROJECT_ID: string;

  /** * The default Cloud Storage bucket name.*/
  readonly VITE_STORAGE_BUCKET: string;

  /** * EUnique numerical value used to identify each sender that can send.*/
  readonly VITE_MESSAGING_SENDER_ID: string;

  /** * Unique identifier for the app.*/
  readonly VITE_APP_ID: string;

  /** * An ID automatically created when you enable Analytics in your Firebase project and register a web app.*/
  readonly VITE_MEASUREMENT_ID: string;

}

interface ImportMeta {

  /**
   * The type of import.meta.
   */
  readonly env: ImportMetaEnv;

}

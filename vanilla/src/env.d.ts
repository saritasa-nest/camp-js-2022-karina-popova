//  <reference types="vite/client" />

interface ImportMetaEnv {

  /**
   * Env variables types.
   */
  readonly VITE_APP_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_MEASUREMENT_ID: string;

}

interface ImportMeta {

  /**
   * The type of import.meta.
   */
  readonly env: ImportMetaEnv;

}

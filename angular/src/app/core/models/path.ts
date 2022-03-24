/** Path to a field with nested fields in the document data. */
export enum Path {
  Fields = 'fields.',
  None = '',
}

/** Path to the collection. */
export type CollectionPath = 'films' | 'planets' | 'people';

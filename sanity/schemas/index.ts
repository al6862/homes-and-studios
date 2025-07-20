import { type SchemaTypeDefinition } from "sanity";

/* Document Imports */
import { footer, header, homepage, page, siteSettings } from "./documents";

/* Object imports */
import { seo } from "./objects/seo";

const documents = [header, homepage, footer, page, siteSettings];

const objects = [
  seo,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects],
};

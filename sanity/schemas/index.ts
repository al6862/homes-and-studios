import { type SchemaTypeDefinition } from "sanity";

/* Document Imports */
import { architecture, footer, header, homepage, page, siteSettings } from "./documents";

/* Object imports */
import { callToAction, imageGroup, imageObject, seo, simpleImageObject, simplePortableText } from "./objects";

const documents = [
  architecture, 
  header, 
  homepage, 
  footer, 
  page, 
  siteSettings
];

const objects = [
  callToAction,
  imageGroup,
  imageObject,
  seo,
  simpleImageObject,
  simplePortableText,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects],
};

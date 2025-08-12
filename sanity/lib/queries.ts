import { defineQuery } from "next-sanity";

const seoData = `
    ...,
    'openGraphImage': openGraphImage.asset->url,
`;

const imageData = `
    caption,
    'assetId': asset->_id,
    'assetPath': asset->path,
    'aspectRatio': asset->metadata.dimensions.aspectRatio,
`;

const linkData = `
    ...,
    internalLink->{_type,slug,title}
`;

export const siteSettingsQuery = defineQuery(`
    *[_type == 'siteSettings'][0] {
        SEO {${seoData}},
    }
`);

export const headerQuery = defineQuery(`
    *[_type == 'header'][0] {
        navList[] {${linkData}},
    }
`);
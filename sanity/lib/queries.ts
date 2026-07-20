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

const imageGroupData = `
    ...,
    image1 {
        'assetId': asset->_id,
        'assetPath': asset->path,
        'aspectRatio': asset->metadata.dimensions.aspectRatio,
    },
    image2 {
        'assetId': asset->_id,
        'assetPath': asset->path,
        'aspectRatio': asset->metadata.dimensions.aspectRatio,
    }
`;


const imageObjectData = `
    ...,
    image {
        'assetId': asset->_id,
        'assetPath': asset->path,
        'aspectRatio': asset->metadata.dimensions.aspectRatio,
    }
`;

const contentData = `
    ...,
    markDefs[]{
        ...,
        _type == "link" => {${linkData}}
    },
    _type == "imageGroup" => {${imageGroupData}},
    _type == "imageObject" => {${imageObjectData}}
`

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

export const footerQuery = defineQuery(`
    *[_type == 'footer'][0] {
        navList[] {${linkData}},
    }
`);

export const allArchitectureQuery = defineQuery(`
    *[_type == 'architecture'] | order(title asc) {
        title,
        "slug": slug.current,
        location,
    }
`);

export const architectureQuery = defineQuery(`
    *[_type == 'architecture' && slug.current == $slug][0] {
        "slug": slug.current,
        visitLink,
        author,
        location,
        address,
        descriptionProt,
        gallery[] {${imageData}},
        descriptionProt2,
        section2[] {${contentData}},
        imageCourtesy,
        footerButton,
        metaTitle,
        metaDesc,
    }
`);

export const pageQuery = defineQuery(`
    *[_type == 'page' && slug.current == $slug][0] {
        "slug": slug.current,
        desktopImage {${imageObjectData}},
        mobileImage {${imageObjectData}},
        content[] {${contentData}},
    }
`);

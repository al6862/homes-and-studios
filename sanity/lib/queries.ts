import { defineQuery } from "next-sanity";

const seoData = `{
    ...,
    'openGraphImage': openGraphImage.asset->url,
}`;

const imageData = `{
    caption,
    'assetId': asset->_id,
    'assetPath': asset->path,
    'aspectRatio': asset->metadata.dimensions.aspectRatio,
}`;

const linkTypeData = `
  _type == "link" => {
    ...,
    internalLink->{_type,slug,title}
  }
`;

const centeredTextData = `{
    _id,
    _type,
    marginY,
    'bgColor': bgColor.hex,
    'textColor': textColor.hex,
    image ${imageData},
    content[] {
      ...,
      ${linkTypeData},
    },
}`;

const photoGalleryData = defineQuery(`{
    _id,
    _type,
    'bgColor': bgColor.hex,
    photos[] ${imageData}
}`);

const classesSlideshowData = `{
    _id,
    classes[] {
    ...,
    image ${imageData},
    'bgColor': bgColor.hex,
    'video': video.asset->url,
    },
    link {
        ...,
        ${linkTypeData},
    }
}`;

const igGalleryData = defineQuery(`{
    _id,
    'bgColor': bgColor.hex,
    igEmbeds[]
}`);

const imageTextData = `{
    _id,
    ...,
    image ${imageData},
    'bgColor': bgColor.hex,
    content[] {
      ...,
      ${linkTypeData},
    },
}`;

const heroData = `{
    _id,
    title,
    header,
    content,
    featuredImages[] ${imageData},
    secondaryImages[] ${imageData},
}`;

const splitImageAndTextData = `{
    _id,
    layout,
    'bgColor': bgColor.hex,    
    'textColor': textColor.hex,
    image ${imageData},
    header,
    content[] {
      ...,
      ${linkTypeData},
    },
}`;

const videoData = `{
    _id,
    'video': video.asset->url,
    hasBorder,
    'borderColor': borderColor.hex,
}`;

const danceClassData = `{
    _id,
    _type,
    classType {
        ...,
        ${linkTypeData},
    },
    instructor {
        ...,
        ${linkTypeData},
    },
    mode,
    dayOfWeek,
    startTime,
}`;

const danceStudioData = `{
    _id,
    header {
        studioTitle,
        studioSubTitle,
    },
    studioAddress,
    location,
    slug,
    studioDescription[] {
        ...,
        ${linkTypeData},
    },
    'bgColor': bgColor.hex,    
    image ${imageData},
    danceClasses[] ${danceClassData},
    partnerSite {
        ...,
        ${linkTypeData},
    },
    partnerLink {
        ...,
        ${linkTypeData},
    }
}`;

const partnersData = `{
    _id,
    _type,
    title,
    header,
    'bgColor': bgColor.hex,    
    image ${imageData},
    'studios': *[_type == 'danceStudio'] ${danceStudioData},
    link {
        ...,
        ${linkTypeData},
    }
}`;

const teacherData = `{
    ...,
    name,
    slug,
    pronouns,
    image ${imageData},
    blurb,
    studio {
        ...,
        ${linkTypeData},
    },
    ${linkTypeData}    
}`;

const teachersData = `{
    _id,
    _type,
    title,
    header,
    'bgColor': bgColor.hex,    
    image ${imageData},
    'teachers': *[_type == 'teacher'] | order(name asc) ${teacherData},
}`;

const communityEventData = `{
    _id,
    _type,
    title,
    slug,
    location,
    address,
    startDate,
    endDate,
    image ${imageData},
    content[] {
        ...,
        ${linkTypeData},
    },
}`;

const communityData = `{
    _id,
    _type,
    title,
    header,
    ctaLink {
        ...,
        ${linkTypeData},
    },
    image ${imageData},
    'events': *[_type == 'communityEvent'] ${communityEventData}
}`;

const timelineData = `{
    _id,
    header,
    events[] {
        title,
        description[] {
            ...,
            ${linkTypeData},
        },
        content[] {
            ...,
            ${linkTypeData},
        },
        coverImage ${imageData},
        secondaryImage ${imageData},
    },
    ${linkTypeData},
}`;

const contentData = `{
    ...,
    _type == 'centeredText' => ${centeredTextData},
    _type == 'classesSlideshow' => ${classesSlideshowData},
    _type == 'community' => ${communityData},
    _type == 'igGallery' => ${igGalleryData},
    _type == 'imageText' => ${imageTextData},
    _type == 'hero' => ${heroData},
    _type == 'partners' => ${partnersData},
    _type == 'photoGallery' => ${photoGalleryData},
    _type == 'splitImageAndText' => ${splitImageAndTextData},
    _type == 'teachers' => ${teachersData},
    _type == 'timeline' => ${timelineData},
    _type == 'video' => ${videoData},
}`;

export const classesSlideshowQuery = defineQuery(`{
    'classesSlideshow': *[_type == 'classesSlideshow'][0] ${classesSlideshowData},
    
}`);

export const partnersQuery = defineQuery(`{
    'partners': *[_type == 'partners'][0] ${partnersData},
    
}`);

export const teachersQuery = defineQuery(`{
    'teachers': *[_type == 'teachers'][0] ${teachersData},
}`);

export const communityQuery = defineQuery(`{
    'community': *[_type == 'community'][0] ${communityData},
}`);

export const siteSettingsQuery = defineQuery(`
    *[_type == 'siteSettings'][0] {
        SEO ${seoData},
    }
`);

export const headerQuery = defineQuery(`{
    'header': *[_type == 'header'][0] {
        navList[] {
            ...,
            ${linkTypeData},
        },
        mobileNavLists[] {
            links [] {
                ...,
                ${linkTypeData},
            },
        },   
    }
}`);

export const footerQuery = defineQuery(`{
    'footer': *[_type == 'footer'][0] {
        linkLists[] {
            links [] {
                ...,
                ${linkTypeData},
            },
        },   
        newsletterContent[] {
            ...,
            ${linkTypeData},
        },
        footerContent[] {
            ...,
            ${linkTypeData},
        },
    }
}`);

export const homepageQuery = defineQuery(`{
    'homepage': *[_type == 'homepage'][0] {
        ...,
        content[]->${contentData},
    }
}`);

export const pageQuery = defineQuery(`{
    'page': *[_type == 'page' && $slug == slug.current][0] {
        ...,
        title,
        content[]->${contentData},
    }
}`);

export const siteUrlsQuery = defineQuery(`{
  "homepage": *[_type == "homepage"][0] {
    "lastModified": _updatedAt,
    "url": $baseUrl + '',
    "priority": 1,
  },
  "pages": *[_type == "page"] {
    "lastModified": _updatedAt,
    "url": $baseUrl + "/" + slug.current
  },
}`);

import { resolveHref } from '@/sanity/lib/utils';
import { default as NextLink } from 'next/link';
import { Link as SanityLink, type LinkProps } from 'sanity-plugin-link-field/component';

export function Link(props: LinkProps) {
  return (
    <>
      <SanityLink
        as={NextLink}
        hrefResolver={({internalLink}) => resolveHref(
          internalLink?._type, internalLink?.slug?.current
          || internalLink?.slug
        ) || ''}
        {...props}
      />
    </>
  )
}
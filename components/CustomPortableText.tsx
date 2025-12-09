import sanityLoader from '@/sanity/lib/sanityImageLoader';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity';
import Image from 'next/image';
import { Link } from './Link';

export function CustomPortableText({ className, value }: { className?: string, value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => {
        return <h2 className={'h1 mt-8 md:mt-5'}>{children}</h2>
      },
      h2: ({ children }) => {
        return <h3 className={'h2 mt-8 md:mt-5'}>{children}</h3>
      },
      h3: ({ children }) => {
        return <h4 className={'h3 mt-8 md:mt-5'}>{children}</h4>
      },
      h4: ({ children }) => {
        return <h5 className={'h4 mt-8 md:mt-5'}>{children}</h5>
      },
      h5: ({ children }) => {
        return <h6 className={'h5 mt-8 md:mt-5'}>{children}</h6>
      },
      h6: ({ children }) => {
        return <h6 className={'h6 mt-8 md:mt-5'}>{children}</h6>
      },
      normal: ({ children }) => {
        return <p className="mt-8 md:mt-5">{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <Link className='hover:underline link' link={value}>{children}</Link>
        )
      },
    },
    types: {
      imageGroup: ({ value }) => {
        const { image1, image2, alt1, alt2 } = value;
        return (
          <div>
            {image1.assetPath && <Image 
              loader={sanityLoader}
              src={image1.assetPath}
              alt={alt1 || ""}
              width={1440}
              height={1440}
              className="mt-8 md:mt-[3.475rem]"
            />}
            {image2.assetPath && <Image 
              loader={sanityLoader}
              src={image2.assetPath}
              alt={alt2 || ""}
              width={1440}
              height={1440}
              className="mt-8 md:mt-[3.475rem]"
            />}
          </div>
        )
      },
      imageObject: ({ value }) => {
        const { image, alt } = value;
        return (
          <Image 
            loader={sanityLoader}
            src={image.assetPath}
            alt={alt || ""}
            width={1440}
            height={1440}
            className="mt-8 md:mt-[3.475rem]"
          />
        )
      }
    }
  }

  return <div className={className}><PortableText components={components} value={value} /></div>
}

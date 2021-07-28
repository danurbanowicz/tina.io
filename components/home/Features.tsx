import React from 'react'
import {
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { ActionFields, Actions } from './Actions'
import { Container } from './Container'
import { HeroFeature } from './Hero'
import { IconRight } from './Icons'
import BlobOne from '../../public/svg/blob-1.svg'
import BlobTwo from '../../public/svg/blob-2.svg'
import BlobThree from '../../public/svg/blob-3.svg'
import BlobFour from '../../public/svg/blob-4.svg'
import BlobFive from '../../public/svg/blob-5.svg'
import BlobSix from '../../public/svg/blob-6.svg'

const blobSvgOptions = [
  BlobOne,
  BlobTwo,
  BlobThree,
  BlobFour,
  BlobFive,
  BlobSix,
]

export const feature_template: BlockTemplate = {
  label: 'Feature',
  defaultItem: {
    headline: 'New Feature',
    subline:
      'Pick from your custom predefined components to build web experiences, blazing fast',
    media: { src: '/img/io-placeholder.jpg' },
  },
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      component: 'text',
    },
    {
      label: 'Subline',
      name: 'subline',
      component: 'text',
    },
    ...ActionFields,
    {
      label: 'Media',
      name: 'media',
      component: 'group',
      fields: [
        {
          label: 'Media Source',
          name: 'src',
          component: 'text',
        },
      ],
    },
  ],
  itemProps: (item: any) => ({
    label: item.headline,
  }),
}

export function FeatureBlock({ data, index }) {
  const isReversed = index % 2 === 1
  const FeatureBlobSvg = blobSvgOptions[index % blobSvgOptions.length]

  return (
    <>
      <BlocksControls index={index}>
        <div className={`feature ${isReversed ? 'featureReverse' : ''}`}>
          <div className="featureText">
            <h3 className="featureTitle">
              <InlineTextarea name="headline" />
            </h3>
            <hr className="dottedBorder" />
            <p className="textLarge">
              <InlineTextarea name="subline" />
            </p>
            {data.actions && <Actions items={data.actions} />}
            <div className="blob">
              <FeatureBlobSvg />
            </div>
          </div>
          <div className={`featureImage`}>
            <img src={data.media.src} alt="" />
          </div>
        </div>
      </BlocksControls>
      <style jsx>{`
        .feature {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: var(--spacer-size);
          align-items: center;
          z-index: 2;

          :not(:last-child) {
            margin-bottom: 9rem;
          }

          @media (min-width: 900px) {
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--spacer-size);
          }
        }

        .featureTitle {
          font-family: var(--font-tuner);
          font-weight: bold;
          line-height: 1.4;
          margin-bottom: 1rem;
          font-size: 2.25rem;
          color: #00255b;
        }

        .featureReverse {
          direction: rtl;
          > * {
            direction: ltr;
          }
        }

        .featureText {
          position: relative;
          max-width: 28rem;
          justify-self: center;
          margin-top: 1rem;

          :global(p) {
            max-width: 400px;
          }
        }

        .featureImage {
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          margin: 0;
          overflow: hidden;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);

          :global(img) {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
          }
        }

        .dottedBorder {
          border-top: none;
          border-right: none;
          border-left: none;
          border-image: initial;
          border-bottom: 5px dotted var(--color-seafoam-dark);
          width: 6rem;
          max-width: 100%;
          display: block;
          height: 0px;
          margin: 1.5rem 0px;
        }

        .blob {
          position: absolute;
          top: -3rem;
          left: -10%;
          right: 33.3%;
          bottom: -3rem;
          z-index: -1;

          :global(svg) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </>
  )
}

export const features_template: BlockTemplate = {
  label: 'Features',
  defaultItem: {
    headline: 'Explore the *Tina ecosystem*',
    subline:
      'More than just a headless CMS, Tina has all the tools for building web experiences for interdisciplinary teams.',
    color: 'white',
    items: [
      {
        _template: 'feature',
        headline: 'Data Source Plugins',
        subline:
          'Data Source plugins allow you to extend Tina to connect to different databases and 3rd Party APIs',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Screen UI Plugins',
        subline:
          'Data Source plugins allow you to extend Tina to connect to different databases and 3rd Party AP',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Custom Fields',
        subline:
          'Extend primary fields with custom field plugins to completely control the editing experience and functionality.',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
    ],
  },
  fields: [
    {
      label: 'Items',
      name: 'items',
      component: 'blocks',
      //@ts-ignore
      templates: {
        feature: feature_template,
      },
    },
  ],
}

export function FeaturesBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className={'section white featureSection'}>
        <Container>
          <InlineBlocks name="items" blocks={FEATURE_BLOCKS} />
        </Container>
      </section>
    </BlocksControls>
  )
}

const FEATURE_BLOCKS = {
  feature: {
    Component: FeatureBlock,
    template: feature_template,
  },
}

require('dotenv').config({ path: `.env` });
const flattenMenu = require('@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/flattenMenu');

module.exports = {
  plugins: [
            `gatsby-plugin-catch-links`,
            `gatsby-plugin-react-helmet`,
            `gatsby-plugin-force-trailing-slashes`,
            `gatsby-plugin-offline`,
            {
                resolve: `gatsby-plugin-postcss`,
                options: {
                    postCssPlugins: [
                        require(`postcss-easy-import`)(),
                        require(`postcss-custom-properties`)({
                            preserve: false,
                        }),
                        require(`postcss-color-function`)(),
                        require(`autoprefixer`)(),
                        require(`cssnano`)(),
                    ],
                },
            },
            `gatsby-plugin-styled-components`,
            {
                resolve: `gatsby-theme-ghost-dark-mode`,
                options: {
                    // Set to true if you want your theme to default to dark mode (default: false)
                    // Note that this setting has an effect only, if
                    //    1. The user has not changed the dark mode
                    //    2. Dark mode is not reported from OS
                    defaultModeDark: false,
                    // If you want the defaultModeDark setting to take precedence
                    // over the mode reported from OS, set this to true (default: false)
                    overrideOS: false,
                },
            },
            {
                resolve: `gatsby-transformer-rehype`,
                options: {
                    filter: node => (
                        node.internal.type === `GhostPost` ||
                        node.internal.type === `GhostPage`
                    ) && node.slug !== `data-schema`,
                    plugins: [
                        {
                            resolve: `gatsby-rehype-ghost-links`,
                        },
                        {
                            resolve: `gatsby-rehype-prismjs`,
                        },
                    ],
                },
            },
    {
      resolve: '@gatsbystorefront/gatsby-theme-storefront-shopify',
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        basePath: '/',
        shopifyLite: true,
        enableWebp: true,
      },
    },
    {
    resolve: `gatsby-theme-try-ghost`,
    options: {
        siteConfig: {
            siteUrl: `https://Immodestea.com`,
            postsPerPage: 3,
            siteTitleMeta: `Tea for the Open Mind`,
            siteDescriptionMeta: `Tea for the Open Mind`, 
            shareImageWidth: 1000,
            shareImageHeight: 523,
            shortTitle: `Immodestea`,
            siteIcon: `favicon.png`,
            backgroundColor: `#e9e9e9`,
            themeColor: `#15171A`,
        },
        ghostConfig: {
            "development": {
                "apiUrl": "https://immodestea.com",
                "contentApiKey": "cfca0d8fa7e2dd5106826ffa17",
            },
            "production": {
                "apiUrl": "https://immodestea.com",
                "contentApiKey": "cfca0d8fa7e2dd5106826ffa17",
            },
        },
      },
   },
  ],
  siteMetadata: {
    siteUrl: 'https://Immodestea.com',
    gatsbyStorefrontConfig: {
      storeName: 'Immodestea',
      storeDescription: 'Tea for the Open Mind',
      email: 'daniel@Immodestea.com',
      company: 'Immodestea',
      location: 'Las Vegas, NV',
      address: '1 Centre St.',
      phone: '(530) 362-8437',
      workingDays: 'Every Day',
      workingHours: '10AM - 10PM',
      socialNetworks: [
        'https://facebook.com/Immodestea',
        'https://instagram.com/Immodestea',
        'https://pinterest.com',
        'https://twitter.com/Immodestea',
        'https://youtube.com/Immodestea',
      ],
      payments: ['visa', 'mastercard', 'amex', 'discover', 'shopify', 'paypal'],
      // For available social share buttons see: https://github.com/nygardk/react-share
      shareButtons: [
        'Facebook',
        'Twitter',
      ],
      googleAnalyticsId: 'UA-141525658-5',
      //
      // carousel, collection, product
      //
      mainPage: [
        {
          type: 'carousel',
          children: [
            {
              name: 'Tea',
              type: 'collection',
              handle: 'tea-1',
              textColor: 'black',
              textBgColor: 'white',
            },
            {
              name: 'Tea Wares',
              type: 'collection',
              handle: 'teaware',
              textColor: 'white',
              textBgColor: 'primary',
            },
            {
              name: 'Local Roast - Osmanthus Wulong',
              type: 'product',
              handle: 'local-roast-osmanthus-wulong',
              textColor: 'white',
              textBgColor: 'primary',
            },
          ],
        },
        {
          name: 'Yixing',
          type: 'collection',
          handle: 'yixing',
          textColor: 'white',
          textBgColor: 'primary',
        },
        {
          name: 'Local Roast',
          type: 'product',
          handle: 'local-roast',
          textColor: 'white',
          textBgColor: 'primary',
        },
        {
          name: 'Jin Jun Mei',
          type: 'product',
          handle: 'jin-jun-mei',
          textColor: 'black',
          textBgColor: 'white',
        },
        {
          name: 'Service',
          type: 'collection',
          handle: 'service',
          textColor: 'white',
          textBgColor: 'primary',
        },
      ],
      // Menu types: "header", "collection", "product", "link"
      menu: flattenMenu({
        name: 'Menu',
        type: 'top',
        children: [
          {
            name: "Tea",
            type: 'header',
            children: [
              {
                name: 'Green',
                type: 'collection',
                handle: 'Green',
              },
              {
                name: 'Wulong',
                type: 'header',
                children: [
                  {
                    name: 'Light',
                    type: 'collection',
                    link: 'light-wulong',
                  },
                  {
                    name: 'Dark',
                    type: 'collection',
                    link: 'dark-wulong',
                  },
                ],
              },
              {
                name: 'Red',
                type: 'collection',
                handle: 'Red',
              },
              {
                name: 'Fermented',
                type: 'collection',
                handle: 'Fermented',
              },
              {
                name: 'Flavored',
                type: 'collection',
                handle: 'Flavored',
              },
            ],
          },
          {
            name: "Service",
            type: 'header',
            handle: '',
            link: '',
            children: [
              {
                name: 'Festival',
                type: 'product',
                handle: 'festival-tea-service',
              },
              {
                name: 'Small Event',
                type: 'product',
                handle: 'social-tea-tasting',
              },
              {
                name: 'Educational',
                type: 'product',
                handle: 'event-tea-service',
              },
            ],
          },
          { name: 'Blog', type: 'blog', handle: '/' },
        ],
      }),
      footerLinks: [
        {
          name: 'About us',
          link: '/pages/about',
        },
        {
          name: 'Terms of Service',
          link: '/policy/termsOfService',
        },
        {
          name: 'Privacy policy',
          link: '/policy/privacyPolicy',
        },
        {
          name: 'Refunds',
          link: '/policy/refundPolicy',
        },
        {
          name: 'External',
          link: 'https://amazon.com',
        },
      ],
      locales: 'en-US',
      currency: 'USD',
      productsPerCollectionPage: '9',
      articlesPerBlogPage: '6',
    },
  },
};

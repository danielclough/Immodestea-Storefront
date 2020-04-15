const path = require(`path`)

const siteConfigDefaults = require(`./src/utils/siteConfigDefaults`)
const ghostConfigDefaults = require(`./src/utils/.ghost.json`)

const generateRSSFeed = require(`./src/utils/rss/generate-feed`)

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = (themeOptions) => {
    const siteConfig = themeOptions.siteConfig || siteConfigDefaults
    const ghostConfig = themeOptions.ghostConfig || ghostConfigDefaults

    return {
        siteMetadata: siteConfig,
        plugins: [
            /**
             *  Content Plugins
             */
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    path: path.join(__dirname, `src`, `pages`),
                    name: `pages`,
                },
            },
            // Setup for optimized images.
            // See https://www.gatsbyjs.org/packages/gatsby-image/
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    path: path.join(__dirname, `src`, `images`),
                    name: `images`,
                },
            },
            `gatsby-plugin-sharp`,
            `gatsby-transformer-sharp`,
            {
                resolve: `gatsby-source-ghost`,
                options:
                    process.env.NODE_ENV === `development`
                        ? ghostConfig.development
                        : ghostConfig.production,
            },
            {
                resolve: `gatsby-plugin-ghost-images`,
                options: {
                    lookup: [
                        {
                            type: `GhostPost`,
                            imgTags: [`feature_image`],
                        },
                        {
                            type: `GhostPage`,
                            imgTags: [`feature_image`],
                        },
                        {
                            type: `GhostSettings`,
                            imgTags: [`cover_image`],
                        },
                    ],
                    exclude: node => (
                        node.ghostId === undefined
                    ),
                    verbose: true,
                    // Option to disable this module (default: false)
                    disable: false,
                },
            },
            /**
             *  Utility Plugins
             */
            {
                resolve: require.resolve(`./plugins/gatsby-plugin-ghost-manifest`),
                options: {
                    short_name: siteConfig.shortTitle,
                    start_url: `/blog`,
                    background_color: siteConfig.backgroundColor,
                    theme_color: siteConfig.themeColor,
                    display: `minimal-ui`,
                    icon: `static/${siteConfig.siteIcon}`,
                    legacy: true,
                    query: `
                    {
                        allGhostSettings {
                            edges {
                                node {
                                    title
                                    description
                                }
                            }
                        }
                    }
                  `,
                },
            },
            {
                resolve: `gatsby-plugin-feed`,
                options: {
                    query: `
                    {
                        allGhostSettings {
                            edges {
                                node {
                                    title
                                    description
                                }
                            }
                        }
                    }
                  `,
                    feeds: [
                        generateRSSFeed(siteConfig),
                    ],
                },
            },
            {
                resolve: `gatsby-plugin-advanced-sitemap`,
                options: {
                    query: `
                    {
                        allGhostPost {
                            edges {
                                node {
                                    id
                                    slug
                                    updated_at
                                    created_at
                                    feature_image
                                }
                            }
                        }
                        allGhostPage {
                            edges {
                                node {
                                    id
                                    slug
                                    updated_at
                                    created_at
                                    feature_image
                                }
                            }
                        }
                        allGhostTag {
                            edges {
                                node {
                                    id
                                    slug
                                    feature_image
                                }
                            }
                        }
                        allGhostAuthor {
                            edges {
                                node {
                                    id
                                    slug
                                    profile_image
                                }
                            }
                        }
                    }`,
                    mapping: {
                        allGhostPost: {
                            sitemap: `posts`,
                        },
                        allGhostTag: {
                            sitemap: `tags`,
                        },
                        allGhostAuthor: {
                            sitemap: `authors`,
                        },
                        allGhostPage: {
                            sitemap: `pages`,
                        },
                    },
                    exclude: [
                        `/dev-404-page`,
                        `/404`,
                        `/404.html`,
                        `/offline-plugin-app-shell-fallback`,
                    ],
                    createLinkInHead: true,
                    addUncaughtPages: true,
                },
            },
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
        ],
    }
}

// Public user documentation for Universe Wallet.
//
// Static build, deployed to GitHub Pages from main. Search is Pagefind, bundled
// by Starlight: it runs in the reader's browser, needs no service, and keeps
// working if docs.bitcoinuniverse.io is unreachable.
//
// Nothing on this site loads from a third-party host. Fonts are self-hosted
// through fontsource, diagrams are inline SVG in the repository, and there is
// no analytics of any kind. A wallet documentation site that phones out is a
// wallet documentation site that can be tampered with.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import preact from '@astrojs/preact';
import starlightLinksValidator from 'starlight-links-validator';
import { unified } from '@astrojs/markdown-remark';
import rehypeTableScroll from './scripts/rehype-table-scroll.mjs';
import { codeBlockAccessibility } from './scripts/ec-code-block-a11y.mjs';

export default defineConfig({
  site: 'https://bitcoinuniverseio.github.io',
  base: '/docs-wallet',
  trailingSlash: 'ignore',
  // Paths this documentation used before the rebuild. A link someone bookmarked
  // in a wallet manual is not a link to break casually, so every moved URL keeps
  // working. The same map is declared in docs.manifest.json for the portal.
  redirects: {
    '/getting-started/install': '/docs-wallet/start/install',
    '/getting-started/create-a-wallet': '/docs-wallet/start/create-a-wallet',
    '/getting-started/import-a-wallet': '/docs-wallet/start/import-a-wallet',
    '/getting-started/first-receive': '/docs-wallet/start/first-receive',
    '/getting-started/first-send': '/docs-wallet/start/first-send',
    '/getting-started/connect-hardware': '/docs-wallet/tasks/hardware-wallet',
    '/wallet-basics/accounts-and-networks': '/docs-wallet/concepts/chains-and-networks',
    '/wallet-basics/balances': '/docs-wallet/concepts/inputs-outputs-fees',
    '/wallet-basics/fees': '/docs-wallet/tasks/choose-a-fee',
    '/wallet-basics/activity': '/docs-wallet/tasks/activity',
    '/wallet-basics/performance-and-media': '/docs-wallet/assets/media-and-performance',
    '/using-wallet/reviewing-a-transaction': '/docs-wallet/tasks/review-a-transaction',
    '/using-wallet/signing-a-message': '/docs-wallet/tasks/sign-a-message',
    '/using-wallet/connections': '/docs-wallet/concepts/connections',
    '/using-wallet/coin-control': '/docs-wallet/tasks/coin-control',
    '/assets-and-protocols/overview': '/docs-wallet/assets/support-state',
    '/assets-and-protocols/supported-protocols': '/docs-wallet/assets/protocol-registry',
    '/assets-and-protocols/protected-outputs': '/docs-wallet/concepts/protected-outputs',
    '/assets-and-protocols/dogecoin-marketplace': '/docs-wallet/assets/dogecoin-marketplace',
    '/assets-and-protocols/zcash-market-listings': '/docs-wallet/assets/zcash-market-listings',
    '/security-and-recovery/security-model': '/docs-wallet/safety/security-model',
    '/security-and-recovery/backup': '/docs-wallet/start/back-up',
    '/security-and-recovery/restore': '/docs-wallet/concepts/backup-and-recovery',
    '/security-and-recovery/compromised-wallet': '/docs-wallet/safety/compromised-wallet',
    '/security-and-recovery/privacy': '/docs-wallet/safety/privacy',
    '/security-and-recovery/watch-only': '/docs-wallet/tasks/watch-only',
    '/support': '/docs-wallet/help/support',
    '/troubleshooting': '/docs-wallet/help/troubleshooting',
  },
  markdown: {
    // A wide table scrolls inside its own frame rather than pushing the page
    // sideways at 320px.
    processor: unified({ rehypePlugins: [rehypeTableScroll] }),
  },
  integrations: [
    // Interactive islands for the new products only. Ordinary prose pages
    // hydrate nothing.
    preact(),
    starlight({
      expressiveCode: { plugins: [codeBlockAccessibility()] },
      title: 'Universe Wallet',
      description:
        'How to hold, receive, send, and protect Bitcoin digital artifacts in Universe Wallet, the self-custody browser wallet. Written so that nothing here can cost you money by being believed.',
      logo: { src: './src/assets/logo.png', alt: 'Universe Wallet' },
      favicon: '/favicon.png',
      customCss: [
        '@fontsource-variable/public-sans',
        '@fontsource-variable/source-code-pro',
        './src/styles/theme.css',
      ],
      editLink: {
        baseUrl: 'https://github.com/bitcoinuniverseio/docs-wallet/edit/develop/',
      },
      lastUpdated: true,
      pagination: true,
      credits: false,
      social: [
        {
          icon: 'github',
          label: 'Source repository',
          href: 'https://github.com/bitcoinuniverseio/docs-wallet',
        },
      ],
      components: {
        Footer: './src/components/Footer.astro',
        PageTitle: './src/components/PageTitle.astro',
        Head: './src/components/Head.astro',
        // The release/appearance lens and the command palette live in the
        // header slots Starlight already renders, so the new controls are
        // present on every page without forking Starlight's layout.
        ThemeSelect: './src/components/overlays/ReleaseThemeSelect.astro',
        Search: './src/components/overlays/PaletteSearch.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://bitcoinuniverseio.github.io/docs-wallet/social-card.svg',
          },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'color-scheme', content: 'light dark' } },
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'text/plain',
            href: 'https://bitcoinuniverseio.github.io/docs-wallet/llms.txt',
            title: 'Plain-text index for language models',
          },
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'What Universe Wallet is', slug: 'start/what-this-is' },
            { label: 'Holding your own keys', slug: 'start/self-custody' },
            { label: 'Which version you are running', slug: 'start/versions' },
            { label: 'Install', slug: 'start/install' },
            { label: 'Create a wallet', slug: 'start/create-a-wallet' },
            { label: 'Import an existing wallet', slug: 'start/import-a-wallet' },
            { label: 'Back up your recovery phrase', slug: 'start/back-up' },
            { label: 'Receive for the first time', slug: 'start/first-receive' },
            { label: 'Send for the first time', slug: 'start/first-send' },
          ],
        },
        {
          label: 'Learn by doing',
          items: [
            { label: 'Guided journeys', link: '/journeys/' },
            { label: 'Safe simulator', link: '/simulator/' },
            { label: 'Transaction Safety Lab', link: '/safety-lab/' },
            { label: 'Screen Atlas', link: '/atlas/' },
            { label: 'Answer Center', link: '/answer/' },
            { label: 'Emergency handbook', link: '/emergency/' },
          ],
        },
        {
          label: 'How it works',
          items: [
            { label: 'Payment and asset addresses', slug: 'concepts/addresses' },
            { label: 'Address types', slug: 'concepts/address-types' },
            { label: 'Inputs, outputs, fees, change', slug: 'concepts/inputs-outputs-fees' },
            { label: 'Protected outputs', slug: 'concepts/protected-outputs' },
            { label: 'What a signature authorizes', slug: 'concepts/what-a-signature-authorizes' },
            { label: 'Connection permissions', slug: 'concepts/connections' },
            { label: 'Backup and recovery', slug: 'concepts/backup-and-recovery' },
            { label: 'Chains and networks', slug: 'concepts/chains-and-networks' },
            { label: 'Confidence marks', slug: 'concepts/confidence-marks' },
          ],
        },
        {
          label: 'Everyday tasks',
          items: [
            { label: 'Receive', slug: 'tasks/receive' },
            { label: 'Send bitcoin', slug: 'tasks/send' },
            { label: 'Choose a fee', slug: 'tasks/choose-a-fee' },
            { label: 'Review a transaction', slug: 'tasks/review-a-transaction' },
            { label: 'Review a PSBT', slug: 'tasks/review-a-psbt' },
            { label: 'Sign a message', slug: 'tasks/sign-a-message' },
            { label: 'Connect an application', slug: 'tasks/connect-an-application' },
            { label: 'Manage connections', slug: 'tasks/manage-connections' },
            { label: 'Coin control', slug: 'tasks/coin-control' },
            { label: 'Switch chain and network', slug: 'tasks/switch-chain-and-network' },
            { label: 'Read your activity', slug: 'tasks/activity' },
            { label: 'Watch-only wallets', slug: 'tasks/watch-only' },
            { label: 'Hardware wallets', slug: 'tasks/hardware-wallet' },
            { label: 'Security dashboard', slug: 'tasks/security-dashboard' },
            { label: 'Locking and passwords', slug: 'tasks/lock-and-password' },
          ],
        },
        {
          label: 'Assets and protocols',
          items: [
            { label: 'What a digital artifact is', slug: 'assets/what-a-digital-artifact-is' },
            { label: 'What this release authorizes', slug: 'assets/support-state' },
            { label: 'The protocol registry', slug: 'assets/protocol-registry' },
            { label: 'Why an action is unavailable', slug: 'assets/why-unavailable' },
            { label: 'Media and large portfolios', slug: 'assets/media-and-performance' },
            { label: 'Dogecoin marketplace', slug: 'assets/dogecoin-marketplace' },
            { label: 'Zcash market listings', slug: 'assets/zcash-market-listings' },
          ],
        },
        {
          label: 'Safety',
          items: [
            { label: 'Security model', slug: 'safety/security-model' },
            { label: 'Phishing and impostors', slug: 'safety/phishing' },
            { label: 'If your wallet is compromised', slug: 'safety/compromised-wallet' },
            { label: 'Privacy', slug: 'safety/privacy' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Supported features', slug: 'reference/supported-features' },
            { label: 'Known limitations', slug: 'reference/known-limitations' },
            { label: 'Capability evidence', slug: 'reference/capability-evidence' },
            { label: 'Release notes', slug: 'reference/release-notes' },
            { label: 'Glossary', slug: 'reference/glossary' },
            { label: 'Diagram conventions', slug: 'reference/diagram-conventions' },
          ],
        },
        {
          label: 'Developers',
          items: [
            { label: 'Integrating with the wallet', slug: 'developers/integration' },
            { label: 'Provider API', slug: 'developers/provider-api' },
            { label: 'Integration Studio', link: '/studio/' },
            { label: 'Machine-readable docs and MCP', link: '/developers/machine-readable' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', slug: 'help/troubleshooting' },
            { label: 'Frequently asked questions', slug: 'help/faq' },
            { label: 'Support and reporting', slug: 'help/support' },
          ],
        },
      ],
      plugins: [starlightLinksValidator({ errorOnRelativeLinks: false })],
    }),
  ],
});

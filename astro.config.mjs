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
import starlightLinksValidator from 'starlight-links-validator';
import { unified } from '@astrojs/markdown-remark';
import rehypeTableScroll from './scripts/rehype-table-scroll.mjs';

export default defineConfig({
  site: 'https://bitcoinuniverseio.github.io',
  base: '/docs-wallet',
  trailingSlash: 'ignore',
  markdown: {
    // A wide table scrolls inside its own frame rather than pushing the page
    // sideways at 320px.
    processor: unified({ rehypePlugins: [rehypeTableScroll] }),
  },
  integrations: [
    starlight({
      title: 'Universe Wallet',
      description:
        'How to hold, receive, send, and protect Bitcoin digital artifacts in Universe Wallet, the self-custody browser wallet. Written so that nothing here can cost you money by being believed.',
      logo: { src: './src/assets/mark.svg', alt: '' },
      favicon: '/mark.svg',
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

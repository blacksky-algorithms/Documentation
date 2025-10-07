---
description: >-
  Below is a comprehensive list of public network services and applications ran
  by Blacksky
---

# List of our services

## Live Services

* [https://blacksky.app](https://blacksky.app/) → **PDS (Personal Data Server)** Hosts user accounts and personal data under Blacksky's Terms of Service and Privacy Policy. Users hosted here can migrate away at any time while keeping their identity and social graph. Promotes independence from Bluesky by giving users an alternative hosting provider with its own governance and moderation policies.
* [https://atproto.africa](https://atproto.africa/) → **Relay & Moderation Relay** A full-network relay built from scratch in Rust that streams all network activity with a 3-day backfill window and PLC cache. Also hosts a moderation relay that replays all moderation labels network-wide that have ever been made, making it easy for developers to consume labels from multiple mod services. Promotes independence by enabling anyone to access the entire AT Protocol firehose and aggregated moderation data without relying solely on Bluesky's infrastructure.
* [https://blacksky.community](https://blacksky.community/) → **Web App** A fork of the Bluesky client with Blacksky-specific features including custom moderation, Blacksky feeds as defaults, and the blacksky.app PDS pre-selected. Promotes independence by providing an alternative interface where Blacksky's community governance takes priority over Bluesky's decisions.
* [@blackskyweb.xyz](https://blacksky.community/profile/did:plc:d2mkddsbmnrgr3domzg5qexf) → **Moderation Service** Custom moderation labeler that applies community-determined guidelines independent of Bluesky's moderation policies. Users can subscribe to this service to receive Blacksky's content labels. Promotes independence by allowing communities to define their own safety standards.
* [@tektite.cc](https://blacksky.community/profile/did:plc:tkpi67nipaoa4ocw5cn24ukg) → **Migration Tool** Simplifies the process of migrating accounts from Bluesky's PDS to Blacksky's hosting (or other providers) without losing followers, posts, or identity. Promotes independence by making it easy for users to leave Bluesky's hosting while maintaining their social presence.
* [https://assembly.blacksky.community](https://assembly.blacksky.community/) → **Governance Platform** A self-hosted instance of Polis for democratic decision-making where community members collaboratively develop guidelines, vote on features, and shape Blacksky's policies. Promotes independence through community-led governance rather than top-down corporate control.
* [https://blackskyweb.xyz](https://blackskyweb.xyz/) → **Marketing Website** The main informational site explaining Blacksky's vision, services, and how they promote community-led growth on AT Protocol. Also federated via activity pub ([@atproto\_rocks@blackskyweb.xyz](https://mastodon.social/@atproto_rocks@blackskyweb.xyz)).
* [https://satnav.rsky.dev](https://satnav.rsky.dev/) → **Exported Data Explorer** Tool for exploring CAR files (Content Addressable aRchives) - your exported AT Protocol data. Makes user data portable and human-readable. Promotes independence by ensuring users can access and understand their own data outside of any platform.
* [https://docs.blacksky.community](https://docs.blacksky.community/) → **Documentation Site** Comprehensive guides and technical documentation for using Blacksky's services, migrating accounts, and understanding AT Protocol infrastructure.

### Additional PDS Handles Hosted by Blacksky

* **myatproto.social** - Generic AT Protocol handles, open to anyone
* **cryptoanarchy.network** - Community-themed handles, open to anyone

## On the Roadmap (Not Yet Built)

* **One-Click PDS Hosting Service** - Will enable non-technical users to easily launch and manage their own Personal Data Servers, making it simpler for new communities to establish independence.
* **Blacksky-Only Posts (Community-Only Posts)** - Private posting space visible only to Blacksky community members, initially text-only, eventually with media support. Currently in development.
* _app.bsky. API Server (Full AppView)_\* - A complete Bluesky-compatible API server. Will provide full independence from Bluesky's AppView for all social features.
* _community.blacksky. API Server_\* - A specialized AppView for private/community-only content. Planned to ship after the full app.bsky.\* server.
* **Backfill Solutions** - Working with other AT Protocol developers to create efficient backfill tools for alternate AppViews, addressing a major technical barrier to independence.
* **iOS and Android Native Apps** - Mobile applications with Blacksky's features built-in.
* **In-App Tipping System** - Direct way for community members to financially support content creators within Blacksky.

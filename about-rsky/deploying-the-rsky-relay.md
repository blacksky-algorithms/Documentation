# Deploying the Rsky Relay

### Introduction

You may be asking yourself "what is a [relay](https://atproto.com/guides/glossary#relay)?" and "why should I care about it?"

Imagine you are using an app built on the AT Protocol ( [An AppView](https://docs.bsky.app/docs/advanced-guides/federation-architecture#app-views). Whenever a user interacts in the app: liking a post, creating a list, or following a user, it creates a change event (or commit) that is saved to the user's [data repository](https://atproto.com/guides/data-repos).

These changes are communicated to the [Personal Data Server](https://atproto.com/guides/glossary#pds-personal-data-server) that the data repositories are hosted on (PDS). **The Relay** communicates with the PDS and creates a single channel for AppViews to consume the event changes.

What we just described was the traditional relay, but the rsky-relay can also be configured to be a Labeler relay (mod relay). The difference between the two relay types is that a mod relay will look for change events from labelers.

This is important because it allows discoverability for other labelers. Before this, a user could only subscribe to a labeler if they already knew what labeler to look for, or if another user makes a post about the relay. Using this relay type would allow applications to show users all available labelers they can subscribe to.

### Things to Know

Our goal is to upload the rsky-relay container image to the cloud provider, create a virtual machine (VM) based on that image, and create a network rule that allows ingress (incoming), and egress (exiting) traffic on port `9000`.

Before guiding you through running your own instance of the rsky-relay, you should know where you want your relay to be hosted. You can either use a cloud provider like AWS, Azure, GCP, OCI, DigitalOcean, etc, or you can self-host. This tutorial uses GCP (not sponsored), but the concepts will apply to another provider you choose.

This tutorial uses a container image that does not run a full crawl of the network, doesn't have an SSL certificate, and uses 32 GB, instead of 320 GB. These choices were made to simplify deployment, and reduce initial costs.

Finally, we use `websocat` for testing our websocket connection.

### Relay Architecture

Below is a simplified explanation of the rsky-relay architecture components:

* Crawler
* Validator
* Bluesky Relay
* PLC Directory
* Event Database
* Publisher
* Relay Consumers

During initial startup, the relay queries Bluesky's relay every hour to discover and queue PDS instances to be crawled. The Crawler establishes WebSocket connections to queued instances and ingests data.

The ingested data is sent to the Validator, which verifies time and order of change events, resolves DIDs, and verifies cryptographic keys (P-256 or K-256). You can optionally run a full crawl of the PLC Directory for all DIDs. If you do not want to run the script, add the `--no-plc-export` flag when running your instance.

Validated change events are stored in the shared Event Database. The database has three parts:

* queue: change events that need to be validated
* repos: tracks the state of data repositories
* firehose: the event stream of validated change events (Read More: https://docs.bsky.app/docs/advanced-guides/firehose)

The Publisher serves firehose consumers the stream of validated events.

### Default Relay Configuration

Below are runtime constants used by traditional and Labeler relays. The service type is defined at compile time. All of the following constants are defined in the src/config.rs file (e.g. `cargo build --release`).

* Service types:
  * Traditional Relay
  * Labeler Relay

Message Queue Capacities (uses bit shifting)

* `CAPACITY_MSGS`: Maximum pending messages, default: 65,536
* `CAPACITY_REQS`: Maximum pending requests, default: 4,096
* `CAPACITY_STATUS`: Maximum status entries, default: 1,024

Worker Pools

* `WORKERS_CRAWLERS`: Number of crawlers, default: 4
* `WORKERS_PUBLISHERS`: Number of publishers, default: 4

Network Configuration

* `PORT`: Service port, default: 9000 for traditional, 9001 for Labeler
* `HOSTS_RELAY`: Upstream relay endpoint, default: `relay1.us-west.bsky.network`
* `HOSTS_INTERVAL`: How often the relay will refresh, default: 1 hour

Resolver Configuration

* `DO_PLC_EXPORT`: Syncs with PLC Directory
  * Traditional Mode: Enabled
  * Labeler Mode: Disabled
  * Can disable feature with the `--no-plc-export` flag
* `PLC_EXPORT_INTERNAL`: How often the PLC syncs, default: 60 seconds
* `CAPACITY_CACHE`: Maximum number of DID resolutions cached, default: 262,144 entries

Validator Configuration

* `HOSTS_WRITE_INTERVAL`: Frequency check for validated hosts, default: 10 seconds

Storage Management

* `DISK_SIZE`: Maximum disk usage, default: 320 GiB
* `TTL_SECONDS`: Length of data retention, default:
  * Traditional Relay: 24 hours
  * Labeler Relay: Unlimited

Database Configuration

* `CACHE_SIZE`: Amount of in-memory cache, default: 1 GiB
* `WRITE_BUFFER_SIZE`: The size of the write buffer, default: 512 MiB
* `MEMTABLE_SIZE`: Size of the memory table before compaction, default: 64 MiB
* `BLOCK_SIZE`: Disk I/O block size, default: 64 KiB
* `FSYNC_MS`: Disk sync interval, default: 1 second

### Traditional Relay Walkthrough

{% stepper %}
{% step %}
### Create cloud account and VM

Create an account with your chosen cloud provider. In GCP, go to Compute Engine → VM instances.
{% endstep %}

{% step %}
### Create a new VM instance

Click "Create Instance". Choose machine configuration (example used: E2 Small — 1 shared core, 2 GB RAM, 64 GB storage). Choose a suitable region.
{% endstep %}

{% step %}
### Deploy container

Under "OS and storage", enable "Deploy container". In the "Container Image" field, paste: blacksky/rsky-relay:latest Click "Select".
{% endstep %}

{% step %}
### Networking settings

Under "Networking", enable "Allow HTTP traffic" and "Allow HTTPS traffic".
{% endstep %}

{% step %}
### Create the instance

Click "Create" to spin up the VM.
{% endstep %}

{% step %}
### Create firewall rules

After the instance is created, create firewall rules to allow traffic on port `9000`. In GCP: VPC Network → VPC networks → select the VPC assigned to your instance → Add firewall rule. Create two rules:

* an ingress rule that allows traffic on port `9000`
* an egress rule that allows traffic on port `9000`
{% endstep %}

{% step %}
### Test websocket connection

Use websocat to test the relay. Replace with your instance's external IP:

{% code title="websocat test" %}
```bash
websocat -k ws://<external-ip-address>:9000/xrpc/com.atproto.sync.subscribeRepos?cursor=0
```
{% endcode %}
{% endstep %}
{% endstepper %}

### Labeler Relay Walkthrough

Hosting a labeler relay is the same as the Traditional Relay walkthrough, but test with the Labeler websocket endpoint:

{% code title="websocat labeler test" %}
```bash
websocat -k ws://<external-ip-address>:9001/xprc/com.atproto.label.subscribeLabels?cursor=1
```
{% endcode %}

### Findings

Monitoring the relay created for this tutorial (July 31 to Aug 20) cost $26.95 to host, and $1.41 for networking. A client periodically consumed this connection; further action items include stress testing the relay under different configs.

# Deploying the Rsky Relay
This section will outline how to deploy and tweak your own instance of the [rsky relay](https://github.com/blacksky-algorithms/rsky/tree/main/rsky-relay). This guide will aim to be cost effective, but one can tweak their instance to meet their goals. Finally, we'll be using GCP for this demonstration, but these concepts should be transferrable to other cloud hosting platforms.

## Introduction
You may be asking yourself "what is a relay?" and "why should I care about it?" 

Imagine you are using an app built on the AT Protocol (An AppView). Whenever a user interacts in the app: liking a post, creating a list, or following a user, it creates a change event that is saved to the user's data repository.

These changes are communicated to the Personal Data Server that the data repositories are hosted on (PDS). **The Relay** communicates with the PDS and creates a single channel for AppViews to consume the event changes.

What we just described was the traditional relay, but the rsky-relay can also be configured to be a moderation relay (mod relay). The difference between the two relay types is that a mod relay will look for change events from labelers. 

This is important because it allows discoverability for other labelers. Before this, a user could only subscribe to a labeler if they already knew what labeler to look for, or if another user makes a post about the relay. Using this relay type would allow applications to show users all available labelers they can subscribe to.

## Things to Know
Our goal is to upload the rsky-relay container image to the cloud provider, create a VM based on that image, and create a network rule that allows ingress (incoming), and egress (exiting) traffic on port 9000.

Before guiding you through running your own instance of the rsky-relay, you should know where you want your relay to be hosted. You can either use a cloud provider like AWS, Azure, GCP, OCI, DigitalOcean, etc, or you can self-host. This tutorial uses GCP (not sponsored), but the concepts will apply to another provider you choose.

This tutorial uses a container image that does not run a full crawl of the network, doesn't have an SSL certificate, and uses 32 GB, instead of 320 GB. These choices were made to simplify deployment, and reduce initial costs.

Finally, we use `websocat` for testing our websocket connection.

## Traditional Relay Walkthrough
1. You will need to create an account with the cloud provider of your choosing.
2. Next, head to the VM section, for GCP, click on the navigation menu (or press . on your keyboard), select Compute Engine, then VM instances.
3. Click on the "Create Instance" button towards the top of the screen. You'll start at the "Machine Configuration" screen. For the purpose of this walkthrough, I selected E2 Small, which comes with 1 shared core, 2GB of RAM, and 64 GB of storage. **Make sure to choose a region that meets your needs.**
4. Click on the "OS and storage" section, and click on "Deploy container".
5. In the first field, labeled "Container Image", paste the image address: blacksky/rsky-relay:latest. When you are done, you can press the "Select" button.
6. Click on the "Networking" section, and make sure to select "Allow HTTP traffic", and "Allow HTTPS traffic".
7. Once you are finished making those changes, click on the "Create" button.
8. After the instance has finished being created, you will need to create a network rule to allow traffic to be sent and recieved on port 9000.
9. Click on the navigation menu, and select VPC Network > VPC networks. Make sure you have selected the VPC that is assigned to your newly created relay instance.
10. Click on the "Add firewall Rule", and you are going to create two rules.
    1. an ingress rule that allows traffic on port 9000.
    2. an egress rule that allows traffic on port 9000.

With the final step complete, you should now be able to go use `websocat` to create a WebSocket connection with our relay! Run the following command and replace the placeholder variable with your instance's external IP Address.
```bash
websocat -k ws://<external-ip-address>:9000/xrpc/com.atproto.sync.subscribeRepos?cursor=0
```
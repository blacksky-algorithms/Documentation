# Deploying the Rsky Relay
This section will outline how to deploy and tweak your own instance of the [rsky relay](https://github.com/blacksky-algorithms/rsky/tree/main/rsky-relay). This guide will aim to be cost effective, but one can tweak their instance to meet their goals. Finally, we'll be using GCP for this demonstration, but these concepts should be transferrable to other cloud hosting platforms.

## Recommended Tools
We recommend you have the following tools installed on your local machine:
- websocat

## Introduction
You may be asking yourself "what is a relay?" and "why should I care about it?" 

Imagine you are using an app built on the AT Protocol (An AppView). Whenever a user interacts in the app: liking a post, creating a list, or following a user, it creates a change event that is saved to the user's data repository.

These changes are communicated to the Personal Data Server that the data repositories are hosted on (PDS). **The Relay** communicates with the PDS and creates a single channel for AppViews to consume the event changes.


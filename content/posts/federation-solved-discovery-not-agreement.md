---
title: "Docs as Interface, Part 4: Federation Solved Discovery. It Didn't Solve Agreement."
date: 2026-08-04
draft: false
tags: ["technical-writing", "documentation-engineering", "docs-as-interface", "ai", "federation", "rag"]
description: "The half federation solves is discovery. The half it leaves for you is agreement. Part 4 of the Docs as Interface series: why three individually correct sources still merge into an answer that is not, and the three honest places to put agreement."
summary: "Three sources can return three answers. Federation made the disagreement legible. It did not resolve it. Here is where agreement actually has to live."
discussionPrompt: "Where does agreement actually live in your federated docs setup: in source, in retrieval, or downstream in validation?"
cover:
  image: "images/docs-as-interface-federation-agreement-card.png"
  alt: "An agent reading one answer from three federated doc sources"
  relative: false
  hiddenInSingle: true
---

An agent answers a question. You trace it back to check the answer. Every source it drew from is correct. The answer is still wrong. Federation ships this failure quietly, and nothing in the architecture warns you it is happening.

Federation makes a promise that sounds like the whole solution. Every team's docs, discoverable from one place, readable by one agent. The promise is real. It is also only half the problem.

The half federation solves is discovery. The half it leaves for you is agreement. Those two get conflated constantly, which is why a federated doc system can feel finished and behave broken at the same time.

{{< figure src="/images/docs-as-interface-federation-agreement.svg" alt="Three federated documentation sources are each individually verified. An agent reads across all three and the merged answer fails at the seam. Three engineered mechanisms, schema in source, retrieval constraints, and validation downstream, are then applied and the merged answer becomes consistent." caption="Every source is correct on its own. The merged answer is not. Agreement is engineered downstream, not discovered." >}}

## The half it keeps

An agent queries the hub. It reads across Payments, Accounts, and Ledger, and it returns one answer drawn from all three. This is real work, and federation does it well. Discovery is a retrieval and indexing problem, and a federated docs-as-code architecture is a good answer to it. No team's documentation is stranded in a repo the agent cannot see. Nothing is undiscoverable.

If discovery were the whole problem, you would be done here.

## The half it hides

Three sources can return three answers. When each team owns its own docs, definitions drift: the same field means one thing in Payments and something adjacent in Ledger, and neither team is wrong from where they sit. Federation does not reconcile that drift. It surfaces it. The agent now reads all three contradictory sources with equal confidence and merges them into a single response, and the merged answer is not automatically the correct one. Federation made the disagreement legible. It did not resolve it.

The system reports success at every step. Retrieval worked. Every source validated. The only thing that failed was the truth.

## Why discovery is easy and agreement is hard

Discovery has a technical fix. You index, you retrieve, you rank. It is tractable because it is mechanical, and you can measure whether it works.

Agreement has no technical fix, because it is not a technical problem. It is a question of ownership: whose definition wins, who is accountable when two sources conflict, what the reader is entitled to trust. You cannot index your way to agreement. You can only decide, deliberately, where agreement is going to live. If you do not decide, the answer defaults to whichever source the retriever happened to rank first, and that is not a decision anyone should be comfortable shipping.

## Where you put the agreement

Agreement is not a byproduct of federation. It is something you place on purpose, and there are three honest places to put it.

### 1. Schema in source

Constrain meaning at authorship, so a field cannot be defined two incompatible ways in the first place. This is the cheapest place to enforce agreement and the one teams resist most, because it limits their autonomy at the exact point they feel it.

### 2. Retrieval constraints

Stop the agent from pulling contradictory sources into the same answer without noticing. Scope, prefer, and exclude at retrieval time, so a query about a Ledger concept does not silently merge in a Payments definition of the same word.

### 3. Validation downstream

Catch disagreement before it reaches the reader. This is the safety net, not the strategy. If it is doing heavy lifting, the agreement problem was pushed too far downstream and you are papering over drift instead of preventing it.

Most systems need some of all three. The failure mode is assuming federation supplied one of them for free. It supplied none.

## Docs as interface

Part 3 argued the docs page had become the backend. That only holds if the backend agrees with itself.

The interface is only as trustworthy as the agreement behind it. Discovery gets the agent to the door. Agreement decides whether what is behind it can be trusted. A federated system that solves the first and skips the second has built a very efficient way to deliver confident, contradictory answers.

Federation was worth doing. It just solved the problem that was always going to be solvable. The one it left you is the one worth your name on.

*Part 4 of the Docs as Interface series. Part 1: [Documentation Is an Interface. We Keep Building It Like a Library](/blog/posts/documentation-is-an-interface-we-keep-building-it-like-a-library/). Part 2: [Progressive Disclosure Is Not What You Think](/blog/posts/progressive-disclosure-documentation-ux/). Part 3: [The Docs Page Is the Backend Now](/blog/posts/the-docs-page-is-the-backend-now/).*

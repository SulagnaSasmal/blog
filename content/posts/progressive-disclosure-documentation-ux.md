---

title: "Progressive Disclosure Is Not What You Think"
date: 2026-04-20
slug: "progressive-disclosure-documentation-ux"
draft: false
tags: ["docs", "UX", "strategy", "documentation-UX", "technical-writing"]
description: "Most teams read progressive disclosure as 'hide complexity behind a click.' That's not what it is. The reframe that dropped my bounce rate in twenty minutes."
discussionPrompt: "Where in your docs have you inverted the question hierarchy — and what did bounce data tell you first?"
ShowToc: true
TocOpen: false

---

Progressive disclosure is the most misunderstood pattern in documentation UX.

Most teams read it as "hide complexity behind a click." That's not what it is. It's about matching information to the reader's current question — not sequencing information by length.

## The misread definition

The "hide complexity" interpretation is everywhere. Accordion components. "Show advanced options" toggles. Collapsed code samples. These are all valid UI patterns, but they are not progressive disclosure in the documentation sense. They are progressive *reveal* — a cosmetic layer that defers rendering, not a structural decision about information order.

True progressive disclosure is an IA problem, not a component problem. You are not deciding when to show content. You are deciding what question each section of your docs is answering, and whether that question is one the reader has arrived at yet.

## What analytics revealed

I was reminded of this last week while working on one of my own tools. The landing page had a perfectly logical structure: what it does, how to install it, how to configure it, full API reference. Classic docs IA. Analytics told a different story. Readers were bouncing on the install section, before the value had even registered.

The problem was not length. It was order. The page answered "how do I use this" before the reader had finished asking "is this for me."

Progressive disclosure, done right, would have surfaced one working example immediately, tucked installation below it, and deferred configuration to a separate route entirely.

## A question hierarchy, not a content hierarchy

{{< figure src="/images/progressive_disclosure_editorial_hero.svg" alt="Two stacks of discs side by side. The left stack, labelled 'What docs deliver first', puts installation at the bottom where the reader arrives, with overview buried at the top. The right stack, labelled 'What readers ask first', puts the overview question at the bottom where the reader stands, with advanced reference at the top." caption="What docs deliver vs. what readers ask — the gap between these two orders is where bounce happens." class="flow-figure reveal-on-scroll" >}}

The reframe I keep coming back to: progressive disclosure is a question hierarchy, not a content hierarchy.

Readers arrive with an ordered stack of questions. "What is this" sits on top. "Will it work for my case" sits under it. "How do I install it" comes third — and only if the first two resolved favorably.

When the docs match that order, bounce drops and time-on-page climbs on the pages that matter. When the docs invert it, you get what I was seeing: clean IA, terrible funnel.

The question hierarchy for most developer-facing docs looks roughly like this:

1. **What is this, in one sentence?** — If the reader cannot answer this after the first paragraph, nothing else lands.
2. **Will this work for my situation?** — A single concrete example, in their language, resolves this faster than any feature list.
3. **How do I get started?** — Installation, prerequisites. Only relevant once questions 1 and 2 are answered.
4. **How do I configure it for my specific case?** — This belongs on a separate page entirely, not below the install steps.
5. **What is the full API surface?** — Reference material. Not a landing page concern at all.

Most docs skip directly to question 3. Some skip to question 5. Almost none open with a working example that answers question 2 before touching installation.

## The fix and what it taught me

The fix took twenty minutes. I moved the working example above the install block, cut the prerequisite list to the two dependencies that actually matter, and linked configuration to its own page rather than inlining it.

The lesson has been worth years of rework on other projects.

If your docs bounce high on install or setup pages, the problem is almost never the install instructions. It is that the reader never got answers to the two questions that come before. They arrived skeptical, and the docs gave them a checklist instead of a reason to continue.

---

Check your own docs the same way. Pick a page with high bounce. Ask what question it answers first. Then ask what question the reader actually has when they land on it. The gap between those two is your disclosure problem — and it almost certainly has nothing to do with your content length.

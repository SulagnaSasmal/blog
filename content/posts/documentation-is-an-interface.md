---

title: "Documentation Is an Interface. We Keep Building It Like a Library."  
date: 2026-03-23  
slug: "documentation-is-an-interface-we-keep-building-it-like-a-library"  
draft: false  
tags: ["docs", "strategy", "AI", "UX", "technical-writing"]
description: "How documentation becomes an interface when AI pulls it into the product, what technical writers and UX designers are each missing, and what a converged model looks like."
discussionPrompt: "Where does your content break when it crosses from docs to product? Not theoretical. A specific moment, a specific failure."

---

Technical writers build content. UX designers build interfaces. For twenty years, these two disciplines have operated in separate buildings, separate tools, separate reporting lines.

That worked when documentation lived on a portal and the product lived on a screen. Users moved between two worlds: the application where they did their work, and the help center where they went when they got stuck.

That world is ending.

AI chatbots now pull documentation into the product and surface it as conversational answers. In-app guidance layers docs content directly onto the interface. Newer tools can expose your knowledge base as something an AI assistant can query directly. The documentation portal is no longer the destination. It is the backend data source for five different delivery surfaces, and neither the tech writer nor the UX designer fully owns the pipeline that connects them.

This post is about what happens when documentation becomes an interface, what technical writers and UX designers are each missing, what AI changes about the equation, and what the converged model might look like.

## The silo problem

Here is how documentation reaches users today in most organizations.

{{< figure src="/images/docs_ux_convergence_diagram.svg" alt="Diagram showing two parallel pipelines labeled tech writer and UX writer, separated by a vertical silo boundary, with an AI layer at the bottom connecting both to a single user-facing surface" caption="The siloed pipeline, tech writer and UX writer operating in parallel, separated by a silo boundary, with an AI layer collapsing both into a single user-facing surface" class="flow-figure reveal-on-scroll" >}}

The technical writer produces Markdown source, applies a content taxonomy (DITA topic types, metadata, frontmatter), and publishes to a docs portal as HTML, PDF, or API reference. The UX designer produces Figma mockups, writes microcopy, and ships tooltips, error messages, and onboarding flows inside the product UI.

Two pipelines. Two toolchains. Two quality standards. One user who does not care which team wrote the sentence they are reading.

This split made sense when the outputs were physically separate. A docs site is not a product screen. Different formats, different navigation patterns, different expectations.

But the AI layer changes everything. When a chatbot answers a user's question, it pulls from documentation content and delivers it inside the product interface. The content came from the tech writer's pipeline. The delivery context came from the UX designer's pipeline. Nobody designed the connection between them.

## What technical writers are missing

I have spent nearly twenty years in enterprise documentation. I can tell you exactly what most technical writing teams are not thinking about.

**We write for readers, not for interfaces.** A tech writer's mental model is the page. You write a topic. You structure it with headings, steps, callouts. You publish it to a portal. The reader arrives, reads, and leaves. But increasingly, that content never reaches a reader on a page. It reaches them as a chatbot snippet. A tooltip fragment. An onboarding step. An error message suggestion. The same paragraph needs to work in five different UX contexts, and the writer who authored it has no visibility into any of them.

**We structure content for navigation, not for extraction.** DITA topic typing, information architecture, content taxonomies. These are genuinely powerful tools. But they are designed to help a human navigate a documentation set. When an AI tool reads that same content, it does not navigate. It extracts. It pulls a sentence, a paragraph, a code block, strips the surrounding context, and delivers it somewhere else. If your content only makes sense inside its navigation structure, it breaks the moment it leaves the portal.

**We do not own the delivery interface.** This is the critical gap. A tech writer at most companies has zero input into how their content appears inside the product. The docs portal, yes. The in-app help widget that pulls from those same docs? That is a product decision. The AI chatbot that rephrases your carefully structured troubleshooting guide? Engineering built that. The writer's content is the raw material, but someone else shapes the experience.

## What UX designers are missing

The UX side has its own blind spots, and they are equally significant.

**Microcopy is not documentation.** A UX writer crafts a perfect error message: "Payment declined. Try a different card." That is excellent interface writing. But the user who needs to understand why their card was declined, what the decline codes mean, and how to resolve each one needs structured reference documentation. The UX writer's three-line error message and the tech writer's 2,000-word troubleshooting guide are two views of the same user problem. Almost nobody designs them as a connected system.

**UX teams do not think about content at scale.** A UX writer might own 200 strings in a product. A technical writer might own 147 topics, 128,000 words, and six output formats. The problems that emerge at documentation scale (terminology consistency across hundreds of pages, style enforcement, content reuse, version control, multi-format publishing) are invisible to someone working at the microcopy level. But the moment AI surfaces documentation content inside the product, those scale problems become UX problems.

**Design systems stop at the UI.** Every mature product team has a design system: component libraries, color tokens, spacing guidelines, interaction patterns. Almost none of them extend that system to documentation. The docs portal has its own navigation, its own typography, its own voice. The user crosses from product to docs and feels a jarring shift. That is a design failure, but the design team does not own it.

## What AI changes

AI is not just another delivery channel. It fundamentally restructures who consumes documentation and how.

**Documentation becomes live infrastructure.** Cherryleaf's 2026 trends analysis puts it bluntly: documentation is no longer just a reference artifact created after development. With AI systems, documentation feeds into live product behavior. When an AI model reads your API documentation to generate code, when a tool exposes your knowledge base as something an assistant can query directly, your documentation becomes part of the product interface. The distinction between docs and product collapses.

**Users stop navigating. They ask.** SoftServe's 2026 review found that users do not want interactive documentation. They want answers without leaving the interface. The docs portal is becoming a fallback, sometimes even just a source of information for AI chatbots. This means the tech writer's carefully designed navigation, table of contents, sidebar structure. Most users never see any of it. They get an answer pulled from content they will never navigate to directly.

**Quality problems become UX problems.** When documentation lives on a portal, a passive voice sentence or an inconsistent term is a minor annoyance. When that same sentence is surfaced by an AI chatbot inside the product, it becomes a UX failure. The chatbot does not fix your prose. It delivers it as-is. Readability problems, terminology gaps, structural issues. They all flow directly into the product experience now.

**The person who structures the content becomes the person who shapes the interface.** This is the insight that matters most. If an AI tool pulls content from your documentation and delivers it to a user, the way you structured that content determines the quality of the interface. Your DITA topic typing, your metadata, your frontmatter, your readability score. None of these are just documentation concerns. They are UX concerns operating at the content layer.

## What the converged model looks like

{{< figure src="/images/converged_docs_ux_pipeline.svg" alt="The converged pipeline—one structured content source flowing through a quality gate into five delivery surfaces (docs portal, in-app help, AI chatbot(s), API reference, personal digital assistant), owned by a documentation engineer" caption="Diagram of the converged documentation–UX pipeline: a single structured content source passes through a quality gate and is delivered consistently across multiple surfaces, all owned and governed by a documentation engineer." class="flow-figure reveal-on-scroll" >}}

One structured content source. Markdown with DITA taxonomy and rich metadata. A quality gate that enforces both documentation standards (terminology, completeness, structure) and UX principles (task-first ordering, readability, progressive disclosure). Five delivery surfaces: docs portal, in-app help, AI chatbot, API reference, and AI assistant queries. One owner: a documentation engineer who understands content structure, quality enforcement, and delivery pipeline design.

This is not theoretical. I built a prototype that demonstrates this model.

DocForge, the Docs-as-Code platform I released last week, includes a Style Linter module that enforces exactly this convergence. The linter does not just check grammar. It runs a TaskFirst rule that flags task topics that open with background context instead of the user's goal (a UX writing principle applied to documentation content). It enforces progressive disclosure by warning when a reference page exceeds 2,500 words. It scores readability against a grade-10 ceiling because content surfaced by AI chatbots needs to be clear at the sentence level, not just clear in context.

The Content Map module applies DITA topic typing (Concept, Task, Reference, Tutorial, Troubleshoot) not as a documentation exercise but as an information architecture exercise. A Concept topic explains what something is. A Task topic tells you how to do it. These are the same content patterns a UX designer uses when deciding whether a tooltip should explain or instruct. The taxonomy just makes them explicit and enforceable.

DocQuery, a search-powered documentation assistant in my portfolio, is the delivery-side proof. It takes the same structured content and delivers it as a conversational interface. The documentation becomes the interface. The quality of the answers depends entirely on how well the content was structured upstream.

## The uncomfortable questions

If this convergence is real, it raises questions that neither discipline has good answers for yet.

**Who owns the quality gate?** If the same content appears on a docs portal, in a tooltip, and in a chatbot answer, whose style guide governs? The tech writer's Microsoft Style Guide rules? The UX designer's product voice guidelines? Both? Neither?

**Who reviews content for multiple delivery contexts?** A tech writer reviews a topic for clarity on a docs page. But that topic will also be extracted by an AI chatbot and delivered as a two-sentence answer. Who reviews it for that context? Today, nobody.

**Where does the tech writer's job end and the UX writer's job begin?** If documentation content appears inside the product interface, is it still documentation? If UX copy references structured content from the docs system, is it still microcopy? The boundary is dissolving, and neither role's job description has caught up.

**What skills does the converged role require?** The UX Writing Hub's 2026 salary data shows a clear premium for technical content designers who can work in Git and work with AI tools. Cherryleaf describes an emerging "documentation product manager" role that could come from technical writing, UX, or content strategy backgrounds. The common thread: whoever demonstrates the combined skills first wins.

## What I think (and what I am building toward)

I do not think UX writers and technical writers need to merge into one role. The craft skills are different. Writing a clear error message is a different skill from architecting a 147-topic documentation set. Both require deep expertise.

What I think needs to change is the pipeline. The content pipeline and the delivery pipeline need to be designed as one system, not two systems that occasionally share content through copy-paste or API calls.

That means documentation needs UX principles built into its quality gates, not bolted on after publication. And product interfaces need structured content systems behind them, not ad hoc copy managed in spreadsheets.

I am building tools that sit at this intersection. DocForge demonstrates what a Docs-as-Code pipeline looks like when UX principles are embedded in the linting and validation layer. DocQuery shows what happens when structured documentation becomes the backend for a conversational interface. DocPulse tracks the health metrics that matter across both worlds.

None of these are finished products. They are prototypes that prove the model works. I am figuring out what the real products look like.

## One question

If you work at the intersection of documentation and product UX, or if you feel the gap between them every day, I want to hear from you.

**Where does your content break when it crosses from docs to product?**

Not a theoretical question. A specific moment. A specific failure. The tooltip that says something different from the docs page. The chatbot that rephrases your carefully worded warning into something misleading. The onboarding flow that duplicates content your team already wrote.

That is the gap I am trying to close. Tell me where it hurts.

---

_Sulagna Sasmal is a Documentation Engineer, Information Architect, and AI Tools Builder. She writes about the systems behind documentation, not just the words inside it._

_Portfolio:_ [_sulagnasasmal.com_](https://sulagnasasmal.com) _· Blog:_ [_sulagnasasmal.github.io/blog_](https://sulagnasasmal.github.io/blog/) _· GitHub:_ [_github.com/SulagnaSasmal_](https://github.com/SulagnaSasmal)
---

title: "Your AI Docs Generator Is Overconfident. Here's What I Built Instead."
date: 2026-03-30
slug: "doccraft-ai-documentation-tool-build-log"
draft: false
tags: ["doccraft", "AI", "technical-writing", "build-log", "tools"]
description: "Every AI documentation tool I tested generated confidently from incomplete information. DocCraft is my attempt to build a tool that thinks like a senior technical writer — asking what's missing before it writes a single word."
discussionPrompt: "When was the last time an AI tool generated documentation that passed your review without edits? Not 'good enough to fix.' Actually passed."

---

Every AI documentation tool I tested made the same kind of mistake.

Not grammatical mistakes. Judgment mistakes. Writing a Getting Started guide when you needed a Troubleshooting reference. Generating an API overview in end-user language for a developer audience. Assuming context the source material never supplied, then producing 600 fluent words built on that assumption.

The tools skipped the step that a senior writer never skips: figuring out what you actually need before you start writing. That is the gap DocCraft is built to close.

DocCraft AI is an intelligent documentation generator built around a single question that most AI writing tools never ask: what is missing from your source material before you write a single word? Every other tool generates immediately. DocCraft analyses first.

{{< demo src="https://doccraft-ten.vercel.app/demo" title="DocCraft AI — Product Demo" height="700" >}}

## Where this started

I have spent years writing enterprise documentation across payment APIs, compliance platforms, and developer portals. In that time I developed a set of instincts that run before I open a blank document.

What am I being asked to document? Is the source material complete enough to write from? What is the audience's technical level, and what do they need to walk away knowing? What is missing from this brief that will become a problem at review?

That process is invisible. It happens in the first fifteen minutes of any documentation engagement. It is also, in my experience, the exact process that AI tools skip entirely.

The first version of DocCraft I built was embarrassingly similar to every other tool. Paste content, configure a doc type, generate. I shipped it and immediately knew it was wrong. It produced fluent output from flawed input. A better autocomplete, not a better documentation process.

The second iteration started with one question: what does a senior technical writer do before they open a blank document?

## What gap analysis actually means

The most common failure in AI documentation is confident output from incomplete input.

The feature I am most proud of is also the one users initially find most annoying. When you upload source material, DocCraft does not generate immediately. It reads first. It identifies what is missing: not what is poorly written, but what is absent.

Gaps surface in three categories. Missing information: facts required to complete the documentation that are not present in the source. Ambiguities: statements that could mean two different things and need clarification before a writer can resolve them. Assumptions: things the source takes for granted that the target audience probably does not know.

Then it asks questions. Not generic questions about audience. Specific, content-aware questions tied directly to what it found. If your API spec describes an endpoint without explaining authentication, it asks about authentication. If your feature description mentions a dashboard but never describes it, it asks about the dashboard.

You can answer the questions, skip them, or tell DocCraft what you know and let it infer the rest.

Ninety seconds of structured input gathering before generation changes what comes out more than any model upgrade or prompt refinement can. Every experienced technical writer I have shown this to has said some version of the same thing: "That's what I do in my head." The gap analysis externalizes the invisible preparatory work and makes it interactive. That is a different kind of tool.

## The compliance check that runs whether you want it to or not

The second thing I got wrong in version one was treating compliance as optional.

DocCraft includes a Microsoft Style Guide compliance checker. It flags passive voice, incorrect heading case, procedure steps that do not start with imperative verbs, forbidden terms like "simply," "just," and "utilize," and terminology drift against any custom glossary you've uploaded.

In the first version, this was a button. Almost nobody pressed it.

Now it runs automatically the moment the document is generated, before you read the draft. Every issue is categorized by severity: errors in red, warnings in amber, suggestions in blue. Each has a one-click fix.

It runs automatically because compliance flags are only useful before you have read the draft and normalized the problems. A flag alongside the first draft gets acted on. A flag three minutes later gets dismissed.

The tool has a point of view about when quality checking should happen, and it enforces that point of view.

## The messy input problem

Documentation work does not start with clean files.

It starts with a 47-slide PowerPoint deck, a Word document with tracked changes, a PDF exported from Confluence that renders half the text as garbage, a screenshot of a whiteboard, and a Slack thread someone copy-pasted into a notes file.

DocCraft accepts TXT, Markdown, CSV, JSON, PNG, JPG, WEBP, GIF, TIFF, PDF, and DOCX. Each format has a different extraction pipeline, because each format fails differently.

PDF files go through `pdf-parse`, backed by Mozilla's PDF.js engine. This matters because modern PDFs encode text using CIDFont with ToUnicode CMap tables, custom character mapping tables that translate internal glyph IDs to Unicode code points. Skip that resolution step and you get garbled output. I know because my first OCR implementation used a hand-rolled latin-1 decoder and produced exactly that on the first PDF a real user uploaded.

Image files go through GPT-4o-mini Vision, which extracts text exactly as it appears, preserving structure, headings, and tables. DOCX files go through Mammoth, which handles tracked changes and preserves heading structure. When a Word document has tracked changes, DocCraft surfaces that fact immediately so the writer knows what they are working with.

Extracted content appears the moment the file is processed, not behind a toggle. DocCraft reads what you actually have. If the extraction is wrong, you know before you have invested time in the workflow.

## What the tool stack actually looks like

I get asked about this regularly so I will be direct.

**Framework:** Next.js 14 with the App Router, TypeScript throughout. Vercel deployment pipeline.

**AI generation:** GPT-4o-mini for generation, compliance checking, inline editing, gap analysis, and image OCR. Not GPT-4o. GPT-4o-mini runs faster and costs roughly 15x less per token. For documentation generation tasks, the quality difference does not justify the cost difference at this scale. Groq integration is available for users who want near-instant streaming on open-source models.

**PDF extraction:** `pdf-parse` (Node.js, PDF.js-backed). Requires the Node.js runtime because the Buffer APIs are not available in the Vercel Edge runtime.

**DOCX parsing:** Mammoth.

**Diagram generation:** Mermaid. The AI generates Mermaid syntax from the document content; the renderer converts it to SVG inline.

**Auth and cloud storage:** Supabase. Generation history is stored in the cloud, not localStorage.

**Analytics:** Vercel Analytics for page-level metrics. PostHog for custom event tracking across generation, compliance runs, export format, and gap analysis engagement. Neither logs content.

**Feedback pipeline:** A floating widget that posts to a custom API route, fires to PostHog, and sends an HTML email via Resend. The email field is optional but validated server-side before the Resend call.

**Deployment:** Vercel. Auto-deploys on every push to main.

## The thing I find genuinely interesting about this project

DocCraft is a documentation tool that produces documentation. That is not the interesting part.

The help center I built for it was written with the same principles DocCraft enforces: task-first structure, sentence case headings, no passive voice, imperative procedure steps. I ran the content through the same compliance checks before publishing.

The AI Help Agent in the tool answers questions about how DocCraft works. It exists because documentation, even well-written documentation, cannot anticipate every specific, contextual, in-the-moment question a first-time user has. The help agent is the answer documentation cannot give.

The feedback widget I shipped is the same idea applied to the product itself. You cannot write good documentation for users you do not talk to. A documentation tool that uses its own documentation philosophy to understand and improve itself: I find that genuinely satisfying and slightly absurd in equal measure.

## Where this goes from here

The gap analysis is the differentiator. That question — what is missing before you write — changes what gets generated in a way that model scaling and prompt engineering cannot replicate.

The compliance check needs to go beyond MSTP. Different organizations have different style guides, and the current custom rule layer handles some of this. It needs more.

Multi-format input is not a nice-to-have for enterprise users. It is the baseline.

The feedback pipeline tells me which of these matters most to people actually using the tool. That is how this gets productized: not by guessing at a feature roadmap, but by watching where the frustrated emoji lands.

{{< demo src="https://doccraft-ten.vercel.app" title="DocCraft AI — Try it live" height="700" >}}

## One question

When was the last time an AI tool generated documentation that passed your review without edits?

Not "good enough to clean up." Not "it gave me a starting point." Actually passed. You read it, approved it, published it without rewriting the structure or correcting the assumptions.

Open DocCraft, upload your next real piece of source material, and run the gap analysis. See what it finds before it writes a word. Then tell me what it missed.

---

*Sulagna Sasmal is a Documentation Engineer and AI Tools Builder with 20 years of enterprise software documentation experience. She builds the systems that create, deliver, and measure documentation, not just the words inside them.*

*Portfolio: [sulagnasasmal.com](https://sulagnasasmal.com) · Blog: [sulagnasasmal.github.io/blog](https://sulagnasasmal.github.io/blog/) · GitHub: [github.com/SulagnaSasmal](https://github.com/SulagnaSasmal) · DocCraft: [doccraft-ten.vercel.app](https://doccraft-ten.vercel.app)*

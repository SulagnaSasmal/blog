---

title: "Your AI Docs Generator Is Overconfident. Here's What I Built Instead."
date: 2026-03-30
slug: "doccraft-ai-documentation-tool-build-log"
draft: false
tags: ["doccraft", "AI", "technical-writing", "build-log", "tools"]
description: "Every AI documentation tool I tested generated confidently from incomplete information. DocCraft is my attempt to build a tool that thinks like a senior technical writer — asking what's missing before it writes a single word."
discussionPrompt: "When was the last time an AI tool generated documentation that passed your review without edits? Not 'good enough to fix.' Actually passed."

---

Every AI documentation tool I tested did the same thing.

You paste your content. You press generate. It writes. Confidently, fluently, and often completely wrong in the specific ways that are hardest to catch — not grammatically wrong, but structurally wrong. Missing the audience. Assuming context that was never supplied. Writing a Getting Started guide when you needed a Troubleshooting reference. Generating a 600-word API overview for a developer audience using language written for an end user.

The tools were not making writing mistakes. They were making judgment mistakes. And they made them because nobody asked the right questions before the writing started.

That is the gap DocCraft is built to close.

{{< demo src="https://doccraft-ten.vercel.app/demo" title="DocCraft AI — Product Demo" height="700" >}}

## Where this started

I have spent years writing and reviewing enterprise documentation. Release notes for payment APIs. Admin guides for compliance platforms. Onboarding flows for developer portals. In that time I have developed a set of instincts that kick in before I write anything.

What am I actually being asked to document? Is the source material complete enough to write from? What is the audience's technical level? What do they need to walk away knowing? What is missing from this brief that will become a problem at review?

That process is invisible. It happens in my head in the first fifteen minutes of any documentation engagement. It is also, in my experience, the exact process that AI tools skip entirely.

The first version of DocCraft I built was embarrassingly similar to every other tool. Paste content. Configure a doc type. Generate. I shipped it and immediately knew it was not what I wanted to build. It produced fluent output from flawed input. It was a better autocomplete, not a better documentation process.

The second iteration was built around one question: what does a senior technical writer do before they open a blank document?

## What gap analysis actually means

The feature I am most proud of in DocCraft is the gap analysis engine, and it is also the feature that users initially find the most annoying.

When you upload your source material, DocCraft does not generate immediately. It reads the content first and identifies what is missing.

Not what is poorly written. What is absent.

It surfaces gaps in three categories. Missing information: facts that would be required to complete the documentation but are not present in the source. Ambiguities: statements that could mean two different things and would need clarification before a writer could resolve them accurately. Assumptions: content the source material takes for granted that the target audience probably does not know.

Then it asks questions. Not generic "tell me about your audience" questions. Specific, content-aware questions tied directly to what it found in the source material. If your API spec describes an endpoint but does not explain the authentication model, it asks about authentication. If your feature description mentions a dashboard but does not describe what it looks like or where it is, it asks about the dashboard.

You can answer the questions, skip them, or tell DocCraft what you know and let it infer the rest.

This is the step that changes the output quality. Not the generation model. Not the prompt engineering behind it. The 90 seconds of structured input gathering before the model writes anything.

Every experienced technical writer I have shown this to has said some version of the same thing: "That's what I do in my head." The gap analysis externalizes the invisible preparatory work. It makes the judgment explicit and interactive instead of leaving it entirely to the model's pattern-matching.

## The compliance check that runs whether you want it to or not

The second thing I got wrong in the first version was treating compliance as optional.

DocCraft includes a Microsoft Style Guide compliance checker. It flags passive voice, Title Case headings that should be Sentence case, procedure steps that do not start with imperative verbs, forbidden terms like "simply" and "just" and "utilize," and a dozen other specific violations. If you have uploaded a custom glossary, it also checks for terminology drift.

In the first version, this was a button you could press after generation. Almost nobody pressed it.

In the current version, it runs automatically the moment the document is generated. You cannot skip it. It surfaces before you reach the editor. Every issue is categorized by severity: errors in red, warnings in amber, suggestions in blue. Each one has a one-click fix.

The reason this matters: compliance checking is only useful if it runs before you have already mentally committed to the draft. The moment a writer has read through a generated document and decided it is good enough to edit, they have already normalized the problems in it. A compliance flag three minutes later gets dismissed. A compliance flag that appears alongside the first draft gets acted on.

This is a behavioral design decision, not a feature decision. The tool has a point of view about when quality checking should happen, and it enforces that point of view.

## The messy input problem

Documentation work does not start with clean Markdown files. It starts with a 47-slide PowerPoint deck, a Word document with tracked changes, a PDF exported from Confluence that renders half the text as garbage, a screenshot of a whiteboard, and a Slack thread someone copy-pasted into a notes file.

This was the third thing the first version of DocCraft got wrong. It accepted text files and paste input. That is not how real source material arrives.

The current version accepts TXT, Markdown, CSV, JSON, PNG, JPG, WEBP, GIF, TIFF, PDF, and DOCX. Each format has a different extraction pipeline.

PDF files go through `pdf-parse`, which is backed by Mozilla's PDF.js engine. This matters because modern PDFs — anything exported from Microsoft Word, Adobe Acrobat, or a professional publishing tool — encode text using CIDFont with ToUnicode CMap tables. These are custom character mapping tables that translate internal glyph IDs to Unicode code points. If you read a PDF without resolving those tables, you get garbled output: ølørls ø ørlørl instead of actual text. I know this because my first OCR implementation used a hand-rolled latin-1 decoder and produced exactly that output on the first PDF a user uploaded. PDF.js resolves the CMap tables correctly.

Image files go through OpenAI Vision (GPT-4o-mini). The prompt instructs it to extract text exactly as it appears, preserving structure, headings, tables, and paragraph breaks. This handles whiteboards, screenshots, scanned documents, and any image where the text cannot be extracted programmatically.

DOCX files go through Mammoth, which preserves heading structure and handles tracked changes. When a Word document has tracked changes, DocCraft notes that insertions have been accepted and deletions have been appended, so the writer knows what they are working with.

The extracted content appears immediately after upload. Not hidden behind a toggle. The moment the file is processed, you see what the tool extracted. If the extraction is wrong, you know before you have configured anything and invested time in the workflow.

## What the tool stack actually looks like

I get asked about this regularly so I will be direct.

**Framework:** Next.js 14 with the App Router. Everything is TypeScript. I chose Next.js because the App Router makes server-side API routes and client-side streaming feel like one coherent system, and the Vercel deployment pipeline is frictionless for a solo project.

**AI generation:** OpenAI GPT-4o-mini for all generation, compliance checking, inline editing, gap analysis, and image OCR. Not GPT-4o. GPT-4o-mini runs faster and costs about 15x less per token. For documentation generation tasks, the quality difference is not worth the cost difference at this scale. I have also built a Groq integration for users who want near-instant streaming on open-source models.

**PDF extraction:** `pdf-parse` (Node.js, PDF.js backed). Requires the Node.js runtime — the Buffer APIs it depends on are not available in the Vercel Edge runtime.

**DOCX parsing:** Mammoth. Handles tracked changes, preserves structure, does not require a Word install.

**Diagram generation:** Mermaid. The AI generates the Mermaid syntax from the document content; the renderer converts it to SVG inline.

**Auth and cloud storage:** Supabase. Auth handles user accounts. The document library stores generation history in the cloud, not just localStorage.

**Analytics:** Vercel Analytics for page-level metrics. PostHog for custom event tracking (generation triggered, compliance check run, export format used, gap analysis questions answered vs. skipped). Neither logs content.

**Feedback pipeline:** A floating widget — emoji mood picker, optional email, optional message — that posts to a custom API route. The route fires to PostHog for trend tracking and sends me an HTML email via Resend. The email field is optional but validated: invalid addresses are caught client-side with a regex check and server-side before the Resend call.

**Deployment:** Vercel. Auto-deploys on every push to main.

## The thing I find genuinely interesting about this project

DocCraft is a documentation tool that produces documentation. That is not a clever observation. Here is the part that I actually find interesting.

The help center I built for DocCraft ([doccraft-help-center](https://sulagnasasmal.github.io/doccraft-help-center/)) was written with the same principles DocCraft enforces. Task-first structure. Sentence case headings. No passive voice. No "simply" or "just." Imperative procedure steps. I ran the content through the same compliance checks before publishing.

The tool has an AI Help Agent — a floating chat widget that answers questions about how DocCraft works. It is powered by OpenAI and pre-loaded with context about every feature. It exists because documentation, even well-written documentation, cannot anticipate every question a first-time user will have. The help agent is the answer to the question documentation cannot answer: the specific, contextual, in-the-moment one.

The feedback widget I shipped this week is the same idea applied to the tool itself. A documentation tool that practices what it preaches about user feedback loops. You cannot write good documentation for users you do not talk to. The feedback mechanism is how I find out what the gap analysis missed, what the compliance check gets wrong, and what the tool does not do that people actually need.

A documentation tool that uses its own documentation philosophy to document and improve itself. I find that genuinely satisfying and slightly absurd in equal measure.

## Where this goes from here

What I know:

The gap analysis is the differentiator. No other tool I have tested asks what is missing before generating. That step changes the output quality in a way that better prompting or a larger model does not.

The compliance check needs to be customizable beyond MSTP. Different organizations have different style guides. The current custom rule layer handles some of this. It needs more.

Multi-format input is not a nice-to-have for enterprise users. It is the baseline. Source material arrives in every format except the one your tool expects.

The feedback pipeline I shipped this week will generate data that tells me which of these three things matters most to the people actually using the tool. That is how this gets productized: not by guessing at a feature set, but by watching where the frustrated emoji lands.

{{< demo src="https://doccraft-ten.vercel.app" title="DocCraft AI — Try it live" height="700" >}}

## One question

I want to be specific about what I am curious about.

**When was the last time an AI tool generated documentation that passed your review without edits?**

Not "good enough to clean up." Not "it gave me a starting point." Actually passed. You read it, you approved it, you published it without rewriting the structure or correcting the assumptions.

If your answer is never, I want to know what it got wrong. That is the gap DocCraft is designed to close, and I am still learning exactly where it is.

---

_Sulagna Sasmal is a Documentation Engineer, Information Architect, and AI Tools Builder. She writes about the systems behind documentation, not just the words inside it._

_Portfolio:_ [_sulagnasasmal.com_](https://sulagnasasmal.com) _· Blog:_ [_sulagnasasmal.github.io/blog_](https://sulagnasasmal.github.io/blog/) _· GitHub:_ [_github.com/SulagnaSasmal_](https://github.com/SulagnaSasmal) _· DocCraft:_ [_doccraft-ten.vercel.app_](https://doccraft-ten.vercel.app)

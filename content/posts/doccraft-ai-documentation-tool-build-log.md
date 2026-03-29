---

title: "I Built the AI Documentation Tool I Actually Wanted to Use"
date: 2026-03-30
slug: "doccraft-ai-documentation-tool-build-log"
draft: false
tags: ["doccraft", "AI", "technical-writing", "build-log", "tools"]
description: "Not a prompt wrapper. Not a fancier autocomplete. A tool that thinks the way technical writers think, before it writes a single word."
discussionPrompt: "When was the last time an AI tool generated documentation that passed your review without edits? Not 'good enough to fix.' Actually passed."

---

Every technical writer I know has the same complicated relationship with AI documentation tools.

You try one. It generates fast, fluent, confidently structured output. You read it and immediately know something is wrong, but it takes a minute to place exactly what. The audience is off. The doc type does not match what the source material actually supports. There are three paragraphs explaining a concept the target reader already knows, and no explanation of the thing they actually need. The tool wrote well. It just wrote the wrong thing.

You spend the next hour fixing it. At some point you do the math and realize you would have been faster starting from scratch.

I built DocCraft because I was tired of doing that math.

{{< demo src="https://doccraft-ten.vercel.app/demo" title="DocCraft AI — Product Demo" height="700" >}}

## The problem is not the writing. It is what happens before the writing.

I have spent twenty years writing enterprise documentation: payment APIs, compliance platforms, developer portals, admin guides for regulated industries. In that time I developed a set of instincts that kick in before I open a blank document.

What am I actually being asked to document? Is the source material complete enough to write from? What does this audience already know, and what do they need to walk away knowing? What is missing from this brief that will become a problem at review?

That preparatory process is invisible. It happens in the first fifteen minutes of any documentation engagement, and it is the difference between a draft that needs light editing and a draft that needs to be thrown out.

AI tools skip it entirely. They take whatever you give them and generate. The output quality is bounded by the input quality, but they never tell you that. They just write.

That is the gap I built DocCraft to close.

## What this means for your actual workday

Here is where DocCraft is different, in the specific ways that affect real documentation work.

### When your source material is incomplete

Upload whatever you have: a spec, meeting notes, a Confluence export, a screenshot of a whiteboard. DocCraft reads it before it generates anything. It identifies what is missing, what is ambiguous, and what the source assumes your audience already knows. Then it asks you targeted questions, not generic ones. If your API spec does not explain authentication, it asks about authentication. If your feature description mentions a dashboard without describing it, it asks about the dashboard.

You can answer the questions, skip them, or give DocCraft what you know and let it infer the rest. Either way, you are getting output built on a cleaner brief, not a confidently wrong interpretation of an incomplete one.

This is the step that saves the hour you would have spent fixing a draft that missed the point.

### When AI output keeps missing the audience

Most tools treat audience as a dropdown. Technical or non-technical. DocCraft treats it as a constraint that runs through the entire generation. Developer audience means no passive constructions explaining concepts they already own. End-user audience means no API jargon without definition. The output is shaped by audience from the first sentence, not corrected for it afterward.

### When compliance checking eats your afternoon

The Microsoft Style Guide compliance check runs automatically the moment DocCraft generates a document. You do not press a button. You do not remember to run it before you submit. It surfaces before you reach the editor, categorized by severity: errors in red, warnings in amber, suggestions in blue, each with a one-click fix.

The behavioral reason this matters: the moment you have read through a draft and decided it is good enough to edit, you have already normalized the problems in it. A compliance flag that arrives three minutes later gets dismissed. One that arrives alongside the first draft gets fixed. The tool enforces the right moment for quality checking, not the convenient one.

### When source material arrives in the wrong format

DocCraft accepts TXT, Markdown, CSV, JSON, PDF, DOCX, PNG, JPG, WEBP, GIF, and TIFF. Each format has its own extraction pipeline because each format fails differently.

PDFs go through pdf-parse, backed by Mozilla's PDF.js engine, which correctly resolves the character mapping tables that cause garbled output in most OCR implementations. Images go through GPT-4o-mini Vision. DOCX files go through Mammoth, which handles tracked changes and preserves heading structure. Whatever arrives in your inbox, DocCraft can read it.

Extracted content appears immediately after upload, not behind a toggle. If the extraction is wrong, you know before you have invested time in the rest of the workflow.

## How I built it and why those decisions matter to you

The first version of DocCraft was embarrassingly similar to every other tool. Paste content, configure a doc type, generate. I shipped it, used it on a real documentation task, and knew within twenty minutes it was not what I wanted to build. Fluent output from a flawed brief is still a flawed document. I had built a faster version of the problem.

The second version started from a different question: what does a senior technical writer do before they open a blank document? The gap analysis engine is the answer to that question made interactive.

The tech stack is intentional at every layer. Next.js 14 with the App Router because server-side API routes and client-side streaming feel like one coherent system, not a duct-taped integration. GPT-4o-mini over GPT-4o because for documentation generation tasks the quality difference does not justify a 15x cost difference, and faster generation means a tighter feedback loop during the gap analysis step. Supabase for auth and cloud storage so your generation history lives in the cloud, not your browser's localStorage. PostHog for event tracking so I can see where the workflow breaks down for real users, not just where I assumed it would.

The help center for DocCraft was written using the same principles DocCraft enforces. Sentence case headings, imperative procedure steps, no passive voice. I ran it through the same compliance check before publishing. A documentation tool that cannot document itself well is not a documentation tool worth using.

## What I want from you

DocCraft is live at [doccraft-ten.vercel.app](https://doccraft-ten.vercel.app). It is free to use. I want you to try it on a real piece of work, not a toy example. Upload the messy PDF your SME sent you. Paste the incomplete spec. Use the audience and doc type that actually matches your next deliverable.

Then tell me what it got wrong.

The feedback widget is in the tool. Use it. The gap analysis is only as good as the gaps I know about, and I am still learning exactly where it breaks down for working writers in real documentation environments. Your frustrated emoji is more useful to me right now than your polite approval.

If you want to follow the build as it develops, I write about documentation systems, not just documentation, at [sulagnasasmal.github.io/blog](https://sulagnasasmal.github.io/blog/). The next post covers what the feedback data from the first month of real users actually showed, and what I am building because of it.

{{< demo src="https://doccraft-ten.vercel.app" title="DocCraft AI — Try it live" height="700" >}}

---

*Sulagna Sasmal is a Documentation Engineer and AI Tools Builder with 20 years of enterprise software documentation experience. She builds the systems that create, deliver, and measure documentation, not just the words inside them.*

*Portfolio: [sulagnasasmal.com](https://sulagnasasmal.com) · Blog: [sulagnasasmal.github.io/blog](https://sulagnasasmal.github.io/blog/) · GitHub: [github.com/SulagnaSasmal](https://github.com/SulagnaSasmal) · DocCraft: [doccraft-ten.vercel.app](https://doccraft-ten.vercel.app)*

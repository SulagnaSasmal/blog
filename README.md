# Blog

Hugo blog deployed to GitHub Pages via GitHub Actions.

**Theme**: [PaperMod](https://github.com/adityatelange/hugo-PaperMod) (git submodule)
**Live URL**: https://sulagnasasmal.github.io/blog/

## Local development

```bash
# First time: install Hugo Extended
# https://gohugo.io/installation/

hugo server -D        # serve with drafts
hugo new posts/my-post.md   # new post
```

## Publishing

Push to `main` → GitHub Actions builds and deploys automatically.

## Repo structure

```
blog/
├── .github/workflows/deploy.yml   # CI/CD
├── archetypes/default.md          # post template
├── content/
│   ├── posts/                     # blog posts
│   └── about.md
├── static/                        # images, files
├── themes/PaperMod/               # git submodule
└── hugo.toml                      # site config
```

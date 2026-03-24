---
description: Updating and maintaining the GitHub Profile README at the repository root.
---

# Profile README Maintenance Instructions

## Data Integration Constraints
- **Active Skills Filter**: When updating the `<!-- START_SKILLS -->` DOM, strictly insert technologies flagged with `[Active ...]` inside `01_profile.md`. 
- **Snake Animation Path**: The automated contribution graph must target the output branch exclusively: `https://raw.githubusercontent.com/TheDevelopersWork/developerswork/output/snake.svg`.

## Widget & Badge Styling
- **Badge Consistency**: All skills and social contact points must use `img.shields.io` badges configured with `style=for-the-badge`.
- **Alignment Geometry**: Wrap main headers, badges, and stats cards inside `<div align="center">` or `<h4 align="center">` for layout parity. Maintain clean empty spaces with `<br/>`.
- **GIF Optimization**: Decorative GIFs (e.g., Giphy) must be clamped to `width="30"` for inline typography.
- **Telemetry Preservation**: Never remove or alter the active themes (e.g., `theme=radical`) on existing third-party tracking widgets (`github-readme-activity-graph`, `streak-stats`, `gh-trophy`).

# Portfolio Implementation Rules

## Interactive Gamification Patterns
1. **Dynamic Hover & Pin States**: Dense information (like Experience bullets and Project technical details) should be hidden behind a minimalist initial card view. Users reveal details via smooth hover transitions or by clicking an explicitly mapped "Pin" action using Lucide-React icons (e.g., `<Pin />`). 
2. **Hidden Scrollbars**: Global sections requiring horizontal overflow mapping (such as the Professional Experience timeline) must employ a `.no-scrollbar` CSS utility to maintain premium visual aesthetics while retaining native scroll functionalities.
3. **Floating UI Details**: Essential metadata (like Activity tags, Completion statuses, Timeline segments) need to float securely within relative containers to anchor their structural layout.

## Markdown Data Handlers
1. **Logo & Asset Mapping**: When parsing metadata references like tech certifications or course development blocks, inject responsive SVG icons tailored directly to vendors (e.g., Azure mapping to `devicon` libraries or `Database`/`Cloud`/`Gamepad2` mapping via Lucide) based explicitly on text matches.
2. **Hard Markdown Escaping**: All helper logic iterating through the generic XYZ bullet layouts must rigorously strip bold `**` or italic indicators inside string blocks before final React DOM bindings to keep the interface clean (`.replace(/\*\*/g, '')`). 

## Styling Architecture
- **Drop Shadows & Glow Effects**: Utilize Tailwind `shadow-[...]` injections for prominent active UI components (like the current job timeline dot) and apply text-shadow filtering over primary header titles globally.
- **Micro-Animations**: Employ `animate-in`, `fade-in`, and delayed slide hooks across core sections so none appear statically on page load. All transitions must use long-duration easing scales (e.g., `duration-500 delay-300`).

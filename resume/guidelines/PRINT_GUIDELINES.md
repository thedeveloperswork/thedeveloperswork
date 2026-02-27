# Print Fidelity Standards

## Page Break & Gap Management
- **Rule:** Set `break-inside: auto` for the main `Experience` section.
- **Rule:** If a section leaves a large gap, remove `break-inside: avoid` from its parent container.

## Horizontal Alignment
- **Gutter Safety:** Maintain `padding-left: 3.5rem !important` in the print media query.
- **Bubble Visibility:** Ensure `overflow: visible` is set on the container to prevent timeline dots from being clipped.

## Layout Consistency
- **Competency Grid:** Always force 2 columns (`grid-cols-2`) for A4 print density.
- **Project Display:** Force 1 column (`grid-cols-1`) to prevent card overcrowding.
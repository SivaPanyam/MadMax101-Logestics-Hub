---
name: Supply Chain Intelligence
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

## Brand & Style

The design system is engineered for high-stakes logistics and global supply chain management. It prioritizes "Signal over Noise," ensuring that in a data-dense environment, critical insights are immediately visible. The personality is authoritative, precise, and sophisticated—evoking the feeling of a mission control center.

The style is **Modern/Corporate** with integrated **Glassmorphism**. It utilizes a "layered dark mode" approach to create a sense of physical architecture within the digital interface. By combining crisp, thin borders with subtle translucency, the design system maintains a professional enterprise aesthetic while feeling cutting-edge and lightweight.

## Colors

The palette is optimized for long-duration monitor usage in professional settings. 

- **Core Neutrals:** A deep Slate (#0f172a) serves as the foundation, providing high contrast for text. Surface containers use a lighter Charcoal (#1e293b) to define hierarchy without relying on heavy shadows.
- **Primary Action:** A crisp, high-saturation Blue is reserved for primary calls-to-action and active states, ensuring focus.
- **Semantic States:** A rigorous traffic-light system is employed for data visualization. Emerald Green denotes "Healthy/Optimized," Amber signifies "At Risk/Delay," and Rose/Crimson is used exclusively for "Critical Failure/High Risk." 
- **Borders:** All UI borders use a low-opacity white (10-15%) or a slightly lighter slate to maintain structural definition.

## Typography

The design system employs **Inter** for its unparalleled legibility and neutral character in UI applications. To contrast the fluid nature of the body text, **Space Grotesk** is used for data points, coordinates, and telemetry, providing a technical, geometric feel that reinforces the "Smart" nature of the product.

- **Hierarchical Contrast:** Large headings use tight letter spacing and heavy weights. 
- **Utility Labels:** Small uppercase labels with increased tracking are used for metadata and category headers.
- **Tabular Data:** Space Grotesk is the default for all numeric values and IDs to ensure character alignment and a distinct visual "technical" texture.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model based on a 12-column architecture. The layout is designed to be high-density, maximizing the information visible above the fold without sacrificing readability.

- **Rhythm:** A strictly enforced 4px baseline grid ensures consistent vertical rhythm.
- **Density:** Padding within cards and table cells is kept tight (8px to 12px) to allow for the massive data sets typical of supply chain monitoring.
- **Structure:** Content is organized into modular cards that span the grid. Margins between the edge of the viewport and content are set to 24px, while gutters between internal modules are 16px to maintain clear separation.

## Elevation & Depth

Depth in the design system is communicated through **Tonal Layers** and **Glassmorphism**, rather than traditional heavy drop shadows.

1.  **Level 0 (Base):** Deep Slate (#0f172a).
2.  **Level 1 (Cards/Modules):** Charcoal (#1e293b) with a 1px subtle border.
3.  **Level 2 (Modals/Overlays):** Semi-transparent Charcoal with a `backdrop-filter: blur(12px)`. This creates a frosted-glass effect that maintains context of the background data.
4.  **Shadows:** When used, shadows are highly diffused (20px-40px blur) with very low opacity (25%) and a slight tint of the background color to avoid "dirty" gray artifacts.

## Shapes

The design system uses a **Soft (Level 1)** shape language. The goal is to provide enough rounding to feel modern and approachable, but sharp enough to maintain a sense of precision and professional "industrial" utility.

- **Base Corner Radius:** 0.25rem (4px) for small elements like checkboxes and tags.
- **Container Radius:** 0.5rem (8px) for cards and primary buttons.
- **Large Radius:** 0.75rem (12px) for major modal containers.
- **Consistency:** All borders must be 1px in thickness to maintain the "thin-line" aesthetic.

## Components

The component library emphasizes data clarity and actionable intelligence.

- **Buttons:** Primary buttons use the crisp blue with white text. Secondary buttons use a "Ghost" style with a 1px slate border and transparent background, highlighting the blue text.
- **Status Badges (Chips):** Minimalist with a subtle background tint (10% opacity) and high-contrast text using the semantic color palette (Emerald, Amber, Rose).
- **Data Tables:** High-density rows with 1px horizontal dividers. "Zebra striping" is avoided in favor of hover-state highlights to keep the UI clean.
- **Cards:** Defined by a 1px border and the L1 surface color. Integrated "Glass" headers are used for section titles to provide a premium feel.
- **Input Fields:** Darker than the surface color to create a "recessed" look, utilizing the primary blue for the focus ring.
- **KPI Widgets:** Large-scale numbers in Space Grotesk with a micro-sparkline at the bottom for 24-hour trend visualization.

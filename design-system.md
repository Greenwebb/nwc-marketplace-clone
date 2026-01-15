# Motta Marketplace Design System

## Color Palette

### Primary Colors
| Name | RGB | Hex | Usage |
|------|-----|-----|-------|
| Primary Blue | rgb(17, 36, 143) | #11248F | Header background, primary buttons, links |
| Primary Blue Dark | rgb(29, 33, 40) | #1D2128 | Text, dark elements |
| Coral/Sale Red | rgb(216, 18, 93) | #D8125D | Sale badges, deals section |
| Orange Accent | rgb(255, 115, 22) | #FF7316 | Hot badges, accents |
| Yellow Accent | rgb(255, 161, 50) | #FFA132 | Stars, logo dot |

### Neutral Colors
| Name | RGB | Hex | Usage |
|------|-----|-----|-------|
| Text Primary | rgb(29, 33, 40) | #1D2128 | Main text, headings |
| Text Secondary | rgb(40, 44, 51) | #282C33 | Body text |
| Text Muted | rgb(124, 129, 139) | #7C818B | Secondary text, labels |
| Border | rgb(218, 223, 227) | #DADFE3 | Borders, dividers |
| Background Light | rgb(236, 240, 244) | #ECF0F4 | Light backgrounds |
| White | rgb(255, 255, 255) | #FFFFFF | Cards, main background |

### Status Colors
| Name | RGB | Hex | Usage |
|------|-----|-----|-------|
| Sale Badge BG | rgba(255, 51, 28, 0.12) | - | Sale badge background |
| Hot Badge BG | rgba(255, 116, 23, 0.12) | - | Hot badge background |
| Error/Sale | rgb(255, 89, 81) | #FF5951 | Error states, sale prices |

## Typography

### Font Family
- **Primary Font**: Outfit, Arial, sans-serif
- **Fallback**: Arial, sans-serif

### Font Sizes & Weights
| Element | Size | Weight | Line Height | Color |
|---------|------|--------|-------------|-------|
| H1 (Hero Title) | 30px | 700 | 45px | #1D2128 |
| H2 (Section Title) | 24px | 700 | 32px | #1D2128 |
| H3 (Subsection) | 18px | 600 | 24px | #1D2128 |
| Body Text | 16px | 400 | 24px | #282C33 |
| Product Title | 14px | 400 | 18px | #1D2128 |
| Price | 14px | 700 | 18px | #1D2128 |
| Category Label | 12px | 400 | 16px | #7C818B |
| Small Text | 12px | 400 | 16px | #7C818B |
| Button Text | 14-16px | 500 | - | varies |

## Spacing System

### Base Unit: 4px
| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Small gaps |
| md | 16px | Standard spacing |
| lg | 24px | Section padding |
| xl | 32px | Large gaps |
| 2xl | 48px | Section margins |
| 3xl | 64px | Page sections |

## Component Specifications

### Header
| Property | Value |
|----------|-------|
| Height | 86px |
| Background | #11248F (Primary Blue) |
| Container Max Width | 1265px |
| Padding | 0 |

### Benefits Bar (Below Header)
| Property | Value |
|----------|-------|
| Height | ~40px |
| Background | White |
| Border Bottom | 1px solid #DADFE3 |
| Font Size | 14px |
| Icon Size | 20px |
| Gap Between Items | Equal distribution |

### Logo
| Property | Value |
|----------|-------|
| Font Size | 30px |
| Font Weight | 700 |
| Color | White (on dark header) |
| Font Family | Outfit |
| Yellow Dot | After "Motta" text |

### Categories Button
| Property | Value |
|----------|-------|
| Height | 46px |
| Background | Transparent (on header) |
| Border | 1px solid rgba(255,255,255,0.2) |
| Border Radius | 2px |
| Padding | 0 18px |
| Font Size | 16px |
| Font Weight | 400 |
| Color | White |
| Icon | Grid (4 squares) + Dropdown arrow |

### Search Bar
| Property | Value |
|----------|-------|
| Width | ~527px (flexible) |
| Height | 48px |
| Background | White |
| Border | 1px solid #DADFE3 |
| Border Radius | 2px |
| Placeholder | "Search for anything" |
| Icon Position | Right side |
| Font Size | 14px |

### Product Card
| Property | Value |
|----------|-------|
| Background | White |
| Border | None (or subtle shadow on hover) |
| Border Radius | 0 |
| Padding | 0 |
| Image Aspect Ratio | 1:1 (square) |
| Category Font | 12px, #7C818B |
| Title Font | 14px, 400, #1D2128 |
| Price Font | 14px, 700, #1D2128 |
| Vendor Font | 12px, #7C818B |
| Rating Stars | 12px, #FFA132 |
| Hover Actions | Add to cart, Compare, Wishlist |

### Badges
| Type | Background | Text Color | Border Radius |
|------|------------|------------|---------------|
| Sale | rgba(255,51,28,0.12) | #FF331C | 2px |
| Hot | rgba(255,116,23,0.12) | #FF7417 | 2px |
| New | #11248F | White | 2px |

### Buttons
| Type | Background | Text | Border | Border Radius | Height | Padding |
|------|------------|------|--------|---------------|--------|---------|
| Primary | #11248F | White | None | 2px | 46px | 0 24px |
| Secondary/Outline | Transparent | #1D2128 | 1px solid #DADFE3 | 2px | 46px | 0 24px |
| Text Link | Transparent | #11248F | None | 0 | auto | 0 |

## Breakpoints

| Name | Min Width | Max Width | Description |
|------|-----------|-----------|-------------|
| Mobile | 0 | 767px | Single column, hamburger menu |
| Tablet | 768px | 1023px | 2-3 columns, condensed header |
| Desktop | 1024px | 1279px | Full layout, 4-6 columns |
| Large Desktop | 1280px+ | - | Max container width |

## Container
| Property | Value |
|----------|-------|
| Max Width | 1265px |
| Padding (Desktop) | 0 15px |
| Padding (Mobile) | 0 15px |
| Margin | 0 auto |

## Hero Carousel
| Property | Value |
|----------|-------|
| Height | 388px (desktop) |
| Background | Light gray gradient |
| Layout | 50% content left, 50% image right |
| Badge | "NEW ARRIVALS" - uppercase, #11248F |
| Title | 30px, 700, multi-line |
| Description | 16px, 400, #7C818B |
| Navigation Arrows | 40px circles, white bg, positioned at edges |
| Dots | 8px circles, active = #11248F |

## Category Grid
| Property | Value |
|----------|-------|
| Layout | Horizontal scroll on mobile, grid on desktop |
| Items | 9 categories |
| Card Size | ~100px x 100px |
| Image | Product silhouette |
| Label | 12px, center aligned |
| Gap | 16px |

## Daily Deals Section
| Property | Value |
|----------|-------|
| Background | Coral gradient with decorative shapes |
| Badge | "DEAL OF THE DAYS" - uppercase |
| Timer | HH:MM:SS format, white bg pills |
| Title | "Daily Deals" - 24px, 700, white |
| Button | Coral/red filled |

## Featured Offers Cards
| Property | Value |
|----------|-------|
| Layout | 4 cards in grid |
| Card Height | ~200px |
| Background | Gradient with product image |
| Badge | "Free $50" or "Save 25%" large text |
| Button | "Shop Now" link |

## Trending Brands
| Property | Value |
|----------|-------|
| Layout | Horizontal carousel |
| Logo Size | ~80px height |
| Brands | Samsung, Lenovo, Apple, Sony, Intel, Asus, Acer, LG |
| Gap | 40px |

## Footer
| Property | Value |
|----------|-------|
| Background | White |
| Border Top | 1px solid #DADFE3 |
| Columns | 4 link columns + newsletter |
| Column Titles | 14px, 700, #1D2128 |
| Links | 14px, 400, #7C818B |
| Newsletter Input | Same as search bar |
| Social Icons | 24px, #7C818B |
| Payment Icons | Visa, Mastercard, PayPal, etc. |
| Copyright | 12px, #7C818B |

## Animation & Transitions
| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Hover States | all | 200ms | ease |
| Carousel Slide | transform | 500ms | ease-in-out |
| Dropdown Open | opacity, transform | 200ms | ease |
| Button Hover | background-color | 150ms | ease |

## Shadows
| Name | Value | Usage |
|------|-------|-------|
| Card Hover | 0 4px 12px rgba(0,0,0,0.1) | Product cards on hover |
| Dropdown | 0 8px 24px rgba(0,0,0,0.15) | Mega menus, dropdowns |
| Modal | 0 16px 48px rgba(0,0,0,0.2) | Modals, dialogs |

# Shop Page Filter Sidebar Analysis - Motta Site

## Key Observations from Original Site

### Filter Sidebar Layout
- **Position**: Left sidebar on desktop
- **Width**: Approximately 280-300px
- **Background**: White
- **Sticky**: Filter sidebar appears to be fixed/sticky on scroll

### Filter Header
- **Title**: "Filter" with filter icon
- **Clear All Button**: Top right, removes all active filters
- **Active Filters**: Show as removable tags below header (e.g., "Networking" with X button)

### Categories Section
- **Expandable**: Category tree with expand/collapse arrows
- **Hierarchy**: Shows parent and child categories with indentation
- **Count**: Number of products in parentheses next to each category
- **Selected**: Highlighted/bold when active
- **Example Structure**:
  - All Categories (91)
  - Networking (3)
    - All Wi-Fi & Networking (1)
    - Find Your Wi-Fi Solution (1)
    - Mesh Wi-Fi (8)
    - Modems (4)
    - Network Switches (2)

### Price Range Filter
- **Input Fields**: Two number inputs (Min and Max)
- **Placeholders**: "Min" and "Max"
- **Apply Button**: Blue button to apply price filter
- **Style**: Simple text inputs with border

### Brand Filter
- **Search Box**: "Search product brands" input at top
- **Checkboxes**: List of brands with checkboxes
- **Count**: Number of products per brand in parentheses
- **Scrollable**: If many brands, section is scrollable

### Filter Behavior
- **Collapsible Sections**: Each filter section can expand/collapse
- **Multiple Selection**: Can select multiple filters within a section
- **Instant Update**: Products update when filter is applied
- **Active State**: Selected filters show in "Refine by" section at top

### Sort Dropdown
- **Location**: Top right above products
- **Options**: Default, Popularity, Average rating, Latest, Price: low to high
- **Style**: Standard select dropdown

### View Toggle
- **Icons**: Grid view icons (2, 3, 4 columns)
- **Location**: Next to sort dropdown
- **Active State**: Selected view is highlighted

## Mobile Behavior
- Filter sidebar becomes a slide-out drawer
- Triggered by "Filter" button
- Overlay background when open
- Close button in drawer header

## Design Elements to Implement

1. **Collapsible filter sections** with expand/collapse icons
2. **Active filter tags** with remove buttons
3. **Category tree** with proper hierarchy and counts
4. **Price range inputs** with Apply button
5. **Brand search** with checkbox list
6. **Sticky sidebar** on desktop
7. **Mobile filter drawer** with overlay
8. **View toggle icons** for grid layout options

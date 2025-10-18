# Santa Cruz Architectural Styles Reference

This document provides reference information for the 12 main architectural styles found in Santa Cruz. Each style has been assigned a unique color in the application for easy visual identification.

## Style Definitions

### 1. Victorian (Pink Badge)
**Includes:** Stick-Eastlake and Queen Anne styles

Many homes showcase the intricate, decorative woodwork and vibrant colors characteristic of this late 19th-century era. Eastlake, often seen in combination with Stick style, is particularly notable in Santa Cruz.

**Key Features:**
- Intricate decorative woodwork
- Vibrant colors
- Late 19th-century
- Ornate details

---

### 2. Spanish Colonial Revival (Red Badge)
This style draws on California's mission heritage with white stucco walls, red tile roofs, arched entryways, and courtyards.

**Example:** Cocoanut Grove building on the Santa Cruz Beach Boardwalk

**Key Features:**
- White stucco walls
- Red tile roofs
- Arched entryways
- Courtyards
- Mission heritage influence

---

### 3. Craftsman Bungalow (Orange Badge)
A very popular residential style emphasizing simple forms and natural materials like local redwood.

**Key Features:**
- Low-pitched roofs
- Overhanging eaves
- Large front porches
- Natural materials (especially redwood)
- Simple, honest forms
- Common in older neighborhoods

---

### 4. Coastal / Beach Bungalow (Sky Blue Badge)
This style is uniquely adapted to Santa Cruz's seaside environment and laid-back surf culture.

**Key Features:**
- Indoor-outdoor living emphasis
- Large windows
- Casual, relaxed design
- Seaside adaptation
- Surf culture influence

---

### 5. Western Ranch (Purple Badge)
Introduced in post-WWII suburban developments, common in residential tracts throughout Santa Cruz County.

**Key Features:**
- Single-story layout
- Horizontal emphasis
- Low-pitched gable roofs
- Post-WWII suburban style

---

### 6. Mid-Century Modern (Indigo Badge)
Reflecting post-war trends, characterized by clean, functional lines.

**Examples:** Found in residences and on the UCSC campus

**Key Features:**
- Clean, functional lines
- Large windows
- Seamless integration with nature
- Post-war aesthetic
- Minimalist approach

---

### 7. Adobe (Amber/Brown Badge)
The use of sun-dried clay and earth bricks represents the city's earliest architectural history.

**Example:** Neary-Rodriguez Adobe

**Key Features:**
- Sun-dried clay and earth bricks
- Earliest architectural history
- Significant historical landmarks
- Traditional construction methods

---

### 8. Art Deco / Moderne (Rose Badge)
Common in commercial and civic buildings constructed in the 1930s and 1940s.

**Example:** Del Mar Theatre

**Key Features:**
- Streamlined forms
- Rounded corners
- Geometric patterns
- 1930s-1940s era
- Commercial and civic buildings

---

### 9. Mission Revival (Yellow/Gold Badge)
This style explicitly mimics California's historic missions. Distinct from the more ornate Spanish Colonial Revival style.

**Key Features:**
- Arcaded walkways
- Curvilinear parapet gables
- Mission-inspired details
- Simpler than Spanish Colonial Revival

---

### 10. Contemporary / Sustainable (Green Badge)
Modern buildings prioritizing sustainability, energy efficiency, and eco-friendly aesthetics.

**Example:** Seymour Marine Discovery Center

**Key Features:**
- Sustainability focus
- Energy efficiency
- Minimalist aesthetic
- Eco-friendly materials and design
- Modern construction

---

### 11. Italianate (Cyan Badge)
A sub-style of Victorian, prominent during Santa Cruz's mid-19th-century growth.

**Key Features:**
- Low-hipped roofs
- Tall, narrow windows
- Wide, overhanging eaves
- Mid-19th century
- Victorian influence

---

### 12. Shingle Style (Violet Badge)
Late 19th-century style emphasizing natural materials.

**Key Features:**
- Continuous wood-shingle facade
- Natural materials emphasis
- Late 19th century
- Less common than Stick-Eastlake
- Visible in historic areas

---

## Color System

Each architectural style is assigned a specific color for visual identification:

- **Victorian**: Pink
- **Spanish Colonial Revival**: Red
- **Craftsman Bungalow**: Orange
- **Coastal / Beach Bungalow**: Sky Blue
- **Western Ranch**: Purple
- **Mid-Century Modern**: Indigo
- **Adobe**: Amber/Brown
- **Art Deco / Moderne**: Rose
- **Mission Revival**: Yellow/Gold
- **Contemporary / Sustainable**: Green
- **Italianate**: Cyan
- **Shingle Style**: Violet
- **N/A** (Not Applicable): Gray

## Usage in Timeline Entries

When creating a new timeline entry in the `src/content/timeline/` directory, use the exact style name from the list above:

```yaml
architecturalStyle: "Craftsman Bungalow"
```

If the entry is not a building or the style is unknown, simply omit the field or leave it empty, and it will display as "N/A" with a gray badge.

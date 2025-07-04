# Linkable Headings Implementation

This document describes the implementation of linkable headings in the Next.js MDX application.

## Overview

The linkable headings feature provides:
- **Automatic ID generation** for all headings (h1-h4)
- **Hover effects** that show anchor links
- **Smooth scrolling** when clicking anchor links
- **URL updates** with heading IDs
- **Accessibility** support with proper ARIA labels
- **Responsive design** that works on all screen sizes

## Components

### 1. LinkableHeading Component
**File**: `components/LinkableHeading.tsx`

A reusable component that wraps any heading element and adds:
- Unique ID generation using the `slugify` function
- Anchor link that appears on hover
- Smooth scrolling behavior
- URL state management

**Usage**:
```jsx
<LinkableHeading level="h2" style={{ color: 'blue' }}>
  My Heading
</LinkableHeading>
```

### 2. TableOfContents Component
**File**: `components/TableOfContents.tsx`

A dynamic table of contents that:
- Automatically detects all headings on the page
- Generates clickable links to each heading
- Supports configurable depth levels
- Provides smooth scrolling navigation

**Usage**:
```jsx
<TableOfContents className="my-4" maxDepth={3} />
```

## Utilities

### 1. Slugify Function
**File**: `lib/slugify.js`

Converts heading text to URL-friendly slugs:
```javascript
import { slugify, generateHeadingId } from '../lib/slugify';

slugify("My Heading!") // "my-heading"
generateHeadingId("My Heading", "h2") // "h2-my-heading"
```

### 2. Heading Utils
**File**: `lib/headingUtils.js`

Utility functions for working with headings:
- `getAllHeadings()` - Get all headings from the current page
- `scrollToHeading(id)` - Scroll to a specific heading
- `generateTableOfContents(headings)` - Generate TOC data
- `testHeadingId(text, level)` - Test ID generation

## Styling

### CSS Module
**File**: `components/LinkableHeading.module.css`

Provides:
- Hover effects for anchor links
- Responsive design adjustments
- Accessibility focus styles
- Smooth transitions

## MDX Integration

The linkable headings are automatically applied to all MDX content through the `mdx-components.js` file:

```javascript
// mdx-components.js
import LinkableHeading from "./components/LinkableHeading";

export function useMDXComponents(components) {
  const defaultComponents = {
    h1: ({ children }) => (
      <LinkableHeading level="h1" style={{...}}>
        {children}
      </LinkableHeading>
    ),
    h2: ({ children }) => (
      <LinkableHeading level="h2" style={{...}}>
        {children}
      </LinkableHeading>
    ),
    // ... h3, h4
  };
}
```

## Features

### ✅ Automatic ID Generation
- Each heading gets a unique ID based on its text
- IDs are URL-friendly and SEO-optimized
- Handles special characters and spaces

### ✅ Hover Effects
- Anchor links appear when hovering over headings
- Smooth opacity transitions
- Visual feedback for better UX

### ✅ Smooth Scrolling
- Clicking anchor links smoothly scrolls to headings
- Proper scroll positioning with offset
- URL updates without page reload

### ✅ Accessibility
- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus styles for accessibility

### ✅ Responsive Design
- Anchor links adapt to different screen sizes
- Mobile-friendly touch targets
- Consistent behavior across devices

## Testing

Visit `/test-linkable-headings` to see the feature in action. The test page includes:
- Multiple heading levels
- Table of contents
- Various content types
- Interactive examples

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers
- ✅ Screen readers
- ✅ Keyboard navigation

## Performance

- Lightweight implementation
- No external dependencies
- Efficient DOM queries
- Minimal re-renders

## Future Enhancements

Potential improvements:
- [ ] Add copy link functionality
- [ ] Implement heading level indicators
- [ ] Add collapsible sections
- [ ] Support for custom anchor icons
- [ ] Analytics tracking for heading clicks 
# Drill-Down Functionality Implementation

## Overview

The drill-down functionality allows users to click on icons, chart elements, and visual components to view detailed underlying data in a slide-over panel. This enhances the user experience by providing seamless navigation from high-level visualizations to detailed data tables.

## Components Created

### 1. Slide-Over Component (`src/components/ui/slide-over.tsx`)

A reusable slide-over panel component with the following features:
- Smooth slide-in animation from the right
- Backdrop overlay with click-to-close
- Configurable sizes (sm, md, lg, xl)
- Header with title, subtitle, and close button
- Scrollable content area

### 2. Drill-Down Slide-Over (`DrillDownSlideOver`)

Specialized slide-over for displaying drill-down data:
- Formatted data table with column types (text, number, date, badge, currency)
- Applied filters display with badges
- Summary statistics (total records, total value, due soon, success rate)
- Responsive table with hover effects
- Custom cell rendering based on data type

### 3. Drill-Down Hook (`src/hooks/useDrillDown.ts`)

Custom React hook that manages drill-down state and data:
- State management for slide-over visibility
- Data generation for different module types (contracts, matters, tasks, risks, compliance)
- Column definitions for each data type
- Filter application logic
- Sample data generators with realistic legal data

## Data Types Supported

### Contracts
- Fields: title, counterparty, value, status, priority, created_date, expiry_date, owner
- Filters: status, priority, month, counterparty

### Matters
- Fields: title, client, budget, spent, status, priority, opened_date, deadline, attorney
- Filters: status, priority, type, client

### Tasks
- Fields: title, assignee, status, priority, created_date, due_date, estimated_hours, actual_hours
- Filters: status, priority, assignee

### Risks
- Fields: title, category, severity, status, probability, impact, identified_date, review_date, owner
- Filters: severity, category, status

### Compliance
- Fields: framework, requirement, status, priority, score, last_assessment, next_review, owner
- Filters: framework, status, priority

## Implementation Examples

### Enhanced Dashboard

The main dashboard (`src/components/dashboard/EnhancedDashboard.tsx`) has been enhanced with:
- Clickable metric cards that open drill-down panels
- Interactive charts (Area, Pie, Bar) with click handlers
- Clickable compliance progress bars
- Integrated slide-over component

### Analytics Dashboard

The analytics dashboard (`src/components/ui/analytics-dashboard.tsx`) includes:
- Configurable drill-down types for charts
- Click handlers for bar, pie, line, and area charts
- Module-specific filtering
- Pre-configured legal analytics presets with drill-down enabled

### Contracts Overview

The contracts overview (`src/components/contracts/ContractsOverview.tsx`) features:
- Clickable summary statistic cards
- Status-based filtering
- Contract-specific drill-down data

## Usage Instructions

### Basic Usage

```typescript
import { useDrillDown } from "@/hooks/useDrillDown";
import { DrillDownSlideOver } from "@/components/ui/slide-over";

function MyComponent() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  const handleClick = () => {
    openDrillDown(
      "contracts",           // Data type
      "Active Contracts",    // Title
      "Contract Management", // Module name
      { status: "active" }   // Filters (optional)
    );
  };

  return (
    <div>
      <button onClick={handleClick}>View Active Contracts</button>
      
      <DrillDownSlideOver
        isOpen={isSlideOverOpen}
        onClose={closeDrillDown}
        data={drillDownData}
      />
    </div>
  );
}
```

### Chart Integration

```typescript
// For Recharts components
<BarChart 
  data={chartData}
  onClick={(data) => {
    if (data && data.activePayload) {
      const category = data.activePayload[0]?.payload?.category;
      openDrillDown("risks", `${category} Risks`, "Risk Management", { category });
    }
  }}
>
  <Bar 
    dataKey="count" 
    fill="#ef4444"
    style={{ cursor: "pointer" }}
  />
</BarChart>

// For Pie charts
<Pie
  data={pieData}
  onClick={(data) => {
    if (data && data.name) {
      openDrillDown("contracts", `${data.name} Contracts`, "Contract Management", { status: data.name });
    }
  }}
  style={{ cursor: "pointer" }}
/>
```

### Metric Cards

```typescript
<Card 
  className="cursor-pointer hover:shadow-lg transition-all"
  onClick={() => openDrillDown("matters", "Active Matters", "Matter Management", { status: "active" })}
>
  <CardContent>
    <div className="text-2xl font-bold">89</div>
    <p className="text-sm text-muted-foreground">Active Matters</p>
  </CardContent>
</Card>
```

## Features

### Interactive Elements
- **Metric Cards**: Click to view underlying data with applied filters
- **Chart Segments**: Click pie chart segments for category-specific data
- **Chart Points/Bars**: Click for time-based or categorical data
- **Progress Bars**: Click for compliance or performance details
- **Icons**: Click for module-specific data

### Slide-Over Features
- **Data Table**: Sortable, filterable table with proper formatting
- **Applied Filters**: Visual display of active filters as badges
- **Summary Stats**: Automatic calculation of totals, averages, and key metrics
- **Export Ready**: Structured data ready for CSV/Excel export
- **Responsive**: Works on all screen sizes with appropriate sizing

### Data Formatting
- **Currency**: Automatic formatting with locale-specific symbols
- **Dates**: Human-readable date formatting
- **Numbers**: Proper number formatting with thousands separators
- **Badges**: Status and category indicators
- **Custom Rendering**: Support for custom cell renderers

## Benefits

1. **Enhanced UX**: Seamless navigation from overview to details
2. **Contextual Data**: Filtered data based on user's click context
3. **Reduced Navigation**: No need to navigate to separate pages
4. **Visual Continuity**: Maintains context while showing details
5. **Performance**: Lazy-loaded data only when needed
6. **Accessibility**: Keyboard navigation and screen reader support

## Customization

### Adding New Data Types

1. Add data generator function in `useDrillDown.ts`
2. Define column structure for the new type
3. Add case in the `openDrillDown` switch statement
4. Update TypeScript interfaces if needed

### Custom Cell Rendering

```typescript
const columns = [
  {
    key: "status",
    label: "Status",
    type: "badge",
    render: (value, row) => (
      <Badge variant={value === "active" ? "default" : "secondary"}>
        {value}
      </Badge>
    )
  }
];
```

### Styling Customization

The components use Tailwind CSS classes and can be customized by:
- Modifying the slide-over size classes
- Updating color schemes in the data generators
- Customizing hover effects and transitions
- Adjusting table styling and spacing

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Touch-friendly interactions on mobile devices
- Keyboard navigation support

This implementation provides a comprehensive drill-down solution that enhances the user experience across all legal modules while maintaining consistency and performance. 
# Risk Matrix Chart Documentation

## Overview

The Risk Matrix Chart is a comprehensive heatmap visualization that provides in-house counsel with an at-a-glance view of risk severity distribution across different entities and risk types. This interactive chart enables quick identification of risk hotspots and facilitates strategic risk management decisions.

## Features

### Visual Design
- **Heatmap Layout**: Grid-based matrix with entities as rows and risk types as columns
- **Color-Coded Severity**: Intuitive color scheme for risk levels:
  - 🟢 **Green**: Low risk
  - 🟡 **Yellow**: Medium risk  
  - 🟠 **Orange**: High risk
  - 🔴 **Red**: Critical risk
- **Intensity Scaling**: Color opacity indicates risk count (darker = more risks)
- **Responsive Design**: Horizontal scrolling for smaller screens

### Interactive Features
- **Hover Tooltips**: Detailed information on mouse hover including:
  - Entity name
  - Risk type
  - Risk count
  - Severity level
  - Risk score
- **Click-to-Drill-Down**: Click any cell to open detailed risk information
- **Visual Feedback**: Hover effects with scaling and ring highlights

### Data Visualization
- **Risk Count Display**: Shows number of risks in each cell
- **Severity Labels**: Clear severity level indicators
- **Empty Cell Handling**: Graceful display of cells with no risks
- **Summary Statistics**: Quick stats showing:
  - Total entities
  - Total risk types
  - Total risks
  - High/Critical risk count

## Technical Implementation

### Component Structure
```typescript
interface RiskMatrixData {
  entity: string;
  riskType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  count: number;
  riskScore: number;
}

interface RiskMatrixChartProps {
  data: RiskMatrixData[];
  onCellClick?: (entity: string, riskType: string, severity: string) => void;
}
```

### Key Features
- **Dynamic Grid Generation**: Automatically adapts to available entities and risk types
- **Data Lookup Optimization**: Uses Map for O(1) data access
- **Color Calculation**: Dynamic color and opacity based on severity and count
- **Event Handling**: Mouse events for hover and click interactions

### Integration Points
- **Drill-Down System**: Integrates with existing `useDrillDown` hook
- **Slide-Over Component**: Uses `DrillDownSlideOver` for detailed views
- **Consistent Styling**: Follows existing design system patterns

## Data Structure

### Sample Data Format
```typescript
const riskMatrixData = [
  {
    entity: "Acme Corp Ltd",
    riskType: "Contract",
    severity: "medium",
    count: 12,
    riskScore: 6.2
  },
  // ... more entries
];
```

### Supported Risk Types
- Contract
- IP (Intellectual Property)
- Employment
- Compliance
- Litigation
- Regulatory
- Financial
- Operational

### Supported Entities
- Acme Corp Ltd
- Global Holdings Inc
- Regional Office LLC
- Tech Subsidiary Co

## Usage Examples

### Basic Implementation
```tsx
import { RiskMatrixChart } from "./RiskMatrixChart";

function RiskDashboard() {
  const handleCellClick = (entity, riskType, severity) => {
    // Handle drill-down logic
    console.log(`Clicked: ${entity} - ${riskType} (${severity})`);
  };

  return (
    <RiskMatrixChart 
      data={riskMatrixData} 
      onCellClick={handleCellClick}
    />
  );
}
```

### Integration with Drill-Down
```tsx
const handleMatrixCellClick = (entity, riskType, severity) => {
  openDrillDown("risks", `${entity} - ${riskType} Risks`, "Risk Management", { 
    entity, 
    riskType, 
    severity 
  });
};
```

## Benefits for In-House Counsel

### Strategic Overview
- **Risk Landscape Visualization**: Immediate understanding of risk distribution
- **Entity Comparison**: Quick comparison of risk profiles across entities
- **Risk Type Analysis**: Identification of problematic risk categories
- **Priority Setting**: Visual identification of high-risk areas requiring attention

### Operational Efficiency
- **Quick Navigation**: One-click access to detailed risk information
- **Pattern Recognition**: Easy identification of risk patterns and trends
- **Resource Allocation**: Data-driven decisions on risk management resources
- **Compliance Monitoring**: Visual tracking of compliance-related risks

### Decision Support
- **Executive Reporting**: Clear visual for board and executive presentations
- **Risk Committee Updates**: Comprehensive overview for risk committee meetings
- **Audit Preparation**: Quick identification of areas requiring audit attention
- **Budget Planning**: Visual support for risk management budget allocation

## Customization Options

### Color Scheme
The color scheme can be customized by modifying the `getSeverityColor` function:
```typescript
const getSeverityColor = (severity: string, count: number) => {
  // Custom color logic
};
```

### Tooltip Content
Tooltip information can be extended by modifying the tooltip rendering section.

### Grid Layout
The grid layout automatically adapts but can be customized for different screen sizes.

## Performance Considerations

- **Efficient Data Lookup**: Uses Map for O(1) data access
- **Optimized Rendering**: Minimal re-renders with proper state management
- **Responsive Design**: Handles large datasets with horizontal scrolling
- **Memory Management**: Proper cleanup of event listeners and state

## Future Enhancements

### Potential Features
- **Time-based Filtering**: Filter by date ranges
- **Export Functionality**: Export matrix as PDF/Excel
- **Drill-up Capability**: Navigate from detailed view back to matrix
- **Custom Risk Types**: Dynamic risk type configuration
- **Threshold Alerts**: Visual indicators for risk threshold breaches
- **Comparative Analysis**: Side-by-side matrix comparison

### Integration Opportunities
- **Real-time Updates**: WebSocket integration for live risk updates
- **API Integration**: Direct connection to risk management systems
- **Mobile Optimization**: Enhanced mobile experience
- **Accessibility**: Enhanced screen reader support

## Conclusion

The Risk Matrix Chart provides in-house counsel with a powerful, intuitive tool for risk visualization and management. Its combination of comprehensive data display, interactive features, and integration capabilities makes it an essential component of the legal risk management dashboard. 
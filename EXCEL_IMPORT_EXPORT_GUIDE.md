# Excel Import/Export Functionality Guide

## Overview

CounselFlow now includes comprehensive Excel import and export capabilities for both **Contract Management** and **Dispute Resolution** modules. This feature allows users to:

- **Bulk Import**: Upload Excel/CSV files to import multiple records at once
- **Bulk Export**: Export data to Excel/CSV format with customizable options
- **Data Validation**: Automatic validation during import with error reporting
- **Template Generation**: Download pre-formatted templates for easy data preparation

## Features

### 🔄 Import Capabilities
- **File Format Support**: Excel (.xlsx, .xls) and CSV (.csv) files
- **Step-by-Step Process**: Upload → Preview → Validate → Import
- **Data Validation**: Real-time validation with detailed error reporting
- **Template Download**: Pre-configured templates with sample data
- **Progress Tracking**: Visual progress indicators during import

### 📊 Export Capabilities
- **Format Options**: Excel (.xlsx) and CSV (.csv) export
- **Column Selection**: Choose which columns to include in export
- **Data Formatting**: Automatic formatting for dates, currencies, and numbers
- **Custom Settings**: Configurable date formats, currency formats, and headers
- **Preview Mode**: Preview export data before downloading

## Module Integration

### Contract Management Module

**Location**: Contracts → Import/Export buttons in the toolbar

**Import Fields**:
- Contract Title (Required)
- Entity (Required)
- Counterparty
- Contract Value
- Currency
- Start Date
- End Date
- Status
- Type
- Owner

**Export Options**:
- All contract fields with proper formatting
- Currency values formatted by selected currency
- Date fields formatted according to user preference
- Status and type fields as text

### Dispute Resolution Module

**Location**: Dispute Resolution → Disputes → Import/Export buttons in the toolbar

**Import Fields**:
- Dispute Title (Required)
- Entity (Required)
- Counterparty
- Status
- Priority
- Exposure Amount
- Currency
- Initiated Date
- Deadline
- Owner
- Case Type

**Export Options**:
- All dispute fields with proper formatting
- Financial exposure formatted as currency
- Priority and status with color coding in Excel
- Date fields with consistent formatting

## How to Use

### Importing Data

1. **Access Import Function**
   - Navigate to Contracts or Dispute Resolution module
   - Click the "Import" button in the toolbar

2. **Upload File**
   - Drag and drop your Excel/CSV file or click to browse
   - Supported formats: .xlsx, .xls, .csv (up to 10MB)
   - File processing will begin automatically

3. **Preview Data**
   - Review the imported data in a table format
   - Check that all columns are mapped correctly
   - Verify data appears as expected

4. **Validate Data**
   - System performs automatic validation
   - Review any errors or warnings
   - Fix issues in your source file if needed

5. **Complete Import**
   - Click "Import Data" to finalize
   - System will process and save all valid records
   - Confirmation message will appear upon completion

### Exporting Data

1. **Access Export Function**
   - Navigate to Contracts or Dispute Resolution module
   - Click the "Export" button in the toolbar

2. **Configure Export Settings**
   - Choose file format (Excel or CSV)
   - Select date format (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD)
   - Choose currency format (USD, EUR, GBP, SGD)
   - Toggle column headers on/off

3. **Select Columns**
   - Choose which columns to include in export
   - Use "Select All" for quick selection
   - Column types are indicated with badges

4. **Preview Export**
   - Review first 5 rows of export data
   - Verify formatting and column selection
   - Make adjustments if needed

5. **Download File**
   - Click "Export" to generate file
   - File will download automatically
   - Progress indicator shows export status

## Data Templates

### Contract Template Structure

```csv
Contract Title,Entity,Counterparty,Contract Value,Currency,Start Date,End Date,Status,Type,Owner
Software License Agreement,Acme Corporation Ltd,Microsoft Corporation,150000,USD,2024-01-01,2025-01-01,Active,Software License,John Smith
```

### Dispute Template Structure

```csv
Dispute Title,Entity,Counterparty,Status,Priority,Exposure Amount,Currency,Initiated Date,Deadline,Owner,Case Type
Contract Breach - Vendor ABC,Acme Corporation Ltd,ABC Supplies Inc,In Review,High,250000,USD,2024-01-15,2024-03-15,Sarah Johnson,Contract Dispute
```

## Validation Rules

### Contract Validation
- **Contract Title**: Required, must not be empty
- **Entity**: Required, must not be empty
- **Contract Value**: Must be a valid number if provided
- **Dates**: Must be in valid date format
- **Currency**: Must be valid currency code (USD, EUR, GBP, SGD)

### Dispute Validation
- **Dispute Title**: Required, must not be empty
- **Entity**: Required, must not be empty
- **Exposure Amount**: Must be a valid number if provided
- **Priority**: Must be one of: Critical, High, Medium, Low
- **Status**: Must be valid status value
- **Dates**: Must be in valid date format

## Error Handling

### Import Errors
- **File Format Errors**: Unsupported file types or corrupted files
- **Data Validation Errors**: Missing required fields, invalid data types
- **Row-Level Errors**: Specific issues with individual records
- **System Errors**: Network issues or server problems

### Error Resolution
1. **Review Error Messages**: Detailed error descriptions for each issue
2. **Fix Source Data**: Correct issues in your Excel/CSV file
3. **Re-upload File**: Try import process again with corrected data
4. **Contact Support**: For persistent technical issues

## Best Practices

### Data Preparation
- **Use Templates**: Download and use provided templates
- **Consistent Formatting**: Ensure dates and numbers are consistently formatted
- **Required Fields**: Always include required fields (marked with *)
- **Data Validation**: Validate data in Excel before importing

### File Management
- **File Size**: Keep files under 10MB for optimal performance
- **Backup Data**: Keep backup copies of your source files
- **Test Imports**: Test with small datasets first
- **Regular Exports**: Export data regularly for backup purposes

### Performance Tips
- **Batch Processing**: Import large datasets in smaller batches
- **Off-Peak Hours**: Perform large imports during off-peak hours
- **Network Stability**: Ensure stable internet connection for large files
- **Browser Performance**: Close unnecessary browser tabs during import/export

## Technical Implementation

### Shared Components
- **ExcelImportModal**: Reusable import component (`src/components/shared/ExcelImportModal.tsx`)
- **ExcelExportModal**: Reusable export component (`src/components/shared/ExcelExportModal.tsx`)

### Integration Points
- **ContractsList**: Import/export buttons integrated into contracts interface
- **DisputesList**: Import/export buttons integrated into disputes interface
- **Central Data Service**: Consistent data structure across modules

### File Processing
- **Client-Side Processing**: File parsing and validation in browser
- **Progress Tracking**: Real-time progress updates during processing
- **Error Reporting**: Comprehensive error tracking and reporting
- **Data Transformation**: Automatic data type conversion and formatting

## Security Considerations

### Data Privacy
- **Local Processing**: Files processed locally in browser
- **No Server Storage**: Files not permanently stored on server
- **Secure Transmission**: HTTPS encryption for all data transfers
- **Access Control**: Import/export restricted to authorized users

### File Validation
- **File Type Checking**: Strict file type validation
- **Size Limits**: Maximum file size restrictions
- **Content Scanning**: Basic content validation for security
- **Error Sanitization**: Safe error message handling

## Troubleshooting

### Common Issues

**Import Not Working**
- Check file format (must be .xlsx, .xls, or .csv)
- Verify file size (must be under 10MB)
- Ensure required fields are present
- Check for special characters in data

**Export Not Downloading**
- Check browser download settings
- Disable popup blockers
- Try different browser
- Clear browser cache

**Data Not Appearing Correctly**
- Verify column mapping during import
- Check date format settings
- Ensure currency codes are valid
- Review data validation errors

**Performance Issues**
- Reduce file size
- Close other browser tabs
- Check internet connection
- Try during off-peak hours

### Support Resources
- **User Guide**: This documentation
- **Video Tutorials**: Available in help section
- **Technical Support**: Contact system administrator
- **Community Forum**: User community discussions

## Future Enhancements

### Planned Features
- **Advanced Filtering**: More sophisticated export filtering options
- **Scheduled Exports**: Automated export scheduling
- **Data Mapping**: Custom field mapping during import
- **Bulk Updates**: Update existing records via Excel import
- **Integration APIs**: Direct integration with external systems

### Feedback and Suggestions
We welcome feedback on the Excel import/export functionality. Please contact the development team with:
- Feature requests
- Bug reports
- Usability improvements
- Performance feedback

---

*Last Updated: January 2024*
*Version: 1.0.0* 
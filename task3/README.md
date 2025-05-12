# SQL Analysis Script

This script performs analysis on a sales orders database using SQLite.

## Requirements

- SQLite3 installed on your system
- Access to terminal/command line

## How to Run

1. Open terminal and navigate to the script directory:
```bash
cd /path/to/script/directory
```

2. Run the script using SQLite:
```bash
sqlite3 < analysis.sql
```

## What the Script Does

The script will:
1. Create a table named `orders` with customer sales data
2. Insert sample sales data
3. Calculate and display:
   - Total sales for March 2024
   - Customer with highest total spending
   - Average order value across all orders

## Output Example

The script will produce output in this format:
```
Total sales for March: 27,000
Top-spending customer: Alice (20,000)
Average order value (total sales / number of orders): 6,000
```

## Modifying the Script

- To analyze different data, you can modify the INSERT statements in the script
- To change the analysis period, modify the WHERE clause in the March sales query
- All monetary values are automatically formatted with thousands separators

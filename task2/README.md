# API Testing Suite

This project contains automated tests for validating product data from the FakeStore API.

## Test Cases

The test suite validates:
1. API response status code (expected 200)
2. Product data validation:
   - Title: must not be empty
   - Price: must not be negative
   - Rating: must not exceed 5

## Setup and Running Tests

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run tests:
```bash
pytest test_api.py -v
```

The tests will display a detailed report of any products with defects found during validation.

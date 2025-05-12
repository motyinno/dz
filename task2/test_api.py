import requests
import pytest

API_URL = "https://fakestoreapi.com/products"

def test_api_response():
    """Test API response status code"""
    response = requests.get(API_URL)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

def test_product_validation():
    """Test product data validation and collect defects"""
    response = requests.get(API_URL)
    products = response.json()
    defects = []

    for product in products:
        product_defects = []
        
        # Check title
        if not product.get('title') or len(product['title'].strip()) == 0:
            product_defects.append("Empty title")

        # Check price
        price = product.get('price')
        if price is None or price < 0:
            product_defects.append("Invalid price (negative or missing)")

        # Check rating
        rating = product.get('rating', {}).get('rate')
        if rating is None or rating > 5:
            product_defects.append("Invalid rating (exceeds 5 or missing)")

        if product_defects:
            defects.append({
                'id': product.get('id'),
                'title': product.get('title'),
                'defects': product_defects
            })

    # Print defects report if any found
    if defects:
        print("\nProducts with defects:")
        for item in defects:
            print(f"Product ID: {item['id']}")
            print(f"Title: {item['title']}")
            print(f"Defects: {', '.join(item['defects'])}")
            print("-" * 50)

    # Assert no defects were found
    assert len(defects) == 0, f"Found {len(defects)} products with defects"

if __name__ == '__main__':
    pytest.main([__file__, "-v"])

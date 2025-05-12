async function testAPI() {
    try {
        // Test API response
        const response = await fetch('https://fakestoreapi.com/products');
        
        console.log('1. Testing API response code:');
        console.log(`Status code: ${response.status}`);
        console.log(response.status === 200 ? '✅ Success' : '❌ Failed');
        console.log('-'.repeat(50));

        // Get products data
        const products = await response.json();
        const defects = [];

        console.log('2. Testing products data:');
        products.forEach(product => {
            const productDefects = [];

            // Check title
            if (!product.title || product.title.trim() === '') {
                productDefects.push('Empty title');
            }

            // Check price
            if (product.price === undefined || product.price < 0) {
                productDefects.push('Invalid price (negative or missing)');
            }

            // Check rating
            if (!product.rating?.rate || product.rating.rate > 5) {
                productDefects.push('Invalid rating (exceeds 5 or missing)');
            }

            if (productDefects.length > 0) {
                defects.push({
                    id: product.id,
                    title: product.title,
                    defects: productDefects
                });
            }
        });

        // Display results
        if (defects.length === 0) {
            console.log('✅ All products passed validation');
        } else {
            console.log('❌ Found products with defects:');
            defects.forEach(item => {
                console.log(`\nProduct ID: ${item.id}`);
                console.log(`Title: ${item.title}`);
                console.log(`Defects: ${item.defects.join(', ')}`);
            });
        }
        console.log('-'.repeat(50));
        console.log(`Total products tested: ${products.length}`);
        console.log(`Products with defects: ${defects.length}`);

    } catch (error) {
        console.error('Error during testing:', error.message);
    }
}

// Run the tests
testAPI();

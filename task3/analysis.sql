-- Create the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Insert sample data
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- Calculate total sales for March 2024
SELECT printf('Total sales for March: %,d', CAST(SUM(amount) AS INTEGER)) as march_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- Find the top-spending customer
SELECT printf('Top-spending customer: %s (%,d)', customer, CAST(total_spent AS INTEGER)) as top_customer
FROM (
    SELECT customer, SUM(amount) as total_spent
    FROM orders
    GROUP BY customer
    ORDER BY total_spent DESC
    LIMIT 1
);

-- Calculate average order value
SELECT printf('Average order value (total sales / number of orders): %,d', 
    CAST(AVG(amount) AS INTEGER)) as avg_order
FROM orders;

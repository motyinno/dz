#!/bin/bash
set -e

# This script is executed when the database container is created

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE jsonplaceholder_test;
    GRANT ALL PRIVILEGES ON DATABASE jsonplaceholder_test TO $POSTGRES_USER;
EOSQL

echo "Database initialization completed"

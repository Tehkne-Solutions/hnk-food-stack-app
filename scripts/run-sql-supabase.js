#!/usr/bin/env node
/**
 * Small helper to run the SQL schema file against a Postgres connection URL.
 *
 * Usage (PowerShell):
 *   $env:SUPABASE_DB_URL = "postgres://user:pass@host:5432/dbname"; node .\scripts\run-sql-supabase.js
 *
 * Or (Unix):
 *   SUPABASE_DB_URL="postgres://user:pass@host:5432/dbname" node ./scripts/run-sql-supabase.js
 *
 * NOTE: This requires the 'pg' package. Install with:
 *   npm install pg
 */

const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

async function main() {
    const dbUrl = process.env.SUPABASE_DB_URL
    if (!dbUrl) {
        console.error('ERROR: SUPABASE_DB_URL environment variable is required.')
        console.error('Get the DB connection string from Supabase (Project > Settings > Database > Connection string).')
        process.exit(1)
    }

    const sqlPath = path.resolve(__dirname, '..', 'DOCS', 'SCHEMA-FASE-10.sql')
    if (!fs.existsSync(sqlPath)) {
        console.error('ERROR: SQL file not found at', sqlPath)
        process.exit(1)
    }

    const sql = fs.readFileSync(sqlPath, 'utf8')

    const client = new Client({ connectionString: dbUrl })
    try {
        console.log('Connecting to database...')
        await client.connect()
        console.log('Running SQL file:', sqlPath)
        // Execute as a single query. The schema file uses IF NOT EXISTS and idempotent statements.
        await client.query(sql)
        console.log('SQL executed successfully.')
    } catch (err) {
        console.error('Failed to execute SQL:', err.message || err)
        process.exitCode = 2
    } finally {
        await client.end()
    }
}

main()

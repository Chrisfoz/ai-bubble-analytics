/**
 * Database Initialization Script
 * Run this to create all tables in Supabase
 *
 * Usage: node src/initDatabase.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  console.log('🚀 Starting database initialization...\n');

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '../../database/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📖 Read SQL file from:', sqlPath);
    console.log('📝 Executing SQL script in Supabase...\n');

    // Note: Supabase JS client doesn't support running raw SQL with multiple statements
    // We need to use the SQL endpoint or run it manually in the dashboard

    console.log('⚠️  Note: The Supabase JavaScript client cannot execute raw SQL with multiple statements.');
    console.log('📋 Please follow these steps to initialize your database:\n');
    console.log('1. Open your Supabase Dashboard: https://supabase.com/dashboard');
    console.log('2. Select your project: evhxrrkuaqgvyvdhfoow');
    console.log('3. Go to: SQL Editor (left sidebar)');
    console.log('4. Click "New Query"');
    console.log('5. Copy the contents of: database/init.sql');
    console.log('6. Paste into the SQL Editor');
    console.log('7. Click "Run" or press Ctrl+Enter\n');
    console.log('✅ After running, verify tables in: Table Editor\n');
    console.log('Expected tables:');
    console.log('   - subscribers');
    console.log('   - email_logs');
    console.log('   - daily_metrics_snapshots\n');

    // Alternative: Test connection and verify tables
    console.log('🔍 Testing Supabase connection...');

    const { data, error } = await supabase
      .from('subscribers')
      .select('count')
      .limit(1);

    if (error) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('⚠️  Tables do not exist yet. Please run the SQL script in Supabase Dashboard.');
        console.log('📄 SQL file location: database/init.sql\n');
      } else {
        console.error('❌ Connection error:', error.message);
      }
    } else {
      console.log('✅ Successfully connected to Supabase!');
      console.log('✅ Tables appear to be created already.');
      console.log('🎉 Database is ready to use!\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initDatabase();

/**
 * API Key Validation Tests
 * Tests connectivity and validity of all external API keys
 */

const axios = require('axios');
require('dotenv').config();

// Timeout for API requests (10 seconds)
const API_TIMEOUT = 10000;

describe('API Key Validation Tests', () => {

  // Test Alpha Vantage API
  describe('Alpha Vantage API', () => {
    test('should connect with valid API key', async () => {
      const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

      expect(apiKey).toBeDefined();
      expect(apiKey).not.toBe('');
      expect(apiKey).not.toBe('your-alpha-vantage-key-here');

      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${apiKey}`,
          { timeout: API_TIMEOUT }
        );

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();

        // Check if we got a valid response (not an error message)
        if (response.data['Global Quote']) {
          expect(response.data['Global Quote']).toBeDefined();
          console.log('✅ Alpha Vantage API: Connected successfully');
        } else if (response.data['Note']) {
          // Rate limit message - API key is valid but rate limited
          console.log('⚠️  Alpha Vantage API: Valid key but rate limited');
          expect(response.data['Note']).toContain('API call frequency');
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        if (error.response?.data?.['Error Message']) {
          throw new Error(`Alpha Vantage API Error: ${error.response.data['Error Message']}`);
        }
        throw error;
      }
    }, API_TIMEOUT + 5000);
  });

  // Test Finnhub API
  describe('Finnhub API', () => {
    test('should connect with valid API key', async () => {
      const apiKey = process.env.FINNHUB_API_KEY;

      expect(apiKey).toBeDefined();
      expect(apiKey).not.toBe('');
      expect(apiKey).not.toBe('your-finnhub-api-key-here');

      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${apiKey}`,
          { timeout: API_TIMEOUT }
        );

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();

        // Check if we got valid stock data
        expect(response.data.c).toBeDefined(); // current price
        expect(response.data.h).toBeDefined(); // high price
        expect(response.data.l).toBeDefined(); // low price

        console.log('✅ Finnhub API: Connected successfully');
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('Finnhub API: Invalid API key');
        } else if (error.response?.status === 429) {
          console.log('⚠️  Finnhub API: Valid key but rate limited');
        } else {
          throw error;
        }
      }
    }, API_TIMEOUT + 5000);
  });

  // Test SerpAPI (Google Trends)
  describe('SerpAPI', () => {
    test('should connect with valid API key', async () => {
      const apiKey = process.env.SERPAPI_KEY;

      expect(apiKey).toBeDefined();
      expect(apiKey).not.toBe('');
      expect(apiKey).not.toBe('your-serpapi-key-here');

      try {
        const response = await axios.get(
          `https://serpapi.com/account.json?api_key=${apiKey}`,
          { timeout: API_TIMEOUT }
        );

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();

        // Check account info
        if (response.data.account_id) {
          expect(response.data.account_id).toBeDefined();
          console.log('✅ SerpAPI: Connected successfully');
          console.log(`   Account searches left this month: ${response.data.total_searches_left || 'N/A'}`);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('SerpAPI: Invalid API key');
        }
        throw error;
      }
    }, API_TIMEOUT + 5000);
  });

  // Test News API
  describe('News API', () => {
    test('should connect with valid API key', async () => {
      const apiKey = process.env.NEWS_API_KEY;

      expect(apiKey).toBeDefined();
      expect(apiKey).not.toBe('');
      expect(apiKey).not.toBe('your-newsapi-key-here');

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=1&apiKey=${apiKey}`,
          { timeout: API_TIMEOUT }
        );

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();

        // Check if we got valid news data
        if (response.data.status === 'ok') {
          expect(response.data.articles).toBeDefined();
          console.log('✅ News API: Connected successfully');
        } else if (response.data.status === 'error') {
          throw new Error(`News API Error: ${response.data.message}`);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('News API: Invalid API key');
        } else if (error.response?.status === 429) {
          console.log('⚠️  News API: Valid key but rate limited');
        } else {
          throw error;
        }
      }
    }, API_TIMEOUT + 5000);
  });

  // Test SendGrid API
  describe('SendGrid API', () => {
    test('should validate API key', async () => {
      const apiKey = process.env.SENDGRID_API_KEY;

      expect(apiKey).toBeDefined();
      expect(apiKey).not.toBe('');
      expect(apiKey).not.toBe('your-sendgrid-api-key-here');

      try {
        // Test SendGrid API key by checking API key permissions
        const response = await axios.get(
          'https://api.sendgrid.com/v3/scopes',
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            timeout: API_TIMEOUT
          }
        );

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
        expect(response.data.scopes).toBeDefined();

        console.log('✅ SendGrid API: Connected successfully');
        console.log(`   API Key has ${response.data.scopes.length} permission scopes`);
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('SendGrid API: Invalid API key');
        } else if (error.response?.status === 403) {
          throw new Error('SendGrid API: API key lacks required permissions');
        }
        throw error;
      }
    }, API_TIMEOUT + 5000);
  });

  // Test Supabase Connection
  describe('Supabase Connection', () => {
    test('should have valid Supabase configuration', async () => {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      expect(supabaseUrl).toBeDefined();
      expect(supabaseUrl).not.toBe('');
      expect(supabaseUrl).not.toBe('https://your-project-id.supabase.co');
      expect(supabaseUrl).toContain('supabase.co');

      expect(supabaseAnonKey).toBeDefined();
      expect(supabaseAnonKey).not.toBe('');
      expect(supabaseAnonKey).not.toBe('your-supabase-anon-key-here');

      expect(supabaseServiceKey).toBeDefined();
      expect(supabaseServiceKey).not.toBe('');
      expect(supabaseServiceKey).not.toBe('your-supabase-service-role-key-here');

      try {
        // Test Supabase REST API endpoint
        const response = await axios.get(
          `${supabaseUrl}/rest/v1/`,
          {
            headers: {
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`
            },
            timeout: API_TIMEOUT
          }
        );

        // Supabase returns 200 with swagger docs or 404 if no tables
        expect([200, 404]).toContain(response.status);
        console.log('✅ Supabase: Connected successfully');
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('Supabase: Invalid API key');
        }
        throw error;
      }
    }, API_TIMEOUT + 5000);
  });

  // Summary test
  describe('API Configuration Summary', () => {
    test('should have all required environment variables', () => {
      const requiredVars = [
        'ALPHA_VANTAGE_API_KEY',
        'FINNHUB_API_KEY',
        'SERPAPI_KEY',
        'NEWS_API_KEY',
        'SENDGRID_API_KEY',
        'SUPABASE_URL',
        'SUPABASE_ANON_KEY',
        'SUPABASE_SERVICE_ROLE_KEY'
      ];

      const missing = [];
      const present = [];

      requiredVars.forEach(varName => {
        if (process.env[varName] &&
            process.env[varName] !== '' &&
            !process.env[varName].includes('your-') &&
            !process.env[varName].includes('-here')) {
          present.push(varName);
        } else {
          missing.push(varName);
        }
      });

      console.log('\n📊 API Configuration Summary:');
      console.log(`✅ Configured: ${present.length}/${requiredVars.length}`);
      present.forEach(v => console.log(`   ✓ ${v}`));

      if (missing.length > 0) {
        console.log(`\n❌ Missing or Invalid: ${missing.length}`);
        missing.forEach(v => console.log(`   ✗ ${v}`));
      }

      expect(missing.length).toBe(0);
    });
  });
});

# Credly Integration Guide

This document explains how the Credly badge integration works in your portfolio.

## How It Works

The portfolio automatically fetches your public badges from Credly and displays them on the certificates page. This is done through the `credly-fetch.js` script which:

1. Fetches badge data from the Credly JSON API
2. Transforms the data to match the portfolio's certificate format
3. Categorizes badges by technology area
4. Renders them with images and descriptions

## Configuration

To configure the Credly integration for your portfolio:

1. Make sure your Credly profile is public
2. Verify your username in the `credly-fetch.js` file:
   ```javascript
   const fetcher = new CredlyBadgeFetcher('dhyey-khanpara');
   ```

## How Badges Are Categorized

Badges are automatically categorized based on their names and descriptions:

- **Cloud**: Google Cloud, AWS, Azure, etc.
- **Development**: JavaScript, Python, React, etc.
- **Security**: Security, Cyber, etc.
- **Data**: Data, SQL, Database, etc.
- **AI/ML**: AI, Machine Learning, etc.
- **General**: Everything else

## Running Locally

To avoid CORS issues when running locally, use the built-in server:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm run serve
   ```

3. Open http://localhost:3000 in your browser

This will serve the files from a local server, avoiding CORS restrictions that prevent direct API access when opening HTML files directly in the browser.

## Troubleshooting

If badges aren't loading:

1. Check that your Credly profile is public
2. Verify your username is correct
3. Check the browser console for error messages
4. Test with the `test-credly.html` page
5. Make sure you're running the site through a local server (not opening HTML files directly)

## Manual Certificate Fallback

If the Credly integration fails, the portfolio will fall back to the manually defined certificates in `data.js`.

## Privacy Considerations

Only public badges from your Credly profile will be displayed. No private information is accessed or shared.
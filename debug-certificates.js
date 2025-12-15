// Debug script for certificates page
console.log('Certificates page debug script loaded');

// Check if CERTS data exists
if (window.CERTS && window.CERTS.length > 0) {
    console.log(`Found ${window.CERTS.length} certificates in window.CERTS`);
    console.log('First certificate:', window.CERTS[0]);
} else {
    console.log('No certificates found in window.CERTS');
}

// Check if certGrid element exists
const certGrid = document.getElementById('certGrid');
if (certGrid) {
    console.log('Found certGrid element');
    console.log('certGrid innerHTML length:', certGrid.innerHTML.length);
} else {
    console.log('certGrid element not found');
}

// Check if CredlyBadgeFetcher is available
if (typeof CredlyBadgeFetcher !== 'undefined') {
    console.log('CredlyBadgeFetcher class is available');
    
    // Test the CredlyBadgeFetcher
    setTimeout(async () => {
        try {
            console.log('Testing CredlyBadgeFetcher...');
            const fetcher = new CredlyBadgeFetcher('dhyey-khanpara');
            const badges = await fetcher.getPortfolioBadges();
            console.log(`Fetched ${badges.length} badges from Credly`);
            
            if (badges.length > 0) {
                console.log('First badge:', badges[0]);
            }
        } catch (error) {
            console.error('Error testing CredlyBadgeFetcher:', error);
        }
    }, 2000);
} else {
    console.log('CredlyBadgeFetcher class is not available');
}

// Check if renderCertificates function is available
if (typeof renderCertificates !== 'undefined') {
    console.log('renderCertificates function is available');
} else {
    console.log('renderCertificates function is not available');
}

// Log the current state after a delay
setTimeout(() => {
    console.log('=== Final State ===');
    if (certGrid) {
        console.log('certGrid content:', certGrid.innerHTML.substring(0, 200) + '...');
    }
}, 5000);
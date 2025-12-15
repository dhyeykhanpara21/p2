// Simple verification script to check if certificates page is working
console.log('Certificate page verification script loaded');

// Check if CERTS data exists
if (window.CERTS && window.CERTS.length > 0) {
    console.log(`Found ${window.CERTS.length} certificates in window.CERTS`);
    console.log('Sample certificate:', window.CERTS[0]);
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
} else {
    console.log('CredlyBadgeFetcher class is not available');
}

// Check if renderCertificates function is available
if (typeof renderCertificates !== 'undefined') {
    console.log('renderCertificates function is available');
} else {
    console.log('renderCertificates function is not available');
}
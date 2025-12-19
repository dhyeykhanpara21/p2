// Debug script to check if PROJECTS data is loaded correctly
console.log('Debug script loaded');

function checkProjectsData() {
  console.log('Checking PROJECTS data...');
  
  if (typeof window !== 'undefined' && window.PROJECTS) {
    console.log('PROJECTS array found with', window.PROJECTS.length, 'items');
    console.log('First project:', window.PROJECTS[0]);
    console.log('Last project:', window.PROJECTS[window.PROJECTS.length - 1]);
    
    // Check if the updated projects are present
    const fraudGuard = window.PROJECTS.find(p => p.title === 'FraudGuard');
    const configrator = window.PROJECTS.find(p => p.title === 'Configrator');
    
    if (fraudGuard) {
      console.log('FraudGuard project found:', fraudGuard);
    } else {
      console.log('FraudGuard project NOT found');
    }
    
    if (configrator) {
      console.log('Configrator project found:', configrator);
    } else {
      console.log('Configrator project NOT found');
    }
  } else {
    console.log('PROJECTS array not found');
  }
}

// Run the check when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkProjectsData);
} else {
  checkProjectsData();
}
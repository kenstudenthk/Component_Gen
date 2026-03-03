import { chromium } from 'playwright';
import fs from 'fs';

async function scrapeAll() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to library page...');
  await page.goto('https://powerlibs.com/library/');
  
  // Find all category links
  const links = await page.$$eval('a[href^="/library/"]', anchors => 
    anchors.map(a => {
      const href = a.getAttribute('href');
      const title = a.querySelector('h3') ? a.querySelector('h3').innerText : null;
      return { href, title };
    }).filter(link => link.title !== null && link.href !== '/library/')
  );
  
  console.log(`Found ${links.length} categories.`);
  const allData = {};
  
  for (const link of links) {
    if (link.href === '/library/app-shells') continue;
    
    console.log(`Scraping category: ${link.title} (${link.href})`);
    await page.goto(`https://powerlibs.com${link.href}`);
    await page.waitForTimeout(2000);
    
    // Extract component data more accurately by finding the "Copy YAML" buttons
    // and traversing up to the card header to find the component name (h3)
    const components = await page.$$eval('button:has-text("Copy YAML")', buttons => {
      return buttons.map(button => {
         // The card is usually a few levels up: button -> div -> div -> div (header) -> card container
         const card = button.closest('.bg-card');
         if (!card) return null;
         
         const nameEl = card.querySelector('h3');
         if (!nameEl) return null;
         
         const name = nameEl.innerText.trim();
         const isPro = card.innerText.includes('PRO');
         const isFree = card.innerText.includes('FREE');
         const status = isPro ? 'PRO' : (isFree ? 'FREE' : 'UNKNOWN');
         
         return { name, status };
      }).filter(Boolean);
    });
    
    // Deduplicate array by name
    const uniqueComponents = Array.from(new Set(components.map(c => c.name)))
      .map(name => components.find(c => c.name === name));
      
    console.log(`  Found ${uniqueComponents.length} unique components`);
    allData[link.title] = uniqueComponents;
  }
  
  fs.writeFileSync('powerlibs_data.json', JSON.stringify(allData, null, 2));
  console.log('Saved data to powerlibs_data.json');
  await browser.close();
}

scrapeAll().catch(console.error);

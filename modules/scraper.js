const puppeteer = require('puppeteer')

module.exports = async keyword => {
	try {
		//Open chromium browser (headless) & open a page
		const browser = await puppeteer.launch({
			headless: true
		})
		const page = await browser.newPage()

		//Navigate to Google
		await page.goto("https://google.com")

		const searchInputEl = "input.gLFyf.gsfi"
		const searchQuery = `javascript ${keyword} site:developer.mozilla.org`

		//Enter query in search input & hit 'enter' to search
		await page.type(searchInputEl, searchQuery)
		page.keyboard.press('Enter')

		//Wait for google search results to be inserted in DOM
		const timeout = 3000 //Time allowed to wait for selector to be available
		await page.waitForSelector('div#rso', { //'div#rso' is the google-search result container element selector
			timeout
		})

		//Get href attribute from first google-search result <anchor> tag
		const anchor = await page.$('.g .rc .r > a')
		const href = await page.evaluate(anchor => anchor.href, anchor)

		//Navigate to MDN page
		await page.goto(href)

		//Wait for DOM to load
		await page.waitForSelector('#Syntax', { //'#syntax' is the title of the mdn-syntax section
			timeout
		})

		//Get syntax example
		const syntaxEl = await page.$('#Syntax + pre')
		const syntaxExample = await page.evaluate(syntaxEl => syntaxEl.textContent, syntaxEl)

		return syntaxExample
	} catch (err) {
		return `Couldn't find a snippet for: ${keyword}`
	}
}
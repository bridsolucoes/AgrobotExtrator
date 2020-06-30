// Aplicações base
const puppeteer 		= require('puppeteer-extra');
const AdblockerPlugin 	= require('puppeteer-extra-plugin-adblocker');
const cron 				= require('node-cron');
const fs 				= require('fs');

puppeteer.use(AdblockerPlugin());

let devjson = fs.readFileSync('dev.json');

var dev = JSON.parse(devjson.toString()).dev;

function gerarImagens(){

	puppeteer.launch({ headless: true }).then(async browser => {
		const page = await browser.newPage();

		await page.setExtraHTTPHeaders({
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
			"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7"
		});

		var folder = "./images/"

		/// Dólar
		await page.goto('https://www.canalrural.com.br/cotacao/mercado_financeiro/', {waitUntil: 'networkidle2'});
		await page.evaluate(() => document.getElementById("abas").remove());
		var el = await page.$('.algodao');
		await el.screenshot({
		    path: folder + '00 - mercado financeiro.jpg',
		    type: 'jpeg',
		    quality: 70
		});
		/// Fim Dólar

		/// Milho
		await page.goto('https://www.canalrural.com.br/cotacao/milho/', {waitUntil: 'networkidle2'});
		await page.evaluate(() => document.getElementById("abas").remove());
		var el = await page.$('.milho');
		await el.screenshot({
		    path: folder + '01 - milho.jpg',
		    type: 'jpeg',
		    quality: 70
		});
		/// Fim Milho

		/// Soja
		await page.goto('https://www.canalrural.com.br/cotacao/soja/', {waitUntil: 'networkidle2'});
		await page.evaluate(() => document.getElementById("abas").remove());
		var el = await page.$('.trigo');
		await el.screenshot({
		    path: folder + '02 - soja.jpg',
		    type: 'jpeg',
		    quality: 70
		});
		/// Fim Soja

		/// Café
		await page.goto('https://www.canalrural.com.br/cotacao/cafe/', {waitUntil: 'networkidle2'});
		await page.evaluate(() => document.getElementById("abas").remove());
		var el = await page.$('.trigo');
		await el.screenshot({
		    path: folder + '03 - cafe.jpg',
		    type: 'jpeg',
		    quality: 70
		});
		/// Fim Café

		/// Boi Gordo
		await page.goto('https://www.canalrural.com.br/cotacao/boi-gordo/', {waitUntil: 'networkidle2'});
		await page.evaluate(() => document.getElementById("abas").remove());
		var el = await page.$('.boi-gordo');
		await el.screenshot({
		    path: folder + '04 - boigordo.jpg',
		    type: 'jpeg',
		    quality: 70
		});
		/// Fim Boi Gordo

		await browser.close();

	});

}

if(dev){

	console.log("============= Desenvolvimento =============");

	gerarImagens();

}else{

	console.log("============= Produção =============");

	cron.schedule('0 30 * * * *', () => {

		gerarImagens();

	});
}
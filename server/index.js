const request = require('request')
const cherio = require('cherio')




const bodyParser = require('body-parser')

const app = require('express')()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.text())
app.listen(3333, () => {
	console.log('server has been starting')
})


// const URL = 'https://sitechecker.pro/ru/open-graph/'//'https://www.cossa.ru/trends/37691/'//'https://coinmarketcap.com'




app.post('/', async (req, res) => {
	let resp = null
	res.header({'Access-Control-Allow-Origin': '*'})
	if (req.body) {
		const URL = req.body
			await request(URL, (err, res2) => {
				try {
					if (err)
						throw err
					$ = cherio.load(res2.body)
				
					resp = {
						title: $('meta[property="og:title"]').attr(),
						image: $('meta[property="og:image"]').attr(),
						url: $('meta[property="og:url"]').attr()
					}
					res.json(resp)
				} catch(e) {
					// console.log(e)
					res.json({error: 'invalid url'})
				}
			})
		
		
	} else {
		res.send()
	}
	

})



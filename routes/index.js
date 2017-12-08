const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', function(req, res){
	res.render('home')
})


router.post("/add-email", (req, res) => {
	const { email, name } = req.body
	const emailObject = {
		email: email,
		name: name
	}
	turbo.create('emails', emailObject)
	.then(data => {
		res.status(200).json({ message:"You've Been Signed Up!. We'll Let you know soon", status: true })
		return
	})
	.catch(err => {
		res.status(500).json({message:"Something went wrong please try again!", status: false })
		console.log('err: ', err.message)
		return
	})
	
})

router.get('*', (req, res) => {
	res.redirect("/")
})


module.exports = router

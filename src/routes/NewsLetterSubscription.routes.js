import NewsLetterSubscription from '../controllers/NewsLetterSubscription.controller.js'

const routes = application => {
	application.post('/newsletter/subscribe', NewsLetterSubscription.addNewsLetterSubscription)
	application.get('/newsletter', NewsLetterSubscription.getAllNewsLetterSubscriptions)
	application.put('/newsletter/:newsLetterId', NewsLetterSubscription.updateNewsLetterSubscription)
	application.post('/newsletter/check', NewsLetterSubscription.checkIfEmailExists)
}

export default { routes }
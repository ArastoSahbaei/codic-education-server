import NewsLetterSubscription from '../controllers/NewsLetterSubscription.controller.js'

const routes = application => {
	application.post('/newsletter/subscribe', NewsLetterSubscription.addNewsLetterSubscription)
	application.get('/newsletter', NewsLetterSubscription.getAllNewsLetterSubscriptions)
	application.put('/newsletter/unsubscribe/:newsLetterId', NewsLetterSubscription.unsubscribeNewsLetter)
}

export default { routes }
import ContactController from '../controllers/Contact.controller.js'

const routes = application => {
	application.post('/contact', ContactController.contactCodic)
}

export default { routes }
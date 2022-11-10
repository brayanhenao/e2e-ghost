import {BasePage, baseUrl} from './basePage';
class tagsEditPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/tags/new`;

	private headerOptions = () => cy.get('main section header').first();

	public mainSettingsContainer = () =>
		cy.get('.gh-main-section-content').first();

	public nameInput = () =>
		this.mainSettingsContainer().find('input[type="text"]').first();

	public colorInput = () =>
		this.mainSettingsContainer()
			.find('.input-color input[type="text"]')
			.first();

	public descriptionInput = () =>
		this.mainSettingsContainer().find('textarea').first();

	public saveButton = () => this.headerOptions().find('button').last();

	load() {
		cy.visit(this._route);
	}

	createTag(
		title: string,
		content: string,
		publish: {scheduled: boolean} | boolean = false
	) {}
}

export default new tagsEditPage();

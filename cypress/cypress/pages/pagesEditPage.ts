import {BasePage, baseUrl} from './basePage';
class pagesEditPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/editor/page`;

	private headerOptions = () => cy.get('main section header').first();

	private backButton = () => this.headerOptions().find('a').first();

	private previewButton = () =>
		this.headerOptions().find('section button').first();
	private publishButton = () =>
		this.headerOptions().find('section .gh-btn').last();

	public settingsButton = () => cy.get('main button').last();
	public settingsMenu = () => cy.get('.settings-menu-content').first();

	//TODO: add other settings if required
	public settingspageAccessSelect = () =>
		this.settingsMenu().find('.form-group select').first();

	public tagInput = () => this.settingsMenu().find('#tag-input input').first();

	private editorContainer = () => cy.get('.gh-koenig-editor-pane').first();

	private titleInput = () => this.editorContainer().find('textarea').first();
	private contentInput = () =>
		this.editorContainer().find('article div').first();

	load() {
		return cy.visit(this._route);
	}

	createPage(
		title: string,
		content: string,
		publish: {scheduled: boolean} | boolean = false
	) {
		this.titleInput().type(title).screenshot();
		this.contentInput().type(content).screenshot();

		if (publish) {
			this.publishButton().click();
			cy.wait(1000);
			if (typeof publish == 'object') {
				cy.get('div[class*="gh-publish"] div div').last().parent().click();
				cy.wait(500);
				cy.get('div[class*="gh-publish"] div[class$="-radio "]')
					.last()
					.click()
					.screenshot();
				cy.get('div[class*="gh-publish"] .gh-date-time-picker')
					.last()
					.click()
					.screenshot();

				cy.wait(1000);
			}
			cy.get('div[class*="gh-publish"] button').last().click();
			cy.wait(1000).screenshot();
			cy.get('div[class*="gh-publish"] button').first().click();
			cy.screenshot();
		}
	}
}

export default new pagesEditPage();

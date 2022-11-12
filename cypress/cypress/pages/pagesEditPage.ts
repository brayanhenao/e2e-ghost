import {BasePage, baseUrl} from './basePage';
class pagesEditPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/editor/page`;

	private headerOptions = () => cy.get('main section header').first();

	private backButton = () => this.headerOptions().find('a').first();

	private previewButton = () =>
		this.headerOptions().find('section button').first();
	private publishButton = () =>
		this.headerOptions().find('section button').last();

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
		cy.visit(this._route);
	}

	createPage(
		title: string,
		content: string,
		publish: {scheduled: boolean} | boolean = false
	) {
		this.titleInput().type(title);
		this.contentInput().type(content);

		if (publish) {
			this.publishButton().click();
			cy.wait(1000);
			if (typeof publish == 'object') {
				cy.get('.gh-publish-settings button').last().click();
				cy.get('.gh-publish-settings .gh-publish-setting-form .gh-radio')
					.last()
					.click();
				cy.get(
					'.gh-publish-settings .gh-publish-setting-form .gh-date-time-picker'
				)
					.last()
					.click();

				cy.wait(1000);
			}
			cy.get('.gh-publish-cta').first().click();
			cy.wait(1000);
			cy.get('.gh-publish-cta button').first().click();
		}
	}
}

export default new pagesEditPage();
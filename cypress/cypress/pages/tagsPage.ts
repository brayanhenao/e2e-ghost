import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class tagsPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/tags`;

	public actionsContainer = () =>
		cy.get('main section[class="view-actions"]').first();
	public newTagButton = () => this.actionsContainer().find('a').last();

	public tagListContainer = () => cy.get('.tags-list').first();

	load() {
		cy.visit(this._route);
	}
}

export default new tagsPage();

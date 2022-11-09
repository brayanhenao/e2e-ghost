import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class postsPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/posts`;

	public actionsContainer = () =>
		cy.get('main section[class="view-actions"]').first();

	public newPostsButton = () => this.actionsContainer().find('a').last();

	public postListContainer = () => cy.get('.posts-list').first();

	load() {
		cy.visit(this._route);
	}
}

export default new postsPage();

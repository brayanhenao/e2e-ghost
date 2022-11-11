import {adminPage, membersPage, membersEditPage} from '../../pages';

import {faker} from '@faker-js/faker';

describe('create_member', () => {
	let memberName,
		memberName2,
		memberName3 = '';

	let memberEmail = '';
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});

		// create a member
		membersPage.load();
		membersPage.newMemberButton().click();

		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`);
		membersEditPage.emailInput().type(memberEmail);
		membersEditPage.subscribeToggle().click();
		membersEditPage.saveButton().click();
		cy.wait(1000);

		membersPage.load();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`);
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName));
		membersEditPage.saveButton().click();
		cy.wait(1000);

		membersPage.load();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`);
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName));
		membersEditPage.saveButton().click();
		cy.wait(1000);
	});

	it('should list created members', () => {
		membersPage.load();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.contains(memberName)
			.should('be.visible');
		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('be.visible');
	});

	it('should filter member by subscribed to newsletter', () => {
		membersPage.load();
		cy.wait(1000);
		membersPage.filterButton().click();
		cy.wait(500);
		membersPage.filterParameterSelect().select('subscribed');
		membersPage.filterParameterValueSelect().select('true');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage.membersListContainer().contains(memberName).should('not.exist');
		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('be.visible');
	});
	it('should filter member by not subscribed to newsletter', () => {
		membersPage.load();
		cy.wait(1000);
		membersPage.filterButton().click();
		cy.wait(500);
		membersPage.filterParameterSelect().select('subscribed');
		membersPage.filterParameterValueSelect().select('false');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('not.exist');
	});

	it('should filter by name', () => {
		membersPage.load();
		cy.wait(1000);
		membersPage.filterButton().click();
		cy.wait(500);
		membersPage.filterParameterSelect().select('name');
		membersPage.filterParameterConditionSelect().select('contains');
		membersPage.filterParameterValueInput().type(memberName);

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.contains(memberName3)
			.should('not.exist');
	});
	it('should filter by email', () => {
		membersPage.load();
		cy.wait(1000);
		membersPage.filterButton().click();
		cy.wait(500);
		membersPage.filterParameterSelect().select('email');
		membersPage.filterParameterConditionSelect().select('contains');
		membersPage.filterParameterValueInput().type(memberEmail.substring(2));

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.contains(memberName3)
			.should('not.exist');
	});

	it('should filter by email and name', () => {
		membersPage.load();
		cy.wait(1000);
		membersPage.filterButton().click();
		cy.wait(500);

		membersPage.filterParameterSelect().select('name');
		membersPage.filterParameterConditionSelect().select('contains');
		membersPage.filterParameterValueInput().type(memberName.substring(2));

		membersPage.filterAddNewFilterButton().click();
		cy.wait(500);

		membersPage.filterParameterSelect2().select('email');
		membersPage.filterParameterConditionSelect2().select('contains');
		membersPage.filterParameterValueInput2().type(memberEmail.substring(2));

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.contains(memberName3)
			.should('not.exist');
	});
});

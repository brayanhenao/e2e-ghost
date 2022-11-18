import {adminPage, membersPage, membersEditPage} from '../../pages';

import {faker} from '@faker-js/faker';

describe('create_member', () => {
	let memberName,
		memberName2,
		memberName3 = '';

	let memberEmail = '';
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});

		// create a member
		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);
	});

	it('should list created members', () => {
		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.contains(memberName)
			.should('be.visible');
		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	it('should filter member by subscribed to newsletter', () => {
		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('true');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage.membersListContainer().contains(memberName).should('not.exist');
		membersPage
			.membersListContainer()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});
	it('should filter member by not subscribed to newsletter', () => {
		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('false');

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
		cy.screenshot();
	});

	it('should filter by name', () => {
		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage.filterParameterValueInput().type(memberName).screenshot();

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
		cy.screenshot();
	});
	it('should filter by email', () => {
		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberEmail.substring(2))
			.screenshot();

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

		cy.screenshot();
	});

	it('should filter by email and name', () => {
		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberName.substring(2))
			.screenshot();

		membersPage.filterAddNewFilterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect2().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect2()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput2()
			.type(memberEmail.substring(2))
			.screenshot();

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
		cy.screenshot();
	});
});

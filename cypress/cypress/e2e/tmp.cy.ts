//FIXME: this is a test - test file, should be removed
import {faker} from '@faker-js/faker';
import {
	generateManyValidMembers,
	generateInvalidMember,
	generateManyInvalidMembers,
} from '../helpers/mock';

import {readFileSync} from 'fs';

describe('testing', () => {
	it('should generate', () => {
		// pool de datos a-priori

		// RUN npm run data-pool:generate FIRST!
		cy.log('datos a-priori');
		cy.fixture('data-pool').then(({members}) => {
			cy.log('ValidMembers', members.valid);
			cy.log('InvalidValidMembers', members.invalid);
		});

		//pool de datos (pseudo) aleatorio dinámico
		cy.log('datos pseudo');
		cy.log('validMembers', generateManyValidMembers(100));
		cy.log(
			'inValidMember',
			generateInvalidMember({
				email: {preserveType: true},
				name: {preserveType: true},
				labels: {preserveType: true},
				note: {preserveType: true},
				subscribed: {preserveType: true},
			})
		);
		cy.log('invalidMember', generateManyInvalidMembers());

		//escenario aleatorio.
		cy.log('datos aleatorio');
		cy.log('Member', {
			name: faker.name.fullName(),
			email: faker.internet.email(),
			labels: faker.lorem.words().split(' '),
			note: faker.lorem.paragraph(),
			subscribed: faker.datatype.boolean(),
		});
	});
});

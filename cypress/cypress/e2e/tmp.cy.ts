//FIXME: this is a test - test file, should be removed
import {faker} from '@faker-js/faker';
import {
	generateManyValidMembers,
	generateInvalidMember,
	generateManyInvalidMembers,
	generateManyInvalidPosts,
	generateInvalidPost,
	generateManyValidPosts,
	generateManyValidPages,
	generateInvalidPage,
	generateManyValidTags,
	generateInvalidTag,
	generateManyInvalidTags,
	generateManyValidCodeInjections,
	generateInvalidCodeInjection,
	generateManyInvalidCodeInjections,
} from '../helpers/mock';

import {readFileSync} from 'fs';

describe('testing', () => {
	it('should generate Member', () => {
		// pool de datos a-priori

		// RUN npm run data-pool:generate FIRST!
		cy.log('datos a-priori');
		cy.fixture('data-pool').then(({members}) => {
			cy.log('ValidMembers', members.valid); // ESC1
			cy.log('InvalidValidMembers', members.invalid); // ESC2
		});

		//pool de datos (pseudo) aleatorio dinámico
		cy.log('datos pseudo');
		cy.log('validMembers', generateManyValidMembers(100)); //ESC3
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
		cy.log('invalidMember', generateManyInvalidMembers()); // membersWithBorderCases (ESC4) //membersWithInvalidTypesPerField (ESC5) //membersWithMissingKeys (ESC6)

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
	it('should generate Post', () => {
		// pool de datos a-priori

		// RUN npm run data-pool:generate FIRST!
		cy.log('datos a-priori');
		cy.fixture('data-pool').then(({posts}) => {
			cy.log('ValidPosts', posts.valid);
			cy.log('InvalidValidPosts', posts.invalid);
		});

		//pool de datos (pseudo) aleatorio dinámico
		cy.log('datos pseudo');
		cy.log('validPosts', generateManyValidPosts(100));
		cy.log(
			'invalidPost',
			generateInvalidPost({
				title: {preserveType: true} as any,
				content: {preserveType: true} as any,
				publishSettings: {
					publicationState: {preserveType: true},
					publishDate: {preserveType: true},
					publishTime: {preserveType: true},
					tags: {preserveType: true},
					access: {preserveType: true},
					excerpt: {preserveType: true}, // excerpt = 300
					featured: {preserveType: true},
					author: {preserveType: true},
				},
			})
		);
		cy.log('invalidPosts', generateManyInvalidPosts());

		//escenario aleatorio. //ESC7
		cy.log('datos aleatorio');
		cy.log('Post', {
			title: faker.lorem.words(),
			content: {
				type: 'text',
				content: faker.lorem.paragraphs(),
			},
			publishSettings: {
				publicationState: faker.helpers.arrayElement([
					'draft',
					'published',
					'scheduled',
				]),
				publishDate: faker.date.recent().toISOString().substring(0, 10),

				publishTime: faker.date.recent().toISOString().substring(11, 19),

				tags: faker.datatype.boolean()
					? faker.lorem.words(faker.datatype.number(10)).split(' ')
					: undefined,
				access: faker.helpers.arrayElement([
					'public',
					'members',
					'paid',
					'tiers',
				]),
				excerpt: faker.lorem.paragraph(),
				featured: faker.datatype.boolean(),
			},
		});
	});
	it('should generate Page', () => {
		// pool de datos a-priori

		// RUN npm run data-pool:generate FIRST!
		cy.log('datos a-priori');
		cy.fixture('data-pool').then(({pages}) => {
			cy.log('ValidPages', pages.valid);
			cy.log('InvalidValidPages', pages.invalid);
		});

		//pool de datos (pseudo) aleatorio dinámico
		cy.log('datos pseudo');
		cy.log('validPages', generateManyValidPages(100));
		cy.log(
			'invalidPage',
			generateInvalidPage({
				title: {preserveType: true} as any,
				content: {preserveType: true} as any,
				publishSettings: {
					publicationState: {preserveType: true},
					publishDate: {preserveType: true},
					publishTime: {preserveType: true},
					tags: {preserveType: true},
					access: {preserveType: true},
					excerpt: {preserveType: true}, // excerpt = 300
					featured: {preserveType: true},
					author: {preserveType: true},
				},
			})
		);
		cy.log('invalidPages', generateManyInvalidPosts());

		//escenario aleatorio. //ESC7
		cy.log('datos aleatorio');
		cy.log('Post', {
			title: faker.lorem.words(),
			content: {
				type: 'text',
				content: faker.lorem.paragraphs(),
			},
			publishSettings: {
				publicationState: faker.helpers.arrayElement([
					'draft',
					'published',
					'scheduled',
				]),
				publishDate: faker.date.recent().toISOString().substring(0, 10),

				publishTime: faker.date.recent().toISOString().substring(11, 19),

				tags: faker.datatype.boolean()
					? faker.lorem.words(faker.datatype.number(10)).split(' ')
					: undefined,
				access: faker.helpers.arrayElement([
					'public',
					'members',
					'paid',
					'tiers',
				]),
				excerpt: faker.lorem.paragraph(),
				featured: faker.datatype.boolean(),
			},
		});
	});
	it('should generate Tag', () => {
		// pool de datos a-priori

		// RUN npm run data-pool:generate FIRST!
		cy.log('datos a-priori');
		cy.fixture('data-pool').then(({tags}) => {
			cy.log('ValidTags', tags.valid);
			cy.log('InvalidValidTags', tags.invalid);
		});

		//pool de datos (pseudo) aleatorio dinámico
		cy.log('datos pseudo');
		cy.log('validTags', generateManyValidTags(100));
		cy.log(
			'invalidTag',
			generateInvalidTag({
				name: {preserveType: true},
				slug: {preserveType: true},
				color: {preserveType: true},
				description: {preserveType: true},
			})
		);
		cy.log('invalidTags', generateManyInvalidTags());

		//escenario aleatorio. //ESC7
		cy.log('datos aleatorio');
		cy.log('Tag', {
			name: faker.lorem.word(),
			slug: faker.lorem.word(),
			color: faker.color.rgb({prefix: ''}),
			description: faker.lorem.paragraph(),
		});
	});
	it('should generate codeInjection', () => {
		// pool de datos a-priori

		// RUN npm run data-pool:generate FIRST!
		cy.log('datos a-priori');
		cy.fixture('data-pool').then(({codeInjections}) => {
			cy.log('ValidCodeInjections', codeInjections.valid);
			cy.log('InvalidValidCodeInjections', codeInjections.invalid);
		});

		//pool de datos (pseudo) aleatorio dinámico
		cy.log('datos pseudo');
		cy.log('validCodeInjections', generateManyValidCodeInjections(100));
		cy.log(
			'invalidCodeInjection',
			generateInvalidCodeInjection({
				header: {preserveType: true},
				footer: {preserveType: true},
			})
		);
		cy.log('invalidCodeInjections', generateManyInvalidCodeInjections());

		//escenario aleatorio. //ESC7
		cy.log('datos aleatorio');
		cy.log('CodeInjection', {
			header: faker.lorem.paragraph(),
			footer: faker.lorem.paragraph(),
		});
	});
});

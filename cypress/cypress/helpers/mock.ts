import {faker} from '@faker-js/faker';

import {
	Invalid,
	Options,
	Member,
	InvalidOptions,
	InvalidOptionConfig,
} from './interfaces';
const types: InvalidOptionConfig['datatype'][] = [
	'bigInt',
	'boolean',
	'email',
	'null',
	'number',
	'json',
	'string',
	'text',
	'word',
	'date',
];

const generateInvalidInput = (
	originalType: InvalidOptionConfig['datatype'],
	option?: InvalidOptionConfig
) => {
	const generateRandomInputByType = (
		type?: InvalidOptionConfig['datatype']
	) => {
		const randomType = type || faker.helpers.arrayElement(types);

		if (Array.isArray(randomType)) {
			const len = option?.max || faker.datatype.number(10);
			const arr = [];
			for (let i = 0; i < len; i++) {
				arr.push(generateRandomInputByType(randomType[0]));
			}
			return arr;
		}

		if (['email', 'text', 'word', 'null'].includes(randomType)) {
			if (randomType === 'email') {
				const randCase = option?.randCase || faker.datatype.number(3);
				switch (randCase) {
					case 0:
						return faker.internet.email(undefined, undefined, undefined, {
							allowSpecialCharacters: true,
						});
					case 1:
						return faker.internet.email(
							undefined,
							undefined,
							faker.database.mongodbObjectId()
						);
					case 2:
						return faker.internet.email().replace('@', '¢');
					default:
						return faker.internet.email().replace('@', '@@@');
				}
			} else if (randomType === 'word') {
				return (
					option?.randCase ? option.randCase == 1 : faker.datatype.boolean()
				)
					? faker.lorem.word({length: {max: option?.max, min: option?.min}})
					: faker.datatype.string(option?.min || option?.max);
			} else if (randomType === 'text') {
				return (
					option?.randCase ? option.randCase == 1 : faker.datatype.boolean()
				)
					? faker.lorem.paragraph(option?.max)
					: faker.datatype.string(option?.min || option?.max);
			} else {
				return faker.datatype.boolean() ? null : undefined;
			}
		} else if (randomType === 'date') {
			return faker.date.recent().toISOString().substring(0, 10);
		} else if (randomType === 'time') {
			return faker.date.recent().toISOString().substring(11, 19);
		} else if (randomType === 'date-time') {
			return faker.date.recent().toISOString();
		}
		return faker.datatype[randomType]();
	};

	if (!option) {
		return generateRandomInputByType();
	}
	if (option.preserveType == undefined)
		option.preserveType = faker.datatype.boolean();

	if (option.min == undefined) option.min = 0;
	if (option.max == undefined) option.max = 100;

	return option?.datatype
		? generateRandomInputByType(option.datatype)
		: option.preserveType
		? generateRandomInputByType(originalType)
		: generateRandomInputByType();
};

export const generateValidMember = (options?: Options<Member>): Member => {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	return {
		name: `${firstName} ${lastName}`,
		email: faker.internet.email(firstName, lastName),
		subscribed: faker.datatype.boolean(),
		labels: faker.datatype.boolean()
			? faker.lorem
					.words(
						faker.datatype.number({
							min: options?.labels?.min || 0,
							max: options?.labels?.max || 10,
						})
					)
					.split(' ')
			: undefined,
		note: faker.lorem.sentence(),
	};
};

export const generateInvalidMember = (
	options?: InvalidOptions<Member>
): Invalid<Member> => ({
	name: generateInvalidInput('word', options?.name),
	email: generateInvalidInput('email', options?.email),
	subscribed: generateInvalidInput('boolean', options?.subscribed),
	labels: generateInvalidInput(['string'], options?.labels),
	note: generateInvalidInput('text', options?.note),
});

export const generateManyValidMembers = (amount = 100) => {
	const members: Member[] = [];
	for (let i = 0; i < amount; i++) {
		members.push(generateValidMember());
	}
	return members;
};

export const generateManyInvalidMembers = (variantAmounts = 5) => {
	const validTypes: Record<keyof Member, InvalidOptionConfig['datatype']> = {
		email: 'email',
		name: 'word',
		subscribed: 'boolean',
		labels: ['string'],
		note: 'text',
	};
	// valid members missing fields //TODO: multiply for variants if required :D //TODO: combinations
	const membersWithMissingKeys = generateManyValidMembers(5).map(
		(member, i) => {
			delete member[Object.keys(member)[i]];
			return member;
		}
	);

	const membersWithInvalidTypesPerField: Invalid<Member>[] = [].concat.apply(
		[],
		Object.entries(validTypes).map(([k, v]) =>
			[...types]
				.filter((t) => t !== v)
				.map((type) => generateInvalidMember({[k]: {datatype: type}}))
		)
	);

	//border cases
	const membersWithBorderCases: Invalid<Member>[] = [];
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true, max: 190, randCase: 2}, // max length name = 191
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true, max: 191, randCase: 2}, // max length name = 191
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true, max: 192, randCase: 2}, // max length name = 191
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true, max: 319}, // max email length = 320
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true, max: 320}, // max email length = 320
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true, max: 321}, // max email length = 320
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true, max: 9999}, // max labels 10000
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true, max: 10000}, // max labels 10000
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true, max: 10001}, // max labels 10000
			note: {preserveType: true},
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true, max: 499, randCase: 2}, // max note 500
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true, max: 500, randCase: 2}, // max note 500
			subscribed: {preserveType: true},
		})
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true, max: 501, randCase: 2}, // max note 500
			subscribed: {preserveType: true},
		})
	);

	// variantAmount * 5 fields * 3 cases + (4 borders * fields with border )
	return {
		membersWithMissingKeys,
		membersWithInvalidTypesPerField,
		membersWithBorderCases,
	};
};

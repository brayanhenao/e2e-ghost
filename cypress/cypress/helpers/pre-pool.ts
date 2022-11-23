import {faker} from '@faker-js/faker';
import {generateManyValidMembers, generateManyInvalidMembers} from './mock';
import {writeFileSync} from 'fs';

const [seed] = process.argv.slice(3);

faker.seed(parseInt(seed));

const members = {
	valid: generateManyValidMembers(100),
	invalid: generateManyValidMembers(),
};

//TODO: add other entities

const payload = {members};

writeFileSync(
	`${__dirname}/../fixtures/data-pool.json`,
	JSON.stringify(payload, null, 4)
);

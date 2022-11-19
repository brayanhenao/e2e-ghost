import compareImages from 'resemblejs/compareImages';
import {ComparisonOptions, ComparisonResult} from 'resemblejs';
import * as fs from 'fs';

interface FeatureInfo {
	feature: string;
	scenarios: string[];
}

interface ScenarioImageResult {
	scenario: string;
	image: string;
	results: ComparisonResult;
}

interface FeatureImagesResult {
	feature: string;
	scenarios: ScenarioImageResult[];
}

function compareImagesAsync(
	image1: string | ImageData | Buffer,
	image2: string | ImageData | Buffer,
	options: ComparisonOptions
): Promise<ComparisonResult> {
	return new Promise((resolve, reject) => {
		compareImages(image1, image2, options)
			.then((data: ComparisonResult) => {
				resolve(data);
			})
			.catch((err: Error) => {
				reject(err);
			});
	});
}

function generateReport(featureImagesResults: FeatureImagesResult[]): void {
	// HTML report
}

async function generateDiffImages(
	actualGhostImagesPath: string,
	newGhostImagesPath: string,
	diffImagesPath: string,
	features: FeatureInfo[],
	options: ComparisonOptions
): Promise<FeatureImagesResult[]> {
	let featureImagesResults: FeatureImagesResult[];
	featureImagesResults = [];

	for (const feature of features) {
		// Check if feature diff folder exists
		const featureDiffPath = `${diffImagesPath}/${feature.feature}`;
		if (!fs.existsSync(featureDiffPath)) {
			fs.mkdirSync(featureDiffPath);
		}

		const featureImagesResult: FeatureImagesResult = {
			feature: feature.feature,
			scenarios: [],
		};

		for (const scenario of feature.scenarios) {
			// All files with the format SCENARIO_NUMBER.png
			const actualGhostScenarioImages = fs
				.readdirSync(`${actualGhostImagesPath}/${feature.feature}`)
				.filter((file) => file.startsWith(scenario));
			const newGhostScenarioImages = fs
				.readdirSync(`${newGhostImagesPath}/${feature.feature}`)
				.filter((file) => file.startsWith(scenario));

			for (const actualGhostScenarioImage of actualGhostScenarioImages) {
				const actualGhostScenarioImagePath = `${actualGhostImagesPath}/${feature.feature}/${actualGhostScenarioImage}`;
				const newGhostScenarioImagePath = `${newGhostImagesPath}/${feature.feature}/${actualGhostScenarioImage}`;

				if (newGhostScenarioImages.includes(actualGhostScenarioImage)) {
					const diffGhostScenarioImagePath = `${featureDiffPath}/${actualGhostScenarioImage}`;

					const results = await compareImagesAsync(
						actualGhostScenarioImagePath,
						newGhostScenarioImagePath,
						options
					);

					// @ts-ignore
					fs.writeFileSync(diffGhostScenarioImagePath, results.getBuffer());

					featureImagesResult.scenarios.push({
						scenario: scenario,
						image: actualGhostScenarioImage,
						results: results,
					});
				}
			}
		}
		featureImagesResults.push(featureImagesResult);
	}

	return featureImagesResults;
}

async function Runner() {
	const IMAGES_ACTUAL_GHOST = './images/actual';
	const IMAGES_OLD_GHOST = './images/new';
	const IMAGES_DIFF_GHOST = './images/diff';

	// Clear diff images content
	if (fs.existsSync(IMAGES_DIFF_GHOST)) {
		fs.rmdirSync(IMAGES_DIFF_GHOST, {recursive: true});
		fs.mkdirSync(IMAGES_DIFF_GHOST);
	}

	const FEATURES: FeatureInfo[] = [
		{
			feature: 'F1',
			scenarios: ['SC1', 'SC3'],
		},
		{
			feature: 'F2',
			scenarios: ['SC2'],
		},
		{
			feature: 'F3',
			scenarios: ['SC2'],
		},
		{
			feature: 'F4',
			scenarios: ['SC1'],
		},
	];

	const options: ComparisonOptions = {
		output: {
			errorColor: {
				red: 255,
				green: 0,
				blue: 255,
			},
			errorType: 'movement',
			transparency: 0.3,
			largeImageThreshold: 1200,
			useCrossOrigin: false,
		},
		scaleToSameSize: true,
		ignore: 'antialiasing',
	};

	const featureImagesResults = await generateDiffImages(
		IMAGES_ACTUAL_GHOST,
		IMAGES_OLD_GHOST,
		IMAGES_DIFF_GHOST,
		FEATURES,
		options
	);

	generateReport(featureImagesResults);
}

Runner();

/**
	Overwrites the categories of Logger objects placed in JavaScript contexts.
	
	NOTE: This will work automatically for all contexts except for the transformer. For transformers,
	you will need to manually include "overwriteCategories();" at the beginning of your first step.
*/
function overwriteCategories() {
	logger = org.apache.log4j.Logger.getLogger({
		'transformer':		'custom-transformer',
		'preprocessor':	'custom-preprocessor',
		'postprocessor':	'custom-postprocessor',
		'deploy':			'custom-deploy',
		'shutdown':		'custom-shutdown',
		'filter':			'custom-filter',
		'db-connector':	'custom-db-connector',
		'js-connector':	'custom-js-connector',
		'attachment':		'custom-attachment',
		'batch':			'custom-batch',
		'response':		'custom-response'
	}[logger.getName()]);
	logger.setLevel(org.apache.log4j.Level.DEBUG);
}

overwriteCategories();
# Overwrite Logger Categories
Overwrites the categories of Logger objects placed in JavaScript contexts.

When you call `logger.info('something');` in a user-defined script, you'll see something like this in the server log:

```
[2014-01-23 08:36:32,862]  INFO  (transformer:?): something
```

In a recent thread, someone was asking whether it's possible to change the category ("transformer") that shows up to something custom, without having to edit log4j.properties and restart the server. The answer is yes, it's definitely possible, and this code template can do that for you.

All you have to do is import the code template, redeploy your channels, and it'll start working, except for transformer scripts. Because of how we handle the filter/transformer, in order to get this to work in a transformer script you'll just have to add this line at the top of the first step in your transformer:

```
overwriteCategories();
```

Note that the above is only necessary for the regular transformer, not for response transformers, filters, deploy/shutdown/preprocessor/postprocessor scripts, Database/JavaScript connectors, or attachment/batch scripts.
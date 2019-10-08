# Run on Startup
Simply sets the boolean variable `isInitialDeploy` to `true` if Connect is still starting up and `false` otherwise. This is only useful in the Deploy scripts (Global or Channel.)

### Examples
Log a certain message from the Global Deploy Script only during startup.

```javascript
if (isInitialDeploy) {
	logger.info('THIS IS THE FIRST TIME THE GLOBAL DEPLOY IS RUNNING!');
}

logger.info('This happens every time the global deploy runs.');
```

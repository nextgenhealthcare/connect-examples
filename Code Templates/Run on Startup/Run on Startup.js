const isInitialDeploy = (function() {
    const ConfigurationController = com.mirth.connect.server.controllers.ConfigurationController;
    const configurationController = ConfigurationController.getInstance();
    return configurationController.getStatus() == ConfigurationController.STATUS_INITIAL_DEPLOY;
}());

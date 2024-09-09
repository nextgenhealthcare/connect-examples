/**
    Route a message to the specified channelName. Information about the chain of source channel Ids and
    source message Ids will be included in the sourceMap of the downstream message automatically in a
    similar manner as if a Channel Writer was being used.

    @copyright 2023,2024 Tony Germano
    @license MPL-2.0

    @param {string} channelName - The name of the channel to which to route the message.
    @param {string|byte[]} message - The content of the message to be sent, textual or binary.
    @param {Object|java.util.Map} sourceMap - A map containing entries to include in the sourceMap of
        the sent message (optional).
    @param {Array<number>|java.util.Collection<Number>} destinationSet - A collection of integers
        (metadata IDs) representing which destinations to dispatch the message to. Null may be passed to
        indicate all destinations. If unspecified, all destinations is the default (optional).
    @return {Response} - The Response object returned by the channel.
*/
function routeMessage(channelName, message, sourceMap, destinationSet) {
    return router.routeMessage(channelName, createRawMessage(message, sourceMap, destinationSet))
}

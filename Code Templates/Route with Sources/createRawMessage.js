/**
    Create a RawMessage with the specified content, sourceMap, and destinationSet. Information about the
    chain of source channel Ids and source message Ids will be included in the sourceMap of the new
    RawMessage automatically in a similar manner as if a Channel Writer was being used.

    If this is called from a context where there is no messageId, a value of -1 will be used.

    If this is called from a context where there is no channelId, a value of "NONE" will be used.

    @copyright 2023,2024 Tony Germano
    @license MPL-2.0

    @param {string|byte[]} message - The content of the message to be sent, textual or binary.
    @param {Object|java.util.Map} sourceMap - A map containing entries to include in the sourceMap of
        the RawMessage (optional).
    @param {Array<number>|java.util.Collection<Number>} destinationSet - A collection of integers
        (metadata IDs) representing which destinations to dispatch the message to. Null may be passed to
        indicate all destinations. If unspecified, all destinations is the default (optional).
    @return {RawMessage} - A RawMessage object containing the message, source, and destination
        information.
*/
function createRawMessage(message, sourceMap, destinationSet) {
    if (typeof destinationSet === 'undefined') destinationSet = null
    if (sourceMap == null) sourceMap = java.util.Collections.emptyMap()

    const sourceChannelIds = $('sourceChannelIds') ? new java.util.ArrayList($('sourceChannelIds'))
        : $('sourceChannelId') ? new java.util.ArrayList([$('sourceChannelId')])
        : new java.util.ArrayList()
    const sourceMessageIds = $('sourceMessageIds') ? new java.util.ArrayList($('sourceMessageIds'))
        : $('sourceMessageId') ? new java.util.ArrayList([$('sourceMessageId')])
        : new java.util.ArrayList()

    const newSourceMap = new java.util.HashMap(sourceMap),
        _channelId = typeof channelId !== 'undefined' ? channelId : "NONE",
        messageId = new java.lang.Long(typeof connectorMessage !== 'undefined' ? connectorMessage.messageId : -1)

    sourceChannelIds.add(_channelId)
    sourceMessageIds.add(messageId)

    newSourceMap.putAll({
        sourceChannelIds: sourceChannelIds,
        sourceChannelId: _channelId,
        sourceMessageIds: sourceMessageIds,
        sourceMessageId: messageId
    })
    
    return new RawMessage(message, destinationSet, newSourceMap)
}

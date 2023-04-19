# Route with Sources

Mirth provides two ways to send messages from one channel to another. The simple way is by using a
Channel Writer destination. This lets choose your destination channel, set optional "Message
Metadata," which will appear in the sourceMap of the new message, and create a template for the
message.

The second method is by using the `VMRouter` class from the User API. Mirth automatically inserts
an instance of this class into the top level javascript scope named `router`. You can send metadata
with your messages using this method as well, but it is slightly more complicated as it requires
constructing a `RawMessage` to pass to the route command.

Additionally, when you use a Channel Writer, it automatically inserts metadata into the sourceMap
representing the current channel and message, as well as any prior channels and messages that may
have participated in the message chain. This functionality does not exist when using the `router`
object to send messages.

This library aims to make sending messages from javascript as easy as using a Channel Writer, while
also incorporating the same channel and message tracking capabilities.

This is accomplished through three related functions. See the source of each function for full
usage.

- **createRawMessage:** This creates an instance of `RawMessage` as specified in the Mirth User
API. Additionally, it mimics the behavior of a Channel Writer destination and appends metadata
to the sourceMap of the `RawMessage` by incorporating the `channelId` and `messageId` from the
current javascript context, if present.
- **routeMessage** Wrapper for `router.routeMessage`, which calls `createRawMessage` from this
library before sending the message. There are optional parameters to pass a sourceMap as the seed
for the one created by `createRawMessage` and for the `destinationSet` to be used by
`createRawMessage`.
- **routeMessageByChannelId** This is the same as the `routeMessage` function from this library
except it wraps `router.routeMessageByChannelId`.

### Getting the Code Templates
The functions are provided in two different ways.

1. A Code Template Library export for mirth versions 3.4.0+.
2. Individual javascript files. These are intended to be copied into three different Code Templates
that belong to the same Code Template Library. You may choose to include only one of the
routeMessage functions, but they both depend on createRawMessage. You may also copy all three
functions into a single code template, and they will work, but this will break the jsdoc parsing
that mirth uses for its code completion.

### Examples
Use as a drop-in replacement for `router.routeMessage` sending a string message, while adding
information about the current channel id and message id to the downstream sourceMap.

```javascript
routeMessage('ADT Processor', connectorMessage.getRawData())
```

Send a binary message. When using a byte[] for your message content, the downstream channel will
receive it as a base64 encoded string.

```javascript
routeMessageByChannelId(downstreamChannelId, javaByteArrayMessage)
```

Send a message with additional custom metadata. Source channel id and message id are always
included.

```javascript
routeMessage('File Sender', messageContent, {targetFileName: 'abc.txt', targetPath: '/files/text'})
```

Only allow message to run for destinations with specified metadata ids. No additonal custom
metadata. Source channel id and message id are always included.

```javascript
routeMessageByChannelId(downstreamChannelId, messageContent, null, [2,3])
```

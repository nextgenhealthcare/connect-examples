# EDI/X12 Batch Script
This script splits a batched EDI or X12 file into multiple messages.

To use, edit your channel and go to the Summary tab. Open the Set Data Types Dialog. Select the Source connector, and look at the inbound properties on the left. There should be a **Batch** section. Make sure "Split Batch By" is set to JavaScript, then click the Edit button in the JavaScript row. Paste the batch script in there.

Finally, to enable batching on the channel, go to the Source tab, and select Yes for Process Batch.
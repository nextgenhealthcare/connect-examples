# Example - Validate XSD
This channel processes XML data. It has a source filter that validates the XML against an XSD schema. If it fails validation, the message will be filtered.

If warnings occur during validation, the `validationWarnings` variable will be put into the response map. If errors occur during validation, the `validationErrors` variable will be put into the response map.

The current XSD used is for a FHIR Patient resource: [http://www.hl7.org/fhir/patient.xsd](http://www.hl7.org/fhir/patient.xsd)
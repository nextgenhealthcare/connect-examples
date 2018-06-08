/**
	This function returns a copy of the given HL7 field, changing all segment names to the given name.

	@param {XML} oldField - The field to copy and change.
	@param {String} name - The new name for the field.
	@return {XML} The copied and modified field.
*/
function renameField(oldField, name) {
	String.prototype.entityReplace = function() {return this.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/</g,'&lt;').replace(/>/g,'&gt;');};
	
	var out = new XML();
	
	for each (field in oldField) {
		var outField = new XML('<'+name+'/>');
		
		for each (component in field.children()) {
			var cname = name + component.name().toString().substring(component.name().toString().indexOf('.',component.name().toString().indexOf('.')+1));
			
			if (component.children().length() > 1) {
				// Has subcomponents
				var outComponent = new XML('<'+cname+'/>');
				
				for each (subcomponent in component.children()) {
					var scname = name + subcomponent.name().toString().substring(subcomponent.name().toString().indexOf('.',subcomponent.name().toString().indexOf('.')+1));
					var outSubcomponent = new XML('<'+scname+'>'+subcomponent.toString().entityReplace()+'</'+scname+'>');
					outComponent.scname = outSubcomponent;
				}
				
				outField.cname = outComponent;
			} else {
				outField.cname = new XML('<'+cname+'>'+component.toString().entityReplace()+'</'+cname+'>');
			}
		}
		
		out += outField;
	}
	
	return out;
}
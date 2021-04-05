var msgs="";
events = JSON.parse(value);
for(var i = 0; i < events.length; i++){
  created = "Created: " + events[i].created
  modified = " Modified: " + events[i].modified
  severity = " Severity: " + events[i].severity
  healthCategory = " HealthCategory: " + events[i].healthCategory
  description = (" Description " + events[i].description).replace(/\r?\n/g,'')
  msg = created + modified + severity + healthCategory + description + "\n"
  msgs = msgs + msg
}

return msgs
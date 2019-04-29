select 
action_id,	
contact_id,	
contact_uuid,
follow_up_date,	
priority,	
description,
action_uuid
from action where level_id = $1;
select 
contact_id,
seller_id,
contact_first_name, 
contact_last_name, 
company_name,
follow_up_date,
stage_level,
priority
from contact where seller_id = $1;
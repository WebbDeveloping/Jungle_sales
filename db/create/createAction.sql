insert into action(
    level_id,	
    seller_id,
    contact_id,
    contact_uuid,
    follow_up_date,	
    priority,
    description,
    action_uuid,
    level_uuid
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9
)
returning *;
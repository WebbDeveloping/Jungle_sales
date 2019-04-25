insert into action(
    action_id,
    level_id,	
    seller_id,
    contact_id,
    follow_up_date,	
    priority,
    description,
    uuid
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8
)
insert into action(
    action_uid,
    level_uid,	
    seller_uid,
    contact_uid,
    followupdate,	
    priority,
    description
) values (
    uuid_generate_v4(),
    $1,
    $2,
    $3,
    $4,
    $5,
    $6  
)
returning *;
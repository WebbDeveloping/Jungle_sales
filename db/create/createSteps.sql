insert into steps (
    steps_uid,
    level_uid,
    stepName
) values (
    uuid_generate_v4(),
    $1,
    $2
);
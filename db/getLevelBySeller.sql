-- select a.follow_up_date, a.priority, a.description, l.level_name, l.days_between_steps, st.step_name
-- from action a
-- join level l
-- on l.level_id = a.level_id
-- join steps st
-- on st.level_id = l.level_id
-- where l.seller_id = $1;

select level_uid, levelName, daysBetweenSteps from level
where seller_uid = $1;
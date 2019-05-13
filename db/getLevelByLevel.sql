-- About
-- this gets the level based off the level_id.. all from level 1 level 2 etc

-- select a.follow_up_date, a.priority, a.description, l.level_name, l.days_between_steps, st.step_name
-- from action a
-- join level l
-- on l.level_id = a.level_id
-- join steps st
-- on st.level_id = l.level_id
-- where l.level_id = $1;
select level_id, level_name, days_between_steps, level_uuid from level
where seller_id = $1;
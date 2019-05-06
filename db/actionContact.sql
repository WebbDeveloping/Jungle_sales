SELECT *
FROM contact
INNER JOIN action
ON action.contact_id = contact.contact_id
where action.contact_id = $1;
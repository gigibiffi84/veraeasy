create MATERIALIZED VIEW email_not_verified
AS
select ev."Id", ev."EmailAddress", ev."Otp", ev."AuthToken", ev."CreatedAt", ev."Secret"
from "ContactVerification"."EmailVerification" ev
where "Verified" is not null
  and "Verified" <> true
order by "CreatedAt" desc
with no data;

REFRESH
    MATERIALIZED VIEW email_not_verified;

CREATE
    OR REPLACE FUNCTION refresh_email_verification()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    REFRESH
        MATERIALIZED VIEW email_not_verified;
    RETURN NULL;
END
$$;

CREATE TRIGGER refresh_post_add_verification
    AFTER INSERT OR
        UPDATE OR
        DELETE OR TRUNCATE
    ON "ContactVerification"."EmailVerification"
    FOR EACH STATEMENT
EXECUTE PROCEDURE refresh_email_verification();
  
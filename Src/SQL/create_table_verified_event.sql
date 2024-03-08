drop table "public"."email_verified_event";
create table "public"."email_verified_event"
(
    "Id"                    uuid primary key not null,
    "EmailAddress"          text             not null,
    "EmailVerificationUuid" text             not null
);


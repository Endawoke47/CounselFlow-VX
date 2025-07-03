alter table "public"."contracts" add column "tenant_id" uuid not null;

alter table "public"."contracts" enable row level security;



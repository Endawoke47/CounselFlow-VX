alter table "public"."agenda_items" add column "tenant_id" uuid not null;

alter table "public"."agenda_items" enable row level security;

alter table "public"."board_meetings" add column "tenant_id" uuid not null;

alter table "public"."board_meetings" enable row level security;

alter table "public"."constitutional_documents" add column "tenant_id" uuid not null;

alter table "public"."constitutional_documents" enable row level security;

alter table "public"."contract_disputes" add column "tenant_id" uuid not null;

alter table "public"."contract_disputes" enable row level security;

alter table "public"."contract_matters" add column "tenant_id" uuid not null;

alter table "public"."contract_matters" enable row level security;

alter table "public"."contract_risks" add column "tenant_id" uuid not null;

alter table "public"."contract_risks" enable row level security;

alter table "public"."counterparties" add column "tenant_id" uuid not null;

alter table "public"."counterparties" enable row level security;

alter table "public"."disputes" add column "tenant_id" uuid not null;

alter table "public"."disputes" enable row level security;

alter table "public"."entities" add column "tenant_id" uuid not null;

alter table "public"."entities" enable row level security;

alter table "public"."ip_assets" add column "tenant_id" uuid not null;

alter table "public"."ip_assets" enable row level security;

alter table "public"."matter_disputes" add column "tenant_id" uuid not null;

alter table "public"."matter_disputes" enable row level security;

alter table "public"."matter_risks" add column "tenant_id" uuid not null;

alter table "public"."matter_risks" enable row level security;

alter table "public"."matters" add column "tenant_id" uuid not null;

alter table "public"."matters" enable row level security;

alter table "public"."meeting_attendees" add column "tenant_id" uuid not null;

alter table "public"."meeting_attendees" enable row level security;

alter table "public"."members" enable row level security;

alter table "public"."people" add column "tenant_id" uuid not null;

alter table "public"."people" enable row level security;

alter table "public"."policies" add column "tenant_id" uuid not null;

alter table "public"."policies" enable row level security;

alter table "public"."risks" add column "tenant_id" uuid not null;

alter table "public"."risks" enable row level security;

alter table "public"."tenants" add column "tenant_id" uuid not null;

alter table "public"."tenants" enable row level security;

create policy "agenda_items: tenant DELETE"
on "public"."agenda_items"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "agenda_items: tenant INSERT"
on "public"."agenda_items"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "agenda_items: tenant SELECT"
on "public"."agenda_items"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "agenda_items: tenant UPDATE"
on "public"."agenda_items"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{agenda_items}: tenant DELETE"
on "public"."agenda_items"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{agenda_items}: tenant INSERT"
on "public"."agenda_items"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{agenda_items}: tenant SELECT"
on "public"."agenda_items"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{agenda_items}: tenant UPDATE"
on "public"."agenda_items"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "board_meetings: tenant DELETE"
on "public"."board_meetings"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "board_meetings: tenant INSERT"
on "public"."board_meetings"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "board_meetings: tenant SELECT"
on "public"."board_meetings"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "board_meetings: tenant UPDATE"
on "public"."board_meetings"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{board_meetings}: tenant DELETE"
on "public"."board_meetings"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{board_meetings}: tenant INSERT"
on "public"."board_meetings"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{board_meetings}: tenant SELECT"
on "public"."board_meetings"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{board_meetings}: tenant UPDATE"
on "public"."board_meetings"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "constitutional_documents: tenant DELETE"
on "public"."constitutional_documents"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "constitutional_documents: tenant INSERT"
on "public"."constitutional_documents"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "constitutional_documents: tenant SELECT"
on "public"."constitutional_documents"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "constitutional_documents: tenant UPDATE"
on "public"."constitutional_documents"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{constitutional_documents}: tenant DELETE"
on "public"."constitutional_documents"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{constitutional_documents}: tenant INSERT"
on "public"."constitutional_documents"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{constitutional_documents}: tenant SELECT"
on "public"."constitutional_documents"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{constitutional_documents}: tenant UPDATE"
on "public"."constitutional_documents"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_disputes: tenant DELETE"
on "public"."contract_disputes"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_disputes: tenant INSERT"
on "public"."contract_disputes"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_disputes: tenant SELECT"
on "public"."contract_disputes"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_disputes: tenant UPDATE"
on "public"."contract_disputes"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_disputes}: tenant DELETE"
on "public"."contract_disputes"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_disputes}: tenant INSERT"
on "public"."contract_disputes"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_disputes}: tenant SELECT"
on "public"."contract_disputes"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_disputes}: tenant UPDATE"
on "public"."contract_disputes"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_matters: tenant DELETE"
on "public"."contract_matters"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_matters: tenant INSERT"
on "public"."contract_matters"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_matters: tenant SELECT"
on "public"."contract_matters"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_matters: tenant UPDATE"
on "public"."contract_matters"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_matters}: tenant DELETE"
on "public"."contract_matters"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_matters}: tenant INSERT"
on "public"."contract_matters"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_matters}: tenant SELECT"
on "public"."contract_matters"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_matters}: tenant UPDATE"
on "public"."contract_matters"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_risks: tenant DELETE"
on "public"."contract_risks"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_risks: tenant INSERT"
on "public"."contract_risks"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_risks: tenant SELECT"
on "public"."contract_risks"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contract_risks: tenant UPDATE"
on "public"."contract_risks"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_risks}: tenant DELETE"
on "public"."contract_risks"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_risks}: tenant INSERT"
on "public"."contract_risks"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_risks}: tenant SELECT"
on "public"."contract_risks"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{contract_risks}: tenant UPDATE"
on "public"."contract_risks"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "Contracts: Tenant DELETE"
on "public"."contracts"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM members
  WHERE ((members.user_id = auth.uid()) AND (members.tenant_id = contracts.tenant_id) AND (members.role = 'admin'::text)))));


create policy "Contracts: Tenant INSERT"
on "public"."contracts"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM members
  WHERE ((members.user_id = auth.uid()) AND (members.tenant_id = members.tenant_id) AND (members.role = ANY (ARRAY['admin'::text, 'lawyer'::text]))))));


create policy "Contracts: Tenant SELECT"
on "public"."contracts"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM members
  WHERE ((members.user_id = auth.uid()) AND (members.tenant_id = contracts.tenant_id)))));


create policy "Contracts: Tenant UPDATE"
on "public"."contracts"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM members
  WHERE ((members.user_id = auth.uid()) AND (members.tenant_id = contracts.tenant_id) AND (members.role = 'admin'::text)))));


create policy "contracts: tenant DELETE"
on "public"."contracts"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contracts: tenant INSERT"
on "public"."contracts"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contracts: tenant SELECT"
on "public"."contracts"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "contracts: tenant UPDATE"
on "public"."contracts"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "counterparties: tenant DELETE"
on "public"."counterparties"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "counterparties: tenant INSERT"
on "public"."counterparties"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "counterparties: tenant SELECT"
on "public"."counterparties"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "counterparties: tenant UPDATE"
on "public"."counterparties"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{counterparties}: tenant DELETE"
on "public"."counterparties"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{counterparties}: tenant INSERT"
on "public"."counterparties"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{counterparties}: tenant SELECT"
on "public"."counterparties"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{counterparties}: tenant UPDATE"
on "public"."counterparties"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "disputes: tenant DELETE"
on "public"."disputes"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "disputes: tenant INSERT"
on "public"."disputes"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "disputes: tenant SELECT"
on "public"."disputes"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "disputes: tenant UPDATE"
on "public"."disputes"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{disputes}: tenant DELETE"
on "public"."disputes"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{disputes}: tenant INSERT"
on "public"."disputes"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{disputes}: tenant SELECT"
on "public"."disputes"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{disputes}: tenant UPDATE"
on "public"."disputes"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "entities: tenant DELETE"
on "public"."entities"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "entities: tenant INSERT"
on "public"."entities"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "entities: tenant SELECT"
on "public"."entities"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "entities: tenant UPDATE"
on "public"."entities"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{entities}: tenant DELETE"
on "public"."entities"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{entities}: tenant INSERT"
on "public"."entities"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{entities}: tenant SELECT"
on "public"."entities"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{entities}: tenant UPDATE"
on "public"."entities"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "ip_assets: tenant DELETE"
on "public"."ip_assets"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "ip_assets: tenant INSERT"
on "public"."ip_assets"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "ip_assets: tenant SELECT"
on "public"."ip_assets"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "ip_assets: tenant UPDATE"
on "public"."ip_assets"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{ip_assets}: tenant DELETE"
on "public"."ip_assets"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{ip_assets}: tenant INSERT"
on "public"."ip_assets"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{ip_assets}: tenant SELECT"
on "public"."ip_assets"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{ip_assets}: tenant UPDATE"
on "public"."ip_assets"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_disputes: tenant DELETE"
on "public"."matter_disputes"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_disputes: tenant INSERT"
on "public"."matter_disputes"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_disputes: tenant SELECT"
on "public"."matter_disputes"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_disputes: tenant UPDATE"
on "public"."matter_disputes"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_disputes}: tenant DELETE"
on "public"."matter_disputes"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_disputes}: tenant INSERT"
on "public"."matter_disputes"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_disputes}: tenant SELECT"
on "public"."matter_disputes"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_disputes}: tenant UPDATE"
on "public"."matter_disputes"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_risks: tenant DELETE"
on "public"."matter_risks"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_risks: tenant INSERT"
on "public"."matter_risks"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_risks: tenant SELECT"
on "public"."matter_risks"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matter_risks: tenant UPDATE"
on "public"."matter_risks"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_risks}: tenant DELETE"
on "public"."matter_risks"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_risks}: tenant INSERT"
on "public"."matter_risks"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_risks}: tenant SELECT"
on "public"."matter_risks"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matter_risks}: tenant UPDATE"
on "public"."matter_risks"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matters: tenant DELETE"
on "public"."matters"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matters: tenant INSERT"
on "public"."matters"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matters: tenant SELECT"
on "public"."matters"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "matters: tenant UPDATE"
on "public"."matters"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matters}: tenant DELETE"
on "public"."matters"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matters}: tenant INSERT"
on "public"."matters"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matters}: tenant SELECT"
on "public"."matters"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{matters}: tenant UPDATE"
on "public"."matters"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "meeting_attendees: tenant DELETE"
on "public"."meeting_attendees"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "meeting_attendees: tenant INSERT"
on "public"."meeting_attendees"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "meeting_attendees: tenant SELECT"
on "public"."meeting_attendees"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "meeting_attendees: tenant UPDATE"
on "public"."meeting_attendees"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{meeting_attendees}: tenant DELETE"
on "public"."meeting_attendees"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{meeting_attendees}: tenant INSERT"
on "public"."meeting_attendees"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{meeting_attendees}: tenant SELECT"
on "public"."meeting_attendees"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{meeting_attendees}: tenant UPDATE"
on "public"."meeting_attendees"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "members: tenant DELETE"
on "public"."members"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "members: tenant INSERT"
on "public"."members"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "members: tenant SELECT"
on "public"."members"
as permissive
for select
to public
using ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "members: tenant UPDATE"
on "public"."members"
as permissive
for update
to public
using ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "{members}: tenant DELETE"
on "public"."members"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "{members}: tenant INSERT"
on "public"."members"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "{members}: tenant SELECT"
on "public"."members"
as permissive
for select
to public
using ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "{members}: tenant UPDATE"
on "public"."members"
as permissive
for update
to public
using ((tenant_id = ( SELECT members_1.tenant_id
   FROM members members_1
  WHERE (members_1.user_id = auth.uid()))));


create policy "people: tenant DELETE"
on "public"."people"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "people: tenant INSERT"
on "public"."people"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "people: tenant SELECT"
on "public"."people"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "people: tenant UPDATE"
on "public"."people"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{people}: tenant DELETE"
on "public"."people"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{people}: tenant INSERT"
on "public"."people"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{people}: tenant SELECT"
on "public"."people"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{people}: tenant UPDATE"
on "public"."people"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "policies: tenant DELETE"
on "public"."policies"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "policies: tenant INSERT"
on "public"."policies"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "policies: tenant SELECT"
on "public"."policies"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "policies: tenant UPDATE"
on "public"."policies"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{policies}: tenant DELETE"
on "public"."policies"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{policies}: tenant INSERT"
on "public"."policies"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{policies}: tenant SELECT"
on "public"."policies"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{policies}: tenant UPDATE"
on "public"."policies"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "risks: tenant DELETE"
on "public"."risks"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "risks: tenant INSERT"
on "public"."risks"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "risks: tenant SELECT"
on "public"."risks"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "risks: tenant UPDATE"
on "public"."risks"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{risks}: tenant DELETE"
on "public"."risks"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{risks}: tenant INSERT"
on "public"."risks"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{risks}: tenant SELECT"
on "public"."risks"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{risks}: tenant UPDATE"
on "public"."risks"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "tenants: tenant DELETE"
on "public"."tenants"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "tenants: tenant INSERT"
on "public"."tenants"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "tenants: tenant SELECT"
on "public"."tenants"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "tenants: tenant UPDATE"
on "public"."tenants"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{tenants}: tenant DELETE"
on "public"."tenants"
as permissive
for delete
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{tenants}: tenant INSERT"
on "public"."tenants"
as permissive
for insert
to public
with check ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{tenants}: tenant SELECT"
on "public"."tenants"
as permissive
for select
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));


create policy "{tenants}: tenant UPDATE"
on "public"."tenants"
as permissive
for update
to public
using ((tenant_id = ( SELECT members.tenant_id
   FROM members
  WHERE (members.user_id = auth.uid()))));




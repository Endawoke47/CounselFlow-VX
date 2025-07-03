create type "public"."attendee_role" as enum ('director', 'secretary', 'observer', 'advisor');

create type "public"."attendee_status" as enum ('pending', 'accepted', 'declined', 'tentative');

create type "public"."contract_status" as enum ('draft', 'under_review', 'approved', 'executed', 'active', 'expiring', 'expired', 'terminated', 'renewed');

create type "public"."dispute_status" as enum ('open', 'in_review', 'negotiation', 'mediation', 'arbitration', 'litigation', 'escalated', 'resolved', 'closed');

create type "public"."entity_type" as enum ('subsidiary', 'parent', 'holding_company', 'joint_venture', 'branch', 'partnership');

create type "public"."ip_asset_status" as enum ('pending', 'registered', 'rejected', 'expired', 'abandoned');

create type "public"."matter_status" as enum ('open', 'in_progress', 'pending_review', 'on_hold', 'completed', 'cancelled');

create type "public"."meeting_type" as enum ('board', 'agm', 'egm', 'committee', 'audit', 'remuneration');

create type "public"."policy_status" as enum ('draft', 'under_review', 'approved', 'active', 'archived');

create type "public"."priority_level" as enum ('low', 'medium', 'high', 'critical');

create type "public"."risk_level" as enum ('low', 'medium', 'high', 'critical');

create type "public"."risk_status" as enum ('active', 'monitoring', 'mitigated', 'closed');

create table "public"."agenda_items" (
    "id" uuid not null default gen_random_uuid(),
    "meeting_id" uuid not null,
    "order_num" integer not null,
    "title" character varying(255) not null,
    "description" text,
    "presenter_id" uuid,
    "estimated_duration_mins" integer
);


create table "public"."board_meetings" (
    "id" uuid not null default gen_random_uuid(),
    "entity_id" uuid not null,
    "title" character varying(255) not null,
    "type" meeting_type not null,
    "scheduled_date" timestamp with time zone not null,
    "status" character varying(50) not null default 'tentative'::character varying,
    "location" text,
    "minutes" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."constitutional_documents" (
    "id" uuid not null default gen_random_uuid(),
    "entity_id" uuid not null,
    "type" character varying(50) not null,
    "title" character varying(255) not null,
    "file_url" text,
    "upload_date" date default CURRENT_DATE,
    "version" character varying(20) default '1.0'::character varying,
    "status" character varying(50) default 'active'::character varying,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."contract_disputes" (
    "contract_id" uuid not null,
    "dispute_id" uuid not null
);


create table "public"."contract_matters" (
    "contract_id" uuid not null,
    "matter_id" uuid not null
);


create table "public"."contract_risks" (
    "contract_id" uuid not null,
    "risk_id" uuid not null
);


create table "public"."contracts" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "type" character varying(50) not null,
    "status" contract_status not null default 'draft'::contract_status,
    "entity_id" uuid not null,
    "counterparty_id" uuid not null,
    "responsible_person_id" uuid,
    "effective_date" date,
    "expiration_date" date,
    "contract_value" numeric(18,2) default 0,
    "currency" character varying(10) default 'USD'::character varying,
    "is_auto_renewal" boolean default false,
    "renewal_notice_days" integer,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."counterparties" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(255) not null,
    "type" character varying(50) not null,
    "jurisdiction" character varying(100),
    "risk_rating" risk_level default 'low'::risk_level,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."disputes" (
    "id" uuid not null default gen_random_uuid(),
    "dispute_id" character varying(50) not null,
    "title" character varying(255) not null,
    "type" character varying(50) not null,
    "status" dispute_status not null default 'open'::dispute_status,
    "priority" priority_level not null default 'medium'::priority_level,
    "entity_id" uuid not null,
    "counterparty_id" uuid,
    "exposure_amount" numeric(15,2) default 0,
    "currency" character varying(10) default 'USD'::character varying,
    "initiated_date" date not null default CURRENT_DATE,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."entities" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(255) not null,
    "type" entity_type not null,
    "jurisdiction" character varying(100) not null,
    "company_number" character varying(50),
    "status" character varying(50) not null default 'active'::character varying,
    "incorporation_date" date,
    "registered_address" text,
    "industry" character varying(100),
    "parent_entity_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."ip_assets" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "type" character varying(50) not null,
    "status" ip_asset_status not null,
    "entity_id" uuid not null,
    "registration_number" character varying(100),
    "jurisdiction" character varying(100),
    "registration_date" date,
    "expiration_date" date,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."matter_disputes" (
    "matter_id" uuid not null,
    "dispute_id" uuid not null
);


create table "public"."matter_risks" (
    "matter_id" uuid not null,
    "risk_id" uuid not null
);


create table "public"."matters" (
    "id" uuid not null default gen_random_uuid(),
    "matter_number" character varying(50) not null,
    "title" character varying(255) not null,
    "description" text,
    "type" character varying(50) not null,
    "status" matter_status not null default 'open'::matter_status,
    "priority" priority_level not null default 'medium'::priority_level,
    "entity_id" uuid not null,
    "responsible_lawyer_id" uuid,
    "open_date" date not null default CURRENT_DATE,
    "target_close_date" date,
    "budgeted_costs" numeric(15,2) default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."meeting_attendees" (
    "id" uuid not null default gen_random_uuid(),
    "meeting_id" uuid not null,
    "person_id" uuid,
    "name" character varying(255) not null,
    "role" attendee_role not null,
    "response_status" attendee_status default 'pending'::attendee_status
);


create table "public"."members" (
    "user_id" uuid not null,
    "tenant_id" uuid not null,
    "role" text not null
);


create table "public"."people" (
    "id" uuid not null default gen_random_uuid(),
    "first_name" character varying(100) not null,
    "last_name" character varying(100) not null,
    "email" character varying(255) not null,
    "title" character varying(100),
    "department" character varying(100),
    "entity_id" uuid,
    "roles" text[] default '{}'::text[],
    "is_active" boolean default true,
    "auth_user_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."policies" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "category" character varying(100) not null,
    "version" character varying(20) not null default '1.0'::character varying,
    "status" policy_status not null default 'draft'::policy_status,
    "entity_id" uuid,
    "owner_id" uuid,
    "effective_date" date,
    "next_review_date" date,
    "content" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."risks" (
    "id" uuid not null default gen_random_uuid(),
    "risk_id" character varying(50) not null,
    "title" character varying(255) not null,
    "category" character varying(50) not null,
    "severity" risk_level not null,
    "probability" character varying(20) not null,
    "risk_score" integer not null,
    "status" risk_status not null default 'active'::risk_status,
    "owner_id" uuid,
    "identified_date" date not null default CURRENT_DATE,
    "review_date" date,
    "mitigation_plan" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."tenants" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX agenda_items_pkey ON public.agenda_items USING btree (id);

CREATE UNIQUE INDEX board_meetings_pkey ON public.board_meetings USING btree (id);

CREATE UNIQUE INDEX constitutional_documents_pkey ON public.constitutional_documents USING btree (id);

CREATE UNIQUE INDEX contract_disputes_pkey ON public.contract_disputes USING btree (contract_id, dispute_id);

CREATE UNIQUE INDEX contract_matters_pkey ON public.contract_matters USING btree (contract_id, matter_id);

CREATE UNIQUE INDEX contract_risks_pkey ON public.contract_risks USING btree (contract_id, risk_id);

CREATE UNIQUE INDEX contracts_pkey ON public.contracts USING btree (id);

CREATE UNIQUE INDEX counterparties_name_key ON public.counterparties USING btree (name);

CREATE UNIQUE INDEX counterparties_pkey ON public.counterparties USING btree (id);

CREATE UNIQUE INDEX disputes_dispute_id_key ON public.disputes USING btree (dispute_id);

CREATE UNIQUE INDEX disputes_pkey ON public.disputes USING btree (id);

CREATE UNIQUE INDEX entities_pkey ON public.entities USING btree (id);

CREATE INDEX idx_board_meetings_entity_id ON public.board_meetings USING btree (entity_id);

CREATE INDEX idx_contracts_counterparty_id ON public.contracts USING btree (counterparty_id);

CREATE INDEX idx_contracts_entity_id ON public.contracts USING btree (entity_id);

CREATE INDEX idx_contracts_status ON public.contracts USING btree (status);

CREATE INDEX idx_entities_name ON public.entities USING btree (name);

CREATE INDEX idx_matters_entity_id ON public.matters USING btree (entity_id);

CREATE INDEX idx_matters_status ON public.matters USING btree (status);

CREATE INDEX idx_people_email ON public.people USING btree (email);

CREATE INDEX idx_risks_category ON public.risks USING btree (category);

CREATE INDEX idx_risks_status ON public.risks USING btree (status);

CREATE UNIQUE INDEX ip_assets_pkey ON public.ip_assets USING btree (id);

CREATE UNIQUE INDEX matter_disputes_pkey ON public.matter_disputes USING btree (matter_id, dispute_id);

CREATE UNIQUE INDEX matter_risks_pkey ON public.matter_risks USING btree (matter_id, risk_id);

CREATE UNIQUE INDEX matters_matter_number_key ON public.matters USING btree (matter_number);

CREATE UNIQUE INDEX matters_pkey ON public.matters USING btree (id);

CREATE UNIQUE INDEX meeting_attendees_meeting_id_person_id_key ON public.meeting_attendees USING btree (meeting_id, person_id);

CREATE UNIQUE INDEX meeting_attendees_pkey ON public.meeting_attendees USING btree (id);

CREATE UNIQUE INDEX members_pkey ON public.members USING btree (user_id, tenant_id);

CREATE UNIQUE INDEX people_auth_user_id_key ON public.people USING btree (auth_user_id);

CREATE UNIQUE INDEX people_email_key ON public.people USING btree (email);

CREATE UNIQUE INDEX people_pkey ON public.people USING btree (id);

CREATE UNIQUE INDEX policies_pkey ON public.policies USING btree (id);

CREATE UNIQUE INDEX risks_pkey ON public.risks USING btree (id);

CREATE UNIQUE INDEX risks_risk_id_key ON public.risks USING btree (risk_id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

alter table "public"."agenda_items" add constraint "agenda_items_pkey" PRIMARY KEY using index "agenda_items_pkey";

alter table "public"."board_meetings" add constraint "board_meetings_pkey" PRIMARY KEY using index "board_meetings_pkey";

alter table "public"."constitutional_documents" add constraint "constitutional_documents_pkey" PRIMARY KEY using index "constitutional_documents_pkey";

alter table "public"."contract_disputes" add constraint "contract_disputes_pkey" PRIMARY KEY using index "contract_disputes_pkey";

alter table "public"."contract_matters" add constraint "contract_matters_pkey" PRIMARY KEY using index "contract_matters_pkey";

alter table "public"."contract_risks" add constraint "contract_risks_pkey" PRIMARY KEY using index "contract_risks_pkey";

alter table "public"."contracts" add constraint "contracts_pkey" PRIMARY KEY using index "contracts_pkey";

alter table "public"."counterparties" add constraint "counterparties_pkey" PRIMARY KEY using index "counterparties_pkey";

alter table "public"."disputes" add constraint "disputes_pkey" PRIMARY KEY using index "disputes_pkey";

alter table "public"."entities" add constraint "entities_pkey" PRIMARY KEY using index "entities_pkey";

alter table "public"."ip_assets" add constraint "ip_assets_pkey" PRIMARY KEY using index "ip_assets_pkey";

alter table "public"."matter_disputes" add constraint "matter_disputes_pkey" PRIMARY KEY using index "matter_disputes_pkey";

alter table "public"."matter_risks" add constraint "matter_risks_pkey" PRIMARY KEY using index "matter_risks_pkey";

alter table "public"."matters" add constraint "matters_pkey" PRIMARY KEY using index "matters_pkey";

alter table "public"."meeting_attendees" add constraint "meeting_attendees_pkey" PRIMARY KEY using index "meeting_attendees_pkey";

alter table "public"."members" add constraint "members_pkey" PRIMARY KEY using index "members_pkey";

alter table "public"."people" add constraint "people_pkey" PRIMARY KEY using index "people_pkey";

alter table "public"."policies" add constraint "policies_pkey" PRIMARY KEY using index "policies_pkey";

alter table "public"."risks" add constraint "risks_pkey" PRIMARY KEY using index "risks_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."agenda_items" add constraint "agenda_items_meeting_id_fkey" FOREIGN KEY (meeting_id) REFERENCES board_meetings(id) ON DELETE CASCADE not valid;

alter table "public"."agenda_items" validate constraint "agenda_items_meeting_id_fkey";

alter table "public"."agenda_items" add constraint "agenda_items_presenter_id_fkey" FOREIGN KEY (presenter_id) REFERENCES people(id) ON DELETE SET NULL not valid;

alter table "public"."agenda_items" validate constraint "agenda_items_presenter_id_fkey";

alter table "public"."board_meetings" add constraint "board_meetings_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE not valid;

alter table "public"."board_meetings" validate constraint "board_meetings_entity_id_fkey";

alter table "public"."constitutional_documents" add constraint "constitutional_documents_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE not valid;

alter table "public"."constitutional_documents" validate constraint "constitutional_documents_entity_id_fkey";

alter table "public"."contract_disputes" add constraint "contract_disputes_contract_id_fkey" FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE not valid;

alter table "public"."contract_disputes" validate constraint "contract_disputes_contract_id_fkey";

alter table "public"."contract_disputes" add constraint "contract_disputes_dispute_id_fkey" FOREIGN KEY (dispute_id) REFERENCES disputes(id) ON DELETE CASCADE not valid;

alter table "public"."contract_disputes" validate constraint "contract_disputes_dispute_id_fkey";

alter table "public"."contract_matters" add constraint "contract_matters_contract_id_fkey" FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE not valid;

alter table "public"."contract_matters" validate constraint "contract_matters_contract_id_fkey";

alter table "public"."contract_matters" add constraint "contract_matters_matter_id_fkey" FOREIGN KEY (matter_id) REFERENCES matters(id) ON DELETE CASCADE not valid;

alter table "public"."contract_matters" validate constraint "contract_matters_matter_id_fkey";

alter table "public"."contract_risks" add constraint "contract_risks_contract_id_fkey" FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE not valid;

alter table "public"."contract_risks" validate constraint "contract_risks_contract_id_fkey";

alter table "public"."contract_risks" add constraint "contract_risks_risk_id_fkey" FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE not valid;

alter table "public"."contract_risks" validate constraint "contract_risks_risk_id_fkey";

alter table "public"."contracts" add constraint "contracts_counterparty_id_fkey" FOREIGN KEY (counterparty_id) REFERENCES counterparties(id) ON DELETE RESTRICT not valid;

alter table "public"."contracts" validate constraint "contracts_counterparty_id_fkey";

alter table "public"."contracts" add constraint "contracts_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE not valid;

alter table "public"."contracts" validate constraint "contracts_entity_id_fkey";

alter table "public"."contracts" add constraint "contracts_responsible_person_id_fkey" FOREIGN KEY (responsible_person_id) REFERENCES people(id) ON DELETE SET NULL not valid;

alter table "public"."contracts" validate constraint "contracts_responsible_person_id_fkey";

alter table "public"."counterparties" add constraint "counterparties_name_key" UNIQUE using index "counterparties_name_key";

alter table "public"."disputes" add constraint "disputes_counterparty_id_fkey" FOREIGN KEY (counterparty_id) REFERENCES counterparties(id) ON DELETE SET NULL not valid;

alter table "public"."disputes" validate constraint "disputes_counterparty_id_fkey";

alter table "public"."disputes" add constraint "disputes_dispute_id_key" UNIQUE using index "disputes_dispute_id_key";

alter table "public"."disputes" add constraint "disputes_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE not valid;

alter table "public"."disputes" validate constraint "disputes_entity_id_fkey";

alter table "public"."entities" add constraint "entities_parent_entity_id_fkey" FOREIGN KEY (parent_entity_id) REFERENCES entities(id) ON DELETE SET NULL not valid;

alter table "public"."entities" validate constraint "entities_parent_entity_id_fkey";

alter table "public"."ip_assets" add constraint "ip_assets_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE not valid;

alter table "public"."ip_assets" validate constraint "ip_assets_entity_id_fkey";

alter table "public"."matter_disputes" add constraint "matter_disputes_dispute_id_fkey" FOREIGN KEY (dispute_id) REFERENCES disputes(id) ON DELETE CASCADE not valid;

alter table "public"."matter_disputes" validate constraint "matter_disputes_dispute_id_fkey";

alter table "public"."matter_disputes" add constraint "matter_disputes_matter_id_fkey" FOREIGN KEY (matter_id) REFERENCES matters(id) ON DELETE CASCADE not valid;

alter table "public"."matter_disputes" validate constraint "matter_disputes_matter_id_fkey";

alter table "public"."matter_risks" add constraint "matter_risks_matter_id_fkey" FOREIGN KEY (matter_id) REFERENCES matters(id) ON DELETE CASCADE not valid;

alter table "public"."matter_risks" validate constraint "matter_risks_matter_id_fkey";

alter table "public"."matter_risks" add constraint "matter_risks_risk_id_fkey" FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE not valid;

alter table "public"."matter_risks" validate constraint "matter_risks_risk_id_fkey";

alter table "public"."matters" add constraint "matters_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE not valid;

alter table "public"."matters" validate constraint "matters_entity_id_fkey";

alter table "public"."matters" add constraint "matters_matter_number_key" UNIQUE using index "matters_matter_number_key";

alter table "public"."matters" add constraint "matters_responsible_lawyer_id_fkey" FOREIGN KEY (responsible_lawyer_id) REFERENCES people(id) ON DELETE SET NULL not valid;

alter table "public"."matters" validate constraint "matters_responsible_lawyer_id_fkey";

alter table "public"."meeting_attendees" add constraint "meeting_attendees_meeting_id_fkey" FOREIGN KEY (meeting_id) REFERENCES board_meetings(id) ON DELETE CASCADE not valid;

alter table "public"."meeting_attendees" validate constraint "meeting_attendees_meeting_id_fkey";

alter table "public"."meeting_attendees" add constraint "meeting_attendees_meeting_id_person_id_key" UNIQUE using index "meeting_attendees_meeting_id_person_id_key";

alter table "public"."meeting_attendees" add constraint "meeting_attendees_person_id_fkey" FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE SET NULL not valid;

alter table "public"."meeting_attendees" validate constraint "meeting_attendees_person_id_fkey";

alter table "public"."members" add constraint "members_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."members" validate constraint "members_tenant_id_fkey";

alter table "public"."members" add constraint "members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."members" validate constraint "members_user_id_fkey";

alter table "public"."people" add constraint "people_auth_user_id_key" UNIQUE using index "people_auth_user_id_key";

alter table "public"."people" add constraint "people_email_key" UNIQUE using index "people_email_key";

alter table "public"."people" add constraint "people_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL not valid;

alter table "public"."people" validate constraint "people_entity_id_fkey";

alter table "public"."policies" add constraint "policies_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE not valid;

alter table "public"."policies" validate constraint "policies_entity_id_fkey";

alter table "public"."policies" add constraint "policies_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES people(id) ON DELETE SET NULL not valid;

alter table "public"."policies" validate constraint "policies_owner_id_fkey";

alter table "public"."risks" add constraint "risks_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES people(id) ON DELETE SET NULL not valid;

alter table "public"."risks" validate constraint "risks_owner_id_fkey";

alter table "public"."risks" add constraint "risks_risk_id_key" UNIQUE using index "risks_risk_id_key";

alter table "public"."risks" add constraint "risks_risk_score_check" CHECK (((risk_score >= 0) AND (risk_score <= 100))) not valid;

alter table "public"."risks" validate constraint "risks_risk_score_check";

grant delete on table "public"."agenda_items" to "anon";

grant insert on table "public"."agenda_items" to "anon";

grant references on table "public"."agenda_items" to "anon";

grant select on table "public"."agenda_items" to "anon";

grant trigger on table "public"."agenda_items" to "anon";

grant truncate on table "public"."agenda_items" to "anon";

grant update on table "public"."agenda_items" to "anon";

grant delete on table "public"."agenda_items" to "authenticated";

grant insert on table "public"."agenda_items" to "authenticated";

grant references on table "public"."agenda_items" to "authenticated";

grant select on table "public"."agenda_items" to "authenticated";

grant trigger on table "public"."agenda_items" to "authenticated";

grant truncate on table "public"."agenda_items" to "authenticated";

grant update on table "public"."agenda_items" to "authenticated";

grant delete on table "public"."agenda_items" to "service_role";

grant insert on table "public"."agenda_items" to "service_role";

grant references on table "public"."agenda_items" to "service_role";

grant select on table "public"."agenda_items" to "service_role";

grant trigger on table "public"."agenda_items" to "service_role";

grant truncate on table "public"."agenda_items" to "service_role";

grant update on table "public"."agenda_items" to "service_role";

grant delete on table "public"."board_meetings" to "anon";

grant insert on table "public"."board_meetings" to "anon";

grant references on table "public"."board_meetings" to "anon";

grant select on table "public"."board_meetings" to "anon";

grant trigger on table "public"."board_meetings" to "anon";

grant truncate on table "public"."board_meetings" to "anon";

grant update on table "public"."board_meetings" to "anon";

grant delete on table "public"."board_meetings" to "authenticated";

grant insert on table "public"."board_meetings" to "authenticated";

grant references on table "public"."board_meetings" to "authenticated";

grant select on table "public"."board_meetings" to "authenticated";

grant trigger on table "public"."board_meetings" to "authenticated";

grant truncate on table "public"."board_meetings" to "authenticated";

grant update on table "public"."board_meetings" to "authenticated";

grant delete on table "public"."board_meetings" to "service_role";

grant insert on table "public"."board_meetings" to "service_role";

grant references on table "public"."board_meetings" to "service_role";

grant select on table "public"."board_meetings" to "service_role";

grant trigger on table "public"."board_meetings" to "service_role";

grant truncate on table "public"."board_meetings" to "service_role";

grant update on table "public"."board_meetings" to "service_role";

grant delete on table "public"."constitutional_documents" to "anon";

grant insert on table "public"."constitutional_documents" to "anon";

grant references on table "public"."constitutional_documents" to "anon";

grant select on table "public"."constitutional_documents" to "anon";

grant trigger on table "public"."constitutional_documents" to "anon";

grant truncate on table "public"."constitutional_documents" to "anon";

grant update on table "public"."constitutional_documents" to "anon";

grant delete on table "public"."constitutional_documents" to "authenticated";

grant insert on table "public"."constitutional_documents" to "authenticated";

grant references on table "public"."constitutional_documents" to "authenticated";

grant select on table "public"."constitutional_documents" to "authenticated";

grant trigger on table "public"."constitutional_documents" to "authenticated";

grant truncate on table "public"."constitutional_documents" to "authenticated";

grant update on table "public"."constitutional_documents" to "authenticated";

grant delete on table "public"."constitutional_documents" to "service_role";

grant insert on table "public"."constitutional_documents" to "service_role";

grant references on table "public"."constitutional_documents" to "service_role";

grant select on table "public"."constitutional_documents" to "service_role";

grant trigger on table "public"."constitutional_documents" to "service_role";

grant truncate on table "public"."constitutional_documents" to "service_role";

grant update on table "public"."constitutional_documents" to "service_role";

grant delete on table "public"."contract_disputes" to "anon";

grant insert on table "public"."contract_disputes" to "anon";

grant references on table "public"."contract_disputes" to "anon";

grant select on table "public"."contract_disputes" to "anon";

grant trigger on table "public"."contract_disputes" to "anon";

grant truncate on table "public"."contract_disputes" to "anon";

grant update on table "public"."contract_disputes" to "anon";

grant delete on table "public"."contract_disputes" to "authenticated";

grant insert on table "public"."contract_disputes" to "authenticated";

grant references on table "public"."contract_disputes" to "authenticated";

grant select on table "public"."contract_disputes" to "authenticated";

grant trigger on table "public"."contract_disputes" to "authenticated";

grant truncate on table "public"."contract_disputes" to "authenticated";

grant update on table "public"."contract_disputes" to "authenticated";

grant delete on table "public"."contract_disputes" to "service_role";

grant insert on table "public"."contract_disputes" to "service_role";

grant references on table "public"."contract_disputes" to "service_role";

grant select on table "public"."contract_disputes" to "service_role";

grant trigger on table "public"."contract_disputes" to "service_role";

grant truncate on table "public"."contract_disputes" to "service_role";

grant update on table "public"."contract_disputes" to "service_role";

grant delete on table "public"."contract_matters" to "anon";

grant insert on table "public"."contract_matters" to "anon";

grant references on table "public"."contract_matters" to "anon";

grant select on table "public"."contract_matters" to "anon";

grant trigger on table "public"."contract_matters" to "anon";

grant truncate on table "public"."contract_matters" to "anon";

grant update on table "public"."contract_matters" to "anon";

grant delete on table "public"."contract_matters" to "authenticated";

grant insert on table "public"."contract_matters" to "authenticated";

grant references on table "public"."contract_matters" to "authenticated";

grant select on table "public"."contract_matters" to "authenticated";

grant trigger on table "public"."contract_matters" to "authenticated";

grant truncate on table "public"."contract_matters" to "authenticated";

grant update on table "public"."contract_matters" to "authenticated";

grant delete on table "public"."contract_matters" to "service_role";

grant insert on table "public"."contract_matters" to "service_role";

grant references on table "public"."contract_matters" to "service_role";

grant select on table "public"."contract_matters" to "service_role";

grant trigger on table "public"."contract_matters" to "service_role";

grant truncate on table "public"."contract_matters" to "service_role";

grant update on table "public"."contract_matters" to "service_role";

grant delete on table "public"."contract_risks" to "anon";

grant insert on table "public"."contract_risks" to "anon";

grant references on table "public"."contract_risks" to "anon";

grant select on table "public"."contract_risks" to "anon";

grant trigger on table "public"."contract_risks" to "anon";

grant truncate on table "public"."contract_risks" to "anon";

grant update on table "public"."contract_risks" to "anon";

grant delete on table "public"."contract_risks" to "authenticated";

grant insert on table "public"."contract_risks" to "authenticated";

grant references on table "public"."contract_risks" to "authenticated";

grant select on table "public"."contract_risks" to "authenticated";

grant trigger on table "public"."contract_risks" to "authenticated";

grant truncate on table "public"."contract_risks" to "authenticated";

grant update on table "public"."contract_risks" to "authenticated";

grant delete on table "public"."contract_risks" to "service_role";

grant insert on table "public"."contract_risks" to "service_role";

grant references on table "public"."contract_risks" to "service_role";

grant select on table "public"."contract_risks" to "service_role";

grant trigger on table "public"."contract_risks" to "service_role";

grant truncate on table "public"."contract_risks" to "service_role";

grant update on table "public"."contract_risks" to "service_role";

grant delete on table "public"."contracts" to "anon";

grant insert on table "public"."contracts" to "anon";

grant references on table "public"."contracts" to "anon";

grant select on table "public"."contracts" to "anon";

grant trigger on table "public"."contracts" to "anon";

grant truncate on table "public"."contracts" to "anon";

grant update on table "public"."contracts" to "anon";

grant delete on table "public"."contracts" to "authenticated";

grant insert on table "public"."contracts" to "authenticated";

grant references on table "public"."contracts" to "authenticated";

grant select on table "public"."contracts" to "authenticated";

grant trigger on table "public"."contracts" to "authenticated";

grant truncate on table "public"."contracts" to "authenticated";

grant update on table "public"."contracts" to "authenticated";

grant delete on table "public"."contracts" to "service_role";

grant insert on table "public"."contracts" to "service_role";

grant references on table "public"."contracts" to "service_role";

grant select on table "public"."contracts" to "service_role";

grant trigger on table "public"."contracts" to "service_role";

grant truncate on table "public"."contracts" to "service_role";

grant update on table "public"."contracts" to "service_role";

grant delete on table "public"."counterparties" to "anon";

grant insert on table "public"."counterparties" to "anon";

grant references on table "public"."counterparties" to "anon";

grant select on table "public"."counterparties" to "anon";

grant trigger on table "public"."counterparties" to "anon";

grant truncate on table "public"."counterparties" to "anon";

grant update on table "public"."counterparties" to "anon";

grant delete on table "public"."counterparties" to "authenticated";

grant insert on table "public"."counterparties" to "authenticated";

grant references on table "public"."counterparties" to "authenticated";

grant select on table "public"."counterparties" to "authenticated";

grant trigger on table "public"."counterparties" to "authenticated";

grant truncate on table "public"."counterparties" to "authenticated";

grant update on table "public"."counterparties" to "authenticated";

grant delete on table "public"."counterparties" to "service_role";

grant insert on table "public"."counterparties" to "service_role";

grant references on table "public"."counterparties" to "service_role";

grant select on table "public"."counterparties" to "service_role";

grant trigger on table "public"."counterparties" to "service_role";

grant truncate on table "public"."counterparties" to "service_role";

grant update on table "public"."counterparties" to "service_role";

grant delete on table "public"."disputes" to "anon";

grant insert on table "public"."disputes" to "anon";

grant references on table "public"."disputes" to "anon";

grant select on table "public"."disputes" to "anon";

grant trigger on table "public"."disputes" to "anon";

grant truncate on table "public"."disputes" to "anon";

grant update on table "public"."disputes" to "anon";

grant delete on table "public"."disputes" to "authenticated";

grant insert on table "public"."disputes" to "authenticated";

grant references on table "public"."disputes" to "authenticated";

grant select on table "public"."disputes" to "authenticated";

grant trigger on table "public"."disputes" to "authenticated";

grant truncate on table "public"."disputes" to "authenticated";

grant update on table "public"."disputes" to "authenticated";

grant delete on table "public"."disputes" to "service_role";

grant insert on table "public"."disputes" to "service_role";

grant references on table "public"."disputes" to "service_role";

grant select on table "public"."disputes" to "service_role";

grant trigger on table "public"."disputes" to "service_role";

grant truncate on table "public"."disputes" to "service_role";

grant update on table "public"."disputes" to "service_role";

grant delete on table "public"."entities" to "anon";

grant insert on table "public"."entities" to "anon";

grant references on table "public"."entities" to "anon";

grant select on table "public"."entities" to "anon";

grant trigger on table "public"."entities" to "anon";

grant truncate on table "public"."entities" to "anon";

grant update on table "public"."entities" to "anon";

grant delete on table "public"."entities" to "authenticated";

grant insert on table "public"."entities" to "authenticated";

grant references on table "public"."entities" to "authenticated";

grant select on table "public"."entities" to "authenticated";

grant trigger on table "public"."entities" to "authenticated";

grant truncate on table "public"."entities" to "authenticated";

grant update on table "public"."entities" to "authenticated";

grant delete on table "public"."entities" to "service_role";

grant insert on table "public"."entities" to "service_role";

grant references on table "public"."entities" to "service_role";

grant select on table "public"."entities" to "service_role";

grant trigger on table "public"."entities" to "service_role";

grant truncate on table "public"."entities" to "service_role";

grant update on table "public"."entities" to "service_role";

grant delete on table "public"."ip_assets" to "anon";

grant insert on table "public"."ip_assets" to "anon";

grant references on table "public"."ip_assets" to "anon";

grant select on table "public"."ip_assets" to "anon";

grant trigger on table "public"."ip_assets" to "anon";

grant truncate on table "public"."ip_assets" to "anon";

grant update on table "public"."ip_assets" to "anon";

grant delete on table "public"."ip_assets" to "authenticated";

grant insert on table "public"."ip_assets" to "authenticated";

grant references on table "public"."ip_assets" to "authenticated";

grant select on table "public"."ip_assets" to "authenticated";

grant trigger on table "public"."ip_assets" to "authenticated";

grant truncate on table "public"."ip_assets" to "authenticated";

grant update on table "public"."ip_assets" to "authenticated";

grant delete on table "public"."ip_assets" to "service_role";

grant insert on table "public"."ip_assets" to "service_role";

grant references on table "public"."ip_assets" to "service_role";

grant select on table "public"."ip_assets" to "service_role";

grant trigger on table "public"."ip_assets" to "service_role";

grant truncate on table "public"."ip_assets" to "service_role";

grant update on table "public"."ip_assets" to "service_role";

grant delete on table "public"."matter_disputes" to "anon";

grant insert on table "public"."matter_disputes" to "anon";

grant references on table "public"."matter_disputes" to "anon";

grant select on table "public"."matter_disputes" to "anon";

grant trigger on table "public"."matter_disputes" to "anon";

grant truncate on table "public"."matter_disputes" to "anon";

grant update on table "public"."matter_disputes" to "anon";

grant delete on table "public"."matter_disputes" to "authenticated";

grant insert on table "public"."matter_disputes" to "authenticated";

grant references on table "public"."matter_disputes" to "authenticated";

grant select on table "public"."matter_disputes" to "authenticated";

grant trigger on table "public"."matter_disputes" to "authenticated";

grant truncate on table "public"."matter_disputes" to "authenticated";

grant update on table "public"."matter_disputes" to "authenticated";

grant delete on table "public"."matter_disputes" to "service_role";

grant insert on table "public"."matter_disputes" to "service_role";

grant references on table "public"."matter_disputes" to "service_role";

grant select on table "public"."matter_disputes" to "service_role";

grant trigger on table "public"."matter_disputes" to "service_role";

grant truncate on table "public"."matter_disputes" to "service_role";

grant update on table "public"."matter_disputes" to "service_role";

grant delete on table "public"."matter_risks" to "anon";

grant insert on table "public"."matter_risks" to "anon";

grant references on table "public"."matter_risks" to "anon";

grant select on table "public"."matter_risks" to "anon";

grant trigger on table "public"."matter_risks" to "anon";

grant truncate on table "public"."matter_risks" to "anon";

grant update on table "public"."matter_risks" to "anon";

grant delete on table "public"."matter_risks" to "authenticated";

grant insert on table "public"."matter_risks" to "authenticated";

grant references on table "public"."matter_risks" to "authenticated";

grant select on table "public"."matter_risks" to "authenticated";

grant trigger on table "public"."matter_risks" to "authenticated";

grant truncate on table "public"."matter_risks" to "authenticated";

grant update on table "public"."matter_risks" to "authenticated";

grant delete on table "public"."matter_risks" to "service_role";

grant insert on table "public"."matter_risks" to "service_role";

grant references on table "public"."matter_risks" to "service_role";

grant select on table "public"."matter_risks" to "service_role";

grant trigger on table "public"."matter_risks" to "service_role";

grant truncate on table "public"."matter_risks" to "service_role";

grant update on table "public"."matter_risks" to "service_role";

grant delete on table "public"."matters" to "anon";

grant insert on table "public"."matters" to "anon";

grant references on table "public"."matters" to "anon";

grant select on table "public"."matters" to "anon";

grant trigger on table "public"."matters" to "anon";

grant truncate on table "public"."matters" to "anon";

grant update on table "public"."matters" to "anon";

grant delete on table "public"."matters" to "authenticated";

grant insert on table "public"."matters" to "authenticated";

grant references on table "public"."matters" to "authenticated";

grant select on table "public"."matters" to "authenticated";

grant trigger on table "public"."matters" to "authenticated";

grant truncate on table "public"."matters" to "authenticated";

grant update on table "public"."matters" to "authenticated";

grant delete on table "public"."matters" to "service_role";

grant insert on table "public"."matters" to "service_role";

grant references on table "public"."matters" to "service_role";

grant select on table "public"."matters" to "service_role";

grant trigger on table "public"."matters" to "service_role";

grant truncate on table "public"."matters" to "service_role";

grant update on table "public"."matters" to "service_role";

grant delete on table "public"."meeting_attendees" to "anon";

grant insert on table "public"."meeting_attendees" to "anon";

grant references on table "public"."meeting_attendees" to "anon";

grant select on table "public"."meeting_attendees" to "anon";

grant trigger on table "public"."meeting_attendees" to "anon";

grant truncate on table "public"."meeting_attendees" to "anon";

grant update on table "public"."meeting_attendees" to "anon";

grant delete on table "public"."meeting_attendees" to "authenticated";

grant insert on table "public"."meeting_attendees" to "authenticated";

grant references on table "public"."meeting_attendees" to "authenticated";

grant select on table "public"."meeting_attendees" to "authenticated";

grant trigger on table "public"."meeting_attendees" to "authenticated";

grant truncate on table "public"."meeting_attendees" to "authenticated";

grant update on table "public"."meeting_attendees" to "authenticated";

grant delete on table "public"."meeting_attendees" to "service_role";

grant insert on table "public"."meeting_attendees" to "service_role";

grant references on table "public"."meeting_attendees" to "service_role";

grant select on table "public"."meeting_attendees" to "service_role";

grant trigger on table "public"."meeting_attendees" to "service_role";

grant truncate on table "public"."meeting_attendees" to "service_role";

grant update on table "public"."meeting_attendees" to "service_role";

grant delete on table "public"."members" to "anon";

grant insert on table "public"."members" to "anon";

grant references on table "public"."members" to "anon";

grant select on table "public"."members" to "anon";

grant trigger on table "public"."members" to "anon";

grant truncate on table "public"."members" to "anon";

grant update on table "public"."members" to "anon";

grant delete on table "public"."members" to "authenticated";

grant insert on table "public"."members" to "authenticated";

grant references on table "public"."members" to "authenticated";

grant select on table "public"."members" to "authenticated";

grant trigger on table "public"."members" to "authenticated";

grant truncate on table "public"."members" to "authenticated";

grant update on table "public"."members" to "authenticated";

grant delete on table "public"."members" to "service_role";

grant insert on table "public"."members" to "service_role";

grant references on table "public"."members" to "service_role";

grant select on table "public"."members" to "service_role";

grant trigger on table "public"."members" to "service_role";

grant truncate on table "public"."members" to "service_role";

grant update on table "public"."members" to "service_role";

grant delete on table "public"."people" to "anon";

grant insert on table "public"."people" to "anon";

grant references on table "public"."people" to "anon";

grant select on table "public"."people" to "anon";

grant trigger on table "public"."people" to "anon";

grant truncate on table "public"."people" to "anon";

grant update on table "public"."people" to "anon";

grant delete on table "public"."people" to "authenticated";

grant insert on table "public"."people" to "authenticated";

grant references on table "public"."people" to "authenticated";

grant select on table "public"."people" to "authenticated";

grant trigger on table "public"."people" to "authenticated";

grant truncate on table "public"."people" to "authenticated";

grant update on table "public"."people" to "authenticated";

grant delete on table "public"."people" to "service_role";

grant insert on table "public"."people" to "service_role";

grant references on table "public"."people" to "service_role";

grant select on table "public"."people" to "service_role";

grant trigger on table "public"."people" to "service_role";

grant truncate on table "public"."people" to "service_role";

grant update on table "public"."people" to "service_role";

grant delete on table "public"."policies" to "anon";

grant insert on table "public"."policies" to "anon";

grant references on table "public"."policies" to "anon";

grant select on table "public"."policies" to "anon";

grant trigger on table "public"."policies" to "anon";

grant truncate on table "public"."policies" to "anon";

grant update on table "public"."policies" to "anon";

grant delete on table "public"."policies" to "authenticated";

grant insert on table "public"."policies" to "authenticated";

grant references on table "public"."policies" to "authenticated";

grant select on table "public"."policies" to "authenticated";

grant trigger on table "public"."policies" to "authenticated";

grant truncate on table "public"."policies" to "authenticated";

grant update on table "public"."policies" to "authenticated";

grant delete on table "public"."policies" to "service_role";

grant insert on table "public"."policies" to "service_role";

grant references on table "public"."policies" to "service_role";

grant select on table "public"."policies" to "service_role";

grant trigger on table "public"."policies" to "service_role";

grant truncate on table "public"."policies" to "service_role";

grant update on table "public"."policies" to "service_role";

grant delete on table "public"."risks" to "anon";

grant insert on table "public"."risks" to "anon";

grant references on table "public"."risks" to "anon";

grant select on table "public"."risks" to "anon";

grant trigger on table "public"."risks" to "anon";

grant truncate on table "public"."risks" to "anon";

grant update on table "public"."risks" to "anon";

grant delete on table "public"."risks" to "authenticated";

grant insert on table "public"."risks" to "authenticated";

grant references on table "public"."risks" to "authenticated";

grant select on table "public"."risks" to "authenticated";

grant trigger on table "public"."risks" to "authenticated";

grant truncate on table "public"."risks" to "authenticated";

grant update on table "public"."risks" to "authenticated";

grant delete on table "public"."risks" to "service_role";

grant insert on table "public"."risks" to "service_role";

grant references on table "public"."risks" to "service_role";

grant select on table "public"."risks" to "service_role";

grant trigger on table "public"."risks" to "service_role";

grant truncate on table "public"."risks" to "service_role";

grant update on table "public"."risks" to "service_role";

grant delete on table "public"."tenants" to "anon";

grant insert on table "public"."tenants" to "anon";

grant references on table "public"."tenants" to "anon";

grant select on table "public"."tenants" to "anon";

grant trigger on table "public"."tenants" to "anon";

grant truncate on table "public"."tenants" to "anon";

grant update on table "public"."tenants" to "anon";

grant delete on table "public"."tenants" to "authenticated";

grant insert on table "public"."tenants" to "authenticated";

grant references on table "public"."tenants" to "authenticated";

grant select on table "public"."tenants" to "authenticated";

grant trigger on table "public"."tenants" to "authenticated";

grant truncate on table "public"."tenants" to "authenticated";

grant update on table "public"."tenants" to "authenticated";

grant delete on table "public"."tenants" to "service_role";

grant insert on table "public"."tenants" to "service_role";

grant references on table "public"."tenants" to "service_role";

grant select on table "public"."tenants" to "service_role";

grant trigger on table "public"."tenants" to "service_role";

grant truncate on table "public"."tenants" to "service_role";

grant update on table "public"."tenants" to "service_role";



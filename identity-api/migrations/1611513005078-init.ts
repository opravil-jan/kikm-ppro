import {MigrationInterface, QueryRunner} from "typeorm";

export class init1611513005078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.identity_type (id, name) VALUES (1, 'basic');`)
        await queryRunner.query(`INSERT INTO public.identity_type (id, name) VALUES (2, 'professional');`)
        await queryRunner.query(`INSERT INTO public.clients (id, name, description, expiration, "identityTypeId") VALUES ('94e138db-48af-4752-ad40-7efe42a6230c', 'Jane Doe', 'The Jane', null, 2);`)  
        await queryRunner.query(`INSERT INTO public.clients (id, name, description, expiration, "identityTypeId") VALUES ('0f136707-d381-464a-8d28-c475ea677593', 'John Doe', 'The green', null, 1);`)
        await queryRunner.query(`INSERT INTO public.contact (id, "name", "contact", "clientId") VALUES ('b1611607-12c3-45f2-b117-e59f0088ffb4', 'phone', '777666555',       '94e138db-48af-4752-ad40-7efe42a6230c');`)
        await queryRunner.query(`INSERT INTO public.contact (id, "name", "contact", "clientId") VALUES ('63037e43-90c5-4f5b-b29e-702cfb6d176d', 'email', 'jarda@gmail.com', '94e138db-48af-4752-ad40-7efe42a6230c');`)
//        await queryRunner.query(`​INSERT INTO contact (id, "name", "contact", "clientId") VALUES ('f5281b8d-d669-4a98-8fc7-4526735513e2', 'fax',   '111222333',       '0f136707-d381-464a-8d28-c475ea677593');`)
//        await queryRunner.query(`​INSERT INTO contact (id, "name", "contact", "clientId") VALUES ('f08db0a3-fcb0-4de2-9f46-5fa00b341690', 'mobil', '765765765',       '0f136707-d381-464a-8d28-c475ea677593');`)
        await queryRunner.query(`INSERT INTO public.users (id, login, email, password, "createdAt", "deactivationDate") VALUES ('3cca306c-6582-4161-82af-27f8c80b8d77',	'doe', 'jarda@gmail.com', '$2a$04$vnlAX9pVAwXbCrXIPeLMyuqcaou1kSpcYlPp8JWhp8N/x1LkkS2Eu', '2021-01-14 06:39:33.977', null);`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

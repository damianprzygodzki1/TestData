import { faker } from "@faker-js/faker";

export const role_enum = [
  "Director",
  "Producer",
  "Screenwriter",
  "Actor",
  "Actress",
  "Cinematographer",
  "Film Editor",
  "Production Designer",
  "Costume Designer",
  "Music Composer",
];

export function Credit(title_id) {
  this.id = faker.helpers.unique(faker.number.int);
  this.title_id = title_id;
  this.real_name = `${faker.person.firstName()} ${faker.person.lastName()}`;
  this.character_name = `${faker.person.firstName()} ${faker.person.lastName()}`;
  this.role = faker.helpers.arrayElement(role_enum);
}

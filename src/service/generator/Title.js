import { faker } from "@faker-js/faker";

export const age_certification_enum = [
  "G",
  "PG",
  "PG-13",
  "R",
  "NC-17",
  "U",
  "U/A",
  "A",
  "S",
  "AL",
  "6",
  "9",
  "12",
  "12A",
  "15",
  "18",
  "18R",
  "R18",
  "R21",
  "M",
  "MA15+",
  "R16",
  "R18+",
  "X18",
  "T",
  "E",
  "E10+",
  "EC",
  "C",
  "CA",
  "GP",
  "M/PG",
  "TV-Y",
  "TV-Y7",
  "TV-G",
  "TV-PG",
  "TV-14",
  "TV-MA",
];

export function Title() {
  this.id = faker.helpers.unique(faker.number.int);
  this.title = faker.lorem.sentence({ min: 1, max: 10 });
  this.description = faker.lorem.paragraph({ min: 5, max: 10 });
  this.release_year = faker.date.anytime().getFullYear();
  this.age_certification = faker.helpers.arrayElement(age_certification_enum);
  this.runtime = faker.number.int({ min: 30, max: 200 });
  this.genres = faker.helpers.multiple(faker.lorem.word, {count: {min: 1, max: 10}});
  this.production_contry = faker.location.countryCode("alpha-3");
  this.seasons = faker.number.int({ min: 1, max: 100 });
}

import { faker } from "@faker-js/faker";
import { Credit, role_enum } from "./Credit";
import { Title, age_certification_enum } from "./Title";

const DEFAULT_VARCHAR_LENGTH = 30;

const typeMatrix = {
  Number: [
    () => -1,
    () => null,
    () => undefined,
    () => faker.number.float(),
    () => Number.MAX_SAFE_INTEGER,
    () => Number.MAX_SAFE_INTEGER + 1,
  ],
  String: [
    () => null,
    () => undefined,
    () => "",
    () => " " + faker.lorem.word(),
    () => faker.string.symbol(),
    () => faker.string.symbol() + faker.lorem.word(),
    () => faker.string.alphanumeric({ casing: "upper" }),
    () => faker.string.alphanumeric({ casing: "lower" }),
  ],
  Array: [
    () => null,
    () => undefined,
    () => [null],
    () => [],
    () => faker.helpers.multiple(faker.lorem.word, { count: 100 }),
  ],
};

const keysMatrix = {
  real_name: [
    () => faker.string.alpha(DEFAULT_VARCHAR_LENGTH),
    () => faker.string.alpha(DEFAULT_VARCHAR_LENGTH + 1),
  ],
  character_name: [
    () => faker.string.alpha(DEFAULT_VARCHAR_LENGTH),
    () => faker.string.alpha(DEFAULT_VARCHAR_LENGTH + 1),
  ],
  age_certification: [...age_certification_enum.map((value) => () => value)],
  role: [...role_enum.map((value) => () => value)],
};

const generateTitle = (key, generateValue) => {
  const newTitle = new Title();
  newTitle[key] = generateValue();

  const newCredits = Array(faker.number.int(2, 10))
    .fill(null)
    .map(() => new Credit(newTitle.id));

  return [[newTitle], newCredits];
};

const generateCredits = (key, generateValue) => {
  const validTitleForCredits = new Title();

  return [
    [validTitleForCredits],
    Array(faker.number.int(2, 10))
      .fill(null)
      .map(() => {
        const newCredit = new Credit(validTitleForCredits.id);
        newCredit[key] = generateValue();
        return newCredit;
      }),
  ];
};

export const generate = () => {
  let titles = [];
  let credits = [];

  // Positive default
  titles.push(new Title());
  credits.push(
    ...Array(faker.number.int(2, 10))
      .fill(null)
      .map(() => new Credit(titles[0].id))
  );

  // Synthetic
  Object.entries(titles[0]).forEach(([key, value]) => {
    const type = value.constructor.name;

    if (type in typeMatrix) {
      typeMatrix[type].forEach((testValue) => {
        const [newTitles, newCredits] = generateTitle(key, testValue);
        titles.push(...newTitles);
        credits.push(...newCredits);
      });
    }

    if (key in keysMatrix) {
      keysMatrix[key].forEach((testValue) => {
        const [newTitles, newCredits] = generateTitle(key, testValue);
        titles.push(...newTitles);
        credits.push(...newCredits);
      });
    }
  });

  Object.entries(credits[0]).forEach(([key, value]) => {
    const type = value.constructor.name;
    if (type in typeMatrix) {
      typeMatrix[type].forEach((testValue) => {
        const [newTitles, newCredits] = generateCredits(key, testValue);
        titles.push(...newTitles);
        credits.push(...newCredits);
      });
    }

    if (key in keysMatrix) {
      keysMatrix[key].forEach((testValue) => {
        const [newTitles, newCredits] = generateCredits(key, testValue);
        titles.push(...newTitles);
        credits.push(...newCredits);
      });
    }
  });

  return [
    titles,
    credits
  ];
};

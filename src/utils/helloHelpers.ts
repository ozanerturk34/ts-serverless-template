import { PeopleIDontLike } from "@models/models";

const peopleIDontLike: PeopleIDontLike = ["Bonnie", "Clyde"];

export const doILikePerson = (name: string) => !peopleIDontLike.includes(name);

import PokeType from 'classes/PokeType';

export const ICON_PATH = '/icons/';

const normal = new PokeType({
  icon: 'normal.svg',
  name: 'Normal',
  altColor: '#cbc8a5',
  color: '#aba96c',
});
const fire = new PokeType({
  icon: 'fire.svg',
  name: 'Fire',
  altColor: '#ff7700',
  color: '#ff0000',
});
const water = new PokeType({
  icon: 'water.svg',
  name: 'Water',
  altColor: '#007ac1',
  color: '#00517d',
});
const electric = new PokeType({
  icon: 'electric.svg',
  name: 'Electric',
  altColor: '#f2ff6e',
  color: '#959100',
});
const grass = new PokeType({
  icon: 'grass.svg',
  name: 'Grass',
  altColor: '#009a00',
  color: '#0f4000',
});
const ice = new PokeType({
  icon: 'ice.svg',
  name: 'Ice',
  altColor: '#0097a3',
  color: '#003d43',
});
const fighting = new PokeType({
  icon: 'fighting.svg',
  name: 'Fighting',
  altColor: 'xxx',
  color: '#8a0004',
});
const poison = new PokeType({
  icon: 'poison.svg',
  name: 'Poison',
  altColor: '#b800de',
  color: '#6a0084',
});
const ground = new PokeType({
  icon: 'ground.svg',
  name: 'Ground',
  altColor: '#e2d138',
  color: '#c0ac00',
});
const flying = new PokeType({
  icon: 'flying.svg',
  name: 'Flying',
  altColor: '#33bbb2',
  color: '#005764',
});
const psychic = new PokeType({
  icon: 'psychic.svg',
  name: 'Psychic',
  altColor: '#ff0061',
  color: '#95002f',
});
const bug = new PokeType({
  icon: 'bug.svg',
  name: 'Bug',
  altColor: '#b2df59',
  color: '#82bc00',
});
const rock = new PokeType({
  icon: 'rock.svg',
  name: 'Rock',
  altColor: '#786935',
  color: '#474021',
});
const ghost = new PokeType({
  icon: 'ghost.svg',
  name: 'Ghost',
  altColor: '#974da8',
  color: '#4b2754',
});
const dragon = new PokeType({
  icon: 'dragon.svg',
  name: 'Dragon',
  altColor: '#9646ff',
  color: '#2f006e',
});
const dark = new PokeType({
  icon: 'dark.svg',
  name: 'Dark',
  altColor: '#62452e',
  color: '#2e201a',
});
const steel = new PokeType({
  icon: 'steel.svg',
  name: 'Steel',
  altColor: '#758e89',
  color: '#444444',
});
const fairy = new PokeType({
  icon: 'fairy.svg',
  name: 'Fairy',
  altColor: '#ff99c2',
  color: '#ff73a6',
});

const pokeTypes = [
  normal, fire, water, electric, grass, ice,
  fighting, poison, ground, flying, psychic,
  bug, rock, ghost, dragon, dark, steel, fairy];

// https://pokemondb.net/type
normal.load({
  noEffect: ghost,
  notEffective: [rock, steel],
});

fire.load({
  notEffective: [fire, water, rock, dragon],
  superEffective: [grass, ice, bug, steel],
});

water.load({
  notEffective: [water, grass, dragon],
  superEffective: [ground, rock],
});

electric.load({
  noEffect: ground,
  notEffective: [electric, grass, dragon],
  superEffective: [water, flying],
});

grass.load({
  notEffective: [fire, grass, poison, flying, bug],
  superEffective: [water, ground, rock],
});

ice.load({
  notEffective: [fire, water, ice, steel],
  superEffective: [grass, ground, flying, dragon],
});

fighting.load({
  noEffect: [ghost],
  notEffective: [poison, flying, psychic, bug, fairy],
  superEffective: [normal, ice, rock, dark, steel],
});

poison.load({
  noEffect: [steel],
  notEffective: [poison, ground, rock, ghost],
  superEffective: [grass, fairy],
});

ground.load({
  noEffect: [flying],
  notEffective: [electric, rock, steel],
  superEffective: [fire, electric, poison, steel],
});

flying.load({
  notEffective: [electric, rock, steel],
  superEffective: [grass, fighting, bug],
});

psychic.load({
  noEffect: [dark],
  notEffective: [bug, steel],
  superEffective: [fighting, poison],
});

bug.load({
  notEffective: [fire, fighting, poison, flying, ghost],
  superEffective: [grass, psychic, dark],
});

rock.load({
  notEffective: [fighting, ground, steel],
  superEffective: [fire, ice, flying, bug],
});

ghost.load({
  noEffect: [normal],
  notEffective: [dark],
  superEffective: [psychic, ghost],
});

dragon.load({
  noEffect: [fairy],
  notEffective: [steel],
  superEffective: [dragon],
});

dark.load({
  notEffective: [fighting, dark, fairy],
  superEffective: [psychic, ghost],
});

steel.load({
  notEffective: [fire, water, electric, steel],
  superEffective: [ice, rock, fairy],
});

fairy.load({
  notEffective: [fire, poison, steel],
  superEffective: [fighting, dragon, dark],
});

export const randomPokeType = (): PokeType => pokeTypes[
  Math.floor(Math.random() * pokeTypes.length)
];

export default pokeTypes;

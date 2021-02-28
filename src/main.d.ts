type PokeTypeName =
  | 'Bug'
  | 'Dark'
  | 'Dragon'
  | 'Electric'
  | 'Fairy'
  | 'Fighting'
  | 'Fire'
  | 'Flying'
  | 'Ghost'
  | 'Grass'
  | 'Ground'
  | 'Ice'
  | 'Normal'
  | 'Poison'
  | 'Psychic'
  | 'Rock'
  | 'Steel'
  | 'Water';

interface PokeType {
  name: PokeTypeName
}

type QuestionAction =
  | { type: 'add answer', answer: PokeType }
  | { type: 'load' }
  | { type: 'new' }
  | { type: 'remove answer', answer: PokeType }
  | { type: 'submit', results: Results }
  ;

type Results = [correct: number, outOf: number];

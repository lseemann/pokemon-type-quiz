import PokeType from 'classes/PokeType';

export const scoreTypeQuestion = (input: {
  answers: Array<PokeType>,
  key: Array<PokeType>,
}): [correct: number, outOf: number] => {
  const { answers, key } = input;
  let correct = 0;

  answers.forEach((answer) => {
    if (key.includes(answer)) {
      correct += 1;
    }
  });

  return [correct, key.length];
};

export const questionTypes = [
  'weakAgainst',
  'strongAgainst',
  'vulnerableTo',
  'resistentTo',
];

type questionType = typeof questionTypes[number];

export const randomQuestionType = (): questionType => questionTypes[
  Math.floor(Math.random() * questionTypes.length)];

const Highlight = (
  { children }: { children: React.ReactNode },
) => <span style={{ fontWeight: 700 }}>{children}</span>;

export const getQuestionData = (questionType: questionType, pokeType: PokeType): {
  key: Array<PokeType>,
  question: JSX.Element,
} => {
  switch (questionType) {
    case 'weakAgainst':
      return {
        key: pokeType.getWeakAgainst(),
        question: (
          <>
            Who is
            {' '}
            <Highlight>{pokeType.name}</Highlight>
            {' '}
            weak against?
          </>
        ),
      };

    case 'strongAgainst':
      return {
        key: pokeType.getSuperEffective(),
        question: (
          <>
            Who is
            {' '}
            <Highlight>{pokeType.name}</Highlight>
            {' '}
            strong against?
          </>
        ),
      };

    case 'vulnerableTo':
      return {
        key: pokeType.getVulnerableTo(),
        question: (
          <>
            Who is strong against
            {' '}
            <Highlight>{pokeType.name}</Highlight>
            ?
          </>
        ),
      };

    case 'resistentTo':
      return {
        key: pokeType.getResistantTo(),
        question: (
          <>
            Who is weak against
            {' '}
            <Highlight>{pokeType.name}</Highlight>
            ?
          </>
        ),
      };

    default:
      return {
        key: [],
        question: (<></>),
      };
  }
};

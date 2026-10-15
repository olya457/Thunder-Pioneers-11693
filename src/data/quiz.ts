import { articles } from './articles';
import { shuffle } from '../utils/science';
const prompts = [
  [
    'Who is associated with the famous kite experiment?',
    'Who developed a lightning rod to help protect buildings?',
    'Whose 1752 experiment investigated atmospheric electricity?',
  ],
  [
    'Who arranged the metal-rod experiment at Marly-la-Ville?',
    'Who helped bring Franklin’s ideas to French readers?',
    'Whose storm-cloud test preceded Franklin’s kite experiment?',
  ],
  [
    'Who used a torsion balance to study electric forces?',
    'Whose law says doubling charge separation reduces force to one quarter?',
    'Who reported electrical force experiments in 1785?',
  ],
  [
    'Who introduced the voltaic pile in 1800?',
    'Who used alternating metal discs and an electrolyte to supply current?',
    'Whose invention became a starting point for electrical batteries?',
  ],
  [
    'Who observed a compass turning near a wire in 1820?',
    'Who revealed that current produces a magnetic effect around a wire?',
    'Whose compass experiment connected electricity and magnetism?',
  ],
  [
    'Who studied forces between parallel current-carrying wires?',
    'Who gave his name to the unit of electrical current?',
    'Who helped establish electrodynamics after Ørsted’s discovery?',
  ],
  [
    'Who demonstrated electromagnetic induction in 1831?',
    'Who showed how motion between a magnet and conductor can generate electricity?',
    'Whose induction research established a principle used by generators?',
  ],
  [
    'Who developed powerful electromagnets with insulated wire?',
    'Who gave his name to the unit of inductance?',
    'Who made important discoveries about self-induction?',
  ],
  [
    'Who developed a mathematical theory uniting electricity and magnetism?',
    'Who identified light as an electromagnetic phenomenon?',
    'Who published a major electromagnetic theory paper in 1865?',
  ],
  [
    'Who developed polyphase motors with a rotating magnetic field?',
    'Who licensed his AC technology patents to Westinghouse?',
    'Whose induction motors helped expand alternating-current systems?',
  ],
  [
    'Who helped develop a complete electric lighting system?',
    'Whose Pearl Street Station supplied electricity in 1882?',
    'Whose lighting station supplied direct current to lower Manhattan?',
  ],
  [
    'Whose company powered the 1893 World’s Columbian Exposition?',
    'Who helped the Niagara Falls project supply Buffalo in 1896?',
    'Who licensed Tesla’s patents and developed large AC power systems?',
  ],
];
export const gameFacts = [
  [
    'Investigated storm clouds through a famous kite experiment.',
    'Developed a lightning rod to help protect buildings.',
  ],
  [
    'Arranged an elevated metal-rod experiment at Marly-la-Ville in 1752.',
    'Helped bring Franklin’s electrical ideas to French readers.',
  ],
  [
    'Used a torsion balance to investigate electrical forces.',
    'Showed how electrical force changes with charge separation.',
  ],
  [
    'Introduced the voltaic pile in 1800.',
    'Used metal discs and an electrolyte to produce sustained current.',
  ],
  [
    'Observed a compass needle turning near a current-carrying wire in 1820.',
    'Revealed a magnetic effect around a current-carrying wire.',
  ],
  [
    'Investigated attraction and repulsion between parallel current-carrying wires.',
    'Gave his name to the unit of electrical current.',
  ],
  [
    'Demonstrated electromagnetic induction in 1831.',
    'Showed how motion between a magnet and conductor can generate electricity.',
  ],
  [
    'Developed powerful electromagnets with coils of insulated wire.',
    'Made discoveries about self-induction and gave his name to the unit of inductance.',
  ],
  [
    'Developed a mathematical theory connecting electricity and magnetism.',
    'Identified light as an electromagnetic phenomenon.',
  ],
  [
    'Developed polyphase motors that created a rotating magnetic field.',
    'Licensed his alternating-current patents to George Westinghouse.',
  ],
  [
    'Developed a lighting system with lamps, generators, and wiring.',
    'His Pearl Street Station supplied direct-current electricity in 1882.',
  ],
  [
    'His company supplied the electrical system for the 1893 Chicago exposition.',
    'Played a major role in the Niagara Falls project supplying Buffalo in 1896.',
  ],
].flatMap((facts, i) =>
  facts.map(text => ({ text, articleId: articles[i].id })),
);
export const questions = prompts.flatMap((items, i) =>
  items.map((prompt, j) => ({
    id: `${articles[i].id}-${j}`,
    prompt,
    answer: articles[i].id,
    explanation: `${articles[i].name}: ${articles[i].paragraphs[j === 0 ? 0 : 1]
      .split(/(?<=\.)\s/)
      .slice(0, 2)
      .join(' ')}`,
    options: shuffle([
      articles[i],
      ...shuffle(articles.filter(a => a.id !== articles[i].id)).slice(0, 3),
    ]).map(a => ({ id: a.id, label: a.name })),
  })),
);
export const newQuiz = () => shuffle(questions).slice(0, 10);

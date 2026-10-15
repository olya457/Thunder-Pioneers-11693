import { ImageSourcePropType } from 'react-native';
export type Article = {
  id: string;
  title: string;
  name: string;
  period: string;
  description: string;
  paragraphs: string[];
  image: ImageSourcePropType;
};
export const articles: Article[] = [
  {
    id: 'BenjaminFranklin',
    image: require('../assets/lab-benjamin-franklin.png'),
    title: 'Lightning Meets Science',
    name: 'Benjamin Franklin',
    period: '1752',
    description:
      'Discover how Franklin connected lightning with electricity and helped protect buildings from storms.',
    paragraphs: [
      'Benjamin Franklin investigated electricity when its connection to lightning was still being debated. He noticed similarities between laboratory sparks and the flashes produced by thunderstorms. His famous kite experiment of 1752 supported the idea that storm clouds carried electrical charge. The experiment involved collecting atmospheric electricity, rather than deliberately receiving a direct lightning strike.',
      'Franklin also developed the lightning rod as a practical application of electrical knowledge. A properly installed rod provides a conductive path that helps carry a lightning discharge toward the ground. This invention turned research into a way of protecting buildings and their occupants. His contribution was understanding and managing natural electricity, rather than producing a continuous power supply from storms.',
    ],
  },
  {
    id: 'ThomasFrancoisDalibard',
    image: require('../assets/lab-thomas-francois-dalibard.png'),
    title: 'Electricity from the Clouds',
    name: 'Thomas-François Dalibard',
    period: '1752',
    description:
      'Meet the researcher whose experiment provided early evidence of electricity in storm clouds.',
    paragraphs: [
      'Thomas-François Dalibard helped bring Benjamin Franklin’s electrical ideas to French readers. Franklin had proposed using an elevated metal rod to test whether storm clouds were electrified. In May 1752, Dalibard arranged this experiment at Marly-la-Ville, near Paris. Sparks drawn from the apparatus provided evidence that atmospheric electricity could behave like electricity produced in a laboratory.',
      'The successful test took place before Franklin’s famous kite experiment. It helped transform a proposed connection between storms and electricity into experimental evidence. Dalibard’s work also showed how sharing scientific ideas across countries could accelerate discovery. The experiment investigated atmospheric charge, rather than supplying useful electrical power to homes or machines.',
    ],
  },
  {
    id: 'CharlesAugustinDeCoulomb',
    image: require('../assets/lab-charles-augustin-de-coulomb.png'),
    title: 'Measuring Electric Force',
    name: 'Charles-Augustin de Coulomb',
    period: '1785',
    description:
      'Explore the delicate instrument that helped turn electrical attraction and repulsion into measurable science.',
    paragraphs: [
      'Charles-Augustin de Coulomb studied the forces acting between electrically charged objects. In 1785, he reported experiments using a sensitive instrument called a torsion balance. Electrical forces moved a small suspended object and twisted the thin thread supporting it. Measuring that twist allowed him to investigate how force changed with charge and distance.',
      'Coulomb’s law describes how the force between two point charges depends on their charges and separation. If the distance doubles while the charges remain unchanged, the force becomes one quarter as strong. This mathematical relationship helped scientists describe electricity more precisely than simple observations of sparks could. His work strengthened the foundations of electrostatics, the study of electric charges at rest.',
    ],
  },
  {
    id: 'AlessandroVolta',
    image: require('../assets/lab-alessandro-volta.png'),
    title: 'A Current That Continues',
    name: 'Alessandro Volta',
    period: '1800',
    description:
      'Discover how the voltaic pile gave researchers a steady source of electrical current.',
    paragraphs: [
      'Alessandro Volta introduced the voltaic pile in 1800. His device used alternating metal discs separated by material soaked in an electrolyte. Chemical processes in the pile produced a small but sustained electrical current. This made it different from devices that mainly stored charge and released brief sparks.',
      'Researchers could now investigate electricity without relying on storms or repeatedly charging static generators. A steady current made new experiments with circuits, chemical reactions, and magnetism possible. Volta’s invention became a starting point for the development of electrical batteries. It demonstrated that electricity could be supplied through a controlled chemical process rather than collected from lightning.',
    ],
  },
  {
    id: 'HansChristianOersted',
    image: require('../assets/lab-hans-christian-oersted.png'),
    title: 'The Compass That Turned',
    name: 'Hans Christian Ørsted',
    period: '1820',
    description:
      'See how a moving compass needle revealed a connection between electricity and magnetism.',
    paragraphs: [
      'Hans Christian Ørsted made a crucial observation in 1820. A compass needle changed direction when an electrical current passed through a nearby wire. The movement showed that current could produce a magnetic effect beyond the wire itself. Electricity and magnetism could no longer be treated as completely separate subjects.',
      'A current-carrying wire creates a magnetic field around it. The compass needle responds to that field because the needle is a small magnet. Ørsted’s discovery encouraged other researchers to investigate how electrical currents could produce magnetic forces. Those investigations helped establish the science behind electromagnets and electric motors.',
    ],
  },
  {
    id: 'AndreMarieAmpere',
    image: require('../assets/lab-andre-marie-ampere.png'),
    title: 'When Currents Interact',
    name: 'André-Marie Ampère',
    period: '1820s',
    description:
      'Learn how Ampère explained the forces between wires carrying electrical current.',
    paragraphs: [
      'André-Marie Ampère investigated electricity and magnetism after learning about Ørsted’s compass experiment. He studied what happened when electrical current flowed through two nearby parallel wires. Currents traveling in the same direction caused the wires to attract each other. Currents traveling in opposite directions caused them to repel each other.',
      'These experiments showed that electrical currents could produce measurable mechanical forces. Ampère developed a mathematical account of these interactions and helped establish electrodynamics. His work gave researchers a clearer way to understand the relationship between current and magnetism. The unit of electrical current, the ampere, bears his name.',
    ],
  },
  {
    id: 'MichaelFaraday',
    image: require('../assets/lab-michael-faraday.png'),
    title: 'Motion Becomes Electricity',
    name: 'Michael Faraday',
    period: '1831',
    description:
      'Explore the discovery that made electrical generators possible.',
    paragraphs: [
      'Michael Faraday demonstrated electromagnetic induction in 1831. He found that a changing magnetic field could induce an electrical current in a circuit. In one experiment, changing the current in one coil briefly produced current in another coil. Other experiments showed how relative movement between a magnet and a conductor could generate electricity.',
      'This discovery provided a principle for converting mechanical energy into electrical energy. Generators use that principle when turbines or other machines drive movement within a magnetic system. The energy can come from moving water, wind, steam, or another mechanical source. Faraday’s work helped make electricity available through controlled generation rather than unpredictable lightning.',
    ],
  },
  {
    id: 'JosephHenry',
    image: require('../assets/lab-joseph-henry.png'),
    title: 'The Power of Coils',
    name: 'Joseph Henry',
    period: '1830s',
    description:
      'Discover how Henry’s electromagnets and induction research advanced practical electrical technology.',
    paragraphs: [
      'Joseph Henry developed powerful electromagnets using carefully arranged coils of insulated wire. An electromagnet produces a magnetic field when current flows through its winding. Henry also investigated electromagnetic induction independently of Michael Faraday. His experiments explored how changing currents could produce electrical effects in coils.',
      'Henry made important discoveries about self-induction, an effect within a current-carrying coil itself. When the current changes, the changing magnetic field induces a voltage in that same coil. Understanding this behavior became important for electrical circuits and electromagnetic devices. The unit of inductance, the henry, honors his contribution to this field.',
    ],
  },
  {
    id: 'JamesClerkMaxwell',
    image: require('../assets/lab-james-clerk-maxwell.png'),
    title: 'One Electromagnetic World',
    name: 'James Clerk Maxwell',
    period: '1860s',
    description:
      'Explore the theory that connected electricity, magnetism, and light.',
    paragraphs: [
      'James Clerk Maxwell brought electrical and magnetic phenomena together in a mathematical theory. Building on earlier discoveries, he described how electric and magnetic fields behave and interact. His work predicted electromagnetic waves traveling at the speed of light. This led him to identify light itself as an electromagnetic phenomenon.',
      'Maxwell presented his electromagnetic theory in a major paper published in 1865. The theory provided a common framework for understanding effects previously studied through separate experiments. It became foundational to the study of electrical systems and electromagnetic communication. Maxwell’s contribution was a deeper explanation of electricity, rather than a machine for collecting lightning.',
    ],
  },
  {
    id: 'NikolaTesla',
    image: require('../assets/lab-nikola-tesla.png'),
    title: 'Alternating Current in Motion',
    name: 'Nikola Tesla',
    period: 'Late 1880s',
    description:
      'Meet the inventor whose motor and polyphase systems helped expand the use of alternating current.',
    paragraphs: [
      'Nikola Tesla developed important motors and systems that used alternating current. Alternating current repeatedly reverses direction, unlike direct current flowing in one direction. His polyphase designs used coordinated alternating currents to create a rotating magnetic field. That field could drive an induction motor without the electrical connections required by some earlier motor designs.',
      'George Westinghouse licensed Tesla’s patents and supported their commercial development. Their work contributed to the expansion of alternating-current power systems. Transformers made it practical to change AC voltage for transmission and local use. Tesla’s contribution involved generating, distributing, and using electricity, rather than supplying cities with captured lightning.',
    ],
  },
  {
    id: 'ThomasEdison',
    image: require('../assets/lab-thomas-edison.png'),
    title: 'Electricity Reaches the City',
    name: 'Thomas Edison',
    period: '1882',
    description:
      'Discover how Edison’s lighting system connected power generation with everyday urban life.',
    paragraphs: [
      'Thomas Edison helped develop a practical system for electric lighting. His team worked on lamps alongside the generators, wiring, and other equipment needed to supply them. In 1882, Pearl Street Station began providing electrical service to customers in lower Manhattan. The station used direct current to power lighting in its surrounding district.',
      'The project demonstrated that useful electric lighting required an entire supply network. Generating stations, distribution equipment, and customer installations had to function together reliably. Edison’s work helped turn electricity from a laboratory subject into a commercial service. The station generated power with machinery rather than collecting electricity from thunderstorms.',
    ],
  },
  {
    id: 'GeorgeWestinghouse',
    image: require('../assets/lab-george-westinghouse.png'),
    title: 'Power Beyond the Falls',
    name: 'George Westinghouse',
    period: '1890s',
    description:
      'Explore how Westinghouse helped bring alternating-current power from major projects to distant users.',
    paragraphs: [
      'George Westinghouse helped turn alternating-current technology into large practical power systems. His company licensed Tesla’s patents and developed equipment for generating and distributing AC electricity. In 1893, Westinghouse supplied the electrical system for the World’s Columbian Exposition in Chicago. The illuminated exhibition demonstrated alternating current on a highly visible public stage.',
      'Westinghouse also played a major role in the Niagara Falls hydroelectric project. Electricity generated using the energy of falling water reached Buffalo in 1896. The project showed how a natural energy source could supply users beyond the generating site. Its power came from moving water, illustrating the difference between dependable generation and the brief discharge of lightning.',
    ],
  },
];

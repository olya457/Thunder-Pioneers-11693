import { images } from './images';
const entries = [
  [
    'Thunder Starts with Heat',
    'Lightning rapidly heats the surrounding air. The sudden expansion creates the sound we hear as thunder.',
  ],
  [
    'A Flash Before the Sound',
    'Light travels much faster than sound, so you see lightning before you hear its thunder.',
  ],
  [
    'Electricity in the Clouds',
    'Collisions between ice particles in storm clouds help separate electric charges. A strong electric field can eventually trigger lightning.',
  ],
  [
    'A Very Hot Channel',
    'The air in a lightning channel can briefly reach around 30,000°C, hotter than the surface of the Sun.',
  ],
  [
    'More Than One Flash',
    'What looks like a single flash can contain several strokes along a similar path. These repeated strokes make lightning appear to flicker.',
  ],
  [
    'Lightning Inside a Cloud',
    'Many lightning flashes occur within clouds rather than between a cloud and the ground. They can light up large areas of sky.',
  ],
  [
    'A Path Through the Air',
    'A branching leader can develop toward the ground. When a connection forms, a bright return stroke travels along the ionized channel.',
  ],
  [
    'The Rolling Sound',
    'Different parts of a lightning channel are at different distances from you. Sound arriving at different times helps create a long rumble.',
  ],
  [
    'Lightning Can Strike Twice',
    'Tall structures can be struck repeatedly. A previous strike does not prevent another discharge in the same place.',
  ],
  [
    'Beyond the Rain',
    'Lightning can reach the ground outside the area where rain is falling. Clear sky overhead does not guarantee protection from a nearby storm.',
  ],
  [
    'The Lightning Rod',
    'Franklin’s lightning rod gave buildings a conductive path toward the ground. Modern protection depends on a complete, properly installed system.',
  ],
  [
    'A French Experiment',
    'In May 1752, an experiment arranged by Dalibard drew sparks from an elevated rod. It helped confirm electricity in storm clouds.',
  ],
  [
    'The Kite and the Charge',
    'Franklin’s kite experiment investigated atmospheric charge. It did not involve safely capturing a direct strike, and it must never be repeated.',
  ],
  [
    'Red Sprites',
    'Sprites are brief luminous events high above some thunderstorms. They are different from ordinary cloud-to-ground lightning.',
  ],
  [
    'Blue Jets',
    'Some storms produce blue jets that extend upward from cloud tops. These events occur above the main storm rather than toward the ground.',
  ],
  [
    'Volcanic Lightning',
    'Lightning can appear in volcanic ash clouds. Colliding ash particles can contribute to charge separation.',
  ],
  [
    'Sand Turned to Glass',
    'A strike can fuse sandy material into glassy structures called fulgurites. Their shapes can preserve part of the discharge path.',
  ],
  [
    'Sound Takes Time',
    'Sound travels roughly 343 meters per second in mild air. Multiplying a flash-to-thunder delay by 0.343 gives an approximate distance in kilometers.',
  ],
  [
    'Power Needs Consistency',
    'Lightning releases energy in brief, unpredictable discharges. It is not a practical continuous source of electricity for homes.',
  ],
  [
    'From Storms to Generators',
    'Research on charge, current, and magnetism helped build electrical science. Generators use electromagnetic induction to turn mechanical energy into electrical energy.',
  ],
];
export const facts = entries.map(([title, text], i) => ({
  id: String(i + 1),
  title,
  text,
  image: [images.tools, images.curiosity, images.origins, images.knowledge][
    i % 4
  ],
}));

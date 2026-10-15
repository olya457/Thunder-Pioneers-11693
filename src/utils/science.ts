export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function distanceResult(seconds: number) {
  const distance = (seconds * 0.343).toFixed(1);
  if (seconds < 3)
    return {
      title: 'Very Close Lightning',
      text: `The short delay suggests lightning occurred approximately ${distance} km away.`,
    };
  if (seconds < 6)
    return {
      title: 'Nearby Lightning',
      text: `Thunder arrived just a few seconds after the flash. Estimated distance: ${distance} km.`,
    };
  if (seconds < 10)
    return {
      title: 'A Longer Sound Journey',
      text: `The delay places the lightning approximately ${distance} km away. Sound takes time to reach you.`,
    };
  if (seconds < 15)
    return {
      title: 'Several Kilometers Away',
      text: `The measured delay suggests an approximate lightning distance of ${distance} km.`,
    };
  if (seconds < 30)
    return {
      title: 'Distant Lightning',
      text: `Thunder took a longer journey to reach you. The lightning was approximately ${distance} km away.`,
    };
  return {
    title: 'A Long Delay',
    text: `This delay suggests a distance of approximately ${distance} km. Make sure the thunder matches the flash you timed.`,
  };
}

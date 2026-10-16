/** Deterministický generátor pseudonáhodných čísel (mulberry32).
 *  Každá úloha je plně určena dvojicí (generatorId, seed) => reprodukovatelnost. */
export class Rng {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  /** Číslo v intervalu [0, 1). */
  next(): number {
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Celé číslo v intervalu [min, max] (včetně krajů). */
  int(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** Náhodný prvek pole. */
  pick<T>(arr: readonly T[]): T {
    if (arr.length === 0) throw new Error("pick z prázdného pole");
    return arr[Math.floor(this.next() * arr.length)];
  }

  /** Nové zamíchané pole (Fisher–Yates). */
  shuffle<T>(arr: readonly T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

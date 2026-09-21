export type Point = {
  x: number;
  y: number;
};

const SAME_AXIS_PX = 12;

export function edgePolyline(from: Point, to: Point): Point[] {
  if (Math.abs(from.y - to.y) < SAME_AXIS_PX || Math.abs(from.x - to.x) < SAME_AXIS_PX) {
    return [from, to];
  }

  const midY = (from.y + to.y) / 2;
  return [from, { x: from.x, y: midY }, { x: to.x, y: midY }, to];
}

export function polylineToPath(points: readonly Point[]): string {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

export function totalLength(points: readonly Point[]): number {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) {
    length += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return length;
}

export function concatPolylines(segments: readonly Point[][]): Point[] {
  const out: Point[] = [];
  for (const segment of segments) {
    if (segment.length === 0) continue;
    if (out.length > 0) {
      const last = out[out.length - 1];
      const next = segment[0];
      if (last && next && last.x === next.x && last.y === next.y) {
        out.push(...segment.slice(1));
        continue;
      }
    }
    out.push(...segment);
  }
  return out;
}

export function pointAt(points: readonly Point[], t: number): Point {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1 || t <= 0) return points[0];

  const length = totalLength(points);
  if (length === 0) return points[0];

  let remaining = Math.min(1, t) * length;
  for (let i = 1; i < points.length; i += 1) {
    const span = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    if (remaining <= span) {
      const u = span === 0 ? 0 : remaining / span;
      return {
        x: points[i - 1].x + (points[i].x - points[i - 1].x) * u,
        y: points[i - 1].y + (points[i].y - points[i - 1].y) * u,
      };
    }
    remaining -= span;
  }

  return points[points.length - 1];
}

export default function arraysEqual(a, b) {
  return !!a && !!b && !(a < b || b < a);
}

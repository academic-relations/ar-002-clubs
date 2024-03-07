export function asyncSleep(ms: number) {
  return new Promise<null>(res => {
    setTimeout(() => res(null), ms);
  });
}

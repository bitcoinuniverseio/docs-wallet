// Nav helper shared by components: join a site path to the deployed base.
export function resolve(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

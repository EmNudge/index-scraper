function joinPaths(...paths: string[]): string {
  return paths.map(path => {
    let p = path;
    if (p.endsWith('/')) p = p.slice(0, -1);
    if (p.startsWith('/')) p = p.slice(1);
    return p;
  }).join('/')
}

export default joinPaths
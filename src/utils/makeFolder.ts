import { existsSync, mkdirSync } from 'fs'

function makeFolder(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir)
}

export default makeFolder
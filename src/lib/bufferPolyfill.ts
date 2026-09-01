import { Buffer } from 'buffer'

const root = globalThis as typeof globalThis & { Buffer?: typeof Buffer }

if (root.Buffer === undefined) {
  root.Buffer = Buffer
}

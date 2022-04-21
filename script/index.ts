import { deploy } from "./deploy/deploy";
import { buildServer } from "./esbuild/buildServer";
import { buildMDX } from "./esbuild/buildMDX";
import { watchMDX } from "./esbuild/watchMDX";
import { watchServer } from "./esbuild/watchServer";
const script = { buildServer, watchServer, buildMDX, watchMDX, deploy }
const arg = process.argv[2].slice(2)
script[arg](process.argv[3])
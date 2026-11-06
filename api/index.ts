import { createApiApp } from "../src/serverApp";

const app = createApiApp();

export default function handler(req: any, res: any) {
  return app(req, res);
}

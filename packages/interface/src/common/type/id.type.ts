import { z } from "zod";

const zId = z.coerce.number().int().min(1);

export default zId;

import * as z from "zod";

export const schema = z.object({
	description: z.string().min(3),
	category: z.string().min(1),
	isArchived: z.boolean(),
	status: z.string(),
});

export type CardFormData = z.infer<typeof schema>;

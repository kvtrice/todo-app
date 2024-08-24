import * as z from "zod";

export enum Status {
	TODO = "TODO",
	INPROGRESS = "INPROGRESS",
	DONE = "DONE",
}

export const schema = z.object({
	description: z.string().min(3),
	categoryId: z.number(),
	isArchived: z.boolean().default(false),
	status: z.nativeEnum(Status),
});

export type CardFormData = z.infer<typeof schema>;

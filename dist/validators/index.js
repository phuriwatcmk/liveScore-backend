import { z } from "zod";
export const paginationSchema = z.object({
    page: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 10)),
});
export const leagueParamsSchema = z.object({
    leagueId: z.string().transform((val) => parseInt(val, 10)),
});
export const teamParamsSchema = z.object({
    teamId: z.string().transform((val) => parseInt(val, 10)),
});
export const fixtureParamsSchema = z.object({
    fixtureId: z.string().transform((val) => parseInt(val, 10)),
});
export const h2hParamsSchema = z.object({
    team1Id: z.string().transform((val) => parseInt(val, 10)),
    team2Id: z.string().transform((val) => parseInt(val, 10)),
});
export const newsQuerySchema = z
    .object({
    category: z.string().optional(),
    tags: z.string().optional(),
    search: z.string().optional(),
})
    .merge(paginationSchema);
export const fixturesQuerySchema = z
    .object({
    date: z.string().optional(),
    league: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : undefined)),
    status: z.enum(["NS", "LIVE", "FT", "HT"]).optional(),
})
    .merge(paginationSchema);

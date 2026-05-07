import { query, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Reminder fires 2 days before birthday — May 12, 2026 at 8 AM WAT (7 AM UTC)
const REMINDER_DATE = new Date("2026-05-12T07:00:00Z");

/** Return all claims, newest first */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("claims").order("desc").collect();
  },
});

/** Return the claim for a specific item (if it exists) */
export const getByItem = query({
  args: { item: v.string() },
  handler: async (ctx, { item }) => {
    return await ctx.db
      .query("claims")
      .withIndex("by_item", (q) => q.eq("item", item))
      .first();
  },
});

/**
 * Create a new claim.
 * Idempotent for gifts (one claim per item). Laptop fund allows multiple.
 * Schedules confirmation email immediately + reminder email on May 12th.
 */
export const create = mutation({
  args: {
    item:         v.string(),
    name:         v.string(),
    gift:         v.string(),
    emoji:        v.string(),
    anon:         v.boolean(),
    timestamp:    v.string(),
    amount:       v.optional(v.string()),
    claimerEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Idempotency — only for non-laptop items (laptop allows multiple contributions)
    if (args.item !== "laptop") {
      const existing = await ctx.db
        .query("claims")
        .withIndex("by_item", (q) => q.eq("item", args.item))
        .first();
      if (existing) return existing._id;
    }

    const id = await ctx.db.insert("claims", args);

    const isLaptop    = args.item === "laptop";
    const claimerName = args.anon ? "Someone 🤍" : args.name;

    // ── Send confirmation emails right away ───────────────────────────
    await ctx.scheduler.runAfter(0, internal.emails.sendClaimEmails, {
      claimerEmail: args.claimerEmail,
      claimerName,
      gift:     args.gift,
      emoji:    args.emoji,
      anon:     args.anon,
      isLaptop,
    });

    // ── Schedule reminder only if claimer gave their email and date is future ──
    if (args.claimerEmail && Date.now() < REMINDER_DATE.getTime()) {
      await ctx.scheduler.runAt(
        REMINDER_DATE.getTime(),
        internal.emails.sendReminder,
        {
          claimerEmail: args.claimerEmail,
          claimerName,
          gift:     args.gift,
          emoji:    args.emoji,
          isLaptop,
        }
      );
    }

    return id;
  },
});

/** Delete every claim — used to reset test data. */
export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("claims").collect();
    await Promise.all(all.map((doc) => ctx.db.delete(doc._id)));
    return { deleted: all.length };
  },
});

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  claims: defineTable({
    item:      v.string(),   // e.g. "bag", "heels", "laptop"
    name:      v.string(),   // display name or "Someone 🤍"
    gift:      v.string(),   // human-readable gift label
    emoji:     v.string(),   // emoji for the card
    anon:      v.boolean(),  // true = anonymous
    timestamp: v.string(),   // formatted local time string
    amount:       v.optional(v.string()),  // for laptop fund contributions
    claimerEmail: v.optional(v.string()),  // for sending confirmation + reminder
  }).index("by_item", ["item"]),
});

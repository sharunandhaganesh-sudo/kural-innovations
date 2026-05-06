import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
  honeypot: z.string().max(0, "Bot detected").optional(),
  timestamp: z.number(),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          // Validate input
          const result = contactSchema.safeParse(body);
          if (!result.success) {
            return Response.json(
              { error: result.error.issues[0]?.message || "Invalid input" },
              { status: 400 }
            );
          }

          const { name, email, message, honeypot, timestamp } = result.data;

          // Honeypot check
          if (honeypot && honeypot.length > 0) {
            // Silently accept but don't process
            return Response.json({ success: true });
          }

          // Time-based spam check: form must take at least 2 seconds to fill
          const elapsed = Date.now() - timestamp;
          if (elapsed < 2000) {
            return Response.json({ success: true }); // silent reject
          }

          // Rate limiting: check recent submissions from this email
          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
          const { count } = await supabaseAdmin
            .from("contact_submissions")
            .select("*", { count: "exact", head: true })
            .eq("email", email)
            .gte("created_at", fiveMinutesAgo);

          if (count && count >= 3) {
            return Response.json(
              { error: "Too many submissions. Please try again in a few minutes." },
              { status: 429 }
            );
          }

          // Store in database
          const { error } = await supabaseAdmin
            .from("contact_submissions")
            .insert({ name, email, message });

          if (error) {
            console.error("Failed to store contact submission:", error);
            return Response.json(
              { error: "Failed to submit. Please try again." },
              { status: 500 }
            );
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error("Contact form error:", err);
          return Response.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
          );
        }
      },
    },
  },
});

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/integrations/supabase/types';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
  honeypot: z.string().max(0, "Bot detected").optional(),
  timestamp: z.number(),
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0]?.message || "Invalid input" });
    }

    const { name, email, message, honeypot, timestamp } = result.data;

    // Honeypot check
    if (honeypot && honeypot.length > 0) {
      return res.status(200).json({ success: true });
    }

    // Time-based spam check
    const elapsed = Date.now() - timestamp;
    if (elapsed < 2000) {
      return res.status(200).json({ success: true });
    }

    // Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

    // Rate limiting
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", fiveMinutesAgo);

    if (count && count >= 3) {
      return res.status(429).json({ error: "Too many submissions. Please try again in a few minutes." });
    }

    // Store in database
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message });

    if (error) {
      console.error("Failed to store contact submission:", error);
      return res.status(500).json({ error: "Failed to submit. Please try again." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
}
// Enquiry endpoint: honeypot, Turnstile verify, rate limit, create Inquiry.
// Implemented in step 4. Until then it refuses requests so nothing is silently dropped.
export function POST() {
  return Response.json({ error: 'Enquiries are not enabled yet.' }, { status: 501 })
}

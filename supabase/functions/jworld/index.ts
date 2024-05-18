// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

console.log("Hello from jworld edge functions!");

Deno.serve(async (req) => {
  const { name } = await req.json();
  const data = {
    message: `Yo! ${name}!`,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

## simple-supabase-edge-function-template
## How-to, local
https://supabase.com/docs/guides/functions/quickstart

~# supabase init
  vs code yes
~# supabase functions new hello-world

└── supabase
    ├── functions
    │   └── hello-world
    │   │   └── index.ts ## Your function code
    └── config.toml

index.ts
Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
})

running edge function locally
docker가 설치되어 있어야 함
~# supabase start # start the supabase stack
~# supabase functions serve # start the Functions watcher

invoking edge functions locally
curl --request POST 'http://localhost:54321/functions/v1/hello-world' \
  --header 'Authorization: Bearer SUPABASE_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{ "name":"Functions" }'

skipping authorization checks
~# supabase functions serve hello-world --no-verify-jwt


## How-to, deploy 
https://supabase.com/docs/guides/functions/deploy
~# supabase login

~# supabase projects list

~# supabase link --project-ref your-project-id

deploy
~# supabase functions deploy
~# supabase functions deploy hello-world
~# supabase functions deploy hello-world --no-verify-jwt

Invoking remote functions
curl --request POST 'https://<project_id>.supabase.co/functions/v1/hello-world' \
  --header 'Authorization: Bearer ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{ "name":"Functions" }'

You should receive the response { "message":"Hello Functions!" }



// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

// console.log("Hello from jworld edge functions!");

// Deno.serve(async (req) => {
//   const { name } = await req.json();
//   const data = {
//     message: `Yo! ${name}!`,
//   };

//   return new Response(JSON.stringify(data), {
//     headers: { "Content-Type": "application/json" },
//   });
// });


import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabaseUrl = "https://j~~~~~~~~~~~~d.supabase.co";
const supabaseKey = "e~~~~~~~~~~~~~M";
const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  try {
    // 요청에서 name 값 추출
    const { name } = await req.json();

    let data, error;
    if (name === "daily") {
      // Supabase에서 데이터 조회 (daily logic)
      const result = await supabase
        .from("daily_total_summary")
        .select("timestamp, total")
        .gte("timestamp", "2024-05-01")
        .order("timestamp", { ascending: false });
      data = result.data;
      error = result.error;
    } else if (name === "latest") {
      // Supabase에서 가장 최근 값 조회 (latest logic)
      const result = await supabase
        .from("timestamp_total_summary")
        .select("timestamp, total")
        .order("timestamp", { ascending: false })
        .limit(1);
      data = result.data;
      error = result.error;
    } else {
      return new Response("Invalid Name: 'daily' or 'latest' only", {
        status: 400,
      });
    }
    // console.log(data);

    if (error) {
      throw error;
    }

    // 응답 데이터 생성
    const responseData = {
      message: `OK. I got! ${name}!`,
      data: data,
    };

    return new Response(
      JSON.stringify(responseData),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    // 오류 처리
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 },
    );
  }
});


// This file handles GET requests to /api/customers
export async function GET() {
    console.log('API Route: /api/customers called');
    // Supabase REST API endpoint and anon key from environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const customers = `${url}/rest/v1/customers`;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        return new Response('API credentials missing.', { status: 500 });
    }

    try {
    //Fetch data from the external Supabase REST API endpoint
    const response = await fetch(customers, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': key,
            'Authorization': `Bearer ${key}`, // Standard Supabase requirement
        },
        // Tell Next.js not to cache this data during development/build time
        cache: 'no-store' 
    });

    if (!response.ok) {
        const errorText = await response.text();
        // Throw an error if the Supabase API returns a non-200 status
        throw new Error(`Supabase REST error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    // Return the data as JSON back to the dashboard page
    return Response.json(data);

  } catch (error) {
    console.error('External Fetch Error:', error);
    return Response.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
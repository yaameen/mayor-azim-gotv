export const runtime = 'edge';

export async function GET(request: Request, params: any) {
    const url = new URL(request.url);
    // const path = url.toString().split('assets').pop()
    const data = await fetch(`https://stats.mageymdp.com${url.pathname}`, {
        next: {
            revalidate: 600
        }
    })



    let body = null;
    if (url.pathname?.match(`app/dist`)) {
        body = data.body;
    } else {
        // console.log(`https://stats.mageymdp.com${path}`);
        body = await data.text();
        body = body.replace(
            `https://stats.mageymdp.com`,
            ``
        )
    }


    return new Response(body, {
        status: 200,
        headers: {
            ...data.headers,
            'content-type': data.headers.get('content-type') || 'text/html',
        },
    });
}
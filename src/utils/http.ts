"use server";

type ApiProps = {
    headers: any
} & RequestInit
export const Api = (url: string, props?: Partial<ApiProps>): Promise<Response> => {
    const headers = props?.headers ?? {};
    delete props?.headers;
    console.log(`Loading ${process.env.API_SERVER}${url}`);

    try {
        return fetch(`${process.env.API_SERVER}${url}`, {
            keepalive: true,

            headers: {
                ...headers,
                'Authorization': process.env.API_KEY,
            },

            ...props,
        });

    } catch (error) {

    }

    return Promise.reject(new Response());
}
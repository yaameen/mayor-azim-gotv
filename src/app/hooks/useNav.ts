import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useNav(): [ReadonlyURLSearchParams, (params: { [key: string]: any }) => void] {
    const router = useRouter();
    const path = usePathname();
    const search = useSearchParams();
    const [params, setParams] = useState<{ [key: string]: any }>({});

    const writableParams = new URLSearchParams(search?.toString());

    useEffect(() => {
        for (let [key, value] of Object.entries(params)) {
            if (value) {
                writableParams.set(key, value);
            } else {
                writableParams.delete(key);
            }
        }
        router.replace(`${path}?${writableParams}`);
    }, [params]);

    // @ts-ignore
    return [search, setParams];
}
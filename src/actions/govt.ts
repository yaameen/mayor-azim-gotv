"use server";

import { Api } from "@/utils/http";
import { GetUser } from "@/utils/session";
import { revalidatePath } from "next/cache";



export const lookPersonUpWithSerial = async (serial: string) => {
    const user = await GetUser();
    console.log(`/api/gotv/lookup?serial=${serial}&box_id=${user?.box?.id}`);

    // object to url params
    const resp = await Api(`/api/gotv/lookup?serial=${serial}&box_id=${user?.box?.id}`);
    if (resp.ok) {
        const data = await resp.json();
        return data;
    }
};


export const addVoter = async (formData: any) => {
    const user = await GetUser();

    let data = {
        national_id: formData.national_id,
        updated_by_post_id: user.id,
        list_serial: formData.serial,
    }

    const resp = await Api(`/api/gotv/voted`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await resp.json();

    if (resp.ok) {
        return revalidatePath("/");
    } else {
        if (resp.status == 422) {
            throw new Error(responseData.message || "An error occured while adding voter!");
        }
    }

    throw new Error("An error occured while adding voter!");

};

export const removeVoter = async (formData: any) => {
    const user = await GetUser();

    let data = {
        id: formData.id,
        national_id: formData.national_id,
        updated_by_post_id: user.id,
        list_serial: formData.serial,
    }

    console.log('deleting...');


    const resp = await Api(`/api/gotv/voted`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await resp.json();

    if (resp.ok) {
        return revalidatePath("/");
    } else {
        if (resp.status == 422) {
            throw new Error(responseData.message || "An error occured while deleting voter!");
        }
    }

    throw new Error("An error occured while deleting voter!");

};


export const getLatestVoted = async () => {
    const user = await GetUser();

    const params = new URLSearchParams({
        box_id: user?.box?.id,
    });

    console.log({ params });


    const resp = await Api(`/api/gotv/voted?${params}`);
    const data = await resp.json();
    return data;
}



export const getResults = async (boxId: string) => {
    const user = await GetUser();

    const resp = await Api(`/api/gotv/results/${boxId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await resp.json();
};

export const saveResults = async (formData: FormData) => {
    // const user = await GetUser();

    const resp = await Api(`/api/gotv/results/${formData.get('box_id')}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const responseData = await resp.json();

    if (resp.ok) {
        return {
            message: 'Results saved successfully',
        };
    } else {
        if (resp.status == 422) {
            throw new Error(responseData.message || "An error occured while adding voter!");
        }
    }

    throw new Error("An error occured while adding voter!");

};
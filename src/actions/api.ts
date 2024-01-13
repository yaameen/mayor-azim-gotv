"use server";

import { Decrypt, Sign } from "@/utils/crypt";
import { Api } from "@/utils/http";
import { GetUser, getCookieParams } from "@/utils/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const authorize = async (phone?: string) => {

    if (cookies().has('gotv_pre_session')) {
        const sess = await Sign({});
        cookies().set('gotv_app_session', sess, getCookieParams());
        return redirect("/")
    } else {
        if (phone) {
            return SendOTP(phone)
        }
        return redirect("/authorize")
    }

}

export const SendOTP = async (phone: string) => {


    const resp = await Api(`/api/gotv/send-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            phone,
        }),
    });

    const data = await resp.json();
    if (resp.ok) {
        cookies().set('gotv_pre_session', await Sign({
            hash: data.hash,
            phone
        }), {
            expires: new Date(Date.now() + 1000 * 60 * 5),
            path: '/',
            secure: true,
            httpOnly: true,
            priority: "high",
            sameSite: 'lax',
        })
    }
    return {
        data,
        status: resp.status,
    };

}

export const verifyOTP = async (otp?: string) => {
    if (cookies().has('gotv_pre_session')) {


        const sess = await Decrypt(cookies().get('gotv_pre_session')?.value);
        if (sess) {
            const resp = await Api(`/api/gotv/authorize`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hash: sess.hash,
                    otp,
                }),
            });

            if (resp.ok) {
                const data = await resp.json();
                cookies().delete('gotv_pre_session');
                cookies().set('gotv_app_session', await Sign({
                    hash: data.hash,
                    user: data
                }), getCookieParams())
                return redirect("/")
            }
        } else {
            return {
                error: "Could not verify OTP",
            }
        }


    }
    return {
        error: "An error occured while verifying OTP",
    }
}

export const Logout = async () => {
    cookies().delete('gotv_app_session');
    cookies().delete('gotv_pre_session');
    return redirect("/authorize");
}

export const refreshSession = async () => {
    const user = await GetUser();
    if (!user) {
        redirect("/authorize");
    }
    const resp = await Api(`/api/user/${user.id}`);
    const data = await resp.json();

    cookies().delete('gotv_pre_session');
    cookies().set('gotv_app_session', await Sign({
        hash: data.hash,
        user: data
    }), getCookieParams())
    revalidatePath("/");
}

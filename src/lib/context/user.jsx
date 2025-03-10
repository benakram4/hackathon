import { ID } from "appwrite";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { account, createGoogleSession } from "../appwrite";

const userAtom = atom(null);

export function useUser() {
    const [user, setUser] = useAtom(userAtom);

    async function login(email, password) {
        const loggedIn = await account.createEmailPasswordSession(email, password);
        setUser(loggedIn);
        window.location.replace("/");
    }

    async function loginWithGoogle() {
        createGoogleSession();
        const loggedIn = await account.get();
        setUser(loggedIn);
    }

    async function logout() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function register(email, password) {
        await account.create(ID.unique(), email, password);
        await login(email, password);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        }
        catch (err) {
            setUser(null);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return { user, login, loginWithGoogle, logout, register };
}
import { HOST } from "../host.js";

export async function getMyProfil() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/myProfil`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function inscription(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/inscription`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name: data.name,
                password: data.password,
                magicWord: data.magicWord
            }),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function connection(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/connection`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name: data.name,
                password: data.password,
            }),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function getIfisConnected(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/isConnected`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function getUsers() {
    try {
        const preRes = await fetch(`${HOST}/api/auth`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function getOneUser(id) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getOneUser/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}
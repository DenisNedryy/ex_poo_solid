import { HOST } from "../host.js";

export async function readTasks() {
    try {
        const preRes = await fetch(`${HOST}/api/tasks`, {
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

export async function readOneTask(id) {
    try {
        const preRes = await fetch(`${HOST}/api/tasks/${id}`, {
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

export async function createTask(data) {
    try {
        const preRes = await fetch(`${HOST}/api/tasks`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                date: data.date,
                type: data.type,
                author_id: data.author_id || null,
                owner_id: data.owner_id || null
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

export async function updateTask(data, id) {
    try {
        const preRes = await fetch(`${HOST}/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name: data.name,
                description: data.description,
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

export async function deleteTask(id) {
    try {
        const preRes = await fetch(`${HOST}/api/tasks/${id}`, {
            method: "DELETE",
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
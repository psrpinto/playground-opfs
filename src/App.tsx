import './App.css';
import {useEffect} from "react";
import {startPlaygroundWeb} from "@wp-playground/client";

export function App() {
    useEffect(() => {
        initPlayground().catch((err) => console.log(err));
    }, []);

    return (
        <iframe
            title="playground"
            id="playground"
            src="https://playground.wordpress.net"
        />
    );
}

async function initPlayground() {
    const iframe = document.getElementById('playground') as HTMLIFrameElement;
    if (iframe.src !== '') {
        return;
    }
    const client = await startPlaygroundWeb({
        iframe,
        remoteUrl: 'https://playground.wordpress.net/remote.html',
    });
    await client.isReady;
}

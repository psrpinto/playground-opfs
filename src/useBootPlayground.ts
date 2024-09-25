import {useEffect, useRef, useState} from "react";
import {MountDescriptor, PlaygroundClient, startPlaygroundWeb} from "@wp-playground/client";

const remoteUrl = 'https://playground.wordpress.net/remote.html';

export function useBootPlayground({mountDescriptor}: {mountDescriptor: MountDescriptor}) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const iframe = iframeRef.current;
    const [awaitedIframe, setAwaitedIframe] = useState(false);
    const [playground, setPlayground] = useState<PlaygroundClient>();

    useEffect(() => {
        if (!iframe) {
            // Iframe ref is likely not set on the initial render.
            // Re-render the current component to start the playground.
            if (!awaitedIframe) {
                setAwaitedIframe(true);
            }
            return;
        }

        async function boot() {
            let playgroundTmp: PlaygroundClient | undefined = undefined;
            try {
                console.log(mountDescriptor);

                await startPlaygroundWeb({
                    iframe: iframe!,
                    remoteUrl,
                    onClientConnected: (playground) => {
                        playgroundTmp = playground;
                    },
                    mounts: [{
                        device: {
                            type: 'opfs',
                            path: '/foo',
                        },
                        mountpoint: '/wordpress',
                    }],
                    // mounts: mountDescriptor
                    //     ? [
                    //         {
                    //             ...mountDescriptor,
                    //             initialSyncDirection: 'opfs-to-memfs',
                    //         },
                    //     ]
                    //     : [],
                });
            } finally {
                if (playgroundTmp) {
                    setPlayground(() => playgroundTmp);
                }
            }


        }
        boot().catch((err) => console.error(err));
    }, [iframe, awaitedIframe]);

    return { playground, iframeRef };
}

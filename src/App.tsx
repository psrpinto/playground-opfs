import './App.css';
import {useBootPlayground} from './useBootPlayground';
import {MountDescriptor, PlaygroundClient} from "@wp-playground/client";

let p: PlaygroundClient;

export function App({mountDescriptor}: {mountDescriptor: MountDescriptor}) {
    const { playground, iframeRef } = useBootPlayground({mountDescriptor});
    p = playground;
    return (
        <iframe
            title="playground"
            id="playground"
            ref={iframeRef}
        />
    );
}

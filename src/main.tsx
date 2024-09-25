import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import {App} from "./App.tsx";

// const siteSlug = 'foo';
// const opfsRoot = await navigator.storage.getDirectory();
// const opfsDir = await opfsRoot.getDirectoryHandle(siteSlug, {
//     create: true,
// });

const mountDescriptor = {
    device: {
        type: 'opfs',
        path: '/foo',
    },
    mountpoint: '/wordpress',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App mountDescriptor={mountDescriptor}/>
  </StrictMode>,
);

async function directoryHandleToOpfsPath(
    directoryHandle: FileSystemDirectoryHandle
): Promise<string> {
    const root = await navigator.storage.getDirectory();
    const pathParts = await root.resolve(directoryHandle);
    if (pathParts === null) {
        throw new DOMException(
            'Unable to resolve path of OPFS directory handle.',
            'NotFoundError'
        );
    }
    return '/' + pathParts.join('/');
}

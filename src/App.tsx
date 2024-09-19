import './App.css';
import {useBootPlayground} from './useBootPlayground';

export function App() {
    const { playground, iframeRef } = useBootPlayground();

    return (
        <iframe
            title="playground"
            id="playground"
            ref={iframeRef}
        />
    );
}

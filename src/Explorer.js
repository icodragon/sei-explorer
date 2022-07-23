import React, {useEffect, useRef, useState} from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {useNavigate} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

async function getLastHeight() {
    const response = await fetch(`${API_URL}/abci_info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const json = await response.json();
    return json.result.response.last_block_height;
}

async function getInfoBlock(block_number) {
    const response = await fetch(`${API_URL}/block?height=${block_number}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return JSON.stringify(await response.json());
}

function Explorer() {
    let navigate = useNavigate();
    const routeChange = () =>{
        const tx_hash =
            inputRef.current.value.startsWith("0x") ? inputRef.current.value : '0x' + inputRef.current.value;

        let path = `/tx/${tx_hash}`;
        navigate(path);
    }

    const [lastNumberBlock, setLastNumberBlock] = useState('');
    const [code, setCode] = useState(
        ``
    );

    useEffect(() => {
        const interval = setInterval(() =>{
            async function run() {
                const numberBlock = await getLastHeight();
                setLastNumberBlock(numberBlock);
                setCode(await getInfoBlock(numberBlock));
                console.log(code);
            }
            run();
        }, 600);
        return () => clearInterval(interval);
    }, [code]);

    const inputRef = useRef(null);

    return (
        <div className="container">
            <main className="main">
                <h1>Sei explorer</h1>
                <input
                    type="text"
                    placeholder="Search"
                    className="input-tx"
                    ref={inputRef}
                />
                <button onClick={routeChange}>Search</button>
                <h2>Last block</h2>
                <h4>{lastNumberBlock}</h4>
                <CodeEditor
                    value={code}
                    padding={15}
                    language="yaml"
                    style={{
                        fontSize: 12,
                        width: '500px',
                        height: '500px',
                        overflowY: 'scroll',
                        backgroundColor: "#161b22",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </main>
            <p>Powered by icodragon [NODERS]#4560</p>
        </div>
    );
}

export default Explorer;
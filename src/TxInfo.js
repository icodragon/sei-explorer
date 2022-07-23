import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CodeEditor from "@uiw/react-textarea-code-editor";

const API_URL = process.env.REACT_APP_API_URL

async function getInfoTx(tx_hast) {
    const response = await fetch(`${API_URL}/tx?hash=${tx_hast}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return JSON.stringify(await response.json());
}

function TxInfo() {
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/`;
        navigate(path);
    }

    let { id } = useParams();
    const [code, setCode] = useState(
        ``
    );

    useEffect(() => {
        async function run () {
            setCode(await getInfoTx(id));
        }
        run();
    }, [id]);

    return (
        <div className="container">
            <main className="main">
                <h1>Sei explorer</h1>
                <p>TX {id}</p>
                <CodeEditor
                    value={code}
                    padding={15}
                    language="yaml"
                    style={{
                        fontSize: 12,
                        width: '700px',
                        height: '500px',
                        overflowY: 'scroll',
                        backgroundColor: "#161b22",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
                <button onClick={routeChange}>Back</button>
            </main>
        </div>
    );
}

export default TxInfo;
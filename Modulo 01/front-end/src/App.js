import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';
import api from './services/api';

import backgroundImage from './assets/ahri.png';

function App() {
    //projects é a variável e , setProjects a função.
    const [projects , setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProjects(){
        // projects.push(`novo Projeto ${Date.now()}`);

        // setProjects([...projects,`novo Projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `novo Projeto ${Date.now()}`,
            owner: "Gabriel Marques",
        });
        const project = response.data;

        setProjects([...projects, project ]);
    }

    return(
        <>
            <Header title="Homepage">
                <img src={backgroundImage} alt=""/>

                <ul>
                    {projects.map(project => <li key={project.id}>{project.title}</li>)}
                </ul>

                <button type="button" onClick={handleAddProjects}>Adicionar projeto</button>
            </Header>
           

        </>
    );
}

export default App;
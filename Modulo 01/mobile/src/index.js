import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList ,Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

function App(){
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    },[])

    async function handleAddProject(){
        const response = await api.post('projects',{
            title: `novo projeto ${Date.now()}`,
            owner: 'Gabriel Marques'
        });

        const project = response.data;

        setProjects([...projects, project ]);
    }

    return (
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#7159c1"/>
            <SafeAreaView style={style.container}>
                <FlatList 
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({item: project}) => (
                        <Text style={style.title} key={project.id}>{project.title}</Text>
                    )} 
                />

                <TouchableOpacity activeOpacity={0.6} style={style.button} onPress={handleAddProject} >
                    <Text style={style.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
                    {/* <View style={style.container}>
                        {projects.map(project => (
                            <Text style={style.title} key={project.id}>{project.title}</Text>
                        ))}
                    </View> */}
            </SafeAreaView>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#7159c1',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default App;
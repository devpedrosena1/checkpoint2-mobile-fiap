import AppButton from "@/app/components/button";
import { View, Text, TextInput, Alert } from "react-native";
import { firestore } from "@/services/firebase";
import { setDoc, addDoc, collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function Cadastro() {

    useEffect(() => {
        permissaoNotification()
    }, [])

    async function permissaoNotification() {
        const resposta = await Notifications.requestPermissionsAsync();

        let respostaFinal = resposta;

        if (resposta !== 'granted' ) {
            const resposta = await Notifications.requestPermissionsAsync();
            respostaFinal = resposta.status
        }

        if(respostaFinal !== 'granted') {
            Alert.alert("Notificação negada.")
        }
    }

    async function notification() {
        await Notifications.scheduleNotificationAsync ({
            content: {
                title: 'Cadastro',
                body: 'Usuário cadastrado'
            }, 
            trigger: null
        
        })
    }

    const [nome, setNome] = useState('')

    async function gerarProximoId() {
        const documento = await getDocs(collection(firestore, "tb_aluno"));

        if (documento.empty) {
            return "0";
        }

        const id = documento.docs
        .map((item) => Number(item.id))
        .filter((id) => !isNaN(id));

        if (id.length === 0) {
            return "0";
        }

        const maiorId = Math.max(...id);
        return String(maiorId + 1);
    }

    async function cadastrar() {
        const id = await gerarProximoId();
        try {
            await setDoc( // addDoc gera um ID automatico
                doc(firestore, "tb_aluno", id), { // escolho a coleção onde será salvo o documento
                name: nome // aqui eu seto os campos que estarao no meu documento
            })
            notification()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text>Cadastro</Text>
            <TextInput placeholder="Informe o nome do aluno: " value={nome} onChangeText={setNome}></TextInput>
            <AppButton title="Cadastrar" onPress={cadastrar}/>
        </View>
    )
}
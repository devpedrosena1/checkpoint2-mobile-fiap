import AppButton from "@/app/components/button";
import { firestore } from "@/services/firebase";
import * as Notifications from 'expo-notifications';
import { router } from "expo-router";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

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
        const {status} = await Notifications.requestPermissionsAsync();

        let respostaFinal = status;

        if (status !== 'granted') {
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
    <View style={{ flex: 1, backgroundColor: "white", padding: 16, justifyContent: "center" }}>
        <Text
            style={{
                fontSize: 26,
                fontWeight: "bold",
                textAlign: "center",
                color: "#222",
                marginBottom: 20
            }}
        >
            Cadastro
        </Text>

        <TextInput
            placeholder="Informe o nome do aluno: "
            value={nome}
            onChangeText={setNome}
            style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: 12,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: "#171414ff",
                color: "#fff"
            }}
        />

        <View style={{ marginBottom: 12 }}>
            <AppButton title="Cadastrar" onPress={cadastrar}/>
        </View>

        <AppButton title="Voltar" onPress={() => router.back()}></AppButton>
    </View>
)
}
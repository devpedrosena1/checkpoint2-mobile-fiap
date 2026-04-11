import AppButton from "@/app/components/button";
import { auth } from "@/services/firebase";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";


export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    const login = async () => {
        if (!email || !senha) {
            alert('Preencha todos os campos');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const token = await userCredential.user.getIdToken();
            console.log(token);
            router.push("../menu/menu")
        

    } catch (error: any) {   
        console.log('Erro ao fazer login:', error.code, error.message);

        router.push({
            pathname: '../error/loginError',
            params: { code: error.code }
        })
    }

    }

    return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "white", padding: 20 }}>
        <Text
            style={{
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                color: "#222",
                marginBottom: 24
            }}
        >
            Login
        </Text>

        <TextInput
            style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: 12,
                marginBottom: 12,
                fontSize: 16,
                backgroundColor: "#171414ff",
                color: "#fff"
            }}
            placeholder="Digite seu e-mail: "
            onChangeText={(text) => setEmail(text)}
        />

        <TextInput
            style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: 12,
                marginBottom: 20,
                fontSize: 16,
                backgroundColor: "#171414ff",
                color: "#fff"
            }}
            placeholder="Digite sua senha: "
            onChangeText={(text) => setSenha(text)}
            secureTextEntry
        />

        <View style={{ marginTop: 8, marginBottom: 10 }}>
            <AppButton
                title="Login"
                onPress={login}
            />
        </View>
        
        <View style={{ marginTop: 4 }}>
            <AppButton
                title="Voltar"
                onPress={() => router.back()}
            />
        </View>
    </View>
)
}
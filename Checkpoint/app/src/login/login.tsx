import AppButton from "@/app/components/button";
import { auth } from "@/services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";


export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    useEffect(() => {
        const verificarUsuarioLogado = async () => {
            try {
                const usuarioSalvo = await AsyncStorage.getItem('@user');
                if (usuarioSalvo) {
                    router.replace('/src/aluno/aluno');
                }
            } catch (error) {
                console.error('Erro ao verificar usuário logado:', error);
            }
        };
        verificarUsuarioLogado();
    }, [])

    const login = async () => {
        if (!email || !senha) {
            alert('Preencha todos os campos');
            return;
        }
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);

        const userData = {
            email: userCredential.user.email,
            tipo: "logado"
        };

        await AsyncStorage.setItem('@user', JSON.stringify(userData));
        Alert.alert('Login bem-sucedido', `Bem-vindo, ${userCredential.user.email}!`);
        router.push('/src/home/home');

    } catch (error: any) {   
        console.log('Erro ao fazer login:', error.code, error.message);

        router.push({
            pathname: '../error/loginError',
            params: { code: error.code }
        })
    }

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Login</Text>
            <TextInput style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'gray', margin: 5 }} placeholder="Digite seu e-mail: " onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'gray', margin: 5 }} placeholder="Digite sua senha: " onChangeText={(text) => setSenha(text)}></TextInput>

            <View style={{ marginTop: 20 }}>
                <AppButton
                    title="Login"
                    onPress={login}
                />
            </View>
            
            <View style={{ marginTop: 10 }}>
                <AppButton
                    title="Voltar"
                    onPress={() => router.back()}
                />
            </View>
        </View>
    )
}
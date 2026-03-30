import AppButton from "@/app/components/button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function LoginError() {

    const { code } = useLocalSearchParams();
    const router = useRouter();

    let mensagem = "Erro desconhecido ao fazer login."

    if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        mensagem = "E-mail ou senha inválidos. Tente novamente.";
    }

    else if (code === "too-many-requests") {
        mensagem = "Muitas tentativas de login. Tente novamente mais tarde.";
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                Erro no login
            </Text>

            <Text style={{ marginBottom: 30 }}>
                {mensagem}
            </Text>

            <AppButton
                title="Tentar novamente"
                onPress={() => router.back()}
            />
        </View>
    )
}

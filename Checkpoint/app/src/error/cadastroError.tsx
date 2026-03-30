import AppButton from "@/app/components/button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function CadastroError() {

    const { code } = useLocalSearchParams();
    const router = useRouter();

    let mensagem = "Erro desconhecido ao cadastrar."

    if (code === "auth/email-already-in-use") {
        mensagem = "Este e-mail já está sendo utilizado.";
    }

    else if (code === "auth/invalid-email") {
        mensagem = "O e-mail informado é inválido.";
    }

    else if (code === "auth/weak-password") {
        mensagem = "A senha precisa ter pelo menos 6 caracteres.";
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                Erro no cadastro
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
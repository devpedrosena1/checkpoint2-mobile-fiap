import AppButton from "@/app/components/button";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Menu() {

    const router = useRouter();

    return (
        <View>
            <Text>Menu</Text>
            <AppButton title="Cadastrar" onPress={() => router.push("../cadastroAluno/cadastro")}></AppButton>
        </View>
    )
}
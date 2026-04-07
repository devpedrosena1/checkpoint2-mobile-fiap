import AppButton from "@/app/components/button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { setDoc, collection, doc, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "@/services/firebase";

type Aluno = {
    id: string,
    nome: string
}

export default function Menu() {

    const router = useRouter();
    const [aluno, setAluno] = useState<Aluno[]>([])

    async function buscarAlunos() {
        try {
            const documento = await getDocs(collection(firestore, "tb_aluno"))
            const listaAluno = documento.docs.map((i) => ({
                id: i.id,
                nome: i.data().nome // data estamos dizendo que queremos capturar um valor que está dentro do documento tb_aluno
            }))
            setAluno(listaAluno)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text>Menu</Text>
            <AppButton title="Cadastrar" onPress={() => router.push("../cadastroAluno/cadastro")}></AppButton>
        </View>
    )
}
import AppButton from "@/app/components/button";
import { firestore } from "@/services/firebase";
import { useRouter } from "expo-router";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

type Aluno = {
    idAluno: string,
    nome: string
}

export default function Menu() {

    const router = useRouter();
    const [aluno, setAluno] = useState<Aluno[]>([])

    async function buscarAlunos() {
        try {
            const documento = await getDocs(collection(firestore, "tb_aluno"))
            const listaAluno = documento.docs.map((i) => ({
                idAluno: i.id,
                nome: i.data().name // data estamos dizendo que queremos capturar um valor que está dentro do documento tb_aluno
            }))
            setAluno(listaAluno)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        buscarAlunos()
    }, [])
    
    /*const listaTest = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' },
        { id: '3', title: 'Item 3' },
    ]*/

    async function ExcluirAluno(aluno: Aluno) {
        try {
            await deleteDoc(doc(firestore, "tb_aluno", aluno.idAluno))
            buscarAlunos()
        } catch (error) {
            console.log(error)
        }
    }

    function confirmaExcluir(aluno: Aluno) {
        Alert.alert(
            "Confirmação",
            `Tem certeza que deseja excluir o aluno ${aluno.nome}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => ExcluirAluno(aluno) }
            ]
        );
    }

    return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 16 }}>
        <Text
            style={{
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                color: "#222",
                marginBottom: 20
            }}
        >
            Menu
        </Text>

        <View style={{ marginBottom: 16 }}>
            <AppButton title="Cadastrar" onPress={() => router.push("../cadastroAluno/cadastro")}></AppButton>
        </View>

        <FlatList 
            data={aluno} // dados, listaAluno
            keyExtractor={(item) => item.idAluno} // chave unica para cada item (id)
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({item}) => // o conteudo a ser renderizado (nome)
                <View
                    style={{
                        paddingVertical: 14,
                        paddingHorizontal: 12,
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                        borderWidth: 1,
                        borderColor: "#e5e5e5",
                        borderRadius: 12,
                        backgroundColor: "#f9f9f9",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 2,
                        elevation: 2
                    }}
                >
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: "../cadastroNotas/cadastro",
                            params: {idAluno:item.idAluno, nome:item.nome}
                        })}
                        style={{ flex: 1, marginRight: 12 }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "600",
                                color: "#222"
                            }}
                        >
                            {item.nome}
                        </Text>
                    </TouchableOpacity>

                    <AppButton title="Excluir" onPress={() => confirmaExcluir(item)}></AppButton>
                </View>} 
        />
    </View>
    )
}
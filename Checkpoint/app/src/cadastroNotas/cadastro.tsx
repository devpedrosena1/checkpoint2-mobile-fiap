import AppButton from "@/app/components/button";
import { firestore } from "@/services/firebase";
import { router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";


export default function CadastroNota() {

    const {idAluno, nome} = useLocalSearchParams <{idAluno: string, nome?: string}>()

    const [nota1, setNota1] = useState('')
    const [nota2, setNota2] = useState('')
    const [nota3, setNota3] = useState('')
    const [media, setMedia] = useState<number | null>(null)
    
    async function cadastrarNota() {
        const idNota = "0";
        try {
            await setDoc( // addDoc gera um ID automatico
                doc(firestore, "tb_aluno", String(idAluno), "Notas", idNota), { // escolho a coleção onde será salvo o documento
                nota1: nota1, // aqui eu seto os campos que estarao no meu documento
                nota2: nota2,
                nota3: nota3
            })
            Alert.alert("Sucesso", "Notas cadastradas com sucesso!")
        } catch (error) {
            console.log(error)
        }
    }

    async function buscarNota() {
        const idNota = "0";
        try {
            const documento = await getDoc( //buscar um documento
                doc(firestore, "tb_aluno", String(idAluno), "Notas", idNota))
                if (!documento.exists()) {
                    setNota1("");
                    setNota2("");
                    setNota3("");
                    setMedia(null);
                    return;
                }

                const dados = documento.data();

                setNota1(dados.nota1 ?? "");
                setNota2(dados.nota2 ?? "");
                setNota3(dados.nota3 ?? "");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        buscarNota()
    }, [])

    function calcularMedia() {
        const n1 = parseFloat(nota1);
        const n2 = parseFloat(nota2);
        const n3 = parseFloat(nota3);

        if (
        (!isNaN(n1) && (n1 < 0  || n1 > 10)) ||

        (!isNaN(n2) && (n2 < 0  || n2 > 10)) ||

        (!isNaN(n3) && (n3 < 0 || n3 > 10))
        ){
        alert("As notas devem estar entre 0 e 10.");
        return;
        }

        if (nota1 === "" && nota2 === "" && nota3 === "") {
        alert("Por favor, insira pelo menos uma nota.");
        return;
        }

        if (isNaN(n1) && !isNaN(n2) && !isNaN(n3)) {
        setMedia((n2 + n3) / 2);
        return;
        }

        if (!isNaN(n1) && isNaN(n2) && !isNaN(n3)) {
        setMedia((n1 + n3) / 2);
        return;
        }

        if (!isNaN(n1) && !isNaN(n2) && isNaN(n3)) {
        setMedia((n1 + n2) / 2);
        return;
        }

        if (!isNaN(n1) && !isNaN(n2) && !isNaN(n3)) {
        setMedia((n1 + n2 + n3) / 3);
        return;
        }

        if (!isNaN(n1) && isNaN(n2) && isNaN(n3)) {
        alert("Preencha pelo menos duas notas.");
        return;
        }

        if (isNaN(n1) && !isNaN(n2) && isNaN(n3)) {
        alert("Preencha pelo menos duas notas.");
        return;
        }

        if (isNaN(n1) && isNaN(n2) && !isNaN(n3)) {
        alert("Preencha pelo menos duas notas.");
        return;
        }
    }

    return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
        <Text
            style={{
                fontSize: 26,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
                color: "#222"
            }}
        >
            Cadastro
        </Text>

        <TextInput
            placeholder="Informe a primeira nota:"
            keyboardType="numeric"
            value={nota1}
            onChangeText={setNota1}
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
        />

        <TextInput
            placeholder="Informe a segunda nota:"
            keyboardType="numeric"
            value={nota2}
            onChangeText={setNota2}
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
        />

        <TextInput
            placeholder="Informe a terceira nota:"
            keyboardType="numeric"
            value={nota3}
            onChangeText={setNota3}
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

        <AppButton title="Calcular Média" onPress={calcularMedia} />

        <Text
            style={{
                fontSize: 18,
                fontWeight: "600",
                marginVertical: 16,
                textAlign: "center",
                color: "#333"
            }}
        >
            Média:{" "}
            <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
                {media !== null ? media.toFixed(2) : "N/A"}
            </Text>
        </Text>

        <AppButton title="Cadastrar" onPress={cadastrarNota} />

        <AppButton title="Voltar" onPress={() => router.back()} />
    </View>
    )
}
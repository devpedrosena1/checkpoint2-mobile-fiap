import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import AppButton from './components/button';

export default function Home() {

    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Realizar login</Text>
            <View style={{ marginTop: 20 }}>
                <AppButton
                    title="Login"
                    onPress={() => router.push('/src/login/login')}
                />
            </View>
            {/* <View style={{ marginTop: 10 }}>
                <AppButton
                    title="Cadastro"
                    onPress={() => router.push('/src/cadastro/cadastrar')}
                />
            </View> */}
            
        </View>
    )
}
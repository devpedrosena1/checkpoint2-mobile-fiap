import { Button } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
    return (
        <Button
            title={title}
            onPress={onPress}
        />
    );
}
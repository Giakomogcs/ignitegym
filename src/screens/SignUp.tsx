import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { api } from "@services/api";

import axios from "axios";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o email.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Digite a senha.")
    .min(6, "A senha deve ter no minimo 6 digitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
});

export function SignUp() {
  const toast = useToast();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post("/users", { name, email, password });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position="absolute"
          resizeMode="stretch"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center px={10}>
          <Heading
            color={"gray.100"}
            fontSize={"xl"}
            mb={6}
            fontFamily="heading"
          >
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Center mt={16} px={10}>
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { VStack, FlatList, HStack, Heading, Text, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/exerciseDTO";

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState("costas");

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
      console.log("teste" + response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercicios.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              String(groupSelected).toUpperCase() === String(item).toUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading color={"gray.200"} fontSize={"md"} fontFamily={"heading"}>
            Exercícios
          </Heading>

          <Text color={"gray.200"} fontSize={"sm"}>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}

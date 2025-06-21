// app/(tabs)/cadastro.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { getAlunoById, criarAluno, atualizarAluno } from '../../src/services/api';

export default function Cadastro() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id;

  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');
  const [curso, setCurso] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getAlunoById(id)
        .then((res) => {
          const aluno = res.data;
          setNome(aluno.nome);
          setTurma(aluno.turma);
          setCurso(aluno.curso);
          setMatricula(aluno.matricula);
        })
        .catch(() => {
          Alert.alert('Erro', 'Não foi possível carregar os dados do aluno');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const salvar = async () => {
    if (!nome || !turma || !curso || !matricula) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      if (id) {
        await atualizarAluno(id, { nome, turma, curso, matricula });
        Alert.alert('Sucesso', 'Aluno atualizado!');
      } else {
        await criarAluno({ nome, turma, curso, matricula });
        Alert.alert('Sucesso', 'Aluno cadastrado!');
      }
      router.replace('/'); // Voltar para lista
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o aluno');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{id ? 'Editar Aluno' : 'Cadastro de Aluno'}</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Turma"
        value={turma}
        onChangeText={setTurma}
        style={styles.input}
      />
      <TextInput
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
        style={styles.input}
      />
      <TextInput
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
        style={styles.input}
      />

      <Button title="Salvar" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 14,
    paddingHorizontal: 10,
  },
});

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { getAlunos, excluirAluno } from '../../src/services/api';

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const carregarAlunos = async () => {
    setLoading(true);
    try {
      const res = await getAlunos();
      setAlunos(res.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar alunos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarAlunos();
    }, [])
  );

  const confirmarExcluir = (id) => {
    console.log('confirmarExcluir chamado para id:', id);
    Alert.alert('Confirmação', 'Deseja excluir este aluno?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          console.log('Excluindo aluno com id:', id);
          try {
            await excluirAluno(id);
            Alert.alert('Sucesso', 'Aluno excluído!');
            carregarAlunos();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir aluno');
            console.error(error.response?.data || error.message || error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Cadastrar Novo Aluno" onPress={() => router.push('/cadastro')} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : alunos.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Nenhum aluno cadastrado.</Text>
      ) : (
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text><Text style={styles.label}>ID:</Text> {item.id}</Text>
              <Text><Text style={styles.label}>Nome:</Text> {item.nome}</Text>
              <Text><Text style={styles.label}>Turma:</Text> {item.turma}</Text>
              <Text><Text style={styles.label}>Curso:</Text> {item.curso}</Text>
              <Text><Text style={styles.label}>Matrícula:</Text> {item.matricula}</Text>

              <View style={styles.actions}>
                <Button
                  title="Editar"
                  onPress={() => router.push(`/cadastro?id=${item.id}`)}
                />
                <Button
                  title="Excluir"
                  color="red"
                  onPress={() => confirmarExcluir(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

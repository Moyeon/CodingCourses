import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodoList() {
  const [todoList, setTodoList] = useState([{}]);

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    saveTodoList();
  }, [todoList]);

  async function saveTodoList() {
    var jsonList = JSON.stringify(todoList);
    await AsyncStorage.setItem("@todo_list", jsonList);
  }

  async function loadTodoList() {
    var jsonList = await AsyncStorage.getItem("@todo_list");
    if (jsonList != null) {
      setTodoList(JSON.parse(jsonList));
    } else {
      var list = [];
      list.push({
        text: "Solve boj problem 10025",
        isFinished: true,
      });
      list.push({
        text: "Solve boj problem 11234",
        isFinished: false,
      });
      list.push({
        text: "Charge battery",
        isFinished: false,
      });
      setTodoList(list);
    }
  }

  function changeIsFinished(idx) {
    var list = [...todoList];
    list[idx].isFinished = !list[idx].isFinished;
    setTodoList(list);
  }

  function changeText(idx, text) {
    var list = [...todoList];
    list[idx].text = text;
    setTodoList(list);
  }

  function addTodo() {
    var list = [...todoList];
    list.push({
      text: "",
      isFinished: false,
    });
    setTodoList(list);
  }

  return (
    <ScrollView>
      {todoList.map((t, idx) => {
        return (
          <View
            style={{
              backgroundColor: "white",
              padding: 30,
              borderRadius: 20,
              margin: 20,
              marginBottom: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
            key={idx}
          >
            <TouchableOpacity onPress={() => changeIsFinished(idx)}>
              {t.isFinished ? (
                <View
                  style={{
                    backgroundColor: "gold",
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                  }}
                ></View>
              ) : (
                <View
                  style={{
                    backgroundColor: "white",
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                ></View>
              )}
            </TouchableOpacity>
            <TextInput
              style={{ fontSize: 16, flexGrow: 1 }}
              value={t.text}
              onChangeText={(text) => changeText(idx, text)}
            ></TextInput>
          </View>
        );
      })}
      <TouchableOpacity onPress={addTodo}>
        <View
          style={{
            backgroundColor: "white",
            padding: 5,
            borderRadius: 20,
            margin: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>+</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

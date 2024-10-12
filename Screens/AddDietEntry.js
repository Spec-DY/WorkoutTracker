import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';
import commonStyles from '../Styles/styles';

const AddDietEntry = ({ navigation }) => {
  const { addDietEntry, theme, themeStyles } = useContext(AppContext);

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {

    console.log(typeof(calories))
    if (!description || !calories || isNaN(calories) || calories <= 0 || !Number.isInteger(parseFloat(calories))) {
      Alert.alert('Invalid Input', 'Please provide valid data.');
      return;
    }

    const isSpecial = calories > 800;

    addDietEntry({ description, calories: Number(calories), date, isSpecial });

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: themeStyles[theme].backgroundColor }}>
      <Text style={
          [
            { color: themeStyles[theme].textColor },
            commonStyles.description
          ]
        }>Description</Text>
      <TextInput
        style={
            [
              { color: themeStyles[theme].textColor },
              commonStyles.input
            ]
          }
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <Text style={
          [
            { color: themeStyles[theme].textColor },
            commonStyles.description
          ]
        }>Calories</Text>
      <TextInput
        style={
            [
              { color: themeStyles[theme].textColor },
              commonStyles.input
            ]
          }
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
      />

      <Text style={
          [
            { color: themeStyles[theme].textColor },
            commonStyles.description
          ]
        }>Date</Text>
      <TextInput
        style={
            [
              { color: themeStyles[theme].textColor },
              commonStyles.input
            ]
          }
        value={date.toDateString()}
        onPressIn={() => setShowDatePicker(true)}
      />
      {showDatePicker ? (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
      ) : null}

      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddDietEntry;

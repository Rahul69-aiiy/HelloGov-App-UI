import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView, 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'expo-checkbox';

const AddReportScreen = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [isAnonymous, setAnonymous] = useState(false);
  const [location, setLocation] = useState('Charta, Jharkhand'); // Placeholder for automatic location

  const handleSubmit = () => {
    // Implement submission logic here
    console.log({ description, isAnonymous, location });
    // After submission, you might want to redirect
    router.replace('reportdetail')
  };

  const handleCancel = () => {
    router.back(); // Simply go back without submitting
  };

  const handleMicPress = () => {
    console.log('Voice input activated');
    // Implement voice input logic
  };

  const handleAddPhotoPress = () => {
    console.log('Add photo functionality');
    // Implement image picker/camera logic
  };

  return (
    // KeyboardAvoidingView helps adjust the view when the keyboard appears
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust offset if header is present
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Configure the header for this screen using Stack.Screen options */}
        <Stack.Screen
          options={{
            headerShown: true, // Show header for this screen
            title: 'Add Report',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',
          }}
        />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* What are you reporting? (optional) */}
          <Text style={styles.inputLabel}>
            What are you reporting? <Text style={styles.optionalText}>(optional)</Text>
          </Text>
          <View style={styles.descriptionInputContainer}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Description"
              placeholderTextColor="#888"
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity onPress={handleMicPress} style={styles.micIcon}>
              <MaterialCommunityIcons name="microphone" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Photo (mandatory) */}
          <Text style={styles.inputLabel}>
            <Text style={styles.mandatoryText}>*</Text> Photo<Text style={styles.optionalText}>(mandatory)</Text>
          </Text>
          <TouchableOpacity style={styles.photoUploadBox} onPress={handleAddPhotoPress}>
            <MaterialCommunityIcons name="plus" size={28} color="#555" />
          </TouchableOpacity>

          {/* Location (Automatic) */}
          <Text style={styles.inputLabel}>
            <Text style={styles.mandatoryText}>*</Text> Location<Text style={styles.optionalText}>(Automatic)</Text>
          </Text>
          <View style={styles.locationDisplay}>
            <TextInput
              style={styles.locationText}
              value={location}
              editable={false} // Make it non-editable as it's "Automatic"
              placeholderTextColor="#888"
            />
          </View>

          {/* Report Anonymously Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isAnonymous}
              onValueChange={setAnonymous}
              color={isAnonymous ? '#34A853' : '#AEAEB2'}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Report Anonymously</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    paddingRight: 15,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, 
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  optionalText: {
    fontWeight: 'normal',
    color: '#777',
    fontSize: 14,
  },
  mandatoryText: {
    color: '#D93025', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  descriptionInputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    minHeight: 120,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  descriptionInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    minHeight: 100, 
    textAlignVertical: 'top', 
  },
  micIcon: {
    padding: 5,
    alignSelf: 'flex-end', 
  },
  photoUploadBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 12,
    paddingBottom: 5,
  },
  locationDisplay: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#34A853', 
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddReportScreen;
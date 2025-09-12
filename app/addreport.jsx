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
  Image,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { useMedia } from './MediaContext';

const AddReportScreen = () => {
  const router = useRouter();
  const { addImages } = useMedia();
  const [description, setDescription] = useState('');
  const [isAnonymous, setAnonymous] = useState(false);
  const [location, setLocation] = useState('Charta, Jharkhand'); // Placeholder for automatic location
  const [media, setMedia] = useState(null); // { uri, mediaType, fileName }
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  // Optional: set an upload URL here or via env/config. If empty, upload will be simulated.
  const UPLOAD_URL = ''; // e.g. 'https://your-api.example.com/upload'

  const handleSubmit = async () => {
    // Validate mandatory media
    if (!media) {
      Alert.alert('Missing media', 'Please attach a photo or video before submitting.');
      return;
    }

    console.log({ description, isAnonymous, location, media });

    try {
      const res = await uploadMedia();
      if (res && res.ok) {
        Alert.alert('Upload successful', 'Your report is uploaded.');
        // Add to shared media context so reportdetail can display it reliably
        try {
          addImages([media.uri]);
        } catch (e) {
          console.warn('addImages failed', e);
        }

        // Also navigate and pass params for backward compatibility
        router.push({
          pathname: '/reportdetail',
          params: {
            description,
            mediaUri: media.uri,
            mediaType: media.mediaType,
            images: JSON.stringify([media.uri]),
          },
        });
      } else {
        Alert.alert('Upload failed', (res && res.error) ? String(res.error) : 'Please try again.');
      }
    } catch (e) {
      console.log('submit error', e);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleCancel = () => {
    router.back(); // Simply go back without submitting
  };

  const handleMicPress = () => {
    console.log('Voice input activated');
    // Implement voice input logic
  };

  const handleAddPhotoPress = () => {
    // Open custom modal picker
    setShowPicker(true);
  };

  const requestPermissions = async () => {
    try {
      const camera = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLib = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return (
        (camera?.status === 'granted' || camera?.granted) &&
        (mediaLib?.status === 'granted' || mediaLib?.granted)
      );
    } catch (e) {
      console.log('permission error', e);
      return false;
    }
  };

  const handleAssetResult = (result) => {
    const cancelled = result?.cancelled ?? result?.canceled;
    const asset = result?.assets ? result.assets[0] : result;
    if (cancelled || !asset) return;

    const uri = asset.uri || asset?.uri;
    let mediaType = asset.type || asset.mediaType;
    const fileName = asset.fileName || (uri ? uri.split('/').pop() : null);
    if (!mediaType && uri) {
      mediaType = uri.match(/\.(mp4|mov|m4v|avi)$/i) ? 'video' : 'image';
    }

    setMedia({ uri, mediaType, fileName });
  };

  const takePhoto = async () => {
  setShowPicker(false);
  const ok = await requestPermissions();
    if (!ok) {
      Alert.alert('Permissions required', 'Please allow camera and media permissions in settings');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
      });
      handleAssetResult(result);
    } catch (e) {
      console.log('camera error', e);
    }
  };

  const pickFromLibrary = async () => {
  setShowPicker(false);
  const ok = await requestPermissions();
    if (!ok) {
      Alert.alert('Permissions required', 'Please allow media library permissions in settings');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
      });
      handleAssetResult(result);
    } catch (e) {
      console.log('library error', e);
    }
  };

  const removeMedia = () => setMedia(null);

  const uploadMedia = async () => {
    if (!media || !media.uri) return null;
    setUploading(true);
    setUploadResult(null);

    try {
      // If no UPLOAD_URL provided, simulate an upload delay and return a fake response
      if (!UPLOAD_URL) {
        await new Promise((res) => setTimeout(res, 1200));
        const fake = { ok: true, url: media.uri };
        setUploadResult(fake);
        return fake;
      }

      // Convert local file URI to blob
      const response = await fetch(media.uri);
      const blob = await response.blob();
      const fd = new FormData();
      fd.append('file', {
        uri: media.uri,
        name: media.fileName || 'upload',
        type: blob.type || (media.mediaType?.startsWith('video') ? 'video/mp4' : 'image/jpeg'),
      });

      const uploadRes = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: fd,
        headers: {
          'Accept': 'application/json',
        },
      });

      const json = await uploadRes.json().catch(() => ({ ok: uploadRes.ok }));
      setUploadResult(json);
      return json;
    } catch (e) {
      console.log('upload error', e);
      setUploadResult({ ok: false, error: String(e) });
      return { ok: false, error: String(e) };
    } finally {
      setUploading(false);
    }
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
          <TouchableOpacity style={styles.photoUploadBox} onPress={handleAddPhotoPress} activeOpacity={0.9}>
            {media ? (
              <View style={styles.mediaWrapper}>
                {media.mediaType && media.mediaType.startsWith('video') ? (
                  <Video
                    source={{ uri: media.uri }}
                    style={styles.mediaPreview}
                    useNativeControls
                    resizeMode="cover"
                    isLooping={false}
                  />
                ) : (
                  <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
                )}
                <TouchableOpacity style={styles.removeButton} onPress={removeMedia}>
                  <MaterialCommunityIcons name="close-circle" size={28} color="#D93025" />
                </TouchableOpacity>
              </View>
            ) : (
              <MaterialCommunityIcons name="plus" size={28} color="#555" />
            )}
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
            <TouchableOpacity
              style={[styles.submitButton, uploading ? { opacity: 0.7 } : null]}
              onPress={handleSubmit}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
          {/* Custom picker modal */}
          <Modal
            visible={showPicker}
            transparent
            animationType="slide"
            onRequestClose={() => setShowPicker(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTitle}>Attach media</Text>
                <TouchableOpacity style={styles.pickerOption} onPress={() => takePhoto()}>
                  <MaterialCommunityIcons name="camera" size={22} color="#fff" />
                  <Text style={styles.pickerOptionText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pickerOption} onPress={() => pickFromLibrary()}>
                  <MaterialCommunityIcons name="image" size={22} color="#fff" />
                  <Text style={styles.pickerOptionText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pickerOption, styles.pickerCancel]} onPress={() => setShowPicker(false)}>
                  <Text style={styles.pickerOptionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
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
  mediaWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: '#000',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  pickerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  pickerOptionText: {
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
  },
  pickerCancel: {
    marginTop: 8,
    justifyContent: 'center',
  },
});

export default AddReportScreen;
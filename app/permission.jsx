import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router'; 

const LocationPermissionScreen = () => {
  const router = useRouter();

  // Function to handle any button press and redirect to tabs
  const handlePermissionResponse = () => {
    // In a real app, you'd integrate with react-native-geolocation-service here
    // based on which button was pressed. For now, all buttons lead to tabs.
    console.log('Permission button pressed. Redirecting to tabs.');
    router.replace('/(tabs)'); // Redirects to the 'home' tab, it's the default route in our (tabs) group
  };

  return (
    <>
      {/* Hide the header provided by Expo Router's Stack */}
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Allow "App" to use your location?</Text>
          <Text style={styles.description}>
            Your location helps us mark the exact place of the issue so the right department can fix it
            quickly. You can adjust the pin before submitting.
          </Text>

          {/* Placeholder for the map image */}
          <Image
            source={{ uri: 'https://i.imgur.com/7SjL5x3.png' }} // Replace with a real map image or local asset
            style={styles.mapImage}
            resizeMode="contain"
          />

          {/* Permission Buttons */}
          <TouchableOpacity style={styles.button} onPress={handlePermissionResponse}>
            <Text style={styles.buttonText}>Allow Once</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.allowWhileUsingButton]} onPress={handlePermissionResponse}>
            <Text style={[styles.buttonText, styles.allowWhileUsingButton]}>Allow While Using the App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handlePermissionResponse}>
            <Text style={[styles.buttonText, styles.dontAllowButtonText]}>Don't Allow</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    color: '#555',
    marginBottom: 30,
  },
  mapImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 40,
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth, 
    borderColor: '#CCC',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allowWhileUsingButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    color: '#fff'
  },
  buttonText: {
    fontSize: 17,
    color: '#007AFF', 
    fontWeight: '500',
  },
  dontAllowButtonText: {
    color: '#007AFF',
  },
});

export default LocationPermissionScreen;
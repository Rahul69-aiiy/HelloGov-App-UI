import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground, // We'll use this for the dummy map
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { router, useRouter } from 'expo-router';

// A placeholder image URL for the map. You can replace this with any map image you like.
const DUMMY_MAP_IMAGE_URL = 'https://i.imgur.com/gC5sI4g.png';

const NearbyScreen = ({ navigation }) => {

  const handleAddReport = () => {
    console.log('Navigate to Add Report screen');
    // When you're ready, you'll navigate to the report screen like this:
    // navigation.navigate('AddReportScreen');
    router.push('../addreport')
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* The ImageBackground acts as our dummy map */}
      <ImageBackground
        source={ require('../../assets/images/map.png')}
        style={styles.mapBackground}
        resizeMode="cover"
      >

        {/* Legend (positioned on top of the map) */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: 'green' }]} />
            <Text style={styles.legendText}>Resolved</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: 'blue' }]} />
            <Text style={styles.legendText}>Acknowledged</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: 'red' }]} />
            <Text style={styles.legendText}>Unacknowledged</Text>
          </View>
        </View>

        {/* Add Report Button (positioned on top of the map) */}
        <TouchableOpacity style={styles.addReportButton} onPress={handleAddReport}>
          <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
          <Text style={styles.addReportButtonText}>Add report</Text>
        </TouchableOpacity>

      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapBackground: {
    flex: 1,
    justifyContent: 'space-between', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  legendContainer: {
    position: 'absolute',
    bottom: 160,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  addReportButton: {
    position: 'absolute',
    bottom: 80, 
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34A853', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  addReportButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default NearbyScreen;
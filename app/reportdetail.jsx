import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Extract data from params, providing default values for the UI
  const reportType = params.reportType || 'General Issue';
  const location = params.location || '123 Parkview Terrace, Sydney NSW 2000';
  const description = params.description || 'Description value. Sed posuere consectetur est at lobortis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.';
  const dateSubmitted = params.dateSubmitted || '3 Jun 2024, 8:04 pm';
  const status = params.status || 'Status Ref Sm';
  const statusColor = '#D93025'; // Red color from screenshot

  // Parse the images array back from a string
  let images = [];
  if (params.images) {
    try {
      images = JSON.parse(params.images);
    } catch (e) {
      console.error("Failed to parse images from params", e);
    }
  }

  const handleEdit = () => {
    console.log('Edit button pressed for report:', params.reportId);
    // You would typically navigate to an edit screen here:
    // router.push(`/edit-report/${params.reportId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Report',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            // This button takes the user back to the main tab interface
            <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={{ paddingLeft: 10 }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.headerButton}>Edit</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#000', // Black header background
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* --- Top Card with Location and Dummy Map --- */}
        <View style={styles.cardWhite}>
          <View style={styles.locationInfo}>
            <Text style={styles.reportTypeLabel}>({reportType})</Text>
            <Text style={styles.reportAddress}>{location}</Text>
          </View>
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://i.imgur.com/gC5sI4g.png' }} // Dummy map image
              style={styles.map}
              resizeMode="cover"
            />
            <View style={styles.codeWidgetOverlay}>
              <MaterialCommunityIcons name="code-tags" size={30} color="#666" />
              <Text style={styles.codeWidgetText}>Code widget</Text>
            </View>
          </View>
        </View>

        {/* --- Bottom Card with Details, Description, and Photos --- */}
        <View style={styles.cardDark}>
          <View style={styles.detailsRow}>
            <View>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.detailLabel}>Date submitted</Text>
              <Text style={styles.detailValue}>{dateSubmitted}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
          
          {/* --- Image Section or Placeholder --- */}
          {images.length > 0 ? (
            <View style={styles.uploadedImageSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageScrollContainer}>
                {images.map((uri, index) => (
                  <Image key={index} source={{ uri: uri }} style={styles.uploadedReportImage} />
                ))}
              </ScrollView>
            </View>
          ) : (
            // Placeholder for when no images are submitted
            <View style={styles.noImagePlaceholder}>
              <MaterialCommunityIcons name="image-outline" size={80} color="#777" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerButton: {
    color: '#FFF',
    fontSize: 17,
    paddingRight: 15,
  },
  scrollContent: {
    paddingVertical: 15,
  },
  cardWhite: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  locationInfo: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  reportTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  reportAddress: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  codeWidgetOverlay: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderRadius: 100,
    backgroundColor: 'rgba(230, 230, 230, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  codeWidgetText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardDark: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#444',
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8A8A8E',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFF',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 22,
  },
  uploadedImageSection: {},
  imageScrollContainer: {
    paddingTop: 10,
  },
  uploadedReportImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#333',
  },
  noImagePlaceholder: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ReportDetailScreen;
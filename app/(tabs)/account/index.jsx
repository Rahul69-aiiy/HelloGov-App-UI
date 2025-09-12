import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuItem from '../../../components/MenuItem'; 
import { router, useRouter } from 'expo-router';

const AccountScreen = ({ navigation }) => {
  const router = useRouter();
  // Placeholder functions
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => router.replace('../(auth)/login') }, 
    ]);
  };

  const handleEdit = () => {
    console.log('Navigate to Edit Profile screen');
    // navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* --- Profile Section --- */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Icon name="user" size={80} color="#AEAEB2" />
          </View>
          <Text style={styles.userName}>(User Name)</Text>
          <Text style={styles.userPhone}>(Phone no)</Text>
        </View>

        {/* --- Action Buttons --- */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <Text style={styles.actionButtonText}>Edit?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Text style={styles.actionButtonText}>Logout?</Text>
          </TouchableOpacity>
        </View>

        {/* --- Menu Section --- */}
        <View style={styles.menuSection}>
          <MenuItem
            iconName="help-circle"
            text="Help & support"
            onPress={() => router.push('../account/help')}
          />
          <MenuItem
            iconName="file-text"
            text="Terms & conditions"
            onPress={() => router.push('../account/terms')}
          />
        </View>
      </View>
    </SafeAreaView>
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
    paddingTop: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  userPhone: {
    fontSize: 16,
    color: '#8A8A8E',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  actionButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    width: '100%',
  },
});

export default AccountScreen;
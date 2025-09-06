import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { router, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- Mock Notification Data ---
const notificationsData = [
  {
    id: 'n1',
    type: 'Pothole on Main Street',
    location: 'Jharkhand',
    date: '13 Aug 2025',
    status: 'Resolved',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'Broken streetlight',
    location: 'Jharkhand',
    date: '11 Aug 2025',
    status: 'Work Started',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'Tree',
    location: 'Jharkhand',
    date: '9 Aug 2025',
    status: 'Acknowledged',
    isRead: true, // Example of a read notification
  },
  {
    id: 'n4',
    type: 'Pothole on Main Street',
    location: 'Delhi',
    date: '5 Aug 2025',
    status: 'Report Pending',
    isRead: false,
  },
  {
    id: 'n5',
    type: 'Garbage spot',
    location: 'chatra',
    date: '23 July 2025',
    status: 'Invalid report',
    isRead: true,
  },
  {
    id: 'n6',
    type: 'Broken streetlight',
    location: 'giridih',
    date: '15 July 2025',
    status: 'Resolved',
    isRead: false,
  },
  {
    id: 'n7',
    type: 'Broken streetlight',
    location: 'Latehar',
    date: '19 Jan 2025',
    status: 'Resolved',
    isRead: false,
  },
];

// Helper to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'Resolved':
    case 'Work Started': // Green for positive/in progress
      return '#34A853'; // Green
    case 'Acknowledged':
      return '#4285F4'; // Blue
    case 'Report Pending':
    case 'Invalid report':
      return '#D93025'; // Red for negative/attention needed
    default:
      return '#777';
  }
};

const NotificationItem = ({ type, location, date, status, isRead }) => (
  <TouchableOpacity 
    style={[styles.notificationItem, isRead && styles.notificationItemRead]}
    onPress={() => Alert.alert("Notification Tapped", `Tapped on: ${type}`)}
  >
    <View style={styles.notificationContent}>
      <Text style={styles.notificationType}>{type}</Text>
      <Text style={styles.notificationLocation}>{location}</Text>
    </View>
    <View style={styles.notificationStatusContainer}>
      <Text style={styles.notificationDate}>{date}</Text>
      <Text style={[styles.notificationStatus, { color: getStatusColor(status) }]}>
        {status}
      </Text>
    </View>
  </TouchableOpacity>
);

const NotificationsScreen = ({ navigation }) => {
  const handleMarkAllAsRead = () => {
    Alert.alert("Mark All Read", "All notifications marked as read.", [{ text: "OK" }]);
    // In a real app, you would update your state or call an API here
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllAsRead}>
          <Text style={styles.markAllReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {notificationsData.map(notification => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            location={notification.location}
            date={notification.date}
            status={notification.status}
            isRead={notification.isRead}
          />
        ))}
        {/* You could add a "Load More" button here too, similar to ReportListScreen */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllReadText: {
    fontSize: 14,
    color: '#4285F4', 
    fontWeight: '500',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#FFF', 
  },
  notificationItemRead: {
    backgroundColor: '#F9F9F9', 
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notificationLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  notificationStatusContainer: {
    alignItems: 'flex-end',
  },
  notificationDate: {
    fontSize: 14,
    color: '#777',
  },
  notificationStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default NotificationsScreen;
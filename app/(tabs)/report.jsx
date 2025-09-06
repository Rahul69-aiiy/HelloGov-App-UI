import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Mock Data ---
// In a real app, this data would come from an API.
const allReportsData = [
  { id: '1', type: 'Pothole', location: 'Main Street', date: '13 Aug 2025', status: 'Resolved' },
  { id: '2', type: 'Streetlight Out', location: 'Park Ave', date: '11 Aug 2025', status: 'Resolved' },
  { id: '3', type: 'Garbage Dump', location: 'Elm Road', date: '9 Aug 2025', status: 'Acknowledged' },
  { id: '4', type: 'Illegal Parking', location: 'Downtown', date: '5 Aug 2025', status: 'Invalid Report' },
  { id: '5', type: 'Water Leak', location: 'Bridge Lane', date: '23 July 2025', status: 'Invalid Report' },
  { id: '6', type: 'Graffiti', location: 'Market Square', date: '15 July 2025', status: 'Resolved' },
  { id: '7', type: 'Road Damage', location: 'North Blvd', date: '10 July 2025', status: 'Acknowledged' },
  { id: '8', type: 'Broken Bench', location: 'City Park', date: '2 July 2025', status: 'Resolved' },
  { id: '9', type: 'Noise Complaint', location: 'Residential Area', date: '28 June 2025', status: 'Resolved' },
  { id: '10', type: 'Public Safety Issue', location: 'Central Station', date: '20 June 2025', status: 'Acknowledged' },
  { id: '11', type: 'Damaged Sidewalk', location: 'School Zone', date: '15 June 2025', status: 'Resolved' },
];

const ITEMS_PER_PAGE = 5; // Number of items to load at once

// --- Reusable Component for a Single Report Item ---
const ReportItem = ({ type, location, date, status }) => {
  let statusColor = '#34A853'; // Resolved
  if (status === 'Acknowledged') {
    statusColor = '#4285F4'; // Acknowledged (blue)
  } else if (status === 'Invalid Report') {
    statusColor = '#D93025'; // Invalid (red)
  }

  return (
    <View style={styles.reportItemContainer}>
      <View style={styles.reportDetails}>
        <Text style={styles.reportTypeText}>{type}</Text>
        <Text style={styles.reportLocationText}>{location}</Text>
      </View>
      <View style={styles.reportStatus}>
        <Text style={styles.reportDateText}>{date}</Text>
        <Text style={[styles.reportStatusText, { color: statusColor }]}>
          {status}
        </Text>
      </View>
    </View>
  );
};

const ReportListScreen = () => {
  const [displayedReports, setDisplayedReports] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMoreReports, setHasMoreReports] = useState(true);

  // Load initial reports when the component mounts
  useEffect(() => {
    loadMoreReports();
  }, []);

  const loadMoreReports = () => {
    const nextReports = allReportsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    
    setDisplayedReports(prevReports => [...prevReports, ...nextReports]);
    setStartIndex(prevIndex => prevIndex + nextReports.length);

    // Check if there are any more reports left in the allReportsData
    if (startIndex + nextReports.length >= allReportsData.length) {
      setHasMoreReports(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="map-marker-check" size={24} color="#34A853" />
        <Text style={styles.headerTitle}>Reports List</Text>
        <Icon name="search" size={24} color="#333" />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {displayedReports.length === 0 && !hasMoreReports ? (
          <Text style={styles.noReportsText}>No reports available</Text>
        ) : (
          displayedReports.map(report => (
            <ReportItem
              key={report.id}
              type={report.type}
              location={report.location}
              date={report.date}
              status={report.status}
            />
          ))
        )}

        {hasMoreReports && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreReports}>
            <Text style={styles.loadMoreButtonText}>Load more</Text>
          </TouchableOpacity>
        )}

        {!hasMoreReports && displayedReports.length > 0 && (
            <Text style={styles.noMoreReportsFooter}>No more reports available</Text>
        )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Allows title to take up available space
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  reportItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  reportDetails: {
    flex: 1,
  },
  reportTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reportLocationText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  reportStatus: {
    alignItems: 'flex-end',
  },
  reportDateText: {
    fontSize: 14,
    color: '#777',
  },
  reportStatusText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  loadMoreButton: {
    marginTop: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loadMoreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34A853', // Green color
  },
  noReportsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
  noMoreReportsFooter: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 14,
    color: '#999',
  },
});

export default ReportListScreen;
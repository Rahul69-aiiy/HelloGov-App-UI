import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import StatCard from '../../components/StatCard';
import { router, useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <View>
              <Image source={require('../../assets/images/app-logo.png')} style={{ width: 50, height: 50, borderRadius: 0}}/>
            </View>
            <Text style={styles.headerTitle}>HelloGov</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/notification')}>
            <Icon name="bell" size={24} color="#333"/>
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Hello, User</Text>

        {/* --- Location Selector --- */}
        <View style={styles.locationCard}>
          <Icon name="map-pin" size={20} color="#333" />
          <Text style={styles.locationText}>Jharkhand</Text>
          <Icon name="check-circle" size={20} color="#34A853" />
        </View>

        {/* --- Monthly Stats Section --- */}
        <Text style={styles.sectionTitle}>This month in Jharkhand</Text>
        <View style={styles.statsRow}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
            <StatCard icon="lightbulb-on" number="3540" label="Streetlights fixed" color="#c6e3edff" />
            <StatCard icon="road-variant" number="2345" label="Potholes fixed" color="#E8EAED" />
            <StatCard icon="trash-can-outline" number="1742" label="Garbage spots cleared" color="#FCE8E6" />
          </ScrollView>
        </View>

        {/* --- User Report Summary --- */}
        <View style={styles.reportSummaryCard}>
          <View style={styles.summaryIconContainer}>
            <Icon name="check" size={24} color="#FFF" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>You're reported 5 issues</Text>
            <View style={styles.summaryStatus}>
              <View style={[styles.statusDot, { backgroundColor: '#34A853' }]} />
              <Text style={styles.statusText}>4 Resolved</Text>
              <View style={[styles.statusDot, { backgroundColor: '#4285F4', marginLeft: 15 }]} />
              <Text style={styles.statusText}>1 in progress</Text>
            </View>
          </View>
        </View>

        {/* --- Report Validity Info --- */}
        <View style={styles.validityInfo}>
          <Icon name="alert-circle" size={22} color="#D93025" />
          <Text style={styles.validityText}>
            <Text style={{ fontWeight: 'bold' }}>5 out of 7</Text> of your reports were valid. 2 were flagged as invalid.
          </Text>
        </View>
        
        {/* --- Map Section --- */}
        <View style={styles.mapContainer}>
          {/* In a real app, you would use a component like react-native-maps here */}
          <Image
            source={ require('../../assets/images/map.png')} // Using a placeholder image for the map
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.mapLabel}>Issues reported near you</Text>

        {/* --- Action Buttons --- */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={()=>router.push('../addreport')}>
            <Icon name="camera" size={24} color="#333" />
            <Text style={styles.actionButtonText}>Report an Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={()=>router.push('report')}>
            <Icon name="database" size={24} color="#333" />
            <Text style={styles.actionButtonText}>Track my Reports</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d9e9e6',
  },
  container: {
    padding: 20,
    paddingBottom: 80, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F7A5E',
    marginBottom: 20,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  locationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  reportSummaryCard: {
    backgroundColor: '#E6F4FF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  summaryTextContainer: {},
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#555',
  },
  validityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  validityText: {
    flex: 1,
    marginLeft: 10,
    color: '#555',
    fontSize: 14,
  },
  mapContainer: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapLabel: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    marginBottom: 20,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 5, 
    paddingTop: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});

export default HomeScreen;
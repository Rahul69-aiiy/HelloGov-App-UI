import { View, Text, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const StatCard = ({ icon, number, label, color, iconSet = 'MaterialCommunityIcons' }) => {
  const IconComponent = iconSet === 'Feather' ? Feather : MaterialCommunityIcons;

  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <IconComponent name={icon} size={28} color="#333" />
      <Text style={styles.statCardNumber}>{number}</Text>
      <Text style={styles.statCardLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    width: 120,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statCardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statCardLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default StatCard;

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

// Data for the FAQ section. Easy to add/remove items here.
const faqData = [
  {
    question: 'How do I report an issue?',
    answer:
      'Tap “Report an Issue,” take a photo, and confirm your location. Add a short description before submitting.',
  },
  {
    question: 'Can I edit my report after submitting?',
    answer:
      'You can add more photos or comments, but the main details (category/location) cannot be changed.',
  },
  {
    question: 'What if my report is marked invalid?',
    answer:
      'Reports may be flagged if they are duplicates, unclear, or fake. You can re-submit with better details.',
  },
  {
    question: 'Can I report anonymously?',
    answer:
      "Yes. You may hide your name, but you'll get limited updates.",
  },
  {
    question: 'How will I know if my issue is resolved?',
    answer:
      'You’ll see updates in your “My Reports” section and may receive before/after photos.',
  },
];

// A small component to render each FAQ item.
const FaqItem = ({ question, answer }) => (
  <View style={styles.faqItem}>
    <Text style={styles.question}>{`\u2022 ${question}`}</Text>
    <Text style={styles.answer}>{answer}</Text>
  </View>
);

const HelpScreen = () => {
  const handleEmailPress = () => {
    // This will open the user's default email app
    Linking.openURL('mailto:support@hellogov.in?subject=Help and Support Request');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.faqTag}>
          <Text style={styles.faqTagText}>Quick FAQs</Text>
        </View>

        {/* Map over the data to display each FAQ item */}
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}

        <View style={styles.supportSection}>
          <Text style={styles.supportLabel}>Email Support:</Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.supportEmail}>support@hellogov.in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 25,
  },
  faqTag: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  faqTagText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  faqItem: {
    marginBottom: 25,
  },
  question: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  answer: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, 
    paddingLeft: 10, 
  },
  supportSection: {
    marginTop: 30, 
  },
  supportLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D93025', 
    marginBottom: 5,
  },
  supportEmail: {
    fontSize: 16,
    color: '#333',
  },
});

export default HelpScreen;
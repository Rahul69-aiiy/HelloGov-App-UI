import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

// Content is stored in an array for easy management.
const termsContent = [
  {
    type: 'heading',
    text: 'Acceptance of Terms',
  },
  {
    type: 'paragraph',
    text: 'By downloading, installing, or using HelloGov, you agree to these Terms & Conditions. If you do not agree, please do not use the App.',
  },
  {
    type: 'heading',
    text: 'Purpose of the App',
  },
  {
    type: 'paragraph',
    text: 'HelloGov is a platform that enables citizens to report civic issues such as potholes, broken streetlights, garbage, or other public concerns. The App allows users to submit reports, track their status, and receive updates from the concerned municipal departments.',
  },
  {
    type: 'heading',
    text: 'User Responsibilities',
  },
  {
    type: 'bullet',
    text: 'You agree to provide truthful, accurate, and relevant reports.',
  },
  {
    type: 'bullet',
    text: 'You must not submit false, misleading, abusive, or offensive reports.',
  },
  {
    type: 'bullet',
    text: 'You are solely responsible for the photos, descriptions, voice notes, and any other content you upload.',
  },
  {
    type: 'bullet',
    text: 'Misuse of the platform, including repeated fake reports, may result in suspension of your account.',
  },
  {
    type: 'heading',
    text: 'Content Ownership and License',
  },
  {
    type: 'paragraph',
    text: 'You retain ownership of the content you submit (photos, descriptions, etc.).',
  },
  {
    type: 'bullet',
    text: 'By submitting content, you grant HelloGov a non-exclusive, royalty-free license to use, display, reproduce, and share your content for the purpose of verifying, processing, and resolving reports.',
  },
  {
    type: 'bullet',
    text: 'HelloGov may also use anonymized and aggregated data for analytics, research, and improving our services.',
  },
  {
    type: 'heading',
    text: 'Data & Location Usage',
  },
  {
    type: 'paragraph',
    text: 'HelloGov uses your location only to accurately mark the issue you are reporting. You may choose to adjust the map pin manually before submission.',
  },
  {
    type: 'bullet',
    text: 'You may report anonymously, but certain features (like notifications) may be limited.',
  },
  {
    type: 'bullet',
    text: 'Your personal data will be handled in accordance with our Privacy Policy.',
  },
  {
    type: 'heading',
    text: 'Verification & Moderation',
  },
  {
    type: 'paragraph',
    text: 'All reports are subject to verification by the HelloGov system or municipal staff. Duplicate, invalid, or fake reports may be flagged or merged with existing reports. HelloGov reserves the right to remove or reject any inappropriate or irrelevant content.',
  },
  {
    type: 'heading',
    text: 'Notifications & Communication',
  },
  {
    type: 'paragraph',
    text: 'By using the App, you agree to receive notifications about the progress of your reports. You may opt-out of promotional or non-essential notifications in your settings.',
  },
  {
    type: 'heading',
    text: 'Limitation of Liability',
  },
  {
    type: 'paragraph',
    text: 'HelloGov is a reporting and tracking platform only. We do not guarantee immediate resolution of issues. The responsibility for fixing reported issues lies with the relevant municipal authorities. HelloGov is not liable for delays, non-resolution, or actions/inactions by government departments.',
  },
  {
    type: 'heading',
    text: 'Prohibited Activities',
  },
  {
    type: 'paragraph',
    text: 'You must not:',
  },
  {
    type: 'bullet',
    text: 'Use the App for unlawful purposes.',
  },
  {
    type: 'bullet',
    text: 'Submit false, spam, or abusive content.',
  },
  {
    type: 'bullet',
    text: 'Attempt to hack, disrupt, or misuse HelloGov’s services.',
  },
  {
    type: 'heading',
    text: 'Changes to Terms',
  },
  {
    type: 'paragraph',
    text: 'HelloGov may update these Terms & Conditions from time to time. Users will be notified of any significant changes. Continued use of the App constitutes acceptance of the revised terms.',
  },
  {
    type: 'heading',
    text: 'Governing Law',
  },
  {
    type: 'paragraph',
    text: 'These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts located in New Delhi, India.',
  },
  {
    type: 'heading',
    text: 'Contact Us',
  },
  {
    type: 'paragraph',
    text: 'For questions about these Terms, please contact us at:\nsupport@hellogov.in',
  },
];

const TermsAndConditionsScreen = () => {
  let headingCount = 0; // To keep track of the numbered list

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {termsContent.map((item, index) => {
          switch (item.type) {
            case 'heading':
              headingCount++;
              return (
                <Text key={index} style={styles.heading}>
                  {`${headingCount}. ${item.text}`}
                </Text>
              );
            case 'bullet':
              return (
                <Text key={index} style={styles.bullet}>
                  {`\u2022  ${item.text}`}
                </Text>
              );
            default:
              return (
                <Text key={index} style={styles.paragraph}>
                  {item.text}
                </Text>
              );
          }
        })}
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
  headerPill: {
    backgroundColor: '#004A7F', 
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  headerPillText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#555',
    lineHeight: 23,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 15,
    color: '#555',
    lineHeight: 23,
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default TermsAndConditionsScreen;
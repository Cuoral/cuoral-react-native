import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
// Import directly from your library
import { CuoralLauncher } from 'cuoral-react-native';

const App = () => {
  const PUBLIC_KEY = 'YOUR_CUORAL_PUBLIC_KEY'; // Replace with your actual key

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.appContainer}>
        <Text style={styles.appTitle}>Cuoral Integration Test App</Text>
        <Text style={styles.appBody}>
          Tap the chat bubble to launch the Cuoral widget.
        </Text>
      </View>

      <CuoralLauncher
        publicKey={PUBLIC_KEY}
        email="testuser@example.com"
        firstName="John"
        lastName="Doe"
        backgroundColor="purple"
        icon={
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
            💬
          </Text>
        }
        isVisible={true}
        position="bottomRight"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  appBody: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default App;

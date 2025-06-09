## Cuoral React Native

**Cuoral React Native Customer Interaction SDK**  
Integrate the Cuoral chat widget into your React Native applications.

This SDK provides a convenient way to embed the Cuoral chat experience directly into your mobile app, allowing your users to interact with your support team or AI assistant seamlessly.

---

## 📦 Installation

To install the Cuoral React Native SDK, run the following command in your project's root directory:

```bash
npm install cuoral-react-native react-native-webview
# or with yarn
yarn add cuoral-react-native react-native-webview
````

> **Note:**
> This library relies on `react-native-webview`. Ensure it is installed as a direct dependency in your project.

For iOS:

```bash
cd ios && pod install && cd ..
```

---

## 🚀 Usage

The `cuoral-react-native` library provides the `CuoralLauncher` component, which you can use to display a floating action button (FAB) that opens the Cuoral chat widget in a modal.

### 🧩 Basic Integration

```tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { CuoralLauncher } from 'cuoral-react-native'; // Import the launcher component

const App = () => {
  const YOUR_PUBLIC_KEY = 'YOUR_CUORAL_PUBLIC_KEY'; // Replace with your actual public key

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.appContainer}>
        <Text style={styles.appTitle}>My Awesome App</Text>
        <Text style={styles.appBody}>
          Tap the chat bubble to connect with Cuoral support.
        </Text>
      </View>

      <CuoralLauncher
        publicKey={YOUR_PUBLIC_KEY}
        // Optional user information:
        // email="user@example.com"
        // firstName="Jane"
        // lastName="Doe"

        // Optional UI customization:
        // backgroundColor="purple"
        // icon={<Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>💬</Text>}
        // isVisible={true}
        // position="bottomRight"
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
```

---

## 🔧 CuoralLauncher Props

| Prop Name         | Type              | Default                | Description                                                                         |
| ----------------- | ----------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| `publicKey`       | `string`          | **Required**           | Your unique public key from Cuoral.                                                 |
| `email`           | `string?`         | `undefined`            | Optional: User's email address to pre-fill in the Cuoral chat.                      |
| `firstName`       | `string?`         | `undefined`            | Optional: User's first name to pre-fill in the Cuoral chat.                         |
| `lastName`        | `string?`         | `undefined`            | Optional: User's last name to pre-fill in the Cuoral chat.                          |
| `backgroundColor` | `string`          | `#2196F3`              | Optional: FAB background color (any valid CSS color string).                        |
| `icon`            | `React.ReactNode` | 💬 (`<Text>💬</Text>`) | Optional: The icon component to display on the FAB.                                 |
| `isVisible`       | `boolean`         | `true`                 | Optional: Controls FAB visibility.                                                  |
| `position`        | `string`          | `'bottomRight'`        | Optional: FAB position: `'bottomRight'`, `'topRight'`, `'topLeft'`, `'bottomLeft'`. |

---

## 🤝 Contributing

See the contributing guide to learn how to contribute to the repository and the development workflow.

---

## 📄 License

MIT

---

> Made with ❤️ using [create-react-native-library]

```

// CuoralWidget.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Linking, // For handling external links
} from 'react-native';
import { WebView } from 'react-native-webview';
// import { PERMISSIONS, request } from 'react-native-permissions'; // Uncomment and install if needing explicit permission requests

/**
 * CuoralWidget component embeds the Cuoral chat interface using a WebView.
 * It handles loading states and displays error messages if the WebView fails to load.
 *
 * @param {object} props - The component props.
 * @param {string} props.publicKey - Your public key for the Cuoral widget.
 * @param {string} [props.firstName] - Optional: User's first name.
 * @param {string} [props.lastName] - Optional: User's last name.
 * @param {string} [props.email] - Optional: User's email.
 * @param {boolean} [props.showWidget=true] - Optional: Whether the widget should be rendered. Defaults to true.
 */
const CuoralWidget = ({
  publicKey,
  firstName,
  lastName,
  email,
  showWidget = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Basic validation for publicKey
  useEffect(() => {
    if (!publicKey || publicKey.trim() === '') {
      setErrorMessage('publicKey must not be empty.');
    } else {
      setErrorMessage(null); // Clear error if publicKey is valid
    }
  }, [publicKey]);

  // Construct the URL for the WebView
  const getCuoralUri = () => {
    if (!publicKey || publicKey.trim() === '') {
      return null; // Don't construct URL if public key is missing
    }

    // Base URL for the Cuoral mobile widget
    const baseUrl = 'https://js.cuoral.com/mobile.html';
    const params = new URLSearchParams();

    params.append('auto_display', 'true');
    params.append('key', publicKey);
    if (email) params.append('email', email);
    if (firstName) params.append('first_name', firstName);
    if (lastName) params.append('last_name', lastName);

    return `${baseUrl}?${params.toString()}`;
  };

  const cuoralUri = getCuoralUri();

  // If showWidget is false or public key is invalid, don't render the WebView
  if (!showWidget || errorMessage) {
    return (
      <View style={styles.errorContainer}>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        {!showWidget && !errorMessage && <View />}{' '}
        {/* Render nothing if just hidden */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* WebView for Cuoral chat */}
      <WebView
        source={{ uri: cuoralUri }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={false} // Generally recommended for security
        mediaPlaybackRequiresUserGesture={false} // Allow autoplay for media
        // Handles loading state changes
        onLoadStart={() => {
          setIsLoading(true);
          setErrorMessage(null); // Clear previous errors on new load
        }}
        onLoadEnd={() => setIsLoading(false)}
        // Handles errors during WebView load
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setIsLoading(false);
          setErrorMessage(
            `Error loading Cuoral widget: ${nativeEvent.description} (Code: ${nativeEvent.code})`
          );
          console.error('WebView Error:', nativeEvent);
        }}
        // Handles HTTP errors
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setIsLoading(false);
          setErrorMessage(
            `HTTP Error: ${nativeEvent.statusCode} - ${nativeEvent.description}`
          );
          console.error('WebView HTTP Error:', nativeEvent);
        }}
        // Handles navigation changes (e.g., if a link in the WebView tries to open externally)
        onShouldStartLoadWithRequest={(request) => {
          // Check if the URL is trying to navigate away from the Cuoral domain
          if (
            request.url.startsWith('https://js.cuoral.com/') ||
            request.url.startsWith('about:blank')
          ) {
            return true; // Allow navigation within the Cuoral domain or internal
          }
          // For any other URL, open it externally in the browser
          Linking.openURL(request.url);
          return false; // Prevent WebView from loading the external URL
        }}
        // onPermissionRequest: This is more complex in React Native WebView and usually
        // requires direct native module bridging for fine-grained control over permissions
        // like geolocation, camera, etc. For basic geolocation, the system's permission
        // dialog might appear automatically if requested by the web content.
        // For advanced handling, you might need a custom native module.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white', // Background of the widget itself
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent', // Allow background to show through if web content is transparent
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white loading screen
    zIndex: 10, // Ensure it's on top of the WebView
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CuoralWidget;

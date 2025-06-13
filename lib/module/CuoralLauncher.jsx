// CuoralLauncher.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  SafeAreaView, // For proper handling of screen safe areas
} from 'react-native';
import CuoralWidget from './CuoralWidget'; // Import the CuoralWidget component

const { width, height } = Dimensions.get('window');

/**
 * CuoralLauncher component provides a floating action button (FAB)
 * that, when pressed, launches a modal containing the Cuoral chat widget.
 * It mimics the Flutter CuoralLauncher's functionality and styling.
 *
 * @param {object} props - The component props.
 * @param {string} props.publicKey - Your public key for the Cuoral widget.
 * @param {string} [props.email] - Optional: User's email to pre-fill in Cuoral.
 * @param {string} [props.firstName] - Optional: User's first name to pre-fill in Cuoral.
 * @param {string} [props.lastName] - Optional: User's last name to pre-fill in Cuoral.
 * @param {string} [props.backgroundColor='#2196F3'] - Optional: Background color of the FAB. Defaults to blueAccent.
 * @param {React.ReactNode} [props.icon] - Optional: Icon element to display on the FAB. Defaults to a chat icon.
 * @param {boolean} [props.isVisible=true] - Optional: Whether the FAB is visible. Defaults to true.
 * @param {string} [props.position='bottomRight'] - Optional: Position of the FAB. 'bottomRight', 'topRight', 'topLeft', 'bottomLeft'.
 */
const CuoralLauncher = ({
  publicKey,
  email,
  firstName,
  lastName,
  backgroundColor = '#2196F3', // Default to Material blueAccent
  icon = <Text style={{ color: 'white', fontSize: 24 }}>💬</Text>, // Default chat emoji icon
  isVisible = true,
  position = 'bottomRight',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // If the launcher is not visible, render nothing
  if (!isVisible) {
    return null;
  }

  // Determine the FAB position based on the 'position' prop
  const getFABPositionStyle = () => {
    switch (position) {
      case 'bottomRight':
        return { bottom: 30, right: 20 };
      case 'topRight':
        return { top: 30, right: 20 };
      case 'topLeft':
        return { top: 30, left: 20 };
      case 'bottomLeft':
        return { bottom: 30, left: 20 };
      default:
        return { bottom: 30, right: 20 }; // Default to bottom-right
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor }, getFABPositionStyle()]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7} // Reduce opacity slightly on press
      >
        {icon}
      </TouchableOpacity>

      {/* Cuoral Chat Modal */}
      <Modal
        animationType="fade" // Fade in/out effect for the modal
        transparent={true} // Allows background to be seen through
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.modalOverlay}>
          {/* Tap outside to close modal */}
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            {/* Prevents tap inside the content from closing the modal */}
            <TouchableOpacity
              style={styles.modalContentWrapper}
              activeOpacity={1} // Prevent inner touch from closing the modal
            >
              <View style={styles.modalContent}>
                {/* Cuoral Chat Widget */}
                <CuoralWidget
                  publicKey={publicKey}
                  email={email}
                  firstName={firstName}
                  lastName={lastName}
                  showWidget={true} // Always true when inside the modal
                />

                {/* Close Button for the modal */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>✖</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    borderRadius: 30, // Make it circular
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 50,
    width: '100%', // Take full width within overlay
    height: '100%', // Adjust height to fit inside the padding
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1, // Allow content to expand
    width: '100%', // Max width of the modal content
    maxWidth: width * 0.95, // Limit width for larger screens
    maxHeight: height * 0.9, // Limit height for larger screens
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 15, // Higher Android shadow for the modal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    overflow: 'hidden', // Clip content to rounded corners
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)', // Slightly transparent background for visibility
    borderRadius: 15, // Circular button
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure close button is above the WebView
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default CuoralLauncher;

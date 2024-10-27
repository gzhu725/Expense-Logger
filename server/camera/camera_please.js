import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const CameraComponent = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [scannedImage, setScannedImage] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCapture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setScannedImage(photo.uri);
            // Optionally send the image to an API
            uploadImage(photo.uri);
        }
    };

    const uploadImage = async (uri) => {
        const formData = new FormData();
        formData.append('file', {
            uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await axios.post('YOUR_API_ENDPOINT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload response:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={cameraRef} type={cameraType}>
                <View style={styles.buttonContainer}>
                    <Button title="Capture" onPress={handleCapture} />
                </View>
            </Camera>
            {scannedImage && (
                <Image source={{ uri: scannedImage }} style={styles.imagePreview} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
        width: 300,
        height: 400,
        marginTop: 20,
    },
});

export default CameraComponent;

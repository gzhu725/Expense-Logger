import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    ImageSourcePropType
} from 'react-native';
import { Camera } from 'expo-camera';
import { CameraCapturedPicture } from 'expo-camera';
import axios from 'axios';

import { useCamera, ICamera } from './camera/useCamera';
import { OCR_API_KEY } from './env';

export default function App() {
    const camera = useCamera();

    return (
        <View style={styles.container}>
            {camera.permissionStatus === 'granted' && (
                <CameraContainer camera={camera} />
            )}
        </View>
    );
}

function CameraContainer({ camera }: { camera: ICamera }) {
    let cameraRef = useRef<typeof Camera | null>(null);
    const [
        imagePreview,
        setImagePreview
    ] = useState<ImageSourcePropType | null>(null);
    const [imageText, setImageText] = useState('');

    const setCameraRef = (c: typeof Camera) => (cameraRef.current = c);

    const takePic = async () => {
        if (cameraRef) {
            const picture = await cameraRef.current!.takePictureAsync({ base64: true, quality: 0.1 });
            setImagePreview(picture);
            extractTextFromPicture(picture);
            handlePicture(picture);
        }
    };

    const extractTextFromPicture = async (picture: CameraCapturedPicture) => {
        const data = new FormData();
        data.append('base64Image', 'data:image/jpeg;base64,' + picture.base64!);

        const response = await axios.post(
            'https://api.ocr.space/parse/image',
            data,
            { headers: { apikey: OCR_API_KEY } }
        );

        if (response.status == 200) {
            setImageText(response.data.ParsedResults[0].ParsedText);
        }
    };

    const handlePicture = (picture: CameraCapturedPicture) => {
        // handle picture
    };

    return (
        <View>
            <Camera
                style={{ height: 300, width: 300 }}
                type={camera.cameraType}
                ref={setCameraRef}
            />
            <TouchableOpacity onPress={camera.toggleCameraType}>
                <Text>Switch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={takePic}
                style={{ width: 80, height: 80, backgroundColor: 'red' }}
            >
                <Text>Oh SNAP</Text>
            </TouchableOpacity>
            {!!imageText && <Text>{imageText}</Text>}
            {!!imagePreview && (
                <Image
                    source={imagePreview}
                    style={{ height: 50, width: 50 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

import { useEffect, useRef, useState } from 'react'
import './App.css'

function UserApp({ back }) {
  const [complaint, setComplaint] = useState('')
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const [cameraOpen, setCameraOpen] = useState(false)
  const [photo, setPhoto] = useState(null)

  const [video, setVideo] = useState(null)
  const [recording, setRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  // =========================
  // USER DETAILS
  // =========================

  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const recordedChunksRef = useRef([])
  const timerRef = useRef(null)

  const [language, setLanguage] = useState('en')

  // =========================
  // THEME
  // =========================

  const [darkMode, setDarkMode] = useState(false)

  // =========================
  // BACKEND API
  // =========================

  const API_URL = 'http://10.26.169.223:8000/api/complaints'

  // =========================
  // LANGUAGES
  // =========================

  const translations = {
    en: {
      appName: 'Samagra Mysuru',
      subtitle: 'Civic Well-being • Smart Routing',
      system: 'Samagra Civic System',
      status: 'Routing System',

      eyebrow: 'CIVIC GOVERNANCE & CLEAN MYSURU',
      title: 'Report a problem.',
      titleHighlight: "We'll connect it to the right authority.",
      description:
        'Report civic issues across Mysuru. Samagra Mysuru connects every complaint to the right authority using location-based smart routing.',

      complaint: 'New Civic Complaint',
      complaintHelp: 'Describe the issue and capture its location.',

      userName: 'Your Name',
      userNamePlaceholder: 'Enter your name',
      phoneNumber: 'Phone Number',
      phonePlaceholder: 'Enter 10-digit mobile number',

      descriptionLabel: 'What is the problem?',
      complaintPlaceholder:
        'Example: Garbage has not been collected from our street...',

      photoEvidence: 'Photo evidence',
      photo: '📷 Capture Fresh Photo',
      capturePhoto: '● Capture Photo',
      freshPhoto: '✓ Fresh photo captured',

      videoEvidence: 'Video evidence',
      video: '🎥 Record Video',
      freshVideo: '✓ Fresh video recorded',
      recording: 'Recording',
      stopRecording: '■ Stop Recording',

      cancel: 'Cancel',
      retake: 'Retake',

      locationLabel: 'Problem location',
      useLocation: 'Use your current location',
      gpsCaptured: '✓ GPS captured',
      latitude: 'Latitude',
      longitude: 'Longitude',
      accuracy: 'Accuracy',
      metres: 'metres',

      submit: 'Find Responsible Authority',
      submitting: 'Finding Responsible Authority...',

      routingResult: 'ROUTING RESULT',
      resultAuthority: 'Responsible Authority',
      resultType: 'Jurisdiction matched',
      resultMessage:
        'Your complaint location has been matched with the responsible administrative jurisdiction.',

      confidence: 'Confidence',
      reason: 'Reason',
      jurisdiction: 'Jurisdiction',
      authorityType: 'Authority Type',
      jurisdictionVersion: 'Boundary Version',
      manualReview: 'Manual Review',

      howItWorks: 'HOW IT WORKS',
      howTitle: 'Fresh evidence. Accurate location. Correct routing.',

      capture: 'Capture',
      captureText:
        'Take a fresh photo or video of the civic issue directly through the camera.',

      locate: 'Locate',
      locateText:
        'Capture GPS coordinates and the accuracy of the location.',

      route: 'Route',
      routeText:
        'Match the location against jurisdiction boundaries and route the complaint.',

      footerLeft: 'HackCrank Civic Routing',
      footerRight: 'Mysuru • Phase 1 MVP',

      cameraPermission:
        'Camera access was not allowed. Please allow camera permission and try again.',
      cameraMicPermission:
        'Camera or microphone access was not allowed. Please allow permission and try again.',
      locationNotSupported:
        'Geolocation is not supported by your browser.',
      locationPermission:
        'Unable to get your location. Please allow location access.',

      nameRequired: 'Please enter your name.',
      phoneRequired: 'Please enter a valid 10-digit phone number.',
      complaintRequired: 'Please describe the civic problem.',
      photoRequired: 'Please take a fresh photo of the problem.',
      locationRequired: 'Please capture your current location.',

      backendError:
        'Unable to connect to the routing server. Please make sure the backend is running.',
      routingError:
        'The routing service could not process this location. Please try again.'
    },

    kn: {
      appName: 'ಸಮಗ್ರ ಮೈಸೂರು',
      subtitle: 'ನಾಗರಿಕರ ಕಲ್ಯಾಣ • ಸ್ಮಾರ್ಟ್ ಮಾರ್ಗದರ್ಶನ',
      system: 'ಸಮಗ್ರ ನಾಗರಿಕ ವ್ಯವಸ್ಥೆ',
      status: 'ರೂಟಿಂಗ್ ವ್ಯವಸ್ಥೆ',

      eyebrow: 'ನಾಗರಿಕ ಆಡಳಿತ ಮತ್ತು ಸ್ವಚ್ಛ ಮೈಸೂರು',
      title: 'ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ.',
      titleHighlight: 'ಅದನ್ನು ಸರಿಯಾದ ಅಧಿಕಾರಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
      description:
        'ಮೈಸೂರಿನ ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ. ಸ್ಥಳ ಆಧಾರಿತ ಸ್ಮಾರ್ಟ್ ಮಾರ್ಗದರ್ಶನದ ಮೂಲಕ ನಿಮ್ಮ ದೂರನ್ನು ಸರಿಯಾದ ಅಧಿಕಾರಿಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.',

      complaint: 'ಹೊಸ ನಾಗರಿಕ ದೂರು',
      complaintHelp: 'ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ ಮತ್ತು ಅದರ ಸ್ಥಳವನ್ನು ದಾಖಲಿಸಿ.',

      userName: 'ನಿಮ್ಮ ಹೆಸರು',
      userNamePlaceholder: 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
      phoneNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      phonePlaceholder: '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',

      descriptionLabel: 'ಸಮಸ್ಯೆ ಏನು?',
      complaintPlaceholder:
        'ಉದಾಹರಣೆ: ನಮ್ಮ ರಸ್ತೆಯಿಂದ ಕಸವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗಿಲ್ಲ...',

      photoEvidence: 'ಫೋಟೋ ಸಾಕ್ಷ್ಯ',
      photo: '📷 ಹೊಸ ಫೋಟೋ ತೆಗೆಯಿರಿ',
      capturePhoto: '● ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ',
      freshPhoto: '✓ ಹೊಸ ಫೋಟೋ ಸೆರೆಹಿಡಿಯಲಾಗಿದೆ',

      videoEvidence: 'ವೀಡಿಯೊ ಸಾಕ್ಷ್ಯ',
      video: '🎥 ವೀಡಿಯೊ ರೆಕಾರ್ಡ್ ಮಾಡಿ',
      freshVideo: '✓ ಹೊಸ ವೀಡಿಯೊ ರೆಕಾರ್ಡ್ ಮಾಡಲಾಗಿದೆ',
      recording: 'ರೆಕಾರ್ಡಿಂಗ್',
      stopRecording: '■ ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',

      cancel: 'ರದ್ದುಮಾಡಿ',
      retake: 'ಮತ್ತೆ ತೆಗೆದುಕೊಳ್ಳಿ',

      locationLabel: 'ಸಮಸ್ಯೆಯ ಸ್ಥಳ',
      useLocation: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ',
      gpsCaptured: '✓ GPS ಸೆರೆಹಿಡಿಯಲಾಗಿದೆ',
      latitude: 'ಅಕ್ಷಾಂಶ',
      longitude: 'ರೇಖಾಂಶ',
      accuracy: 'ನಿಖರತೆ',
      metres: 'ಮೀಟರ್',

      submit: 'ಜವಾಬ್ದಾರಿಯುತ ಅಧಿಕಾರಿಯನ್ನು ಹುಡುಕಿ',
      submitting: 'ಜವಾಬ್ದಾರಿಯುತ ಅಧಿಕಾರಿಯನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',

      routingResult: 'ರೂಟಿಂಗ್ ಫಲಿತಾಂಶ',
      resultAuthority: 'ಜವಾಬ್ದಾರಿಯುತ ಪ್ರಾಧಿಕಾರ',
      resultType: 'ಆಡಳಿತಾತ್ಮಕ ಪ್ರದೇಶ ಹೊಂದಿಕೆಯಾಗಿದೆ',
      resultMessage:
        'ನಿಮ್ಮ ದೂರಿನ ಸ್ಥಳವನ್ನು ಜವಾಬ್ದಾರಿಯುತ ಆಡಳಿತಾತ್ಮಕ ಪ್ರದೇಶದೊಂದಿಗೆ ಹೊಂದಿಸಲಾಗಿದೆ.',

      confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
      reason: 'ಕಾರಣ',
      jurisdiction: 'ಆಡಳಿತಾತ್ಮಕ ಪ್ರದೇಶ',
      authorityType: 'ಅಧಿಕಾರದ ಪ್ರಕಾರ',
      jurisdictionVersion: 'ಗಡಿ ಆವೃತ್ತಿ',
      manualReview: 'ಹಸ್ತಚಾಲಿತ ಪರಿಶೀಲನೆ',

      howItWorks: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      howTitle: 'ಹೊಸ ಸಾಕ್ಷ್ಯ. ನಿಖರ ಸ್ಥಳ. ಸರಿಯಾದ ಮಾರ್ಗದರ್ಶನ.',

      capture: 'ಸೆರೆಹಿಡಿಯಿರಿ',
      captureText:
        'ಕ್ಯಾಮೆರಾ ಮೂಲಕ ನಾಗರಿಕ ಸಮಸ್ಯೆಯ ಹೊಸ ಫೋಟೋ ಅಥವಾ ವೀಡಿಯೊ ತೆಗೆದುಕೊಳ್ಳಿ.',

      locate: 'ಸ್ಥಳ ಗುರುತಿಸಿ',
      locateText:
        'GPS ನಿರ್ದೇಶಾಂಕಗಳು ಮತ್ತು ಸ್ಥಳದ ನಿಖರತೆಯನ್ನು ಸೆರೆಹಿಡಿಯಿರಿ.',

      route: 'ಮಾರ್ಗದರ್ಶನ',
      routeText:
        'ಸ್ಥಳವನ್ನು ಆಡಳಿತಾತ್ಮಕ ಗಡಿ ಪ್ರದೇಶಗಳೊಂದಿಗೆ ಹೊಂದಿಸಿ ಮತ್ತು ದೂರನ್ನು ಸರಿಯಾದ ಅಧಿಕಾರಿಗೆ ಕಳುಹಿಸಿ.',

      footerLeft: 'HackCrank Civic Routing',
      footerRight: 'ಮೈಸೂರು • ಹಂತ 1 MVP',

      cameraPermission:
        'ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಲಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಕ್ಯಾಮೆರಾ ಅನುಮತಿಯನ್ನು ನೀಡಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      cameraMicPermission:
        'ಕ್ಯಾಮೆರಾ ಅಥವಾ ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಲಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಅನುಮತಿಯನ್ನು ನೀಡಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      locationNotSupported:
        'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.',
      locationPermission:
        'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ.',

      nameRequired: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.',
      phoneRequired: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
      complaintRequired: 'ದಯವಿಟ್ಟು ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ.',
      photoRequired: 'ದಯವಿಟ್ಟು ಸಮಸ್ಯೆಯ ಹೊಸ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ.',
      locationRequired: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ.',

      backendError:
        'ರೂಟಿಂಗ್ ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಬ್ಯಾಕೆಂಡ್ ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.',
      routingError:
        'ರೂಟಿಂಗ್ ಸೇವೆಯಿಂದ ಈ ಸ್ಥಳವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
    },

    hi: {
      appName: 'समग्र मैसूरु',
      subtitle: 'नागरिक कल्याण • स्मार्ट रूटिंग',
      system: 'समग्र नागरिक प्रणाली',
      status: 'रूटिंग सिस्टम',

      eyebrow: 'नागरिक प्रशासन और स्वच्छ मैसूरु',
      title: 'समस्या की रिपोर्ट करें।',
      titleHighlight: 'हम इसे सही अधिकारी तक पहुँचाएंगे।',
      description:
        'मैसूरु की नागरिक समस्याओं की रिपोर्ट करें। स्थान-आधारित स्मार्ट रूटिंग आपकी शिकायत को सही अधिकारी तक पहुँचाने में मदद करती है।',

      complaint: 'नई नागरिक शिकायत',
      complaintHelp: 'समस्या का विवरण दें और उसका स्थान दर्ज करें.',

      userName: 'आपका नाम',
      userNamePlaceholder: 'अपना नाम दर्ज करें',
      phoneNumber: 'फ़ोन नंबर',
      phonePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',

      descriptionLabel: 'समस्या क्या है?',
      complaintPlaceholder:
        'उदाहरण: हमारी सड़क से कचरा एकत्र नहीं किया गया है...',

      photoEvidence: 'फोटो प्रमाण',
      photo: '📷 नई फोटो लें',
      capturePhoto: '● फोटो कैप्चर करें',
      freshPhoto: '✓ नई फोटो कैप्चर की गई',

      videoEvidence: 'वीडियो प्रमाण',
      video: '🎥 वीडियो रिकॉर्ड करें',
      freshVideo: '✓ नया वीडियो रिकॉर्ड किया गया',
      recording: 'रिकॉर्डिंग',
      stopRecording: '■ रिकॉर्डिंग रोकें',

      cancel: 'रद्द करें',
      retake: 'फिर से लें',

      locationLabel: 'समस्या का स्थान',
      useLocation: 'अपने वर्तमान स्थान का उपयोग करें',
      gpsCaptured: '✓ GPS कैप्चर किया गया',
      latitude: 'अक्षांश',
      longitude: 'देशांतर',
      accuracy: 'सटीकता',
      metres: 'मीटर',

      submit: 'जिम्मेदार अधिकारी खोजें',
      submitting: 'जिम्मेदार अधिकारी खोजा जा रहा है...',

      routingResult: 'रूटिंग परिणाम',
      resultAuthority: 'जिम्मेदार प्राधिकरण',
      resultType: 'क्षेत्राधिकार का मिलान हुआ',
      resultMessage:
        'आपकी शिकायत के स्थान का जिम्मेदार प्रशासनिक क्षेत्र से मिलान किया गया है।',

      confidence: 'विश्वास स्तर',
      reason: 'कारण',
      jurisdiction: 'क्षेत्राधिकार',
      authorityType: 'प्राधिकरण का प्रकार',
      jurisdictionVersion: 'सीमा संस्करण',
      manualReview: 'मैनुअल समीक्षा',

      howItWorks: 'यह कैसे काम करता है',
      howTitle: 'ताज़ा प्रमाण। सटीक स्थान। सही रूटिंग।',

      capture: 'कैप्चर करें',
      captureText:
        'कैमरे के माध्यम से नागरिक समस्या की नई फोटो या वीडियो लें।',

      locate: 'स्थान निर्धारित करें',
      locateText:
        'GPS निर्देशांक और स्थान की सटीकता कैप्चर करें।',

      route: 'रूट करें',
      routeText:
        'स्थान का मिलान क्षेत्राधिकार की सीमाओं से करें और शिकायत को सही अधिकारी तक पहुँचाएँ।',

      footerLeft: 'HackCrank Civic Routing',
      footerRight: 'मैसूरु • चरण 1 MVP',

      cameraPermission:
        'कैमरा एक्सेस की अनुमति नहीं दी गई। कृपया कैमरा अनुमति दें और फिर प्रयास करें।',
      cameraMicPermission:
        'कैमरा या माइक्रोफ़ोन एक्सेस की अनुमति नहीं दी गई। कृपया अनुमति दें और फिर प्रयास करें।',
      locationNotSupported:
        'आपका ब्राउज़र स्थान सेवा का समर्थन नहीं करता है।',
      locationPermission:
        'आपका स्थान प्राप्त नहीं किया जा सका। कृपया स्थान की अनुमति दें।',

      nameRequired: 'कृपया अपना नाम दर्ज करें।',
      phoneRequired: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।',
      complaintRequired: 'कृपया नागरिक समस्या का विवरण दें।',
      photoRequired: 'कृपया समस्या की नई फोटो लें।',
      locationRequired: 'कृपया अपना वर्तमान स्थान कैप्चर करें।',

      backendError:
        'रूटिंग सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि बैकएंड चल रहा है।',
      routingError:
        'रूटिंग सेवा इस स्थान को प्रोसेस नहीं कर सकी। कृपया फिर से प्रयास करें।'
    }
  }

  const t = translations[language]

  // =========================
  // PHOTO CAMERA
  // =========================

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        },
        audio: false
      })

      streamRef.current = stream
      setCameraOpen(true)

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      }, 100)
    } catch (error) {
      console.error(error)
      alert(t.cameraPermission)
    }
  }

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    setCameraOpen(false)
  }

  const capturePhoto = () => {
    const videoElement = videoRef.current

    if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
      alert('Camera is not ready yet. Please wait a moment and try again.')
      return
    }

    const canvas = document.createElement('canvas')

    const maxWidth = 1280
    const maxHeight = 720

    let width = videoElement.videoWidth
    let height = videoElement.videoHeight

    const scale = Math.min(
      maxWidth / width,
      maxHeight / height,
      1
    )

    width = Math.round(width * scale)
    height = Math.round(height * scale)

    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')

    if (!context) return

    context.drawImage(
      videoElement,
      0,
      0,
      width,
      height
    )

    // Keep the photo small enough for reliable browser upload.
    const image = canvas.toDataURL('image/jpeg', 0.55)

    console.log(
      'Captured photo size:',
      Math.round(image.length / 1024),
      'KB'
    )

    setPhoto(image)

    closeCamera()
  }
  const retakePhoto = () => {
    setPhoto(null)
    openCamera()
  }

  // =========================
  // VIDEO RECORDING
  // =========================

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        },
        audio: true
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      recordedChunksRef.current = []

      let mimeType = 'video/webm'

      if (
        MediaRecorder.isTypeSupported(
          'video/webm;codecs=vp8,opus'
        )
      ) {
        mimeType = 'video/webm;codecs=vp8,opus'
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType
      })

      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      // IMPORTANT:
      // Convert the recorded video into a Data URL.
      // The old code created a temporary blob URL which
      // could not be sent to the backend/database.
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: mimeType
        })

        const reader = new FileReader()

        reader.onloadend = () => {
          setVideo(reader.result)
        }

        reader.readAsDataURL(blob)

        stream.getTracks().forEach((track) => track.stop())

        streamRef.current = null
      }

      mediaRecorder.start()

      setRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((time) => time + 1)
      }, 1000)
    } catch (error) {
      console.error(error)
      alert(t.cameraMicPermission)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    }

    setRecording(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const retakeVideo = () => {
    setVideo(null)
    setRecordingTime(0)
  }

  // =========================
  // CLEANUP
  // =========================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop())
      }

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // =========================
  // GPS
  // =========================

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t.locationNotSupported)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
          accuracy
        } = position.coords

        setCoordinates({
          latitude,
          longitude,
          accuracy
        })

        setLocation(
          `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        )
      },
      () => {
        alert(t.locationPermission)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    )
  }

  // =========================
  // REAL BACKEND ROUTING
  // =========================

  const handleRouting = async (event) => {
    event.preventDefault()

    if (!userName.trim()) {
      alert(t.nameRequired)
      return
    }

    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      alert(t.phoneRequired)
      return
    }

    if (!complaint.trim()) {
      alert(t.complaintRequired)
      return
    }

    if (!photo) {
      alert(t.photoRequired)
      return
    }

    if (!coordinates) {
      alert(t.locationRequired)
      return
    }

    setLoading(true)
    setResult(null)

    // IMPORTANT:
    // Send ALL citizen submission data to the backend.
    const requestData = {
      issue_type: 'civic_complaint',
      description: complaint,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      gps_accuracy: coordinates.accuracy ?? null,
      complaint_date: new Date().toISOString().split('T')[0],

      citizen_name: userName,
      phone_number: phoneNumber,

      photo: photo,
      video: video || null
    }

    console.log('Sending complaint to backend:', {
      ...requestData,
      photo: photo ? '[PHOTO DATA]' : null,
      video: video ? '[VIDEO DATA]' : null
    })
    console.log(
      'Request payload size:',
      Math.round(JSON.stringify(requestData).length / 1024),
      'KB'
    )

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        const errorText = await response.text()

        console.error(
          'Backend error:',
          response.status,
          errorText
        )

        throw new Error(
          errorText ||
          `Backend returned HTTP ${response.status}`
        )
      }

      const data = await response.json()

      console.log('Backend response:', data)

      setResult({
        complaintId: data.complaint_id ?? null,

        authority:
          data.authority_name ||
          data.jurisdiction ||
          t.manualReview,

        type:
          data.authority_type ||
          t.resultType,

        message:
          data.jurisdiction_reason ||
          data.reason ||
          t.resultMessage,

        confidence:
          data.jurisdiction_confidence ??
          data.confidence ??
          null,

        jurisdiction:
          data.jurisdiction_id ||
          data.jurisdiction ||
          null,

        reason:
          data.jurisdiction_reason ||
          data.reason ||
          null,

        version:
          data.jurisdiction_version ??
          null
      })
    } catch (error) {
      console.error('Routing error:', error)

      alert(
        error.message ||
        t.backendError
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // UI
  // =========================

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>

      <header className="header">

        <div className="brand">

          <div className="brand-icon">🏛️</div>

          <div>
            <h1>{t.appName}</h1>

            <span>
              {t.system} • Mysuru
            </span>
          </div>

        </div>

        <div className="header-right">

          {/* HOME BUTTON */}

          <button
            type="button"
            className="citizen-home-button"
            onClick={back}
            title="Return to Home"
          >
            🏠 Home
          </button>

          {/* LANGUAGE SWITCHER */}

          <div className="language-switcher">

            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
              type="button"
            >
              EN
            </button>

            <button
              className={language === 'kn' ? 'active' : ''}
              onClick={() => setLanguage('kn')}
              type="button"
            >
              ಕನ್ನಡ
            </button>

            <button
              className={language === 'hi' ? 'active' : ''}
              onClick={() => setLanguage('hi')}
              type="button"
            >
              हिंदी
            </button>

          </div>

          {/* DARK MODE */}

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          {/* STATUS */}

          <div className="status">
            <span className="status-dot"></span>
            {t.status}
          </div>

        </div>

      </header>

      <main className="main">

        <section className="hero-section">

          <div className="hero-text">

            <p className="eyebrow">
              {t.eyebrow}
            </p>

            <h2>
              {t.title}
              <br />
              <span>{t.titleHighlight}</span>
            </h2>

            <p className="hero-description">
              {t.description}
            </p>

          </div>

          <div className="routing-card">

            <div className="card-header">

              <div>
                <h3>{t.complaint}</h3>
                <p>{t.complaintHelp}</p>
              </div>

              <div className="step-badge">
                01
              </div>

            </div>

            <form onSubmit={handleRouting}>

              {/* USER DETAILS */}

              <div className="form-group">

                <label htmlFor="userName">
                  {t.userName}
                </label>

                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(event) =>
                    setUserName(event.target.value)
                  }
                  placeholder={t.userNamePlaceholder}
                  autoComplete="name"
                />

              </div>

              <div className="form-group">

                <label htmlFor="phoneNumber">
                  {t.phoneNumber}
                </label>

                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) =>
                    setPhoneNumber(
                      event.target.value
                        .replace(/\D/g, '')
                        .slice(0, 10)
                    )
                  }
                  placeholder={t.phonePlaceholder}
                  inputMode="numeric"
                  maxLength="10"
                  autoComplete="tel"
                />

              </div>

              {/* COMPLAINT */}

              <label htmlFor="complaint">
                {t.descriptionLabel}
              </label>

              <textarea
                id="complaint"
                placeholder={t.complaintPlaceholder}
                value={complaint}
                onChange={(event) =>
                  setComplaint(event.target.value)
                }
                rows="5"
              />

              {/* PHOTO */}

              <label>
                {t.photoEvidence}
              </label>

              {!photo && !cameraOpen && (
                <button
                  type="button"
                  className="camera-button"
                  onClick={openCamera}
                >
                  {t.photo}
                </button>
              )}

              {cameraOpen && (
                <div className="camera-box">

                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="camera-preview"
                  />

                  <div className="camera-controls">

                    <button
                      type="button"
                      className="capture-button"
                      onClick={capturePhoto}
                    >
                      {t.capturePhoto}
                    </button>

                    <button
                      type="button"
                      className="cancel-camera"
                      onClick={closeCamera}
                    >
                      {t.cancel}
                    </button>

                  </div>

                </div>
              )}

              {photo && (
                <div className="photo-preview-box">

                  <img
                    src={photo}
                    alt={t.freshPhoto}
                  />

                  <div className="photo-actions">

                    <span>
                      {t.freshPhoto}
                    </span>

                    <button
                      type="button"
                      onClick={retakePhoto}
                    >
                      {t.retake}
                    </button>

                  </div>

                </div>
              )}

              {/* VIDEO */}

              <label>
                {t.videoEvidence}
              </label>

              {!video && !recording && (
                <button
                  type="button"
                  className="video-button"
                  onClick={startRecording}
                >
                  {t.video}
                </button>
              )}

              {recording && (
                <div className="camera-box">

                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="camera-preview"
                  />

                  <div className="recording-status">

                    <span className="recording-dot"></span>

                    {t.recording} {recordingTime}s

                  </div>

                  <button
                    type="button"
                    className="stop-recording-button"
                    onClick={stopRecording}
                  >
                    {t.stopRecording}
                  </button>

                </div>
              )}

              {video && (
                <div className="photo-preview-box">

                  <video
                    src={video}
                    controls
                    className="recorded-video"
                  />

                  <div className="photo-actions">

                    <span>
                      {t.freshVideo}
                    </span>

                    <button
                      type="button"
                      onClick={retakeVideo}
                    >
                      {t.retake}
                    </button>

                  </div>

                </div>
              )}

              {/* GPS */}

              <label htmlFor="location">
                {t.locationLabel}
              </label>

              <div className="location-row">

                <input
                  id="location"
                  type="text"
                  placeholder={t.useLocation}
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="location-button"
                  onClick={getCurrentLocation}
                  title={t.useLocation}
                >
                  📍
                </button>

              </div>

              {coordinates && (
                <div className="location-details">

                  <strong>
                    {t.gpsCaptured}
                  </strong>

                  <span>
                    {t.latitude}:{' '}
                    {coordinates.latitude.toFixed(6)}
                  </span>

                  <span>
                    {t.longitude}:{' '}
                    {coordinates.longitude.toFixed(6)}
                  </span>

                  <span>
                    {t.accuracy}: ±
                    {Math.round(coordinates.accuracy)}
                    {' '}
                    {t.metres}
                  </span>

                </div>
              )}

              {/* SUBMIT */}

              <button
                className="route-button"
                type="submit"
                disabled={loading}
              >
                {loading ? t.submitting : t.submit}
                <span>{loading ? '...' : '→'}</span>
              </button>

            </form>

          </div>

        </section>

        {/* ROUTING RESULT */}

        {result && (
          <section className="result-card">

            <div className="result-icon">
              ✓
            </div>

            <div className="result-content">

              <p className="result-label">
                {t.routingResult}
              </p>

              <h3>
                {result.authority}
              </h3>

              {/* COMPLAINT ID */}

              {result.complaintId && (
                <p>
                  <strong>Complaint ID:</strong>{' '}
                  {result.complaintId}
                </p>
              )}

              <p>
                {result.message}
              </p>

              <div className="result-tag">
                {result.type}
              </div>

              {result.jurisdiction && (
                <p>
                  <strong>{t.jurisdiction}:</strong>{' '}
                  {result.jurisdiction}
                </p>
              )}

              {result.confidence !== null &&
                result.confidence !== undefined && (
                  <p>
                    <strong>{t.confidence}:</strong>{' '}
                    {Math.round(
                      Number(result.confidence) * 100
                    )}
                    %
                  </p>
                )}

              {result.reason && (
                <p>
                  <strong>{t.reason}:</strong>{' '}
                  {result.reason}
                </p>
              )}

              {result.version !== null &&
                result.version !== undefined && (
                  <p>
                    <strong>{t.jurisdictionVersion}:</strong>{' '}
                    {result.version}
                  </p>
                )}

            </div>

          </section>
        )}

        {/* HOW IT WORKS */}

        <section className="how-it-works">

          <div className="section-title">

            <p className="eyebrow">
              {t.howItWorks}
            </p>

            <h3>
              {t.howTitle}
            </h3>

          </div>

          <div className="steps">

            <div className="info-step">

              <div className="number">
                01
              </div>

              <h4>
                {t.capture}
              </h4>

              <p>
                {t.captureText}
              </p>

            </div>

            <div className="info-step">

              <div className="number">
                02
              </div>

              <h4>
                {t.locate}
              </h4>

              <p>
                {t.locateText}
              </p>

            </div>

            <div className="info-step">

              <div className="number">
                03
              </div>

              <h4>
                {t.route}
              </h4>

              <p>
                {t.routeText}
              </p>

            </div>

          </div>

        </section>

      </main>

      <footer>

        <span>
          {t.footerLeft}
        </span>

        <span>
          {t.footerRight}
        </span>

      </footer>

    </div>
  )
}

export default UserApp
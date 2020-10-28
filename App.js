/**
 * Openmind test
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [beers, setBeers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [screenshotModalVisible, setScreenshotModalVisible] = useState(false);
  const [screenshotType, setScreenshotType] = useState(undefined);

  // Hooks

  // TODO: QUESTION 1 - WRITE HERE THE HOOK

  const _loadBeers = () => {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10')
        .then((response) => response.json())
        .then((json) => {
          setBeers(json);
        });
  };

  // Methods

  const _showQuestions = () => {
    setQuestionModalVisible(true);
  };

  const _showScreenshot = (screenshotType) => {
    setScreenshotType(screenshotType);
    setQuestionModalVisible(false);
    setScreenshotModalVisible(true);
  };

  const _closeScreenshotModal = () => {
    setScreenshotModalVisible(false);
    setQuestionModalVisible(true);
  };

  // Renderers

  const _renderHeader = () => {
    return (
        <View>
          <Image
              style={styles.openmindLogo}
              source={require('./assets/openmindLogo.png')}
          />
          <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
            Welcome to{'\n'}
            Openmind Test
          </Text>
          <TouchableWithoutFeedback onPress={() => _showQuestions()}>
            <Text style={styles.closeButton}>[ DOMANDE ]</Text>
          </TouchableWithoutFeedback>
        </View>
    );
  };

  const _renderQuestionsModal = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={questionModalVisible}
            onClose={() => setQuestionModalVisible(false)}
        >
          <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <ScrollView style={{padding: 20}}>
              <TouchableWithoutFeedback onPress={() => setQuestionModalVisible(false)}>
                <Text style={styles.closeButton}>[ CLOSE ]</Text>
              </TouchableWithoutFeedback>
              <Text style={styles.questionTitle}>HOW TO</Text>
              <Text>
                Puoi utilizzare qualunque risorsa messa a disposizione dalla libreria di react-native, non è necessario
                utilizzare risorse di altre librerie.
                {'\n'}
                Cerca 'TODO: QUESTION' nel codice per capire dove inserire il tuo codice ma puoi liberamente aggiungere
                qualunque altra property/state all'app per raggiungere l'obiettivo.
                {'\n'}
                Per qualunque dubbio chiedi.
              </Text>

              <Text style={styles.questionTitle}>Domanda 1:</Text>
              <Text>
                Scrivi un hook che, al caricamento dell'app, invochi il servizio per
                il caricamento dell'elenco delle birre (usa il metodo _loadBeers).
              </Text>

              <Text style={styles.questionTitle}>Domanda 2:</Text>
              <Text>
                Una volta caricato l'elenco delle birre mostrale nell'home page ricalcando la grafica dello screenshot 1.{'\n'}
                Le proprietà del json che ti servono sono le seguenti:{'\n'}
                - name{'\n'}
                - description{'\n'}
                - image_url
              </Text>
              <TouchableWithoutFeedback onPress={() => _showScreenshot('homepage')}>
                <Image
                    style={styles.openmindLogo}
                    source={require('./assets/screenshot_homepage.png')}
                />
              </TouchableWithoutFeedback>

              <Text style={styles.questionTitle}>Domanda 3:</Text>
              <Text>
                Facendo tap su una birra visualizza la modale con la scheda approfondita; la modale è già presente, il tuo compito
                è di farla aprire e disegnare la scheda prodotto ricalcando la grafica di screenshot 2.
                Le proprietà da utilizzare sono:
                - name{'\n'}
                - description{'\n'}
                - image_url{'\n'}
                - ibu{'\n'}
                - brewers_tips{'\n'}
                - food_pairing
              </Text>
              <TouchableWithoutFeedback onPress={() => _showScreenshot('productDetail')}>
                <Image
                    style={styles.openmindLogo}
                    source={require('./assets/screenshot_product_detail.png')}
                />
              </TouchableWithoutFeedback>
            </ScrollView>
          </SafeAreaView>
        </Modal>
    );
  };

  const _renderModal = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={{padding: 20}}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>[ CLOSE ]</Text>
              </TouchableWithoutFeedback>
              {/* TODO: QUESTION 3 - ADD PRODUCT DETALI CODE HERE */}
            </View>
          </SafeAreaView>
        </Modal>
    );
  };

  const _renderScreenshotModal = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={screenshotModalVisible}
        >
          <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={() => _closeScreenshotModal()}>
                <Text style={styles.closeButtonDark}>[ CLOSE ]</Text>
              </TouchableWithoutFeedback>
              {screenshotType === 'homepage' &&
              <Image
                  style={{width: Dimensions.get('window').width - 100, height: (Dimensions.get('window').width - 100) / 0.47}}
                  source={require('./assets/screenshot_homepage.png')}
              />
              }
              {screenshotType === 'productDetail' &&
              <Image
                  style={{width: Dimensions.get('window').width - 100, height: (Dimensions.get('window').width - 100) / 0.47}}
                  source={require('./assets/screenshot_product_detail.png')}
              />
              }
            </View>
          </SafeAreaView>
        </Modal>
    );
  };

  return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          {_renderHeader()}

          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
            {/*{beers.map((beer, index) => _renderBeer(beer, index))}*/}
            {/* TODO: QUESTION 2 - ADD BEER LIST CODE HERE */}
          </ScrollView>
          {_renderModal()}
          {_renderQuestionsModal()}
          {_renderScreenshotModal()}
        </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  openmindLogo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  questionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  closeButton: {
    textAlign: 'center',
    color: 'blue',
    margin: 20,
  },
  closeButtonDark: {
    textAlign: 'center',
    color: 'white',
    margin: 20,
  },
});

export default App;

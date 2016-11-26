import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Slider
} from 'react-native';

import {
  Components,
  ImagePicker,
} from 'exponent';

import { FontAwesome } from '@exponent/vector-icons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PopupDialog, { DialogTitle, SlideAnimation }  from 'react-native-popup-dialog';

import Debug from '../components/Debug';

import Layout from '../constants/Layout.js';
import Colors from '../constants/Colors.js';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

export default class AddFood extends React.Component {
  static route = {
    navigationBar: {
      title: 'Add Food',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      price: 0,
    };
  };

  changeValue = (key, data) => {
    this.setState({[key]: data});
  }

  openCamera = async () => {
		let result = await ImagePicker.launchCameraAsync({})
		.then(photo => {
			if (!photo.cancelled) {
				this.setState({ photo: photo.uri });
				// this.uploadToImgur(photo.uri);
				this.props.upload(photo.uri);
			} else {
				null
			}
		})
		.catch(error => alert(error.message));
	}

	openGallery = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({})
		.then(photo => {
			if (!photo.cancelled) {
				this.setState({ photo: photo.uri });
				// this.uploadToImgur(photo.uri);
				this.props.upload(photo.uri);
			} else {
				null
			}
		})
		.catch(error => alert(error.message));
	}

  render() {
    return (
      <View>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Debug state={this.state} />
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: 'https://storybookstorage.s3.amazonaws.com/items/images/000/134/326/original/english.jpg' }} />
            <Components.LinearGradient
              colors={['#F8964E', '#F8AE50']}
              style={styles.camera}>
              <TouchableOpacity
                onPress={() => {
                  this.popupDialog.openDialog();
                } }>
                <FontAwesome name="camera" size={32} color="white" style={styles.iconCamera} />
              </TouchableOpacity>
            </Components.LinearGradient>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <FloatLabelTextInput
                placeholder={"Food Name"}
                underlineColorAndroid='transparent'
                onChangeTextValue={(e) => this.changeValue('foodName', e)}
                />
            </View>
            <View style={styles.form}>
              <FloatLabelTextInput
                placeholder={"Restaurant Name"}
                underlineColorAndroid='transparent'
                onChangeTextValue={(e) => this.changeValue('restaurantName', e)}
                />
            </View>
            <View style={styles.slider}>
              <Text style={styles.sliderText}>Average Price Per Person - RM{this.state.price}</Text>
              <Slider
                step={10}
                maximumValue={500}
                onValueChange={(e) => this.changeValue('price', e)} />
            </View>
            <View style={styles.locationContainer}>
              <FontAwesome name="location-arrow" size={32} color="grey" style={styles.iconLocation} />
              <View style={styles.formLocation}>
                <FloatLabelTextInput
                  placeholder={"Location"}
                  underlineColorAndroid='transparent'
                  onChangeTextValue={(e) => this.changeValue('location', e)}
                  />
              </View>
            </View>
          </View>
          <Components.LinearGradient
            colors={['#F8964E', '#F8AE50']}
            style={styles.submit}>
            <TouchableOpacity onPress={this._onPressButton}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </Components.LinearGradient>
        </KeyboardAwareScrollView>
        <PopupDialog
          width={300}
          height={200}
          dialogStyle={styles.shadow}
          haveOverlay={false}
          dialogTitle={<DialogTitle title="Pick Picture" />}
          ref={(popupDialog) => { this.popupDialog = popupDialog; } }
          dialogAnimation={slideAnimation}
          >
          <View>
            <TouchableOpacity onPress={this.openCamera}>
              <Text>Capture Image</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.openGallery}>
              <Text>Photo Gallery</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    borderWidth: StyleSheet.hairline,
		borderColor: '#F5F5F5',
    marginTop: -50,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  container: {
    alignItems: 'center',
  },
  form: {
    width: Layout.window.width - 20,
    marginLeft: -15
  },
  imageContainer: {
    flexDirection: 'column',
  },  
  image: {
    width: Layout.window.width,
    height: 300,
    resizeMode: 'cover'
  },
  camera: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: -30,
    marginRight: 14
  },
  iconCamera: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  formContainer: {
    marginBottom: 5,
  },
  slider: {
    marginVertical: 10,
    ...Platform.select({
      ios: {
        marginHorizontal: 2
      },
      android: {
      },
    }),
  },
  sliderText: {
    color: 'grey',
    marginVertical: 5 
  },
  locationContainer: {
    flexDirection: 'row',
    width: 100,
  },
  iconLocation: {
    alignSelf: 'center',
    marginTop: 6
  },
  formLocation: {
    width: Layout.window.width - 60,
  },
  submit: {
    margin: 10,
    width: Layout.window.width - 30,
    padding: 18,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  }, 
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    backgroundColor: 'transparent',
  }
});

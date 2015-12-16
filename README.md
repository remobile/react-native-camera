# React Native Camera (remobile)
A cordova camera for react-native, supprt for ios and android

## Installation
```sh
npm install @remobile/react-native-camera --save
```
### Installation (iOS)
* Drag RCTCamera.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTCamera.a from the Products folder inside the RCTCamera.xcodeproj.
* Look for Header Search Paths and make sure it contains both $(SRCROOT)/../../../react-native/React as recursive.

### Installation (Android)
```gradle
...
include ':react-native-camera'
project(':react-native-camera').projectDir = new File(rootProject.projectDir, '../node_modules/@remobile/react-native-camera/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-camera')
}
```

* register module (in MainActivity.java)

```java
import com.remobile.camera.*;  // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......
  private RCTCameraPackage mCameraPackage; // <--- declare package
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);
    mCameraPackage = new RCTCameraPackage(this);// <--- alloc package

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(mCameraPackage)              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }

  ......

  // <----- add start
  @Override
  public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      mCameraPackage.onActivityResult(requestCode, resultCode, data);
  }
  // <----- add end
}
```

### Screencasts
* ios
<br>
![ios](https://github.com/remobile/react-native-camera/blob/master/screencasts/ios.gif)
<br>
* android
<br>
![image](https://github.com/remobile/react-native-camera/blob/master/screencasts/android/1.png)
![image](https://github.com/remobile/react-native-camera/blob/master/screencasts/android/2.png)
![image](https://github.com/remobile/react-native-camera/blob/master/screencasts/android/3.png)
![image](https://github.com/remobile/react-native-camera/blob/master/screencasts/android/4.png)
![image](https://github.com/remobile/react-native-camera/blob/master/screencasts/android/5.png)

## Usage

### Example
```js
var React = require('react-native');
var {
    StyleSheet,
    View,
    Image
} = React;

var Camera = require('@remobile/react-native-camera');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    getInitialState () {
        return {
            image:null,
        };
    },
    capturePhoto() {
        var options = {
            quality: 50,
            allowEdit: false,
            destinationType: Camera.DestinationType.DATA_URL,
        };
        Camera.getPicture(options, (imageData) => {
            this.setState({image: {uri:'data:image/jpeg;base64,'+imageData}});
        });
    },
    capturePhotoEdit() {
        var options = {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.DATA_URL,
        };
        Camera.getPicture(options, (imageData) => {
            this.setState({image: {uri:'data:image/jpeg;base64,'+imageData}});
        });
    },
    getPhoto(source) {
        var options = {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: source,
            encodingType: Camera.EncodingType.PNG,
        };
        Camera.getPicture(options, (imageData) => {
                this.setState({image: {uri:'data:image/png;base64,'+imageData}});
        }, (error) => {
                console.log(error);
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.capturePhoto}>
                    Capture Photo
                </Button>
                <Button onPress={this.capturePhotoEdit}>
                    Capture Editable Photo
                </Button>
                <Button onPress={this.getPhoto.bind(null, Camera.PictureSourceType.PHOTOLIBRARY)}>
                    From Photo Library
                </Button>
                <Button onPress={this.getPhoto.bind(null, Camera.PictureSourceType.SAVEDPHOTOALBUM)}>
                    From Photo Album Editable
                </Button>
                <Image
                    resizeMode='stretch'
                    source={this.state.image}
                    style={styles.image} />
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: 'gray',
    }
});
```

### HELP
* look https://github.com/apache/cordova-plugin-camera


### thanks
* this project come from https://github.com/apache/cordova-plugin-camera

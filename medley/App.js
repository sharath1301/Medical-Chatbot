import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {GiftedChat, Actions, Bubble, SystemMessage} from "react-native-gifted-chat";
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Dialogflow_V2 } from "react-native-dialogflow";

const BOT_USER = {
  _id: 2,
  name: "SmartBot",
  avatar: require('./assets/images/medley-logo-square.png')
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this._isAlright = null;
  }
  state = {
    isLoadingComplete: false,
  };
  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('./data/messages.js'),
      };
    });
  }
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
        'dialogflow-wmpjov@medley-d7738.iam.gserviceaccount.com',
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSYhVNkLhDZ+3g\nzWrYB6U4F0zyFAPIaXlRILcgB6lylXkc0WE/UBcAqemDUiyt/D+x7YzRdsGs+IVF\n3IsLKYH7v5wqIFFgvDLh4m93VA6bl2uAnEkz+PMixdOslODW24Qdht3OimRd1yxY\n8NMlEgYunZjg4l5bw2jydkRuWvqO7hp6dCvjDsbhBQ13y+1AJLFWECGDrzJ8898v\n4ZZAh9MLmev4D7SrnqCot/GIAIrRI/dGy88q925hRLSjeU8zpOp9nzKANqc7Ll5v\nz79Pwj8PWanM3rR6PlT5FrEVoa8XnyCDTnMKe2wGRCpJP2teJyEeK2Z1ir21x59J\nFQJrxYJdAgMBAAECggEAB4YV9HLtQA3esjgubsDhPf8JU6v3EasB+W6F1gmoG+6w\nCOGNDIZY+D9bWESvT96SSZLxAwmv9fdiTsQLHfBTU3VACLqkpmS8nhrquRYCurpA\n0DXmoUrxKQhxoD2nx89Ma4Dn/EuzOK7qCVk9d9kr6u1cawh1busvXOJxYo/y33sg\nSP5XPc6w43KqR1KYTOfaoG5rMDXJZZ3IBQT+WaWqw7+C4MH/P4eellt54apDw8+W\n1RrUi6aInFrjYvIHFDUHjvsQHBAWSL7Wzyuw4lGj6Mx7la7NXTVcyiglkVV2oZqy\nBJKx1CWYbiPBh9KlIwtwMK97bxBZh4gpr7oF4HjywQKBgQD4CTme3dw8PnFB1n4m\nRNYl/ZA30ZYuiSvQ+apDk6d9J5cwOWYDkwfZyK7z+OjUwzhWu7yXLD4pqctmrRs0\nwJlWbwLUFW9DaldB6gTTJNjRQ+7DBwofihajgTjx6dmsrl1uGHrz5WM+DANGoxkz\nD7NLe3R7NhnkBskugQ3qJNpknQKBgQDZI10YbpTL/feFnfx4zXgn+Q7SqX+0QTQl\n05U+q+QyBNuW0vciAZV7DAvp2v07OIHoSK+8+wdWQn4AkO7FeQN3cEYD6LkZEYQs\n0togWX6NjxTl73xEU+Gt3JSDWB+45OuO8aStLIe4Cqv3p/yp4aeOFCCqJMktXTd8\n1e5l9wnIwQKBgHPoy7aD80Fr5L1hoP39OR3zyotrNAV3MLStl3WQ8Lo54Bs3F4cg\nFJEfiTKV5ShYOmG9xbnXgQ0zPcwzpP0X7BBKPEYj5iTY8wHofGy3UWMpndAh4Acx\nHrc10giqwYBC04J5iiujzKbYMke2PDZyZdUmUh6p/5th2G4U/Q2oPy65AoGBAKBC\nm4lWxHey4Cc8LYUzkUVfavNMqrZtkYGBoht5XpkUQMYWutPce2kvwPM+77vvvuGk\nFCDU3dtqg/kC/1e8MzTKJsLn1wWLihRTIy7RHrh4LCJxGTSM/HoH3Yz7U55xRvJf\nov01ao4JQlctIyx3IeWZMWqib+ENddCrTKLxK8WBAoGAHIrI1rYURg/M9YJd38TT\nS9VYRY66w3ZhWOHgA8TeurOJIWQcZA5OPDZkntLBMy82EnkUPmxxbEz3KxwLiip4\n9dkLIZgVj73asslR6y7n7e2aZjknc3wCT+V5sGXdVWEgAqB4uJ2dALpajMmJ+LL7\nkZjzAOIfMbKNAKXYJ/AJXcg=\n-----END PRIVATE KEY-----\n',
        Dialogflow_V2.LANG_ENGLISH_GB,
        'medley-d7738'
    );
  }
  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
//TODO FROM chatkit start
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    let text = messages[0].text;
    Dialogflow_V2.requestQuery(
        text,
        result => this.handleGoogleResponse(result),
        error => console.log(error)
    );
    // for demo purpose
    //this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              //this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  //TODO refine handler
  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }
  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Medley',
            avatar: require('./assets/images/medley-logo-square.png'),
          },
        }),
      };
    });
  }

  renderBubble(props) {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#f0f0f0',
              }
            }}
        />
    );
  }

  renderSystemMessage(props) {
    return (
        <SystemMessage
            {...props}
            containerStyle={{
              marginBottom: 15,
            }}
            textStyle={{
              fontSize: 14,
            }}
        />
    );
  }

  renderCustomView(props) {
    return (
        <CustomView
            {...props}
        />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {this.state.typingText}
            </Text>
          </View>
      );
    }
    return null;
  }

//TOdo from chatkit end
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
          />
      );
    } else {
      return (
          <View style={styles.container}>
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
            />
          </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/medley-logo-square.png'),
        require('./assets/images/medley-logo-square.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingErrror = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  //TODO from react-chatkit
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
